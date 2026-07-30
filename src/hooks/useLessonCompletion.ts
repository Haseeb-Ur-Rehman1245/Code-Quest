import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { getTotalLessonCount } from "@/data/lessons/index";

export function useLessonCompletion(courseId: string | undefined) {
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !courseId) { setLoading(false); return; }

    supabase
      .from("lesson_completions")
      .select("lesson_id")
      .eq("user_id", user.id)
      .eq("course_id", courseId)
      .then(({ data }) => {
        setCompletedLessons(new Set((data || []).map((d) => d.lesson_id)));
        setLoading(false);
      });
  }, [user, courseId]);

  const completeLesson = useCallback(
    async (lessonId: string, phase: string) => {
      if (!user || !courseId || completedLessons.has(lessonId)) return false;

      const { error } = await supabase.from("lesson_completions").insert({
        user_id: user.id,
        course_id: courseId,
        lesson_id: lessonId,
        phase,
        xp_earned: 10,
      });

      if (error) {
        console.error("Failed to complete lesson:", error);
        return false;
      }

      // Update local state
      setCompletedLessons((prev) => new Set([...prev, lessonId]));

      // Update profile XP
      const { data: profile } = await supabase
        .from("profiles")
        .select("xp, level, streak, last_login_date")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profile) {
        const newXp = profile.xp + 10;
        const newLevel = Math.floor(newXp / 100) + 1;
        const today = new Date().toISOString().split("T")[0];
        const lastLogin = profile.last_login_date;
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        const newStreak = lastLogin === yesterday || lastLogin === today ? profile.streak + (lastLogin === today ? 0 : 1) : 1;

        await supabase
          .from("profiles")
          .update({ xp: newXp, level: newLevel, streak: newStreak, last_login_date: today })
          .eq("user_id", user.id);
      }

      // Upsert course progress
      const newCompleted = completedLessons.size + 1;
      const totalLessons = getTotalLessonCount(courseId);
      const progressPercent = totalLessons > 0 ? Math.min(Math.round((newCompleted / totalLessons) * 100), 100) : 0;
      const isComplete = progressPercent === 100;

      const { data: existing } = await supabase
        .from("user_course_progress")
        .select("id, lessons_completed")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .maybeSingle();

      if (existing) {
        await supabase
          .from("user_course_progress")
          .update({
            lessons_completed: newCompleted,
            progress: progressPercent,
            current_phase: phase,
            completed_at: isComplete ? new Date().toISOString() : null,
          })
          .eq("id", existing.id);
      } else {
        await supabase.from("user_course_progress").insert({
          user_id: user.id,
          course_id: courseId,
          lessons_completed: newCompleted,
          progress: progressPercent,
          current_phase: phase,
          completed_at: isComplete ? new Date().toISOString() : null,
        });
      }

      return true;
    },
    [user, courseId, completedLessons]
  );

  return { completedLessons, completeLesson, loading };
}

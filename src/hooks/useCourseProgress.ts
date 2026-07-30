import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { getTotalLessonCount } from "@/data/lessons/index";
import type { Course } from "@/data/courses";

interface CourseProgressMap {
  [courseId: string]: {
    progress: number;
    lessonsCompleted: number;
    currentPhase: string;
    completedAt: string | null;
  };
}

export function useCourseProgress() {
  const { user } = useAuth();
  const [progressMap, setProgressMap] = useState<CourseProgressMap>({});
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("user_course_progress")
      .select("course_id, progress, lessons_completed, current_phase, completed_at")
      .eq("user_id", user.id);

    if (!error && data) {
      const map: CourseProgressMap = {};
      for (const row of data) {
        // Recalculate progress dynamically from actual lesson counts
        const totalLessons = getTotalLessonCount(row.course_id);
        const dynamicProgress = totalLessons > 0
          ? Math.min(Math.round((row.lessons_completed / totalLessons) * 100), 100)
          : row.progress;

        map[row.course_id] = {
          progress: dynamicProgress,
          lessonsCompleted: row.lessons_completed,
          currentPhase: row.current_phase,
          completedAt: row.completed_at,
        };

        // Fix stale DB value if it doesn't match
        if (dynamicProgress !== row.progress) {
          supabase
            .from("user_course_progress")
            .update({
              progress: dynamicProgress,
              completed_at: dynamicProgress === 100 ? new Date().toISOString() : null,
            })
            .eq("user_id", user!.id)
            .eq("course_id", row.course_id)
            .then(() => {});
        }
      }
      setProgressMap(map);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  /** Merge static course list with real progress */
  const withProgress = useCallback(
    (courses: Course[]): Course[] =>
      courses.map((c) => ({
        ...c,
        progress: progressMap[c.id]?.progress ?? c.progress,
      })),
    [progressMap]
  );

  return { progressMap, withProgress, loading, refetch: fetchProgress };
}

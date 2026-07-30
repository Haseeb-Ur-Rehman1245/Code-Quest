import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Target, Flame } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import ProgressRing from "@/components/ProgressRing";
import { webCourses, langCourses } from "@/data/courses";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Analytics = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ coursesStarted: 0, lessonsDone: 0, quizzesPassed: 0, bestStreak: 0 });
  const [webProgress, setWebProgress] = useState(0);
  const [langProgress, setLangProgress] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      // Fetch course progress
      const { data: progressData } = await supabase
        .from("user_course_progress")
        .select("course_id, progress, lessons_completed")
        .eq("user_id", user.id);

      const progressMap = new Map((progressData || []).map(p => [p.course_id, p]));

      const webIds = webCourses.map(c => c.id);
      const langIds = langCourses.map(c => c.id);

      const webProgArr = webIds.map(id => progressMap.get(id)?.progress || 0);
      const langProgArr = langIds.map(id => progressMap.get(id)?.progress || 0);

      setWebProgress(webProgArr.length ? Math.round(webProgArr.reduce((a, b) => a + b, 0) / webProgArr.length) : 0);
      setLangProgress(langProgArr.length ? Math.round(langProgArr.reduce((a, b) => a + b, 0) / langProgArr.length) : 0);

      const coursesStarted = (progressData || []).filter(p => p.progress > 0).length;
      const lessonsDone = (progressData || []).reduce((s, p) => s + p.lessons_completed, 0);

      // Fetch quiz scores
      const { data: quizData } = await supabase
        .from("quiz_scores")
        .select("score, total")
        .eq("user_id", user.id);

      const quizzesPassed = (quizData || []).filter(q => q.score === q.total).length;

      setStats({
        coursesStarted,
        lessonsDone,
        quizzesPassed,
        bestStreak: user.streak,
      });
    };

    fetchStats();
  }, [user]);

  const skills = [
    { name: "HTML/CSS", value: webProgress > 0 ? Math.min(webProgress + 20, 100) : 0 },
    { name: "JavaScript", value: webProgress > 0 ? Math.min(webProgress, 100) : 0 },
    { name: "React", value: Math.max(webProgress - 20, 0) },
    { name: "Backend", value: Math.max(webProgress - 40, 0) },
    { name: "Python", value: langProgress },
    { name: "Databases", value: Math.max(webProgress - 50, 0) },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">Track your learning progress and skills</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={BarChart3} label="Courses Started" value={stats.coursesStarted} colorClass="text-primary" />
        <StatsCard icon={TrendingUp} label="Lessons Done" value={stats.lessonsDone} colorClass="text-secondary" />
        <StatsCard icon={Target} label="Quizzes Passed" value={stats.quizzesPassed} colorClass="text-accent" />
        <StatsCard icon={Flame} label="Best Streak" value={`${stats.bestStreak} days`} colorClass="text-streak" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card rounded-xl p-6 flex flex-col items-center">
          <ProgressRing progress={webProgress} color="hsl(var(--primary))" label="Web Dev" sublabel={`${webCourses.length} courses`} />
        </div>
        <div className="glass-card rounded-xl p-6 flex flex-col items-center">
          <ProgressRing progress={langProgress} color="hsl(var(--accent))" label="Languages" sublabel={`${langCourses.length} courses`} />
        </div>
        <div className="glass-card rounded-xl p-6 flex flex-col items-center">
          <ProgressRing progress={Math.round((webProgress + langProgress) / 2)} color="hsl(var(--secondary))" label="Overall" sublabel="All courses" />
        </div>
      </div>

      {/* Skills radar - simplified bar chart */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Skills Breakdown</h2>
        <div className="space-y-4">
          {skills.map((skill, i) => (
            <motion.div key={skill.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-24 text-right">{skill.name}</span>
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full gradient-bg-primary" initial={{ width: 0 }} animate={{ width: `${skill.value}%` }} transition={{ duration: 1, delay: i * 0.1 }} />
              </div>
              <span className="text-sm font-medium text-foreground w-10">{skill.value}%</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Weekly activity */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">This Week</h2>
        <div className="flex items-end justify-between gap-2 h-32">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
            const heights = [60, 80, 45, 90, 70, 30, 50];
            return (
              <div key={day} className="flex flex-col items-center gap-2 flex-1">
                <motion.div className="w-full rounded-t-md gradient-bg-primary" initial={{ height: 0 }} animate={{ height: `${heights[i]}%` }} transition={{ duration: 0.6, delay: i * 0.08 }} />
                <span className="text-[10px] text-muted-foreground">{day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;

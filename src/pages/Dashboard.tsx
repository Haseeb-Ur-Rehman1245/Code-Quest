import { motion } from "framer-motion";
import { Zap, Flame, Target, BookOpen, Trophy, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ProgressRing from "@/components/ProgressRing";
import StatsCard from "@/components/StatsCard";
import CourseCard from "@/components/CourseCard";
import AchievementBadge from "@/components/AchievementBadge";
import { webCourses, achievements } from "@/data/courses";
import { useCourseProgress } from "@/hooks/useCourseProgress";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  const { user } = useAuth();
  const { withProgress } = useCourseProgress();

  const courses = withProgress(webCourses);
  // current course = first with progress > 0 and < 100
  const currentCourse = courses.find((c) => c.progress > 0 && c.progress < 100) || courses[0];
  const overallProgress = Math.round(
    courses.reduce((sum, c) => sum + c.progress, 0) / courses.length
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, <span className="gradient-text-primary">{user?.name}</span> 👋
        </h1>
        <p className="text-muted-foreground mt-1">Continue your coding journey — you're doing great!</p>
      </motion.div>

      {/* Stats row */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={Zap} label="Total XP" value={user?.xp?.toLocaleString() || "0"} colorClass="text-xp" />
        <StatsCard icon={Flame} label="Streak" value={`${user?.streak || 0} days`} colorClass="text-streak" />
        <StatsCard icon={Trophy} label="Level" value={user?.level || 1} sublabel="Intermediate" colorClass="text-primary" />
        <StatsCard icon={Target} label="Weekly Goal" value="4/7" sublabel="lessons" colorClass="text-secondary" />
      </motion.div>

      {/* Progress + Current Course */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card rounded-xl p-6 flex flex-col items-center justify-center">
          <ProgressRing progress={overallProgress} label="Overall Progress" sublabel="Web Development" />
        </div>

        <div className="lg:col-span-2 glass-card rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={18} className="text-primary" />
            <h2 className="font-semibold text-foreground">Continue Learning</h2>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{currentCourse.icon}</span>
            <div>
              <h3 className="text-lg font-bold text-foreground">{currentCourse.title}</h3>
              <p className="text-sm text-muted-foreground">{currentCourse.description}</p>
            </div>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full rounded-full"
              style={{ background: currentCourse.color }}
              initial={{ width: 0 }}
              animate={{ width: `${currentCourse.progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{currentCourse.progress}% complete</span>
            <span>{currentCourse.lessons} lessons</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4 px-6 py-2.5 rounded-lg gradient-bg-primary text-primary-foreground text-sm font-semibold glow-primary"
            onClick={() => window.location.href = `/courses/${currentCourse.id}`}
          >
            Continue Course →
          </motion.button>
        </div>
      </motion.div>

      {/* Recent Courses */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <TrendingUp size={18} className="text-secondary" />
            In Progress
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses
            .filter((c) => c.progress > 0 && c.progress < 100)
            .slice(0, 4)
            .map((c) => (
              <CourseCard key={c.id} {...c} />
            ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div variants={item}>
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
          <Trophy size={18} className="text-xp" />
          Achievements
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {achievements.slice(0, 12).map((a) => (
            <AchievementBadge key={a.title} {...a} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Globe } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { webCourses, langCourses } from "@/data/courses";
import { useCourseProgress } from "@/hooks/useCourseProgress";

const Courses = () => {
  const [tab, setTab] = useState<"web" | "lang">("web");
  const { withProgress } = useCourseProgress();
  const courses = withProgress(tab === "web" ? webCourses : langCourses);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Courses</h1>
        <p className="text-muted-foreground mt-1">Master web development and programming languages</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab("web")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            tab === "web"
              ? "gradient-bg-primary text-primary-foreground glow-primary"
              : "glass-card text-muted-foreground hover:text-foreground"
          }`}
        >
          <Globe size={16} />
          Full Stack Web Dev
          <span className="ml-1 text-xs opacity-70">({webCourses.length})</span>
        </button>
        <button
          onClick={() => setTab("lang")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            tab === "lang"
              ? "gradient-bg-accent text-accent-foreground glow-accent"
              : "glass-card text-muted-foreground hover:text-foreground"
          }`}
        >
          <Code2 size={16} />
          Programming Languages
          <span className="ml-1 text-xs opacity-70">({langCourses.length})</span>
        </button>
      </div>

      {/* Grid */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {courses.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <CourseCard {...c} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Courses;

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, CheckCircle } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  icon: string;
  progress: number;
  lessons: number;
  color: string;
  category: "web" | "lang";
}

const CourseCard = ({ id, title, icon, progress, lessons, color }: CourseCardProps) => {
  const navigate = useNavigate();
  const isCompleted = progress === 100;

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/courses/${id}`)}
      className="glass-card rounded-xl p-5 cursor-pointer group relative overflow-hidden"
    >
      {/* Accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl" style={{ background: color }} />

      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        {isCompleted && <CheckCircle size={20} className="text-success" />}
      </div>

      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{title}</h3>
      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
        <BookOpen size={12} />
        <span>{lessons} lessons</span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1.5">{progress}% complete</p>
    </motion.div>
  );
};

export default CourseCard;

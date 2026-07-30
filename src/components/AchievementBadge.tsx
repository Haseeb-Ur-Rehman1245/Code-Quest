import { motion } from "framer-motion";
import { Lock } from "lucide-react";

interface AchievementBadgeProps {
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
}

const AchievementBadge = ({ icon, title, description, unlocked }: AchievementBadgeProps) => (
  <motion.div
    whileHover={unlocked ? { scale: 1.08, rotate: 2 } : {}}
    className={`flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all ${
      unlocked ? "glass-card" : "opacity-40"
    }`}
  >
    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
      unlocked ? "gradient-bg-primary glow-primary" : "bg-muted"
    }`}>
      {unlocked ? icon : <Lock size={20} className="text-muted-foreground" />}
    </div>
    <p className="text-xs font-medium text-foreground">{title}</p>
    <p className="text-[10px] text-muted-foreground leading-tight">{description}</p>
  </motion.div>
);

export default AchievementBadge;

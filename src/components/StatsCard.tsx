import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sublabel?: string;
  colorClass?: string;
}

const StatsCard = ({ icon: Icon, label, value, sublabel, colorClass = "text-primary" }: StatsCardProps) => (
  <motion.div
    whileHover={{ scale: 1.03, y: -2 }}
    className="glass-card rounded-xl p-5 flex items-center gap-4 cursor-default"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass} bg-current/10`}>
      <Icon size={24} className={colorClass} />
    </div>
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      {sublabel && <p className="text-xs text-muted-foreground">{sublabel}</p>}
    </div>
  </motion.div>
);

export default StatsCard;

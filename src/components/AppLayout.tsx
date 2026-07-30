import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, LayoutDashboard, BookOpen, BarChart3, LogOut, Flame, Zap, User, Sun, Moon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AITutorChat from "@/components/AITutorChat";

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/courses", icon: BookOpen, label: "Courses" },
  { path: "/analytics", icon: BarChart3, label: "Analytics" },
];

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") !== "light");

  useEffect(() => {
    document.documentElement.classList.toggle("light", !isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-sidebar flex flex-col fixed h-full z-20">
        {/* Logo */}
        <div className="p-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg gradient-bg-primary flex items-center justify-center">
            <Code2 size={20} className="text-primary-foreground" />
          </div>
          <span className="font-bold text-lg gradient-text-primary">CodeQuest</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-sidebar-accent text-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full gradient-bg-primary"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full gradient-bg-secondary flex items-center justify-center text-sm font-bold text-secondary-foreground">
              {user?.name?.[0]?.toUpperCase() || <User size={16} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Zap size={10} className="text-xp" />
                <span>{user?.xp?.toLocaleString()} XP</span>
                <Flame size={10} className="text-streak" />
                <span>{user?.streak}d</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-destructive transition-colors w-full px-2 py-1.5"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64">
        {/* Theme toggle */}
        <div className="flex justify-end p-4 pb-0">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDark((d) => !d)}
            className="p-2.5 rounded-xl glass-card hover:glow-primary transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun size={18} className="text-foreground" />
            ) : (
              <Moon size={18} className="text-foreground" />
            )}
          </motion.button>
        </div>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-8 pb-8"
        >
          {children}
        </motion.div>
      </main>

      {/* AI Tutor */}
      <AITutorChat />
    </div>
  );
};

export default AppLayout;

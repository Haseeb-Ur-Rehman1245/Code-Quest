import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Code2, Zap, Trophy, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const FloatingIcon = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`absolute opacity-20 ${className}`}>{children}</div>
);

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isSignup) {
        await signup(name, email, password);
        toast({
          title: "Account created!",
          description: "Welcome to CodeQuest! You're being signed in...",
        });
        // Auto-confirm is on, so onAuthStateChange will fire and redirect via AuthRoute
        // Small delay to let the auth state update
        setTimeout(() => navigate("/"), 500);
      } else {
        await login(email, password);
        navigate("/");
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      {/* Floating decorations */}
      <FloatingIcon className="top-[10%] left-[10%] floating-animation"><Code2 size={60} className="text-primary" /></FloatingIcon>
      <FloatingIcon className="top-[20%] right-[15%] floating-animation-delayed"><Zap size={48} className="text-secondary" /></FloatingIcon>
      <FloatingIcon className="bottom-[15%] left-[20%] floating-animation-slow"><Trophy size={52} className="text-accent" /></FloatingIcon>
      <FloatingIcon className="bottom-[25%] right-[10%] floating-animation"><Code2 size={40} className="text-primary" /></FloatingIcon>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-accent/10 blur-[100px]" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }} className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl gradient-bg-primary flex items-center justify-center glow-primary">
              <Code2 className="text-primary-foreground" size={28} />
            </div>
            <h1 className="text-3xl font-bold gradient-text-primary">CodeQuest</h1>
          </motion.div>
          <p className="text-muted-foreground">{isSignup ? "Start your coding adventure" : "Continue your quest"}</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8">
          {/* Toggle */}
          <div className="flex bg-muted rounded-xl p-1 mb-6">
            <button onClick={() => setIsSignup(false)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${!isSignup ? "gradient-bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"}`}>Sign In</button>
            <button onClick={() => setIsSignup(true)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${isSignup ? "gradient-bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"}`}>Sign Up</button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isSignup ? "signup" : "signin"}
              initial={{ opacity: 0, x: isSignup ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isSignup ? -20 : 20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">Full Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all pr-12" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl gradient-bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 glow-primary transition-all disabled:opacity-60">
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>{isSignup ? "Create Account" : "Sign In"}<ArrowRight size={18} /></>
                )}
              </motion.button>
            </motion.form>
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">By continuing, you agree to our Terms of Service and Privacy Policy</p>
      </motion.div>
    </div>
  );
};

export default Auth;

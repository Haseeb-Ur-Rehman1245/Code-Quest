import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ThumbsUp, ThumbsDown, Copy, Check, Bot, User, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Msg = { role: "user" | "assistant"; content: string; id: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-tutor`;

const AITutorChat = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hey there! 👋 I'm your CodeQuest AI Tutor. I can help you debug code, explain concepts, create study plans, or review your progress. What would you like to work on?", id: "welcome" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [userContext, setUserContext] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Fetch user context on open
  useEffect(() => {
    if (!isOpen || !user || userContext) return;

    const fetchContext = async () => {
      const [progressRes, quizRes, achieveRes] = await Promise.all([
        supabase.from("user_course_progress").select("course_id, progress, lessons_completed, current_phase").eq("user_id", user.id),
        supabase.from("quiz_scores").select("course_id, phase, score, total").eq("user_id", user.id).order("submitted_at", { ascending: false }).limit(10),
        supabase.from("user_achievements").select("achievement_key").eq("user_id", user.id),
      ]);

      setUserContext({
        name: user.name,
        level: user.level,
        xp: user.xp,
        streak: user.streak,
        courseProgress: progressRes.data || [],
        quizScores: quizRes.data || [],
        achievements: (achieveRes.data || []).map((a) => a.achievement_key),
      });
    };

    fetchContext();
  }, [isOpen, user, userContext]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Msg = { role: "user", content: input.trim(), id: crypto.randomUUID() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const assistantId = crypto.randomUUID();

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: newMessages.filter((m) => m.id !== "welcome").map(({ role, content }) => ({ role, content })),
          userContext,
        }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${resp.status}`);
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      const updateAssistant = (content: string) => {
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && last.id === assistantId) {
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content } : m));
          }
          return [...prev, { role: "assistant", content, id: assistantId }];
        });
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "" || !line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              updateAssistant(assistantSoFar);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw || !raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              updateAssistant(assistantSoFar);
            }
          } catch { }
        }
      }
    } catch (err: any) {
      toast({
        title: "AI Tutor Error",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
      // Remove the loading state but keep messages
    } finally {
      setIsLoading(false);
    }
  }, [input, messages, isLoading, userContext, toast]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickPrompts = [
    "Make me a study timetable",
    "Review my progress",
    "Explain closures in JS",
    "Help me debug my code",
  ];

  return (
    <>
      {/* Floating Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
            style={{
              background: "linear-gradient(135deg, hsl(270, 70%, 55%), hsl(280, 80%, 45%))",
              boxShadow: "0 0 30px hsla(270, 70%, 55%, 0.4)",
            }}
          >
            <MessageCircle size={24} className="text-primary-foreground" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-success border-2 border-background" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[560px] max-h-[80vh] rounded-2xl overflow-hidden flex flex-col border border-border/50 sm:w-[380px] sm:h-[560px] max-sm:inset-0 max-sm:bottom-0 max-sm:right-0 max-sm:w-full max-sm:h-full max-sm:rounded-none max-sm:max-h-full"
            style={{
              background: "hsla(240, 30%, 8%, 0.92)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 0 60px hsla(270, 70%, 40%, 0.2), 0 20px 40px hsla(0, 0%, 0%, 0.3)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b border-border/30"
              style={{ background: "linear-gradient(135deg, hsla(270, 70%, 55%, 0.15), hsla(280, 80%, 45%, 0.1))" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, hsl(270, 70%, 55%), hsl(280, 80%, 45%))" }}
                >
                  <Bot size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">AI Tutor</h3>
                  <p className="text-[10px] text-muted-foreground">Always here to help</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: "linear-gradient(135deg, hsl(270, 70%, 55%), hsl(280, 80%, 45%))" }}>
                      <Bot size={14} className="text-primary-foreground" />
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${msg.role === "user" ? "bg-primary/20 text-foreground" : "bg-muted/50 text-foreground"}`}>
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm prose-invert max-w-none [&_pre]:bg-background/50 [&_pre]:rounded-lg [&_pre]:p-3 [&_pre]:text-xs [&_code]:text-xs [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_h1]:text-base [&_h2]:text-sm [&_h3]:text-sm">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}
                    {msg.role === "assistant" && msg.id !== "welcome" && (
                      <div className="flex items-center gap-1 mt-2 pt-1 border-t border-border/20">
                        <button onClick={() => copyToClipboard(msg.content, msg.id)} className="p-1 text-muted-foreground hover:text-foreground transition-colors" title="Copy">
                          {copiedId === msg.id ? <Check size={12} className="text-success" /> : <Copy size={12} />}
                        </button>
                        <button className="p-1 text-muted-foreground hover:text-success transition-colors" title="Helpful"><ThumbsUp size={12} /></button>
                        <button className="p-1 text-muted-foreground hover:text-destructive transition-colors" title="Not helpful"><ThumbsDown size={12} /></button>
                      </div>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5 bg-primary/20">
                      <User size={14} className="text-primary" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(270, 70%, 55%), hsl(280, 80%, 45%))" }}>
                    <Bot size={14} className="text-primary-foreground" />
                  </div>
                  <div className="bg-muted/50 rounded-xl px-3 py-2">
                    <Loader2 size={16} className="animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => { setInput(p); }}
                    className="text-[11px] px-2.5 py-1.5 rounded-lg border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border/30">
              <div className="flex items-end gap-2 bg-muted/30 rounded-xl px-3 py-2 border border-border/30 focus-within:border-primary/40 transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  rows={1}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none max-h-24"
                  style={{ minHeight: "20px" }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="p-1.5 rounded-lg transition-all disabled:opacity-30"
                  style={{ background: input.trim() ? "linear-gradient(135deg, hsl(270, 70%, 55%), hsl(280, 80%, 45%))" : "transparent" }}
                >
                  <Send size={14} className={input.trim() ? "text-primary-foreground" : "text-muted-foreground"} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AITutorChat;

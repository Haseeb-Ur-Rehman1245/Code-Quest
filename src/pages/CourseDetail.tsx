import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, ExternalLink, FileQuestion, Award, CheckCircle, Lock, ChevronDown, Unlock } from "lucide-react";
import { webCourses, langCourses } from "@/data/courses";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { getLessonsForCourse, getTotalLessonCount } from "@/data/lessons/index";
import { useLessonCompletion } from "@/hooks/useLessonCompletion";
import LessonViewer from "@/components/LessonViewer";
import CourseCertificate from "@/components/CourseCertificate";
import { getQuizForCourse } from "@/data/quizzes";
import type { Lesson } from "@/data/lessons/types";
import { toast } from "sonner";

type Phase = "easy" | "intermediate" | "hard";

const phaseConfig = {
  easy: { label: "Easy 🟢", color: "hsl(var(--success))", bg: "bg-success/10" },
  intermediate: { label: "Intermediate 🟡", color: "hsl(var(--xp))", bg: "bg-xp/10" },
  hard: { label: "Hard 🔴", color: "hsl(var(--destructive))", bg: "bg-destructive/10" },
};

const practiceLinks = [
  { name: "w3schools", url: "https://w3schools.com", icon: "📝" },
  { name: "HackerRank", url: "https://hackerrank.com", icon: "💻" },
  { name: "LeetCode", url: "https://leetcode.com", icon: "🧩" },
  { name: "freeCodeCamp", url: "https://freecodecamp.org", icon: "🏕️" },
  { name: "Codecademy", url: "https://codecademy.com", icon: "📘" },
  { name: "MDN Web Docs", url: "https://developer.mozilla.org", icon: "📖" },
  { name: "GeeksforGeeks", url: "https://geeksforgeeks.org", icon: "🧑‍💻" },
];


const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const course = [...webCourses, ...langCourses].find((c) => c.id === id);
  const [activePhase, setActivePhase] = useState<Phase>("easy");
  const [expandedSection, setExpandedSection] = useState<string | null>("lessons");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [studentName, setStudentName] = useState("");

  const { completedLessons, completeLesson } = useLessonCompletion(id);
  const lessons = getLessonsForCourse(id || "", activePhase);
  const courseQuiz = getQuizForCourse(id || "");
  const totalLessons = useMemo(() => getTotalLessonCount(id || ""), [id]);
  const courseProgress = totalLessons > 0 ? Math.round((completedLessons.size / totalLessons) * 100) : 0;
  const isCourseComplete = courseProgress === 100;
  const certificateId = useMemo(() => {
    if (!user || !id) return "";
    // Deterministic unique ID from user + course
    return btoa(`${user.id}-${id}-cert`).replace(/[^a-zA-Z0-9]/g, "").slice(0, 16).toUpperCase();
  }, [user, id]);

  // Get all lessons per phase for unlock checking
  const easyLessons = useMemo(() => getLessonsForCourse(id || "", "easy"), [id]);
  const intermediateLessons = useMemo(() => getLessonsForCourse(id || "", "intermediate"), [id]);

  // Phase unlock logic: complete ALL lessons in previous phase
  const isPhaseComplete = (phase: Phase) => {
    const phaseLessons = phase === "easy" ? easyLessons : phase === "intermediate" ? intermediateLessons : [];
    if (phaseLessons.length === 0) return false;
    return phaseLessons.every((l) => completedLessons.has(l.id));
  };

  const phaseUnlocked = (phase: Phase) => {
    if (phase === "easy") return true;
    if (phase === "intermediate") return isPhaseComplete("easy");
    return isPhaseComplete("intermediate");
  };

  // Track previous unlock state to detect new unlocks
  const prevUnlocksRef = useRef({ intermediate: false, hard: false });

  useEffect(() => {
    const intUnlocked = phaseUnlocked("intermediate");
    const hardUnlocked = phaseUnlocked("hard");

    if (intUnlocked && !prevUnlocksRef.current.intermediate) {
      toast.success("🎉 Intermediate Level Unlocked!", { duration: 4000 });
    }
    if (hardUnlocked && !prevUnlocksRef.current.hard) {
      toast.success("🔥 Hard Level Unlocked!", { duration: 4000 });
    }

    prevUnlocksRef.current = { intermediate: intUnlocked, hard: hardUnlocked };
  }, [completedLessons.size]);

  // Fetch student name for certificate
  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("name")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setStudentName(data.name);
      });
  }, [user]);

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">Course not found</p>
      </div>
    );
  }

  const toggle = (section: string) => setExpandedSection(expandedSection === section ? null : section);

  const isLessonLocked = (index: number) => {
    if (index === 0) return false;
    const prevLesson = lessons[index - 1];
    return !completedLessons.has(prevLesson.id);
  };

  const handleQuizSubmit = async () => {
    setQuizSubmitted(true);
    if (!user || !id) return;
    const score = courseQuiz.reduce((s, q, i) => s + (quizAnswers[i] === q.correct ? 1 : 0), 0);
    await supabase.from("quiz_scores").insert({
      user_id: user.id,
      course_id: id,
      phase: activePhase,
      score,
      total: courseQuiz.length,
    });
  };

  const handleLessonComplete = async () => {
    if (!selectedLesson) return;
    await completeLesson(selectedLesson.id, activePhase);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={() => navigate("/courses")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={16} /> Back to Courses
      </button>

      <div className={`glass-card rounded-xl p-6 ${isCourseComplete ? "border-2 border-success/40" : ""}`}>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{course.icon}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">{course.title}</h1>
              {isCourseComplete && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                  <CheckCircle size={12} /> Completed
                </span>
              )}
            </div>
            <p className="text-muted-foreground">{course.description}</p>
          </div>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: isCourseComplete ? "hsl(var(--success))" : course.color }}
            animate={{ width: `${courseProgress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">{courseProgress}% complete · {completedLessons.size}/{totalLessons} lessons done</p>
      </div>

      {/* Phase Tabs */}
      <div className="flex gap-2">
        {(["easy", "intermediate", "hard"] as Phase[]).map((phase) => {
          const unlocked = phaseUnlocked(phase);
          return (
            <motion.button
              key={phase}
              layout
              animate={unlocked ? { opacity: 1, scale: 1 } : { opacity: 0.4, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={() => unlocked && setActivePhase(phase)}
              disabled={!unlocked}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activePhase === phase && unlocked ? "text-foreground border-2" : unlocked ? "glass-card text-muted-foreground hover:text-foreground" : "cursor-not-allowed glass-card"
              }`}
              style={activePhase === phase && unlocked ? { borderColor: phaseConfig[phase].color } : {}}
            >
              {!unlocked ? <Lock size={14} /> : phase !== "easy" && <Unlock size={14} className="text-success" />}
              {phaseConfig[phase].label}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activePhase} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
          {/* Lessons */}
          <Section title={`Lessons (${lessons.length})`} icon={BookOpen} expanded={expandedSection === "lessons"} onToggle={() => toggle("lessons")}>
            <div className="space-y-2">
              {lessons.length > 0 ? lessons.map((lesson, i) => {
                const completed = completedLessons.has(lesson.id);
                const locked = isLessonLocked(i);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => !locked && setSelectedLesson(lesson)}
                    disabled={locked}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                      locked ? "opacity-40 cursor-not-allowed bg-muted/30" :
                      completed ? "bg-success/5 hover:bg-success/10" :
                      "bg-muted/50 hover:bg-muted"
                    }`}
                  >
                    {locked ? (
                      <Lock size={16} className="text-muted-foreground flex-shrink-0" />
                    ) : completed ? (
                      <CheckCircle size={16} className="text-success flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-foreground block truncate">{lesson.title}</span>
                      <span className="text-xs text-muted-foreground">{lesson.estimatedMinutes} min · {lesson.codeExamples.length} examples · {lesson.exercises.length} exercises</span>
                    </div>
                    {completed && <span className="text-xs text-success font-medium">+10 XP</span>}
                  </button>
                );
              }) : (
                <p className="text-sm text-muted-foreground p-3">Lessons coming soon for this course.</p>
              )}
            </div>
          </Section>

          {/* Practice */}
          <Section title="Practice Platforms" icon={ExternalLink} expanded={expandedSection === "practice"} onToggle={() => toggle("practice")}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {practiceLinks.map((p) => (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm text-foreground">
                  <span>{p.icon}</span>{p.name}
                </a>
              ))}
            </div>
          </Section>

          {/* Quiz */}
          <Section title={`Quiz (${courseQuiz.length} Questions)`} icon={FileQuestion} expanded={expandedSection === "quiz"} onToggle={() => toggle("quiz")}>
            <div className="space-y-4">
              {courseQuiz.map((q, qi) => (
                <div key={qi} className="space-y-2">
                  <p className="text-sm font-medium text-foreground">{qi + 1}. {q.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oi) => {
                      const selected = quizAnswers[qi] === oi;
                      const correct = quizSubmitted && oi === q.correct;
                      const wrong = quizSubmitted && selected && oi !== q.correct;
                      return (
                        <button
                          key={oi}
                          onClick={() => !quizSubmitted && setQuizAnswers({ ...quizAnswers, [qi]: oi })}
                          className={`p-3 rounded-lg text-sm text-left transition-all border ${
                            correct ? "border-success bg-success/10 text-foreground" :
                            wrong ? "border-destructive bg-destructive/10 text-foreground" :
                            selected ? "border-primary bg-primary/10 text-foreground" :
                            "border-border bg-muted/50 text-foreground hover:bg-muted"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              <button
                onClick={handleQuizSubmit}
                disabled={Object.keys(quizAnswers).length < courseQuiz.length || quizSubmitted}
                className="px-5 py-2 rounded-lg gradient-bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40"
              >
                {quizSubmitted ? "✓ Submitted" : "Submit Quiz"}
              </button>
            </div>
          </Section>

          {/* Certificate */}
          <Section title={isCourseComplete ? "🎓 Course Certificate" : "Course Certificate"} icon={Award} expanded={expandedSection === "cert"} onToggle={() => toggle("cert")}>
            {isCourseComplete ? (
              <CourseCertificate
                studentName={studentName || "Student"}
                courseName={course.title}
                completionDate={new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                certificateId={certificateId}
              />
            ) : (
              <div className="text-center py-6">
                <Award size={48} className="text-xp mx-auto mb-3 opacity-40" />
                <p className="text-sm text-muted-foreground">Complete all {totalLessons} lessons in this course to earn your certificate.</p>
                <p className="text-xs text-muted-foreground mt-1">{completedLessons.size}/{totalLessons} lessons completed</p>
              </div>
            )}
          </Section>
        </motion.div>
      </AnimatePresence>

      {/* Lesson Viewer Modal */}
      <AnimatePresence>
        {selectedLesson && (
          <LessonViewer
            lesson={selectedLesson}
            isCompleted={completedLessons.has(selectedLesson.id)}
            isLocked={false}
            onComplete={handleLessonComplete}
            onClose={() => setSelectedLesson(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const Section = ({ title, icon: Icon, expanded, onToggle, children }: { title: string; icon: any; expanded: boolean; onToggle: () => void; children: React.ReactNode }) => (
  <div className="glass-card rounded-xl overflow-hidden">
    <button onClick={onToggle} className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-3">
        <Icon size={18} className="text-primary" />
        <span className="font-medium text-foreground text-sm">{title}</span>
      </div>
      <ChevronDown size={16} className={`text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} />
    </button>
    <AnimatePresence>
      {expanded && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
          <div className="px-4 pb-4">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default CourseDetail;

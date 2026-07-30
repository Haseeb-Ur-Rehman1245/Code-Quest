import { useState } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle, Clock, ExternalLink, Code2, BookOpen, Lightbulb } from "lucide-react";
import type { Lesson } from "@/data/lessons/types";

interface LessonViewerProps {
  lesson: Lesson;
  isCompleted: boolean;
  isLocked: boolean;
  onComplete: () => void;
  onClose: () => void;
}

const LessonViewer = ({ lesson, isCompleted, isLocked, onComplete, onClose }: LessonViewerProps) => {
  const [completing, setCompleting] = useState(false);

  const handleComplete = async () => {
    setCompleting(true);
    await onComplete();
    setCompleting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm overflow-y-auto p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="w-full max-w-3xl my-8 glass-card rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg-primary flex items-center justify-center">
              <BookOpen size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">{lesson.title}</h2>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                <span className="flex items-center gap-1"><Clock size={12} />{lesson.estimatedMinutes} min</span>
                {isCompleted && <span className="flex items-center gap-1 text-success"><CheckCircle size={12} />Completed</span>}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Explanation */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Lightbulb size={16} className="text-xp" />Concept Explanation
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{lesson.content}</p>
          </section>

          {/* Code Examples */}
          {lesson.codeExamples.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Code2 size={16} className="text-primary" />Code Examples
              </h3>
              <div className="space-y-4">
                {lesson.codeExamples.map((ex, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-border">
                    <div className="bg-muted/50 px-4 py-2 text-xs text-muted-foreground font-mono flex items-center justify-between">
                      <span>{ex.language}</span>
                      <span>Example {i + 1}</span>
                    </div>
                    <pre className="p-4 text-xs font-mono text-foreground overflow-x-auto bg-background/50 leading-relaxed">
                      <code>{ex.code}</code>
                    </pre>
                    <div className="px-4 py-3 bg-muted/30 text-xs text-muted-foreground">
                      💡 {ex.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Practice Exercises */}
          {lesson.exercises.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                🏋️ Practice Exercises
              </h3>
              <div className="space-y-4">
                {lesson.exercises.map((ex, i) => (
                  <ExerciseCard key={i} exercise={ex} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* External Resources */}
          {lesson.externalLinks.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                🔗 External Resources
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {lesson.externalLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted text-sm text-foreground transition-colors group"
                  >
                    <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    {link.title}
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* YouTube Unavailable Fallback Notice */}
          <section className="p-4 rounded-xl bg-info/10 border border-info/20">
            <p className="text-xs text-muted-foreground">
              📘 <strong className="text-foreground">Text-first content:</strong> All lesson content is available as text with code examples above. YouTube videos are supplementary — if they're blocked in your region, you have full access to all learning materials here.
            </p>
          </section>
        </div>

        {/* Footer: Mark Complete */}
        <div className="p-6 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground">+10 XP on completion</p>
          {isCompleted ? (
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-success/10 text-success text-sm font-medium">
              <CheckCircle size={16} /> Completed ✓
            </div>
          ) : (
            <button
              onClick={handleComplete}
              disabled={completing || isLocked}
              className="px-5 py-2.5 rounded-xl gradient-bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40 transition-all hover:opacity-90"
            >
              {completing ? "Saving..." : "Mark Complete ✓"}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExerciseCard = ({ exercise, index }: { exercise: { question: string; solution: string; difficulty: string }; index: number }) => {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">Exercise {index + 1}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            exercise.difficulty === "beginner" ? "bg-success/10 text-success" :
            exercise.difficulty === "intermediate" ? "bg-xp/10 text-xp" :
            "bg-destructive/10 text-destructive"
          }`}>
            {exercise.difficulty}
          </span>
        </div>
        <p className="text-sm text-foreground">{exercise.question}</p>
      </div>
      <div className="border-t border-border">
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="w-full px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors text-left"
        >
          {showSolution ? "Hide Solution ▲" : "Show Solution ▼"}
        </button>
        {showSolution && (
          <pre className="px-4 pb-4 text-xs font-mono text-foreground overflow-x-auto leading-relaxed">
            <code>{exercise.solution}</code>
          </pre>
        )}
      </div>
    </div>
  );
};

export default LessonViewer;

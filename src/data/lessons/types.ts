export interface CodeExample {
  language: string;
  code: string;
  explanation: string;
}

export interface Exercise {
  question: string;
  solution: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface ExternalLink {
  title: string;
  url: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  codeExamples: CodeExample[];
  exercises: Exercise[];
  externalLinks: ExternalLink[];
  estimatedMinutes: number;
}

export interface CourseLessons {
  easy: Lesson[];
  intermediate: Lesson[];
  hard: Lesson[];
}

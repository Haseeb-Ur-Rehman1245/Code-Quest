export interface CourseVideo {
  title: string;
  url: string;
  duration: string;
  source: string;
}

export interface Course {
  id: string;
  title: string;
  icon: string;
  lessons: number;
  progress: number;
  color: string;
  category: "web" | "lang";
  description: string;
  videos?: Record<string, CourseVideo[]>;
}

// YouTube videos per course, organized by phase
const courseVideos: Record<string, Record<string, CourseVideo[]>> = {
  "html-css": {
    easy: [
      { title: "HTML & CSS Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=Puuyc5fwv0M", duration: "6h 30min", source: "freeCodeCamp" },
      { title: "HTML Crash Course For Beginners", url: "https://www.youtube.com/watch?v=UB1O30fR-EE", duration: "1h", source: "Traversy Media" },
      { title: "CSS Tutorial - Zero to Hero", url: "https://www.youtube.com/watch?v=1Rs2ND1ryYc", duration: "6h 18min", source: "freeCodeCamp" },
    ],
    intermediate: [
      { title: "CSS Flexbox in 20 Minutes", url: "https://www.youtube.com/watch?v=JJSoEo8JSnc", duration: "20 min", source: "Traversy Media" },
      { title: "CSS Grid Layout Crash Course", url: "https://www.youtube.com/watch?v=jV8B24rSN5o", duration: "28 min", source: "Traversy Media" },
      { title: "Responsive Web Design Tutorial", url: "https://www.youtube.com/watch?v=srvUrASNj0s", duration: "37 min", source: "freeCodeCamp" },
    ],
    hard: [
      { title: "Advanced CSS and Sass", url: "https://www.youtube.com/watch?v=_a5j7KoflTs", duration: "3h", source: "Jonas Schmedtmann" },
      { title: "CSS Animations Tutorial", url: "https://www.youtube.com/watch?v=jgw82b5Y2MU", duration: "1h 30min", source: "Dev Ed" },
      { title: "Build 5 Responsive Websites", url: "https://www.youtube.com/watch?v=p0bGHP-PXD4", duration: "12h", source: "freeCodeCamp" },
    ],
  },
  javascript: {
    easy: [
      { title: "JavaScript Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=PkZNo7MFNFg", duration: "3h 26min", source: "freeCodeCamp" },
      { title: "JavaScript Crash Course", url: "https://www.youtube.com/watch?v=hdI2bqOjy3c", duration: "1h 40min", source: "Traversy Media" },
      { title: "Learn JavaScript in 1 Hour", url: "https://www.youtube.com/watch?v=W6NZfCO5SIk", duration: "48 min", source: "Mosh" },
    ],
    intermediate: [
      { title: "JavaScript ES6 Tutorial", url: "https://www.youtube.com/watch?v=NCwa_xi0Uuc", duration: "1h 7min", source: "Mosh" },
      { title: "Async JavaScript Crash Course", url: "https://www.youtube.com/watch?v=PoRJizFvM7s", duration: "25 min", source: "Traversy Media" },
      { title: "JavaScript DOM Manipulation", url: "https://www.youtube.com/watch?v=5fb2aPlgoys", duration: "1h 13min", source: "freeCodeCamp" },
    ],
    hard: [
      { title: "JavaScript Design Patterns", url: "https://www.youtube.com/watch?v=kuirGzhGhBY", duration: "30 min", source: "Dev Ed" },
      { title: "Build 15 JS Projects", url: "https://www.youtube.com/watch?v=3PHXvlpOkf4", duration: "8h 30min", source: "freeCodeCamp" },
      { title: "Data Structures & Algorithms in JS", url: "https://www.youtube.com/watch?v=t2CEgPsws3U", duration: "1h 40min", source: "freeCodeCamp" },
    ],
  },
  react: {
    easy: [
      { title: "React Full Course - Net Ninja", url: "https://www.youtube.com/watch?v=SqcYPF4h2CA", duration: "4h", source: "Net Ninja" },
      { title: "React JS Crash Course", url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8", duration: "1h 48min", source: "Traversy Media" },
      { title: "React Tutorial for Beginners", url: "https://www.youtube.com/watch?v=SqcY0GlETPk", duration: "1h 20min", source: "Mosh" },
    ],
    intermediate: [
      { title: "React Hooks Tutorial", url: "https://www.youtube.com/watch?v=LlvBzyy-558", duration: "45 min", source: "Dev Ed" },
      { title: "React Context & Hooks", url: "https://www.youtube.com/watch?v=6RhOzQciVwI", duration: "23 min", source: "Traversy Media" },
      { title: "React Router in 45 Minutes", url: "https://www.youtube.com/watch?v=Ul3y1LXxzdU", duration: "45 min", source: "Web Dev Simplified" },
    ],
    hard: [
      { title: "Full React Course 2024", url: "https://www.youtube.com/watch?v=CgkZ7MvWUAA", duration: "12h", source: "freeCodeCamp" },
      { title: "React TypeScript Tutorial", url: "https://www.youtube.com/watch?v=FJDVKeh7RJI", duration: "55 min", source: "Ben Awad" },
      { title: "Advanced React Patterns", url: "https://www.youtube.com/watch?v=WV0UUcSPk-0", duration: "1h 32min", source: "Jack Herrington" },
    ],
  },
  nodejs: {
    easy: [
      { title: "Node.js Full Course - Traversy Media", url: "https://www.youtube.com/watch?v=TlB_eWDSw9Y", duration: "3h 30min", source: "Traversy Media" },
      { title: "Node.js Tutorial for Beginners", url: "https://www.youtube.com/watch?v=TlB_eWDSMGQ", duration: "1h 18min", source: "Mosh" },
      { title: "Node.js Crash Course", url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4", duration: "1h 30min", source: "Traversy Media" },
    ],
    intermediate: [
      { title: "REST API with Node & Express", url: "https://www.youtube.com/watch?v=pKd0Rpw7O48", duration: "58 min", source: "Mosh" },
      { title: "Node.js Authentication", url: "https://www.youtube.com/watch?v=Ud5xKCYQTjM", duration: "36 min", source: "Web Dev Simplified" },
      { title: "MongoDB with Node.js", url: "https://www.youtube.com/watch?v=pWbMrx5rVBE", duration: "47 min", source: "Net Ninja" },
    ],
    hard: [
      { title: "Build a Fullstack App", url: "https://www.youtube.com/watch?v=ngc9gnGgUdA", duration: "4h", source: "freeCodeCamp" },
      { title: "Microservices with Node.js", url: "https://www.youtube.com/watch?v=XUSHH0E-7zk", duration: "2h", source: "freeCodeCamp" },
      { title: "Node.js Best Practices", url: "https://www.youtube.com/watch?v=BnXkrC0cMLI", duration: "1h 10min", source: "Traversy Media" },
    ],
  },
  cpp: {
    easy: [
      { title: "C++ Full Course - CodeWithHarry", url: "https://www.youtube.com/watch?v=vLnPwxZdW4Y", duration: "10h", source: "CodeWithHarry" },
      { title: "C++ Tutorial for Beginners", url: "https://www.youtube.com/watch?v=ZzaPdXTrSb8", duration: "4h 1min", source: "freeCodeCamp" },
      { title: "C++ Crash Course", url: "https://www.youtube.com/watch?v=1v_4dL8l8pQ", duration: "1h 30min", source: "Traversy Media" },
    ],
    intermediate: [
      { title: "C++ OOP Concepts", url: "https://www.youtube.com/watch?v=wN0x9eZLix4", duration: "1h 30min", source: "freeCodeCamp" },
      { title: "C++ STL Tutorial", url: "https://www.youtube.com/watch?v=RRVYpIET_RU", duration: "45 min", source: "The Cherno" },
      { title: "Pointers in C++", url: "https://www.youtube.com/watch?v=zuegQmMdy8M", duration: "10 min", source: "The Cherno" },
    ],
    hard: [
      { title: "Advanced C++ Programming", url: "https://www.youtube.com/watch?v=GQp1zzTwrIg", duration: "5h", source: "freeCodeCamp" },
      { title: "C++ Data Structures", url: "https://www.youtube.com/watch?v=B31LgI4Y4DQ", duration: "10h", source: "freeCodeCamp" },
      { title: "Modern C++ Features", url: "https://www.youtube.com/watch?v=18c3MTX0PK0", duration: "2h", source: "The Cherno" },
    ],
  },
  python: {
    easy: [
      { title: "Python Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=rfscVS0vtbw", duration: "4h 26min", source: "freeCodeCamp" },
      { title: "Python for Beginners", url: "https://www.youtube.com/watch?v=kqtD5dpn9C8", duration: "1h", source: "Mosh" },
      { title: "Python Crash Course", url: "https://www.youtube.com/watch?v=JJmcL1N2KQs", duration: "1h 30min", source: "Traversy Media" },
    ],
    intermediate: [
      { title: "Python OOP Tutorial", url: "https://www.youtube.com/watch?v=ZDa-Z5JzLYM", duration: "1h 15min", source: "Corey Schafer" },
      { title: "Python File Handling", url: "https://www.youtube.com/watch?v=Uh2ebFW8OYM", duration: "30 min", source: "Corey Schafer" },
      { title: "Python List Comprehensions", url: "https://www.youtube.com/watch?v=3dt4OGnU5sM", duration: "15 min", source: "Corey Schafer" },
    ],
    hard: [
      { title: "Python Data Structures", url: "https://www.youtube.com/watch?v=pkYVOmU3MgA", duration: "12h", source: "freeCodeCamp" },
      { title: "Python Django Tutorial", url: "https://www.youtube.com/watch?v=F5mRW0jo-U4", duration: "3h 45min", source: "Traversy Media" },
      { title: "Advanced Python Features", url: "https://www.youtube.com/watch?v=KSiRzuSx120", duration: "1h", source: "Tech With Tim" },
    ],
  },
  java: {
    easy: [
      { title: "Java Full Course - Mosh", url: "https://www.youtube.com/watch?v=GoXwBQ9e4FQ", duration: "2h 30min", source: "Programming with Mosh" },
      { title: "Java Tutorial for Beginners", url: "https://www.youtube.com/watch?v=eIrMbAQSU34", duration: "14h", source: "freeCodeCamp" },
      { title: "Java Crash Course", url: "https://www.youtube.com/watch?v=GdzRzWymT4c", duration: "1h 40min", source: "Traversy Media" },
    ],
    intermediate: [
      { title: "Java OOP Concepts", url: "https://www.youtube.com/watch?v=6T_HgnjoYwM", duration: "1h 50min", source: "Mosh" },
      { title: "Java Collections Framework", url: "https://www.youtube.com/watch?v=viTainYWiQc", duration: "55 min", source: "Coding with John" },
      { title: "Java Exception Handling", url: "https://www.youtube.com/watch?v=1XAfapkBQjk", duration: "25 min", source: "Coding with John" },
    ],
    hard: [
      { title: "Java Data Structures", url: "https://www.youtube.com/watch?v=RBSGKlAvoiM", duration: "8h", source: "freeCodeCamp" },
      { title: "Spring Boot Tutorial", url: "https://www.youtube.com/watch?v=9SGDpanrc8U", duration: "2h", source: "Amigoscode" },
      { title: "Advanced Java Concepts", url: "https://www.youtube.com/watch?v=Ae-r8hsbPUo", duration: "3h", source: "freeCodeCamp" },
    ],
  },
};

export const webCourses: Course[] = [
  { id: "html-css", title: "HTML & CSS", icon: "🌐", lessons: 24, progress: 0, color: "hsl(15, 90%, 55%)", category: "web", description: "Build the foundation of the web", videos: courseVideos["html-css"] },
  { id: "javascript", title: "JavaScript", icon: "⚡", lessons: 32, progress: 0, color: "hsl(50, 90%, 50%)", category: "web", description: "Make the web interactive", videos: courseVideos["javascript"] },
  { id: "react", title: "React", icon: "⚛️", lessons: 28, progress: 0, color: "hsl(195, 90%, 55%)", category: "web", description: "Build modern user interfaces", videos: courseVideos["react"] },
  { id: "nodejs", title: "Node.js", icon: "🟢", lessons: 20, progress: 0, color: "hsl(120, 50%, 45%)", category: "web", description: "Server-side JavaScript", videos: courseVideos["nodejs"] },
  { id: "express", title: "Express", icon: "🚂", lessons: 16, progress: 0, color: "hsl(0, 0%, 50%)", category: "web", description: "Fast web framework for Node.js" },
  { id: "mongodb", title: "MongoDB", icon: "🍃", lessons: 18, progress: 0, color: "hsl(140, 60%, 40%)", category: "web", description: "NoSQL database mastery" },
  { id: "tailwind", title: "Tailwind CSS", icon: "🎨", lessons: 14, progress: 0, color: "hsl(190, 80%, 50%)", category: "web", description: "Utility-first CSS framework" },
  { id: "nextjs", title: "Next.js", icon: "▲", lessons: 22, progress: 0, color: "hsl(0, 0%, 70%)", category: "web", description: "The React framework for production" },
  { id: "auth", title: "Authentication", icon: "🔐", lessons: 12, progress: 0, color: "hsl(260, 60%, 55%)", category: "web", description: "Secure user authentication" },
  { id: "deployment", title: "Deployment", icon: "🚀", lessons: 10, progress: 0, color: "hsl(25, 95%, 55%)", category: "web", description: "Ship to production" },
  { id: "apis", title: "RESTful APIs", icon: "🔗", lessons: 16, progress: 0, color: "hsl(210, 80%, 55%)", category: "web", description: "Design & build APIs" },
  { id: "projects", title: "Capstone Projects", icon: "🏗️", lessons: 8, progress: 0, color: "hsl(340, 70%, 55%)", category: "web", description: "Real-world portfolio projects" },
];

export const langCourses: Course[] = [
  { id: "c-lang", title: "C", icon: "🔧", lessons: 20, progress: 0, color: "hsl(210, 50%, 50%)", category: "lang", description: "Low-level systems programming" },
  { id: "cpp", title: "C++", icon: "⚙️", lessons: 26, progress: 0, color: "hsl(210, 70%, 45%)", category: "lang", description: "Object-oriented powerhouse", videos: courseVideos["cpp"] },
  { id: "python", title: "Python", icon: "🐍", lessons: 28, progress: 0, color: "hsl(55, 70%, 50%)", category: "lang", description: "Versatile and beginner-friendly", videos: courseVideos["python"] },
  { id: "java", title: "Java", icon: "☕", lessons: 30, progress: 0, color: "hsl(20, 80%, 50%)", category: "lang", description: "Enterprise-grade applications", videos: courseVideos["java"] },
  { id: "js-lang", title: "JavaScript", icon: "💛", lessons: 24, progress: 0, color: "hsl(50, 90%, 50%)", category: "lang", description: "The language of the web", videos: courseVideos["javascript"] },
  { id: "typescript", title: "TypeScript", icon: "🔷", lessons: 22, progress: 0, color: "hsl(210, 90%, 55%)", category: "lang", description: "JavaScript with superpowers" },
  { id: "go", title: "Go", icon: "🐹", lessons: 18, progress: 0, color: "hsl(190, 70%, 50%)", category: "lang", description: "Simple, fast, concurrent" },
  { id: "rust", title: "Rust", icon: "🦀", lessons: 24, progress: 0, color: "hsl(15, 70%, 45%)", category: "lang", description: "Memory safety without garbage collection" },
];

export const achievements = [
  { icon: "🚀", key: "first_launch", title: "First Launch", description: "Complete your first lesson", unlocked: false },
  { icon: "🔥", key: "on_fire", title: "On Fire", description: "7-day login streak", unlocked: false },
  { icon: "⚡", key: "quick_learner", title: "Quick Learner", description: "Complete 5 lessons in a day", unlocked: false },
  { icon: "🏆", key: "quiz_master", title: "Quiz Master", description: "Score 100% on any quiz", unlocked: false },
  { icon: "💎", key: "diamond_coder", title: "Diamond Coder", description: "Reach Level 10", unlocked: false },
  { icon: "🎯", key: "sharpshooter", title: "Sharpshooter", description: "10 perfect quizzes", unlocked: false },
  { icon: "📚", key: "bookworm", title: "Bookworm", description: "Complete 50 lessons", unlocked: false },
  { icon: "🌟", key: "all_star", title: "All Star", description: "Complete all easy phases", unlocked: false },
  { icon: "🧠", key: "big_brain", title: "Big Brain", description: "Complete a hard phase", unlocked: false },
  { icon: "👑", key: "champion", title: "Champion", description: "Complete a full course", unlocked: false },
  { icon: "🎨", key: "full_stack", title: "Full Stack", description: "Complete all web courses", unlocked: false },
  { icon: "🌍", key: "polyglot", title: "Polyglot", description: "Learn 3 languages", unlocked: false },
];

import { CourseLessons } from "./types";
import { htmlCssLessons } from "./html-css";
import { javascriptLessons } from "./javascript";
import { reactLessons } from "./react-lessons";
import { pythonLessons } from "./python";
import { cppLessons } from "./cpp";
import { nodejsLessons } from "./nodejs";
import { javaLessons } from "./java";
import { typescriptLessons } from "./typescript-lang";
import { goLessons } from "./go";
import { rustLessons } from "./rust";
import { expressLessons } from "./express";
import { mongodbLessons } from "./mongodb";
import { tailwindLessons } from "./tailwind";
import { nextjsLessons } from "./nextjs";
import { authLessons } from "./auth";
import { deploymentLessons } from "./deployment";
import { apisLessons } from "./apis";
import { capstoneLessons } from "./capstone";
import { cLangLessons } from "./c-lang";

export const allCourseLessons: Record<string, CourseLessons> = {
  "html-css": htmlCssLessons,
  javascript: javascriptLessons,
  "js-lang": javascriptLessons,
  react: reactLessons,
  cpp: cppLessons,
  python: pythonLessons,
  nodejs: nodejsLessons,
  "node-js": nodejsLessons,
  java: javaLessons,
  typescript: typescriptLessons,
  "typescript-lang": typescriptLessons,
  go: goLessons,
  golang: goLessons,
  rust: rustLessons,
  express: expressLessons,
  mongodb: mongodbLessons,
  tailwind: tailwindLessons,
  nextjs: nextjsLessons,
  auth: authLessons,
  deployment: deploymentLessons,
  apis: apisLessons,
  projects: capstoneLessons,
  capstone: capstoneLessons,
  "c-lang": cLangLessons,
  c: cLangLessons,
};

export function getLessonsForCourse(courseId: string, phase: "easy" | "intermediate" | "hard") {
  const lessons = allCourseLessons[courseId];
  if (!lessons) return [];
  return lessons[phase] || [];
}

export function getTotalLessonCount(courseId: string): number {
  const lessons = allCourseLessons[courseId];
  if (!lessons) return 0;
  return lessons.easy.length + lessons.intermediate.length + lessons.hard.length;
}

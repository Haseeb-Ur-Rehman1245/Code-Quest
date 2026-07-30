import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, userContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Build context-aware system prompt
    const contextParts: string[] = [];

    if (userContext) {
      if (userContext.name) contextParts.push(`Student name: ${userContext.name}`);
      if (userContext.level) contextParts.push(`Current level: ${userContext.level}`);
      if (userContext.xp) contextParts.push(`XP: ${userContext.xp}`);
      if (userContext.streak) contextParts.push(`Login streak: ${userContext.streak} days`);

      if (userContext.courseProgress?.length > 0) {
        const progressSummary = userContext.courseProgress
          .map((p: any) => `${p.course_id}: ${p.progress}% (${p.lessons_completed} lessons, phase: ${p.current_phase})`)
          .join("; ");
        contextParts.push(`Course progress: ${progressSummary}`);
      }

      if (userContext.quizScores?.length > 0) {
        const quizSummary = userContext.quizScores
          .map((q: any) => `${q.course_id} (${q.phase}): ${q.score}/${q.total}`)
          .join("; ");
        contextParts.push(`Recent quiz scores: ${quizSummary}`);
      }

      if (userContext.achievements?.length > 0) {
        contextParts.push(`Unlocked achievements: ${userContext.achievements.join(", ")}`);
      }
    }

    const contextBlock = contextParts.length > 0
      ? `\n\n## Current Student Context\n${contextParts.join("\n")}`
      : "";

    const systemPrompt = `You are CodeQuest AI Tutor — a friendly, encouraging, and knowledgeable coding mentor for students learning programming. You have deep expertise in web development (HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, Tailwind, Next.js) and programming languages (C, C++, Python, Java, TypeScript, Go, Rust).

## Your Core Responsibilities
1. **Debug code**: Analyze code snippets, identify bugs, explain the issue clearly, and guide students toward the fix with explanations — never just give the answer.
2. **Explain concepts**: Break down technical concepts at the student's level. Use analogies, simple examples, and build up complexity gradually.
3. **Create study plans**: Generate personalized timetables based on the student's pace, weak areas (from quiz scores), and learning streak.
4. **Recommend next steps**: Based on course progress and quiz performance, suggest which topics to focus on or which course to take next.
5. **Review progress**: Summarize learning trends, celebrate achievements, and highlight areas needing attention.

## Personality & Style
- Warm, encouraging, and patient — like a supportive senior developer
- Use emojis sparingly for encouragement (🎯, 💡, 🔥, ⚡)
- Format responses with markdown: use code blocks, bullet points, and headers
- Keep responses concise but thorough — aim for clarity over length
- Proactively reference the student's data (quiz scores, progress, streak) without them asking
- Celebrate milestones and streaks to keep motivation high

## Important Rules
- Never write entire solutions — guide students to discover answers
- When debugging, ask clarifying questions if the code context is incomplete
- Adapt explanation difficulty to the student's current phase (easy/intermediate/hard)
- If a student seems frustrated, acknowledge it and break the problem into smaller steps
- Always end with an actionable next step or encouragement${contextBlock}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in Settings." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service temporarily unavailable." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-tutor error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

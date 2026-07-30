
-- Create lesson_completions table to track individual lesson completions
CREATE TABLE public.lesson_completions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  phase TEXT NOT NULL DEFAULT 'easy',
  xp_earned INTEGER NOT NULL DEFAULT 10,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id, lesson_id)
);

-- Enable RLS
ALTER TABLE public.lesson_completions ENABLE ROW LEVEL SECURITY;

-- Users can view their own completions
CREATE POLICY "Users can view own lesson completions"
ON public.lesson_completions FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own completions
CREATE POLICY "Users can insert own lesson completions"
ON public.lesson_completions FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own completions
CREATE POLICY "Users can delete own lesson completions"
ON public.lesson_completions FOR DELETE
USING (auth.uid() = user_id);

-- Index for fast lookups
CREATE INDEX idx_lesson_completions_user_course ON public.lesson_completions(user_id, course_id);

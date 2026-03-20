import { z } from "zod";

export const quizQuestionSchema = z.object({
  id: z.string().uuid(),
  question: z.string(),
  options: z.array(z.string()),
  correctIndex: z.number(),
  explanation: z.string().nullable(),
  signalId: z.string().uuid().nullable(),
  ruleId: z.string().uuid().nullable(),
  createdAt: z.string().datetime(),
});

export const quizSubmitSchema = z.object({
  deviceId: z.string(),
  answers: z.array(
    z.object({
      questionId: z.string().uuid(),
      selectedIndex: z.number(),
    })
  ),
});

export const quizResultSchema = z.object({
  total: z.number(),
  correct: z.number(),
  score: z.number(),
  results: z.array(
    z.object({
      questionId: z.string().uuid(),
      isCorrect: z.boolean(),
      correctIndex: z.number(),
      explanation: z.string().nullable(),
    })
  ),
});

export type QuizQuestion = z.infer<typeof quizQuestionSchema>;
export type QuizSubmit = z.infer<typeof quizSubmitSchema>;
export type QuizResult = z.infer<typeof quizResultSchema>;

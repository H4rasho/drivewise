import { sql } from "drizzle-orm";
import { db } from "../../shared/db/client";
import { quizQuestions } from "../../shared/db/schema";
import type { QuizSubmit } from "@drivewise/shared";

export async function generateQuiz(limit: number) {
  return db.select().from(quizQuestions).orderBy(sql`RANDOM()`).limit(limit);
}

export async function submitQuiz(body: QuizSubmit) {
  const questions = await db.select().from(quizQuestions);
  const questionMap = new Map(questions.map((q) => [q.id, q]));

  const results = body.answers.map((answer) => {
    const question = questionMap.get(answer.questionId);
    const isCorrect = question?.correctIndex === answer.selectedIndex;
    return {
      questionId: answer.questionId,
      isCorrect: isCorrect ?? false,
      correctIndex: question?.correctIndex ?? 0,
      explanation: question?.explanation ?? null,
    };
  });

  const correct = results.filter((r) => r.isCorrect).length;
  return {
    total: results.length,
    correct,
    score: Math.round((correct / results.length) * 100),
    results,
  };
}

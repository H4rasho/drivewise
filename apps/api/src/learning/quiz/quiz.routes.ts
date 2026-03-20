import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { generateQuiz, submitQuiz } from "./quiz.service";
import { ok } from "../../shared/lib/response";
import { quizSubmitSchema } from "@drivewise/shared";

export const quizRoutes = new Hono();

quizRoutes.get("/generate", async (c) => {
  const limit = Number(c.req.query("limit") ?? "10");
  const questions = await generateQuiz(Math.min(limit, 20));
  return c.json(ok(questions));
});

quizRoutes.post("/submit", zValidator("json", quizSubmitSchema), async (c) => {
  const body = c.req.valid("json");
  const result = await submitQuiz(body);
  return c.json(ok(result));
});

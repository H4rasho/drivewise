import { z } from "zod";

export const ruleCategorySchema = z.enum([
  "velocidad",
  "preferencia",
  "estacionamiento",
  "adelantamiento",
  "alcoholemia",
  "documentacion",
]);

export const ruleSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  category: ruleCategorySchema,
  content: z.string(),
  legalRef: z.string().nullable(),
  createdAt: z.string().datetime(),
});

export type Rule = z.infer<typeof ruleSchema>;
export type RuleCategory = z.infer<typeof ruleCategorySchema>;

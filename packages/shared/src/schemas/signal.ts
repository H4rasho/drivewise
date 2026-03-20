import { z } from "zod";

export const signalCategorySchema = z.enum([
  "regulatoria",
  "preventiva",
  "informativa",
  "transitoria",
]);

export const signalSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  category: signalCategorySchema,
  description: z.string(),
  imageUrl: z.string().nullable(),
  mnemonic: z.string().nullable(),
  createdAt: z.string().datetime(),
});

export type Signal = z.infer<typeof signalSchema>;
export type SignalCategory = z.infer<typeof signalCategorySchema>;

import { z } from "zod";

export const moduleSchema = z.enum([
  "parking",
  "maintenance",
  "care",
  "signals",
  "rules",
  "quiz",
]);

export const progressSyncSchema = z.object({
  deviceId: z.string().min(1),
  completedModules: z.array(moduleSchema),
  quizHistory: z.array(
    z.object({
      date: z.string().datetime(),
      score: z.number(),
      total: z.number(),
    })
  ),
});

export const deviceProgressSchema = z.object({
  id: z.string().uuid(),
  deviceId: z.string(),
  completedModules: z.array(moduleSchema),
  quizHistory: z.array(
    z.object({
      date: z.string().datetime(),
      score: z.number(),
      total: z.number(),
    })
  ),
  lastSyncAt: z.string().datetime(),
  createdAt: z.string().datetime(),
});

export type Module = z.infer<typeof moduleSchema>;
export type ProgressSync = z.infer<typeof progressSyncSchema>;
export type DeviceProgress = z.infer<typeof deviceProgressSchema>;

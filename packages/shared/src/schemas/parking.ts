import { z } from "zod";

export const parkingTypeSchema = z.enum([
  "paralelo",
  "bateria",
  "diagonal",
  "pendiente",
]);

export const parkingStepSchema = z.object({
  order: z.number(),
  instruction: z.string(),
  tip: z.string().optional(),
});

export const parkingTipSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  type: parkingTypeSchema,
  steps: z.array(parkingStepSchema),
  imageUrl: z.string().nullable(),
  createdAt: z.string().datetime(),
});

export type ParkingType = z.infer<typeof parkingTypeSchema>;
export type ParkingStep = z.infer<typeof parkingStepSchema>;
export type ParkingTip = z.infer<typeof parkingTipSchema>;

import { z } from "zod";

export const maintenanceFrequencySchema = z.enum([
  "mensual",
  "trimestral",
  "semestral",
  "anual",
  "por_kilometraje",
]);

export const maintenanceItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  frequency: maintenanceFrequencySchema,
  kmInterval: z.number().nullable(),
  createdAt: z.string().datetime(),
});

export type MaintenanceFrequency = z.infer<typeof maintenanceFrequencySchema>;
export type MaintenanceItem = z.infer<typeof maintenanceItemSchema>;

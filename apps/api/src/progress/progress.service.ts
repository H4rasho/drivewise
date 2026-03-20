import { eq } from "drizzle-orm";
import { db } from "../shared/db/client";
import { deviceProgress } from "../shared/db/schema";
import type { ProgressSync } from "@drivewise/shared";

export async function getProgress(deviceId: string) {
  const results = await db.select().from(deviceProgress).where(eq(deviceProgress.deviceId, deviceId));
  return results[0] ?? null;
}

export async function syncProgress(body: ProgressSync) {
  const existing = await getProgress(body.deviceId);
  if (existing) {
    const updated = await db
      .update(deviceProgress)
      .set({
        completedModules: body.completedModules,
        quizHistory: body.quizHistory,
        lastSyncAt: new Date(),
      })
      .where(eq(deviceProgress.deviceId, body.deviceId))
      .returning();
    return updated[0];
  }
  const inserted = await db
    .insert(deviceProgress)
    .values({
      deviceId: body.deviceId,
      completedModules: body.completedModules,
      quizHistory: body.quizHistory,
    })
    .returning();
  return inserted[0];
}

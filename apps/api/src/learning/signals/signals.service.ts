import { eq } from "drizzle-orm";
import { db } from "../../shared/db/client";
import { signals } from "../../shared/db/schema";
import type { SignalCategory } from "@drivewise/shared";

export async function getSignals(category?: string) {
  if (category) {
    return db.select().from(signals).where(eq(signals.category, category as SignalCategory));
  }
  return db.select().from(signals).orderBy(signals.category);
}

export async function getSignalById(id: string) {
  const results = await db.select().from(signals).where(eq(signals.id, id));
  return results[0] ?? null;
}

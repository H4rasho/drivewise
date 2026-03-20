import { eq } from "drizzle-orm";
import { db } from "../../shared/db/client";
import { rules } from "../../shared/db/schema";
import type { RuleCategory } from "@drivewise/shared";

export async function getRules(category?: string) {
  if (category) {
    return db.select().from(rules).where(eq(rules.category, category as RuleCategory));
  }
  return db.select().from(rules).orderBy(rules.category);
}

import { db } from "../shared/db/client";
import { careChecklist } from "../shared/db/schema";

export async function getCareChecklist() {
  return db.select().from(careChecklist).orderBy(careChecklist.category);
}

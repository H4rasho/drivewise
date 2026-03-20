import { db } from "../shared/db/client";
import { maintenanceItems } from "../shared/db/schema";

export async function getMaintenanceItems() {
  return db.select().from(maintenanceItems).orderBy(maintenanceItems.frequency);
}

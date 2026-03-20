import { eq } from "drizzle-orm";
import { db } from "../shared/db/client";
import { parkingTips } from "../shared/db/schema";
import type { ParkingType } from "@drivewise/shared";

export async function getParkingTips() {
  return db.select().from(parkingTips).orderBy(parkingTips.type);
}

export async function getParkingTipByType(type: string) {
  const validTypes: ParkingType[] = ["paralelo", "bateria", "diagonal", "pendiente"];
  if (!validTypes.includes(type as ParkingType)) return null;
  const results = await db.select().from(parkingTips).where(eq(parkingTips.type, type as ParkingType));
  return results[0] ?? null;
}

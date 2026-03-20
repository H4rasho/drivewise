import { Hono } from "hono";
import { getMaintenanceItems } from "./maintenance.service";
import { ok } from "../shared/lib/response";

export const maintenanceRoutes = new Hono();

maintenanceRoutes.get("/schedule", async (c) => {
  const items = await getMaintenanceItems();
  return c.json(ok(items));
});

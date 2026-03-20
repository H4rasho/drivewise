import { Hono } from "hono";
import { getCareChecklist } from "./care.service";
import { ok } from "../shared/lib/response";

export const careRoutes = new Hono();

careRoutes.get("/checklist", async (c) => {
  const items = await getCareChecklist();
  return c.json(ok(items));
});

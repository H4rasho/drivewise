import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getProgress, syncProgress } from "./progress.service";
import { ok } from "../shared/lib/response";
import { progressSyncSchema } from "@drivewise/shared";

export const progressRoutes = new Hono();

progressRoutes.get("/:deviceId", async (c) => {
  const deviceId = c.req.param("deviceId");
  const progress = await getProgress(deviceId);
  if (!progress) return c.json({ ok: false, error: { code: "NOT_FOUND", message: "Progress not found" } }, 404);
  return c.json(ok(progress));
});

progressRoutes.post("/sync", zValidator("json", progressSyncSchema), async (c) => {
  const body = c.req.valid("json");
  const progress = await syncProgress(body);
  return c.json(ok(progress));
});

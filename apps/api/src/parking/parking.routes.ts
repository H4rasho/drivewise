import { Hono } from "hono";
import { getParkingTips, getParkingTipByType } from "./parking.service";
import { ok } from "../shared/lib/response";

export const parkingRoutes = new Hono();

parkingRoutes.get("/tips", async (c) => {
  const tips = await getParkingTips();
  return c.json(ok(tips));
});

parkingRoutes.get("/tips/:type", async (c) => {
  const type = c.req.param("type");
  const tip = await getParkingTipByType(type);
  if (!tip) return c.json({ ok: false, error: { code: "NOT_FOUND", message: "Parking tip not found" } }, 404);
  return c.json(ok(tip));
});

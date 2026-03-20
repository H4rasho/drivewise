import { Hono } from "hono";
import { getSignals, getSignalById } from "./signals.service";
import { ok } from "../../shared/lib/response";

export const signalsRoutes = new Hono();

signalsRoutes.get("/", async (c) => {
  const category = c.req.query("category");
  const signals = await getSignals(category);
  return c.json(ok(signals));
});

signalsRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const signal = await getSignalById(id);
  if (!signal) return c.json({ ok: false, error: { code: "NOT_FOUND", message: "Signal not found" } }, 404);
  return c.json(ok(signal));
});

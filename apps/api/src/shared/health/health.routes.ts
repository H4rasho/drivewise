import { Hono } from "hono";
import { ok } from "../lib/response";

export const healthRoutes = new Hono();

healthRoutes.get("/", (c) => {
  return c.json(ok({ status: "ok", timestamp: new Date().toISOString() }));
});

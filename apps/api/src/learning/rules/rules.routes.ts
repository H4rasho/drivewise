import { Hono } from "hono";
import { getRules } from "./rules.service";
import { ok } from "../../shared/lib/response";

export const rulesRoutes = new Hono();

rulesRoutes.get("/", async (c) => {
  const category = c.req.query("category");
  const rulesList = await getRules(category);
  return c.json(ok(rulesList));
});

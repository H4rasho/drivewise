import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import { err } from "../lib/response";

export function errorHandler(error: Error, c: Context) {
  console.error(error);
  return c.json(err("INTERNAL_ERROR", "An unexpected error occurred"), 500 as StatusCode);
}

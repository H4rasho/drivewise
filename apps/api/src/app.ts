import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { errorHandler } from "./shared/middleware/error-handler";
import { parkingRoutes } from "./parking/parking.routes";
import { maintenanceRoutes } from "./maintenance/maintenance.routes";
import { careRoutes } from "./care/care.routes";
import { signalsRoutes } from "./learning/signals/signals.routes";
import { rulesRoutes } from "./learning/rules/rules.routes";
import { quizRoutes } from "./learning/quiz/quiz.routes";
import { progressRoutes } from "./progress/progress.routes";
import { healthRoutes } from "./shared/health/health.routes";

export function createApp() {
  const app = new Hono();

  // Middleware
  app.use("*", logger());
  app.use("*", cors({ origin: "*" }));

  // Routes
  app.route("/api/v1/parking", parkingRoutes);
  app.route("/api/v1/maintenance", maintenanceRoutes);
  app.route("/api/v1/care", careRoutes);
  app.route("/api/v1/signals", signalsRoutes);
  app.route("/api/v1/rules", rulesRoutes);
  app.route("/api/v1/quiz", quizRoutes);
  app.route("/api/v1/progress", progressRoutes);
  app.route("/api/v1/health", healthRoutes);

  app.onError(errorHandler);

  return app;
}

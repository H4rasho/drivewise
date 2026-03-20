import { createApp } from "./app";
import { env } from "./shared/lib/env";

const app = createApp();

console.log(`DriveWise API running on port ${env.API_PORT}`);

export default {
  port: env.API_PORT,
  fetch: app.fetch,
};

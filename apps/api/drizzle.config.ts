import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/shared/db/schema.ts",
  out: "./src/shared/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.POSTGRES_HOST ?? "localhost",
    port: Number(process.env.POSTGRES_PORT ?? 5432),
    database: process.env.POSTGRES_DB!,
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
  },
});

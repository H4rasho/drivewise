import {
  pgTable,
  uuid,
  text,
  varchar,
  integer,
  timestamp,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";

// ---- Enums ----
export const signalCategoryEnum = pgEnum("signal_category", [
  "regulatoria",
  "preventiva",
  "informativa",
  "transitoria",
]);

export const ruleCategoryEnum = pgEnum("rule_category", [
  "velocidad",
  "preferencia",
  "estacionamiento",
  "adelantamiento",
  "alcoholemia",
  "documentacion",
]);

export const maintenanceFrequencyEnum = pgEnum("maintenance_frequency", [
  "mensual",
  "trimestral",
  "semestral",
  "anual",
  "por_kilometraje",
]);

export const parkingTypeEnum = pgEnum("parking_type", [
  "paralelo",
  "bateria",
  "diagonal",
  "pendiente",
]);

// ---- Tables ----
export const signals = pgTable("signals", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 200 }).notNull(),
  category: signalCategoryEnum("category").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  mnemonic: text("mnemonic"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const rules = pgTable("rules", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 300 }).notNull(),
  category: ruleCategoryEnum("category").notNull(),
  content: text("content").notNull(),
  legalRef: varchar("legal_ref", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const parkingTips = pgTable("parking_tips", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 200 }).notNull(),
  type: parkingTypeEnum("type").notNull(),
  steps: jsonb("steps").notNull().$type<
    { order: number; instruction: string; tip?: string }[]
  >(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const maintenanceItems = pgTable("maintenance_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description").notNull(),
  frequency: maintenanceFrequencyEnum("frequency").notNull(),
  kmInterval: integer("km_interval"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const careChecklist = pgTable("care_checklist", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quizQuestions = pgTable("quiz_questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  question: text("question").notNull(),
  options: jsonb("options").notNull().$type<string[]>(),
  correctIndex: integer("correct_index").notNull(),
  explanation: text("explanation"),
  signalId: uuid("signal_id").references(() => signals.id),
  ruleId: uuid("rule_id").references(() => rules.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const deviceProgress = pgTable("device_progress", {
  id: uuid("id").primaryKey().defaultRandom(),
  deviceId: varchar("device_id", { length: 100 }).notNull().unique(),
  completedModules: jsonb("completed_modules").notNull().$type<string[]>().default([]),
  quizHistory: jsonb("quiz_history")
    .notNull()
    .$type<{ date: string; score: number; total: number }[]>()
    .default([]),
  lastSyncAt: timestamp("last_sync_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

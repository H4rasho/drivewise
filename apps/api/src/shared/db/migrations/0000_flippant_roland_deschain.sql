CREATE TYPE "public"."maintenance_frequency" AS ENUM('mensual', 'trimestral', 'semestral', 'anual', 'por_kilometraje');--> statement-breakpoint
CREATE TYPE "public"."parking_type" AS ENUM('paralelo', 'bateria', 'diagonal', 'pendiente');--> statement-breakpoint
CREATE TYPE "public"."rule_category" AS ENUM('velocidad', 'preferencia', 'estacionamiento', 'adelantamiento', 'alcoholemia', 'documentacion');--> statement-breakpoint
CREATE TYPE "public"."signal_category" AS ENUM('regulatoria', 'preventiva', 'informativa', 'transitoria');--> statement-breakpoint
CREATE TABLE "care_checklist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text NOT NULL,
	"category" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "device_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"device_id" varchar(100) NOT NULL,
	"completed_modules" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"quiz_history" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"last_sync_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "device_progress_device_id_unique" UNIQUE("device_id")
);
--> statement-breakpoint
CREATE TABLE "maintenance_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(200) NOT NULL,
	"description" text NOT NULL,
	"frequency" "maintenance_frequency" NOT NULL,
	"km_interval" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "parking_tips" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(200) NOT NULL,
	"type" "parking_type" NOT NULL,
	"steps" jsonb NOT NULL,
	"image_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" text NOT NULL,
	"options" jsonb NOT NULL,
	"correct_index" integer NOT NULL,
	"explanation" text,
	"signal_id" uuid,
	"rule_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(300) NOT NULL,
	"category" "rule_category" NOT NULL,
	"content" text NOT NULL,
	"legal_ref" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "signals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(200) NOT NULL,
	"category" "signal_category" NOT NULL,
	"description" text NOT NULL,
	"image_url" text,
	"mnemonic" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_signal_id_signals_id_fk" FOREIGN KEY ("signal_id") REFERENCES "public"."signals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_rule_id_rules_id_fk" FOREIGN KEY ("rule_id") REFERENCES "public"."rules"("id") ON DELETE no action ON UPDATE no action;
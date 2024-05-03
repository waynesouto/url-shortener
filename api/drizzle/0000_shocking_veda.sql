CREATE TABLE IF NOT EXISTS "urls" (
	"id" text PRIMARY KEY NOT NULL,
	"long_url" text NOT NULL,
	"short_url" text NOT NULL,
	"unique_id" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);

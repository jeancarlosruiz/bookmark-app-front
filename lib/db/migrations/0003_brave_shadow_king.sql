DROP TABLE "bookmark" CASCADE;--> statement-breakpoint
DROP TABLE "bookmark_tag" CASCADE;--> statement-breakpoint
DROP TABLE "tag" CASCADE;--> statement-breakpoint
ALTER TABLE "verification" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;
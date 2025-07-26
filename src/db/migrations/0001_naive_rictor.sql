ALTER TABLE "materi" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "materi" ADD COLUMN "tag" text;--> statement-breakpoint
ALTER TABLE "materi" ADD COLUMN "featured" boolean DEFAULT false;
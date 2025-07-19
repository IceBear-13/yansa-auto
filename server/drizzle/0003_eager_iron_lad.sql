CREATE TYPE "public"."transmission" AS ENUM('manual', 'automatic');--> statement-breakpoint
ALTER TABLE "cars" ADD COLUMN "transmission" "transmission" NOT NULL;
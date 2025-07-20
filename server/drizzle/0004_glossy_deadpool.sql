ALTER TABLE "transactions" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "paymentMethod" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone_number" varchar(15) DEFAULT '' NOT NULL;
CREATE TYPE "public"."transmission" AS ENUM('manual', 'automatic');--> statement-breakpoint
CREATE TABLE "cars" (
	"registration_number" varchar(20) PRIMARY KEY NOT NULL,
	"manufacturer" varchar(50) NOT NULL,
	"model" varchar(50) NOT NULL,
	"year" integer NOT NULL,
	"color" varchar(20) NOT NULL,
	"mileage" integer NOT NULL,
	"price" integer NOT NULL,
	"fuel_type" varchar(20) NOT NULL,
	"description" varchar(255) NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL,
	"transmission" "transmission" NOT NULL,
	"featured" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" uuid NOT NULL,
	"email" uuid NOT NULL,
	"message" uuid NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL,
	"settled" boolean DEFAULT false NOT NULL,
	"settled_at" date
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"car_registration_number" varchar(20) NOT NULL,
	"amount" integer NOT NULL,
	"transaction_date" date DEFAULT now() NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"paymentMethod" varchar
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL,
	"role" varchar(10) DEFAULT 'user' NOT NULL,
	"total_purchases" integer DEFAULT 0 NOT NULL,
	"phone_number" varchar(15) DEFAULT '' NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_car_registration_number_cars_registration_number_fk" FOREIGN KEY ("car_registration_number") REFERENCES "public"."cars"("registration_number") ON DELETE no action ON UPDATE no action;
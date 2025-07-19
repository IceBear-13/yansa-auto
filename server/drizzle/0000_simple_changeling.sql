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
	"updated_at" date DEFAULT now() NOT NULL
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
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

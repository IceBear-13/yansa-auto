CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"car_registration_number" varchar(20) NOT NULL,
	"amount" integer NOT NULL,
	"transaction_date" date DEFAULT now() NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_car_registration_number_cars_registration_number_fk" FOREIGN KEY ("car_registration_number") REFERENCES "public"."cars"("registration_number") ON DELETE no action ON UPDATE no action;
import { integer, pgTable, varchar, date, uuid } from "drizzle-orm/pg-core";
import { users } from "./user";
import { cars } from "./cars";

export const transactions = pgTable("transactions", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id).notNull(),
    carRegistrationNumber: varchar("car_registration_number", { length: 20 }).notNull().references(() => cars.registrationNumber),
    amount: integer("amount").notNull(),
    transactionDate: date("transaction_date").notNull().defaultNow(),
    status: varchar("status", { length: 20 }).notNull().default('pending'),
    paymentMethod: varchar("paymentMethod"),
});
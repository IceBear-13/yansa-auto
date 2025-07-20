import { integer, pgTable, varchar, date, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").primaryKey(),
    username: varchar("username", { length: 50 }).notNull().unique(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    createdAt: date("created_at").notNull().defaultNow(),
    updatedAt: date("updated_at").notNull().defaultNow(),
    role: varchar("role", { length: 10 }).notNull().default('user'),
    totalPurchases: integer("total_purchases").notNull().default(0),
    phoneNumber: varchar("phone_number", { length: 15 }).notNull().default('')
})
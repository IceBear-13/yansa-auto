import { boolean, varchar, text, timestamp, uuid, pgTable } from "drizzle-orm/pg-core";

export const inquiries = pgTable("inquiries", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    settled: boolean("settled").notNull().default(false),
    settledAt: timestamp("settled_at"),
})
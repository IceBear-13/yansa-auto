import { boolean } from "drizzle-orm/pg-core";
import { date } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const inquiries = pgTable("inquiries", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: uuid("name").notNull(),
    email: uuid("email").notNull(),
    message: uuid("message").notNull(),
    createdAt: date("created_at").notNull().defaultNow(),
    updatedAt: date("updated_at").notNull().defaultNow(),
    settled: boolean("settled").notNull().default(false),
    settledAt: date("settled_at"),
})
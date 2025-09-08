import { integer, pgTable, varchar, date, pgEnum, boolean } from "drizzle-orm/pg-core";

export const transmissionEnum = pgEnum("transmission", ["manual", "automatic"]);

export const cars = pgTable("cars", {
    registrationNumber: varchar("registration_number", { length: 20 }).primaryKey(),
    manufacturer: varchar("manufacturer", { length: 50 }).notNull(),
    model: varchar("model", { length: 50 }).notNull(),
    year: integer("year").notNull(),
    color: varchar("color", { length: 20 }).notNull(),
    mileage: integer("mileage").notNull(),
    price: integer("price").notNull(),
    fuelType: varchar("fuel_type", { length: 20 }).notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    createdAt: date("created_at").notNull().defaultNow(),
    updatedAt: date("updated_at").notNull().defaultNow(),
    transmission: transmissionEnum("transmission").notNull(),
    featured: boolean("featured").notNull().default(false)
});
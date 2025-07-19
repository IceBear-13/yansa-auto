import { drizzle } from "drizzle-orm/node-postgres";
import dotenv from "dotenv";
import * as carSchema from "./schema/cars"
import * as userSchema from "./schema/user";
import * as transactionSchema from "./schema/transaction";
dotenv.config();

const db_url = process.env.DATABASE_URL as string;

export const db = drizzle(db_url);
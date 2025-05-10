import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema.js";
import "dotenv/config";

const connection = await mysql.createConnection({
	uri: process.env.DATABASE_URL as string,
});

export const db = drizzle({
	client: connection,
	schema,
	mode: "default",
});

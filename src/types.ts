import { InferSelectModel } from "drizzle-orm";
import { usersTable } from "./schema.js";

export type User = Omit<InferSelectModel<typeof usersTable>, "password">;
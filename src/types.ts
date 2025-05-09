import type { InferSelectModel } from "drizzle-orm";
import type { usersTable } from "./schema.js";

export type User = Omit<InferSelectModel<typeof usersTable>, "password">;

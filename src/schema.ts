import { relations } from "drizzle-orm";
import {
	bigint,
	mysqlTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
	id: serial().primaryKey(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }).notNull(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp().defaultNow().onUpdateNow(),
});

export const usersRelations = relations(usersTable, ({ one }) => ({
	profile: one(profilesTable, {
		fields: [usersTable.id],
		references: [profilesTable.id],
	}),
}));

export const profilesTable = mysqlTable("profiles", {
	id: serial().primaryKey(),
	userId: bigint({ mode: "number", unsigned: true }).references(
		() => usersTable.id,
	),
	name: varchar({ length: 255 }),
	description: varchar({ length: 500 }),
});

export const profilesRelations = relations(profilesTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [profilesTable.userId],
		references: [usersTable.id],
	}),
}));

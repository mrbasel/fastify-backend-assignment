import { type Static, Type } from "@sinclair/typebox";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import type { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../db.js";
import { profilesTable, usersTable } from "../schema.js";

export const RegisterSchema = Type.Object(
	{
		email: Type.String({ format: "email", maxLength: 255 }),
		password: Type.String({ minLength: 8, maxLength: 255 }),
		name: Type.Optional(Type.String({ maxLength: 255 })),
		description: Type.Optional(Type.String({ maxLength: 500 })),
	},
	{ additionalProperties: false },
);

export type RegisterBody = Static<typeof RegisterSchema>;

export async function register(
	req: FastifyRequest<{ Body: RegisterBody }>,
	res: FastifyReply,
) {
	const hashedPass = await bcrypt.hash(req.body.password, 10);
	req.body.password = hashedPass;
	const result = await db.insert(usersTable).values(req.body).$returningId();
	await db.insert(profilesTable).values({
		userId: result[0].id,
		name: req.body.name,
		description: req.body.description,
	});

	return { message: "registered sucessfully" };
}

export const LoginSchema = Type.Object(
	{
		email: Type.String({ format: "email", maxLength: 255 }),
		password: Type.String({ minLength: 8, maxLength: 255 }),
	},
	{ additionalProperties: false },
);

export type LoginBody = Static<typeof LoginSchema>;

export async function login(
	req: FastifyRequest<{ Body: LoginBody }>,
	res: FastifyReply,
) {
	const user = await db.query.usersTable.findFirst({
		where: eq(usersTable.email, req.body.email),
	});
	if (!user)
		return res.code(401).send({ message: "Invalid email or password." });

	const isMatchingPass = await bcrypt.compare(req.body.password, user.password);
	if (!isMatchingPass)
		return res.code(401).send({ message: "Invalid email or password." });

	const token = await res.jwtSign({ id: user.id });
	return { token };
}

import { eq } from "drizzle-orm";
import type { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../db";
import { profilesTable, usersTable } from "../schema";

export async function getProfile(req: FastifyRequest, res: FastifyReply) {
	try {
		await req.jwtVerify();
	} catch (e) {
		return res.status(400).send();
	}
	const data = await db
		.select()
		.from(profilesTable)
		.innerJoin(usersTable, eq(profilesTable.userId, usersTable.id))
		.where(eq(profilesTable.userId, req.user.id));

	if (!data[0]?.profiles || !data[0]?.users) return res.status(404).send();

	const profile = data[0].profiles;
	const user = data[0].users;

	return {
		username: profile.name,
		email: user.email,
		description: profile.description,
	};
}

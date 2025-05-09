import { eq } from "drizzle-orm";
import type { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../db.js";
import { profilesTable, usersTable } from "../schema.js";

export async function getProfile(req: FastifyRequest, res: FastifyReply) {
	const data = await db.query.profilesTable.findFirst({
		where: eq(profilesTable.userId, req.user.id),
		with: {
			user: true,
		},
	});
	if (!data || !data.user)
		return res.status(404).send({ message: "Profile not found." });

	return {
		id: data.user.id,
		email: data.user.email,
		name: data.name ?? null,
		description: data.description ?? null,
	};
}

import type { FastifyReply, FastifyRequest } from "fastify";

export function getProfile(req: FastifyRequest, res: FastifyReply) {
	return { profile: {} };
}

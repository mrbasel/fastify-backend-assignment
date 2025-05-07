import type { FastifyReply, FastifyRequest } from "fastify";

export function register(req: FastifyRequest, res: FastifyReply) {
	return { msg: "register" };
}

export function login(req: FastifyRequest, res: FastifyReply) {
	return { msg: "login" };
}

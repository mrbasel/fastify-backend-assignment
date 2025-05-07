import Fastify, { type FastifyInstance } from "fastify";

import * as AuthController from "./controllers/AuthController";
import * as ProfileController from "./controllers/ProfileController";

const server: FastifyInstance = Fastify({});

server.post("/register", AuthController.register);
server.post("/login", AuthController.login);
server.get("/profile", ProfileController.getProfile);

export const start = async () => {
	try {
		await server.listen({ port: 3000 });
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

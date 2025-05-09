import FastifyJwt from "@fastify/jwt";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import Fastify from "fastify";

import * as AuthController from "./controllers/AuthController";
import * as ProfileController from "./controllers/ProfileController";

const server = Fastify().withTypeProvider<TypeBoxTypeProvider>();
const port = 3000;

server.register(FastifyJwt, {
	secret: process.env.JWT_SECRET as string,
});

server.post(
	"/register",
	{
		schema: {
			body: AuthController.RegisterSchema,
		},
	},
	AuthController.register,
);

server.post(
	"/login",
	{
		schema: {
			body: Type.Object({
				email: Type.String({ format: "email", maxLength: 255 }),
				password: Type.String({ minLength: 8, maxLength: 255 }),
			}),
		},
	},
	AuthController.login,
);

server.get("/profile", ProfileController.getProfile);

export const start = async () => {
	try {
		await server.listen({ port });
		console.log(`Server listening on port ${port}`);
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

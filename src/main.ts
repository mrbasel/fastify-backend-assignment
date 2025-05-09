import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import Fastify from "fastify";
import FastifyJwt from "@fastify/jwt";

import * as AuthController from "./controllers/AuthController.js";
import * as ProfileController from "./controllers/ProfileController.js";
import { verifyJwt } from "./utils.js";

export const server = Fastify().withTypeProvider<TypeBoxTypeProvider>();

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
      body: AuthController.LoginSchema,
    },
  },
  AuthController.login,
);

server.get("/profile", { preHandler: verifyJwt }, ProfileController.getProfile);
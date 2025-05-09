import { FastifyJwtNamespace } from "@fastify/jwt";
import { User } from "./types";

declare module 'fastify' {
    interface FastifyInstance extends
        FastifyJwtNamespace<{ namespace: 'security' }> { }
}

declare module '@fastify/jwt' {
    interface FastifyJWT {
        user: User
    }
}
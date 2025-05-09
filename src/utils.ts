import { FastifyRequest, FastifyReply } from "fastify";
import { db } from "./db.js";
import { eq } from "drizzle-orm";
import { usersTable } from "./schema.js";

export async function verifyJwt(req: FastifyRequest, res: FastifyReply) {
    try {
        await req.jwtVerify();
    } catch (e) {
        return res.status(401).send({ message: "Invalid token." });
    }

    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, req.user.id),
        columns: { password: false }
    });
    if (user) req.user = user;
}
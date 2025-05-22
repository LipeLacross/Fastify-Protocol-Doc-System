// src/plugins/auth.ts
import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";

export default fp(async function authPlugin(fastify) {
  // Registre o JWT com o secret
  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || "supersecret" // ← Secret obrigatório
  });

  fastify.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ message: "Unauthorized" });
    }
  });
}, {
  name: "auth-plugin",
});

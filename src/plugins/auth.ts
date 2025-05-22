import fp from "fastify-plugin"
import fastifyJwt from "@fastify/jwt"
import { FastifyRequest, FastifyReply } from "fastify"

// Declaração de tipos personalizados para o JWT
declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: string; email: string; role: string }
    user: { id: string; email: string; role: string }
  }

  interface FastifyRequest {
    user: {
      id: string
      email: string
      role: string
    }
  }
}

export default fp(async function authPlugin(fastify) {
  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || "supersecret",
    sign: { expiresIn: "1h" },
    formatUser: (payload) => ({
      id: (payload as any).id,
      email: (payload as any).email,
      role: (payload as any).role
    })
  });

  fastify.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify();
      // Agora request.user já tem os campos id, email, role
    } catch (err) {
      reply.code(401).send({ message: "Não autorizado" });
    }
  });
}, { name: "auth-plugin" });
import { FastifyPluginAsync, FastifyRequest, FastifyReply } from "fastify";
import fastifyJwt from "@fastify/jwt";

export const authPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.register(fastifyJwt, { secret: process.env.JWT_SECRET || "supersecret" });

  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.code(401).send({ message: "Unauthorized" });
      }
    }
  );
};

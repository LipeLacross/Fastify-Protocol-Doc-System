import "@fastify/jwt";
import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }

  interface FastifyRequest {
    jwtVerify: () => Promise<{
      id: string;
      email: string;
      role: string;
    }>;
    user: {
      id: string;
      email: string;
      role: string;
    };
  }
}

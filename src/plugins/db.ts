import { FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";

export const dbPlugin: FastifyPluginAsync = async (fastify) => {
  const prisma = new PrismaClient();

  await prisma.$connect();

  // Tipagem explícita na decoração
fastify.decorate("prisma", prisma);

fastify.addHook("onClose", async () => {
  await fastify.prisma.$disconnect();
});
};

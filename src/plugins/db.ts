// src/plugins/db.ts
import { PrismaClient } from '@prisma/client';
import {FastifyPluginAsync} from "fastify";

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

let prisma: PrismaClient;

export const dbPlugin: FastifyPluginAsync = async (fastify) => {
  if (!prisma) {
    prisma = new PrismaClient();
    await prisma.$connect();
  }

  fastify.decorate('prisma', prisma);

  fastify.addHook('onClose', async () => {
    if (prisma) await prisma.$disconnect();
  });
};

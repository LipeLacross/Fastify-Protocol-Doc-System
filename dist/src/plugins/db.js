"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbPlugin = void 0;
const client_1 = require("@prisma/client");
const dbPlugin = async (fastify) => {
    const prisma = new client_1.PrismaClient();
    await prisma.$connect();
    // Tipagem explícita na decoração
    fastify.decorate("prisma", prisma);
    fastify.addHook("onClose", async () => {
        await fastify.prisma.$disconnect();
    });
};
exports.dbPlugin = dbPlugin;

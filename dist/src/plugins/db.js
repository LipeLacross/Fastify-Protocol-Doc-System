"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbPlugin = void 0;
// src/plugins/db.ts
const client_1 = require("@prisma/client");
const dbPlugin = async (fastify) => {
    const prisma = new client_1.PrismaClient();
    await prisma.$connect();
    fastify.decorate('prisma', prisma);
    fastify.addHook('onClose', async (fastify) => {
        await fastify.prisma.$disconnect();
    });
};
exports.dbPlugin = dbPlugin;

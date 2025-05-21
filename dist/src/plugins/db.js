"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbPlugin = void 0;
const client_1 = require("@prisma/client");
const dbPlugin = async (fastify) => {
    const prisma = new client_1.PrismaClient();
    await prisma.$connect();
    // Tipagem explícita na decoração
    fastify.decorate("prisma", prisma);
    fastify.addHook("onClose", async (instance) => {
        await instance.prisma.$disconnect(); // Agora reconhecido
    });
};
exports.dbPlugin = dbPlugin;

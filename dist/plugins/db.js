"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbPlugin = void 0;
const client_1 = require("@prisma/client");
const dbPlugin = async (fastify) => {
    const prisma = new client_1.PrismaClient();
    // Conecte explicitamente ao banco
    await prisma.$connect();
    // Decore a instância Fastify
    fastify.decorate("prisma", prisma);
    // Hook corrigido (sem parâmetro 'done')
    fastify.addHook("onClose", async (instance) => {
        await instance.prisma.$disconnect();
    });
};
exports.dbPlugin = dbPlugin;

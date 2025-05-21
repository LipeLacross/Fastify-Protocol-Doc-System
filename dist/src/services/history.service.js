"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentHistory = getDocumentHistory;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getDocumentHistory(documentId) {
    return prisma.history.findMany({ where: { documentId }, orderBy: { changedAt: "desc" } });
}

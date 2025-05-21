"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocument = createDocument;
exports.getDocument = getDocument;
exports.updateDocument = updateDocument;
exports.deleteDocument = deleteDocument;
exports.getHistory = getHistory;
exports.getPublicDocuments = getPublicDocuments;
exports.getDocumentByProtocolo = getDocumentByProtocolo;
const client_1 = require("@prisma/client");
const nanoid_1 = require("nanoid");
const prisma = new client_1.PrismaClient();
async function createDocument(data, user, fastify) {
    const protocolo = "DOC-" + new Date().getFullYear() + (0, nanoid_1.nanoid)(5);
    const doc = await fastify.prisma.document.create({
        data: { ...data, protocolo, userId: user.id }
    });
    return doc;
}
async function getDocument(id) {
    return prisma.document.findUnique({ where: { id } });
}
async function updateDocument(id, data, user) {
    const oldDoc = await prisma.document.findUnique({ where: { id } });
    const updated = await prisma.document.update({ where: { id }, data });
    // Salvar histórico
    await prisma.history.create({
        data: {
            documentId: id,
            userId: user.id,
            changes: JSON.stringify(data)
        }
    });
    return updated;
}
async function deleteDocument(id) {
    await prisma.document.delete({ where: { id } });
}
async function getHistory(documentId) {
    return prisma.history.findMany({ where: { documentId } });
}
async function getPublicDocuments(status) {
    return prisma.document.findMany({ where: { status: status || "ativo" } });
}
async function getDocumentByProtocolo(protocolo) {
    return prisma.document.findUnique({ where: { protocolo } });
}

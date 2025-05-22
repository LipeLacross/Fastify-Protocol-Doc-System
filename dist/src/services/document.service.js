"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocument = createDocument;
exports.getDocument = getDocument;
exports.updateDocument = updateDocument;
exports.deleteDocument = deleteDocument;
exports.getHistory = getHistory;
exports.getPublicDocuments = getPublicDocuments;
exports.getDocumentByProtocolo = getDocumentByProtocolo;
const nanoid_1 = require("nanoid");
async function createDocument(data, user, fastify // Receba a instância via parâmetro
) {
    const protocolo = "DOC-" + new Date().getFullYear() + (0, nanoid_1.nanoid)(5);
    const doc = await fastify.prisma.document.create({
        data: {
            ...data,
            protocolo,
            userId: user.id,
            descricao: data.descricao || '',
            arquivo: data.arquivo || ''
        }
    });
    return doc;
}
async function getDocument(id, fastify) {
    return fastify.prisma.document.findUnique({
        where: { id },
        include: { user: { select: { name: true, email: true } } }
    });
}
async function updateDocument(id, data, user, fastify) {
    const updated = await fastify.prisma.document.update({
        where: { id },
        data
    });
    await fastify.prisma.history.create({
        data: {
            documentId: id,
            userId: user.id,
            changes: JSON.stringify(data)
        }
    });
    return updated;
}
async function deleteDocument(id, fastify) {
    await fastify.prisma.document.delete({ where: { id } });
}
async function getHistory(documentId, fastify) {
    return fastify.prisma.history.findMany({
        where: { documentId },
        orderBy: { changedAt: "desc" }
    });
}
async function getPublicDocuments(status, fastify) {
    return fastify.prisma.document.findMany({
        where: { status: status || "ativo" },
        select: {
            protocolo: true,
            titulo: true,
            autor: true,
            createdAt: true,
            status: true
        }
    });
}
async function getDocumentByProtocolo(protocolo, fastify) {
    return fastify.prisma.document.findUnique({
        where: { protocolo },
        include: { histories: { take: 5, orderBy: { changedAt: "desc" } } }
    });
}

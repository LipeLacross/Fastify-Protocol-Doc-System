// src/services/document.service.ts
import { CreateDocumentSchema, UpdateDocumentSchema } from "../schemas/documents.schema";
import { FastifyInstance } from "fastify";
import { nanoid } from "nanoid";
import { Prisma } from "@prisma/client";

export async function createDocument(
  data: CreateDocumentSchema,
  user: any,
  fastify: FastifyInstance // Receba a instância do Fastify
) {
  const protocolo = "DOC-" + new Date().getFullYear() + nanoid(5);

  const doc = await fastify.prisma.document.create({
    data: {
      ...data,
      protocolo,
      userId: user.id,
      descricao: data.descricao || '', // Valor padrão
      arquivo: data.arquivo || ''       // Valor padrão
    }
  });
  return doc;
}


export async function getDocument(id: string, fastify: FastifyInstance) {
  return fastify.prisma.document.findUnique({
    where: { id },
    include: { user: { select: { name: true, email: true } } }
  });
}

export async function updateDocument(
  id: string,
  data: UpdateDocumentSchema,
  user: any,
  fastify: FastifyInstance
) {
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

export async function deleteDocument(id: string, fastify: FastifyInstance) {
  await fastify.prisma.document.delete({ where: { id } });
}

export async function getHistory(documentId: string, fastify: FastifyInstance) {
  return fastify.prisma.history.findMany({
    where: { documentId },
    orderBy: { changedAt: "desc" }
  });
}

export async function getPublicDocuments(
  status: string | undefined,
  fastify: FastifyInstance
) {
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

export async function getDocumentByProtocolo(
  protocolo: string,
  fastify: FastifyInstance
) {
  return fastify.prisma.document.findUnique({
    where: { protocolo },
    include: { histories: { take: 5, orderBy: { changedAt: "desc" } } }
  });
}

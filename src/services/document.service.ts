import { CreateDocumentSchema, UpdateDocumentSchema } from "../schemas/documents.schema";
import { FastifyInstance } from "fastify";
import { nanoid } from "nanoid";

interface PublicDocument {
    id: string;            // ← adicione este campo
  protocolo: string;
  titulo: string;
  autor: string;
  createdAt: string;
  status: string;
}

interface DocumentWithHistory {
  protocolo: string;
  titulo: string;
  descricao?: string;
  autor: string;
  arquivo?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  histories: HistoryEntry[];
}

interface HistoryEntry {
  id: string;
  changedAt: string;
  changes: string;
  user: { name: string };
}

export async function createDocument(
  data: CreateDocumentSchema,
  user: { id: string },
  fastify: FastifyInstance
): Promise<PublicDocument> {
  const protocolo = `DOC-${new Date().getFullYear()}${nanoid(5).toUpperCase()}`;

  const doc = await fastify.prisma.document.create({
    data: {
      ...data,
      protocolo,
      userId: user.id,
      descricao: data.descricao || '',
      arquivo: data.arquivo || ''
    }
  });

  return {
    id: doc.id,
    protocolo: doc.protocolo,
    autor: doc.autor,
    titulo: doc.titulo,
    status: doc.status,
    createdAt: doc.createdAt.toISOString()
  };
}


export async function getDocument(id: string, fastify: FastifyInstance) {
  const doc = await fastify.prisma.document.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } },
      histories: {
        take: 5,
        orderBy: { changedAt: "desc" },
        include: { user: { select: { name: true } } }
      }
    }
  });

  return doc ? {
    ...doc,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
    histories: doc.histories.map(h => ({
      ...h,
      changedAt: h.changedAt.toISOString()
    }))
  } : null;
}

export async function updateDocument(
  id: string,
  data: UpdateDocumentSchema,
  user: { id: string },
  fastify: FastifyInstance
) {
  const oldDoc = await fastify.prisma.document.findUnique({ where: { id } });

  const updated = await fastify.prisma.document.update({
    where: { id },
    data
  });

  if (oldDoc) {
    const changes = Object.keys(data)
      .filter(key => data[key as keyof typeof data] !== oldDoc[key as keyof typeof oldDoc])
      .map(key => `${key}: ${oldDoc[key as keyof typeof oldDoc]} → ${data[key as keyof typeof data]}`)
      .join('\n');


    await fastify.prisma.history.create({
      data: {
        documentId: id,
        userId: user.id,
        changes
      }
    });
  }

  return updated;
}

export async function deleteDocument(id: string, fastify: FastifyInstance) {
  await fastify.prisma.document.delete({ where: { id } });
}

export async function getHistory(documentId: string, fastify: FastifyInstance) {
  const history = await fastify.prisma.history.findMany({
    where: { documentId },
    orderBy: { changedAt: "desc" },
    include: { user: { select: { name: true } } }
  });

  return history.map(h => ({
    ...h,
    changedAt: h.changedAt.toISOString()
  }));
}

export async function getPublicDocuments(
  status: string | undefined,
  fastify: FastifyInstance
) {
  const docs = await fastify.prisma.document.findMany({
    where: { status: status || "ativo" },
    select: {
      protocolo: true,
      titulo: true,
      autor: true,
      createdAt: true,
      status: true
    }
  });

  return docs.map(d => ({
    ...d,
    createdAt: d.createdAt.toISOString()
  }));
}

export async function getDocumentByProtocolo(
  protocolo: string,
  fastify: FastifyInstance
) {
  const doc = await fastify.prisma.document.findUnique({
    where: { protocolo },
    include: {
      histories: {
        take: 5,
        orderBy: { changedAt: "desc" },
        include: { user: { select: { name: true } } }
      }
    }
  });

  return doc ? {
    ...doc,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
    histories: doc.histories.map(h => ({
      ...h,
      changedAt: h.changedAt.toISOString()
    }))
  } : null;
}

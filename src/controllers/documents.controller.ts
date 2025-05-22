import { FastifyRequest, FastifyReply } from "fastify";
import {
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
  getHistory
} from "../services/document.service";
import { CreateDocumentSchema, UpdateDocumentSchema } from "../schemas/documents.schema";

// Interface para parâmetros de rota
interface DocumentParams {
  id: string;
}

// Interface do usuário autenticado
interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
}

export async function createDocumentController(
  request: FastifyRequest<{ Body: CreateDocumentSchema }>,
  reply: FastifyReply
) {
  const user = request.user as AuthenticatedUser;
  const doc = await createDocument(
    request.body,
    { id: user.id },
    request.server.prisma
  );
  reply.code(201).send(doc);
}

export async function getDocumentController(
  request: FastifyRequest<{ Params: DocumentParams }>,
  reply: FastifyReply
) {
  const doc = await getDocument(request.params.id, request.server.prisma);

  if (!doc) {
    return reply.code(404).send({ message: "Documento não encontrado" });
  }

  reply.send(doc);
}

export async function updateDocumentController(
  request: FastifyRequest<{
    Params: DocumentParams;
    Body: UpdateDocumentSchema
  }>,
  reply: FastifyReply
) {
  const user = request.user as AuthenticatedUser;
  const doc = await updateDocument(
    request.params.id,
    request.body,
    { id: user.id },
    request.server.prisma
  );
  reply.send(doc);
}

export async function deleteDocumentController(
  request: FastifyRequest<{ Params: DocumentParams }>,
  reply: FastifyReply
) {
  await deleteDocument(request.params.id, request.server.prisma);
  reply.code(204).send();
}

export async function getHistoryController(
  request: FastifyRequest<{ Params: DocumentParams }>,
  reply: FastifyReply
) {
  const history = await getHistory(request.params.id, request.server.prisma);
  reply.send(history);
}

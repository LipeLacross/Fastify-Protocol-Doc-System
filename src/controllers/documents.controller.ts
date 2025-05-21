import { FastifyRequest, FastifyReply } from "fastify";
import * as docService from "../services/document.service";
import { CreateDocumentSchema, UpdateDocumentSchema } from "../schemas/documents.schema";
// Para:
import {
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
  getHistory
} from "../services/document.service";

export async function createDocumentController(
  request: FastifyRequest<{ Body: CreateDocumentSchema }>,
  reply: FastifyReply
) {
  const doc = await createDocument(
    request.body,
    request.user,
    request.server // Passe a instância do Fastify
  );
  reply.code(201).send(doc);
}


export async function getDocumentController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const doc = await docService.getDocument(request.params.id, request.server);
  reply.send(doc);
}

export async function updateDocumentController(
  request: FastifyRequest<{ Params: { id: string }; Body: UpdateDocumentSchema }>,
  reply: FastifyReply
) {
  const doc = await docService.updateDocument(
    request.params.id,
    request.body,
    request.user,
    request.server // ← Passando a instância do Fastify
  );
  reply.send(doc);
}

export async function deleteDocumentController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  await docService.deleteDocument(request.params.id, request.server);
  reply.code(204).send();
}

export async function getHistoryController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const history = await docService.getHistory(request.params.id, request.server);
  reply.send(history);
}

import { FastifyPluginAsync } from "fastify";
import {
  createDocumentController,
  getDocumentController,
  updateDocumentController,
  deleteDocumentController,
  getHistoryController
} from "../controllers/documents.controller";
import {
  CreateDocumentSchema,
  UpdateDocumentSchema
} from "../schemas/documents.schema";
import { zodToJsonSchema } from "zod-to-json-schema";

const createDocumentJsonSchema = zodToJsonSchema(CreateDocumentSchema);
const updateDocumentJsonSchema = zodToJsonSchema(UpdateDocumentSchema);

interface DocumentParams {
  id: string;
}

const documentsRoutes: FastifyPluginAsync = async (fastify) => {
  // Rota GET pública para verificar se o endpoint funciona
  fastify.get("/", async (request, reply) => {
    reply.send({
      message: "📄 Endpoint de documentos funcionando",
      info: "Use POST para criar documentos (requer autenticação)",
      status: "online"
    });
  });

  // Aplicar autenticação apenas nas rotas que precisam
  fastify.register(async function(fastify) {
    // Hook de autenticação aplicado apenas neste contexto
    fastify.addHook("onRequest", fastify.authenticate);

    // Criação de documento (protegida)
    fastify.post<{ Body: CreateDocumentSchema }>(
      "/",
      {
        schema: {
          body: createDocumentJsonSchema,
          response: {
            201: {
              type: "object",
              properties: {
                protocolo: { type: "string" },
                titulo: { type: "string" },
                id: { type: "string" },
                status: { type: "string" }
              }
            }
          }
        }
      },
      createDocumentController
    );

    // Demais rotas protegidas...
    fastify.get<{ Params: DocumentParams }>("/:id", { /* schema */ }, getDocumentController);
    fastify.put<{ Params: DocumentParams; Body: UpdateDocumentSchema }>("/:id", { /* schema */ }, updateDocumentController);
    fastify.delete<{ Params: DocumentParams }>("/:id", { /* schema */ }, deleteDocumentController);
    fastify.get<{ Params: DocumentParams }>("/:id/history", { /* schema */ }, getHistoryController);
  });
};

export default documentsRoutes;

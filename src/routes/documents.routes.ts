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

// Converter schemas Zod para JSON Schema
const createDocumentJsonSchema = zodToJsonSchema(CreateDocumentSchema);
const updateDocumentJsonSchema = zodToJsonSchema(UpdateDocumentSchema);

// Interface para parâmetros de rota
interface DocumentParams {
  id: string;
}

const documentsRoutes: FastifyPluginAsync = async (fastify) => {
  // Protege todas as rotas com autenticação
  fastify.addHook("onRequest", fastify.authenticate);

  // Criação de documento
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

  // Obter documento por ID
  fastify.get<{ Params: DocumentParams }>(
    "/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" }
          },
          required: ["id"]
        }
      }
    },
    getDocumentController
  );

  // Atualizar documento
  fastify.put<{ Params: DocumentParams; Body: UpdateDocumentSchema }>(
    "/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" }
          },
          required: ["id"]
        },
        body: updateDocumentJsonSchema
      }
    },
    updateDocumentController
  );

  // Excluir documento
  fastify.delete<{ Params: DocumentParams }>(
    "/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" }
          },
          required: ["id"]
        }
      }
    },
    deleteDocumentController
  );

  // Histórico de alterações
  fastify.get<{ Params: DocumentParams }>(
    "/:id/history",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" }
          },
          required: ["id"]
        }
      }
    },
    getHistoryController
  );
};

export default documentsRoutes;

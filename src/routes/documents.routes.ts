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

// Converter schemas Zod para JSON Schema com required explícito
const createDocumentJsonSchema = {
  ...zodToJsonSchema(CreateDocumentSchema),
  required: ["titulo", "autor", "status"]
};

const updateDocumentJsonSchema = zodToJsonSchema(UpdateDocumentSchema);

const documentsRoutes: FastifyPluginAsync = async (fastify) => {
  // Hook de autenticação global
  fastify.addHook("onRequest", fastify.authenticate);

  // Criação de documento
  fastify.post("/", {
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
  }, createDocumentController);

  // Obter documento
  fastify.get("/:id", {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" }
        },
        required: ["id"]
      }
    }
  }, getDocumentController);

  // Atualização de documento
  fastify.put("/:id", {
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
  }, updateDocumentController);

  // Exclusão de documento
  fastify.delete("/:id", {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" }
        },
        required: ["id"]
      }
    }
  }, deleteDocumentController);

  // Histórico de alterações
  fastify.get("/:id/history", {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" }
        },
        required: ["id"]
      }
    }
  }, getHistoryController);
};

export default documentsRoutes;

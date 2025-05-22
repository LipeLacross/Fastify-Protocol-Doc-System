import { getPublicDocuments, getDocumentByProtocolo } from "../services/document.service";

// src/graphql/resolvers.ts
export const resolvers = {
  Query: {
    documents: async (_, { status }, { fastify }) =>
      getPublicDocuments(status, fastify),
    document: async (_, { protocolo }, { fastify }) =>
      getDocumentByProtocolo(protocolo, fastify)
  }
};


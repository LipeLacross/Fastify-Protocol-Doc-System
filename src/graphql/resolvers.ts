import { getPublicDocuments, getDocumentByProtocolo } from "../services/document.service";
import { IResolvers } from "mercurius";

interface QueryArgs {
  status?: string;
}

export const resolvers: IResolvers = {
  Query: {
    documents: async (_, { status }: QueryArgs, { fastify }) =>
      getPublicDocuments(status, fastify),

    document: async (_, { protocolo }: { protocolo: string }, { fastify }) =>
      getDocumentByProtocolo(protocolo, fastify)
  }
};

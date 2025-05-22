import { getPublicDocuments, getDocumentByProtocolo } from "../services/document.service";
import { IResolvers } from "mercurius";

interface QueryArgs {
  status?: string;
}

export const resolvers: IResolvers = {
  Query: {
    documents: async (_, { status }: QueryArgs, { prisma }) =>
      getPublicDocuments(status, prisma), // ← Recebe o Prisma diretamente

    document: async (_, { protocolo }: { protocolo: string }, { prisma }) =>
      getDocumentByProtocolo(protocolo, prisma)
  }
};

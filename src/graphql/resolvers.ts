import { getPublicDocuments, getDocumentByProtocolo } from "../services/document.service";
import { IResolvers } from "mercurius";

interface QueryArgs {
  status?: string;
}

export const resolvers: IResolvers = {
  Query: {
    // Query de teste para verificar se GraphQL funciona
    hello: () => "🚀 GraphQL funcionando perfeitamente! Sistema online.",

    // Status do sistema
    status: () => "Sistema de Protocolo de Documentos - Online ✅",

    // Consultar documentos com tratamento de erro robusto
    documents: async (_, { status }: QueryArgs, { prisma }) => {
      try {
        if (!prisma) {
          return [];
        }
        return await getPublicDocuments(status, prisma);
      } catch (error) {
        console.error('Erro ao buscar documentos:', error);
        return [];
      }
    },

    // Consultar documento específico
    document: async (_, { protocolo }: { protocolo: string }, { prisma }) => {
      try {
        if (!prisma || !protocolo) {
          return null;
        }
        return await getDocumentByProtocolo(protocolo, prisma);
      } catch (error) {
        console.error('Erro ao buscar documento:', error);
        return null;
      }
    }
  }
};

import { getPublicDocuments, getDocumentByProtocolo } from "../services/document.service";

export const resolvers = {
  Query: {
    documents: async (_: any, args: { status?: string }, context: any) =>
      getPublicDocuments(args.status, context.app),
    document: async (_: any, args: { protocolo: string }, context: any) =>
      getDocumentByProtocolo(args.protocolo, context.app)
  }
};

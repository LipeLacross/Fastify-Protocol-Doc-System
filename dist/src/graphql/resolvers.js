"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const document_service_1 = require("../services/document.service");
exports.resolvers = {
    Query: {
        documents: async (_, args, context) => (0, document_service_1.getPublicDocuments)(args.status, context.app),
        document: async (_, args, context) => (0, document_service_1.getDocumentByProtocolo)(args.protocolo, context.app)
    }
};

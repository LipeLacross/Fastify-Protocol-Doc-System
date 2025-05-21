"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const document_service_1 = require("../services/document.service");
exports.resolvers = {
    Query: {
        documents: async (_, args) => (0, document_service_1.getPublicDocuments)(args.status),
        document: async (_, args) => (0, document_service_1.getDocumentByProtocolo)(args.protocolo),
    }
};

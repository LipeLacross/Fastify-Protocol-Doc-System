"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocumentController = createDocumentController;
exports.getDocumentController = getDocumentController;
exports.updateDocumentController = updateDocumentController;
exports.deleteDocumentController = deleteDocumentController;
exports.getHistoryController = getHistoryController;
const docService = __importStar(require("../services/document.service"));
async function createDocumentController(request, reply) {
    const doc = await docService.createDocument(request.body, request.user);
    reply.code(201).send(doc);
}
async function getDocumentController(request, reply) {
    const doc = await docService.getDocument(request.params.id);
    reply.send(doc);
}
async function updateDocumentController(request, reply) {
    const doc = await docService.updateDocument(request.params.id, request.body, request.user);
    reply.send(doc);
}
async function deleteDocumentController(request, reply) {
    await docService.deleteDocument(request.params.id);
    reply.code(204).send();
}
async function getHistoryController(request, reply) {
    const history = await docService.getHistory(request.params.id);
    reply.send(history);
}

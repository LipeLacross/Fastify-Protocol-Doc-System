"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDocumentSchema = exports.CreateDocumentSchema = void 0;
const zod_1 = require("zod");
exports.CreateDocumentSchema = zod_1.z.object({
    titulo: zod_1.z.string(),
    descricao: zod_1.z.string().optional(),
    autor: zod_1.z.string(),
    arquivo: zod_1.z.string().optional(),
    status: zod_1.z.string()
});
exports.UpdateDocumentSchema = zod_1.z.object({
    titulo: zod_1.z.string().optional(),
    descricao: zod_1.z.string().optional(),
    autor: zod_1.z.string().optional(),
    arquivo: zod_1.z.string().optional(),
    status: zod_1.z.string().optional()
});

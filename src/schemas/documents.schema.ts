import { z } from "zod";

export const CreateDocumentSchema = z.object({
  titulo: z.string(),
  descricao: z.string().optional(),
  autor: z.string(),
  arquivo: z.string().optional(),
  status: z.string()
});
export type CreateDocumentSchema = z.infer<typeof CreateDocumentSchema>;

export const UpdateDocumentSchema = z.object({
  titulo: z.string().optional(),
  descricao: z.string().optional(),
  autor: z.string().optional(),
  arquivo: z.string().optional(),
  status: z.string().optional()
});
export type UpdateDocumentSchema = z.infer<typeof UpdateDocumentSchema>;

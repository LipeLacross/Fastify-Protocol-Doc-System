import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getDocumentHistory(documentId: string) {
  return prisma.history.findMany({ where: { documentId }, orderBy: { changedAt: "desc" } });
}

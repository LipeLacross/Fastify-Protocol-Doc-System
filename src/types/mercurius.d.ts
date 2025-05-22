import { MercuriusContext } from "mercurius";
import { PrismaClient } from "@prisma/client";

declare module "mercurius" {
  interface MercuriusContext {
    prisma: PrismaClient;
  }
}

import { MercuriusContext } from "mercurius";
import { FastifyInstance } from "fastify";

declare module "mercurius" {
  interface MercuriusContext {
    fastify: FastifyInstance;
  }
}

import { FastifyPluginAsync } from "fastify";
import mercurius from "mercurius";
import { resolvers } from "../graphql/resolvers";
import fs from "fs";
import path from "path";
import { FastifyInstance } from "fastify";

// src/plugins/graphql.ts
export const graphqlPlugin: FastifyPluginAsync = async (fastify) => {
  const schema = fs.readFileSync(
    path.join(__dirname, "../graphql/schema.gql"),
    "utf8"
  );

  fastify.register(mercurius, {
    schema,
    resolvers,
    graphiql: true,
    context: () => ({
      prisma: fastify.prisma // ← Passe o Prisma diretamente
    })
  });
};


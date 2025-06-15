import { FastifyPluginAsync } from "fastify";
import mercurius from "mercurius";
import { resolvers } from "../graphql/resolvers";
import fs from "fs";
import path from "path";

export const graphqlPlugin: FastifyPluginAsync = async (fastify) => {
  const schema = fs.readFileSync(
    path.join(__dirname, "../graphql/schema.gql"),
    "utf8"
  );

  await fastify.register(mercurius, {
    schema,
    resolvers,
    graphiql: true, // Interface GraphiQL habilitada automaticamente
    path: '/graphql',
    context: () => ({
      prisma: fastify.prisma
    }),
    allowBatchedQueries: true,
    queryDepth: 12,
    subscription: false,
  });
};

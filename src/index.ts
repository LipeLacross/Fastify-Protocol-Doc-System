import Fastify from "fastify";
import authPlugin from "./plugins/auth";
import { dbPlugin } from "./plugins/db";
import { graphqlPlugin } from "./plugins/graphql";
import authRoutes from "./routes/auth.routes";
import documentsRoutes from "./routes/documents.routes";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import path from "path";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import fastifyFavicon from "fastify-favicon";

const app = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  ajv: {
    plugins: [jsonSchemaTransform],
  },
});

// Ordem CORRETA de registro de plugins
async function main() {
  // 1. Banco de dados primeiro
  await app.register(dbPlugin);

  // 2. Outros plugins essenciais
  await app.register(fastifyMultipart);
  await app.register(authPlugin);

  // 3. GraphQL depois de tudo
  await app.register(graphqlPlugin);

  // 4. Favicon
  await app.register(fastifyFavicon, {
    path: path.join(__dirname, "../public"),
    name: "favicon.ico",
  });

  // Rotas
  app.register(authRoutes, { prefix: "/auth" });
  app.register(documentsRoutes, { prefix: "/documents" });

  // Arquivos estáticos
  app.register(fastifyStatic, {
    root: path.join(__dirname, "../uploads"),
    prefix: "/uploads/",
    decorateReply: false,
  });

  // Rota raiz
  app.get("/", async () => ({
    message: "Sistema de Protocolo de Documentos",
    endpoints: {
      auth: "/auth",
      documents: "/documents",
      graphql: "/graphql",
    },
  }));

  // Inicialização
  try {
    await app.listen({
      port: Number(process.env.PORT) || 3000,
      host: process.env.HOST || "0.0.0.0",
    });
    console.log(`🚀 Servidor rodando em ${app.server.address()}`);
  } catch (err) {
    app.log.fatal(err);
    process.exit(1);
  }
}

main();

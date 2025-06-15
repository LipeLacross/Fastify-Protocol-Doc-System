import Fastify from "fastify";
import authPlugin from "./plugins/auth";
import dbPlugin from "./plugins/db";
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
  pluginTimeout: 30000,
});

async function main() {
  try {
    // 1. Banco de dados primeiro
    await app.register(dbPlugin);

    // 2. Multipart e Auth
    await app.register(fastifyMultipart);
    await app.register(authPlugin);

    // 3. GraphQL
    await app.register(graphqlPlugin);

    // 4. Favicon
    await app.register(fastifyFavicon, {
      path: path.join(__dirname, "../public"),
      name: "favicon.ico",
    });

    // 5. Rotas
    await app.register(authRoutes, { prefix: "/auth" });
    await app.register(documentsRoutes, { prefix: "/documents" });

    // 6. Arquivos estáticos (configuração única)
    await app.register(fastifyStatic, {
      root: path.join(__dirname, "../uploads"),
      prefix: "/uploads/",
      decorateReply: false,
      serve: true,
      schemaHide: true,
    });

    // 7. Rotas adicionais
    app.get("/", async () => ({
      message: "🚀 Sistema de Protocolo de Documentos",
      status: "✅ Online",
      endpoints: {
        auth: "/auth (POST /register, POST /login)",
        documents: "/documents (CRUD completo)",
        graphql: "/graphql (Interface GraphiQL)",
        uploads: "/uploads (Arquivos estáticos)"
      },
      graphql_test: "Acesse /graphql no browser para testar queries"
    }));

    app.get("/admin", async () => ({
      message: "🔧 Painel Administrativo",
      info: "Use as rotas /auth e /documents para administração",
      endpoints: {
        register: "POST /auth/register",
        login: "POST /auth/login",
        documents: "GET|POST|PUT|DELETE /documents"
      }
    }));

    app.get("/uploads", async () => ({
      message: "📁 Pasta de uploads",
      info: "Faça upload de arquivos via POST /documents"
    }));

    // 8. Inicializar servidor
    await app.listen({
      port: Number(process.env.PORT) || 3000,
      host: process.env.HOST || "0.0.0.0",
    });

    console.log(`🚀 Servidor rodando em http://localhost:${process.env.PORT || 3000}`);
    console.log(`📊 GraphQL disponível em http://localhost:${process.env.PORT || 3000}/graphql`);
  } catch (err) {
    app.log.fatal(err);
    process.exit(1);
  }
}

main();

// Exportar app para testes
export { app };

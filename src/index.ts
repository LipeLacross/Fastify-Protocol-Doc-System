import Fastify from "fastify";
import { authPlugin } from "./plugins/auth";
import { dbPlugin } from "./plugins/db";
import { graphqlPlugin } from "./plugins/graphql";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import path from "path";

const app = Fastify({
  logger: true // Adicione logger para melhor debugging
});

// Ordem CORRETA de registro de plugins
app.register(dbPlugin);        // 1º - Banco de dados
app.register(authPlugin);      // 2º - Autenticação
app.register(fastifyMultipart); // 3º - Uploads
app.register(fastifyStatic, {   // 4º - Arquivos estáticos
  root: path.join(__dirname, "uploads"),
  prefix: "/uploads/",
  decorateReply: false // Importante para evitar conflitos
});
app.register(graphqlPlugin);    // 5º - GraphQL

// Inicie o servidor corretamente
const start = async () => {
  try {
    await app.listen({
      port: 3000,
      host: "0.0.0.0" // Para acesso externo
    });
    console.log(`Server running at ${app.server.address()}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
export { app }


"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const fastify_1 = __importDefault(require("fastify"));
const auth_1 = require("./plugins/auth");
const db_1 = require("./plugins/db");
const graphql_1 = require("./plugins/graphql");
const multipart_1 = __importDefault(require("@fastify/multipart"));
const static_1 = __importDefault(require("@fastify/static"));
const path_1 = __importDefault(require("path"));
const app = (0, fastify_1.default)({
    logger: true // Adicione logger para melhor debugging
});
exports.app = app;
// Ordem CORRETA de registro de plugins
app.register(db_1.dbPlugin); // 1º - Banco de dados
app.register(auth_1.authPlugin); // 2º - Autenticação
app.register(multipart_1.default); // 3º - Uploads
app.register(static_1.default, {
    root: path_1.default.join(__dirname, "uploads"),
    prefix: "/uploads/",
    decorateReply: false // Importante para evitar conflitos
});
app.register(graphql_1.graphqlPlugin); // 5º - GraphQL
// Inicie o servidor corretamente
const start = async () => {
    try {
        await app.listen({
            port: 3000,
            host: "0.0.0.0" // Para acesso externo
        });
        console.log(`Server running at ${app.server.address()}`);
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();

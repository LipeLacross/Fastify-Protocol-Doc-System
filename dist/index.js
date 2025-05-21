"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const auth_1 = require("./plugins/auth");
const db_1 = require("./plugins/db");
const graphql_1 = require("./plugins/graphql");
const multipart_1 = __importDefault(require("@fastify/multipart"));
const static_1 = __importDefault(require("@fastify/static"));
const path_1 = __importDefault(require("path"));
const app = (0, fastify_1.default)();
app.register(db_1.dbPlugin);
app.register(auth_1.authPlugin);
app.register(multipart_1.default);
app.register(static_1.default, { root: path_1.default.join(__dirname, "uploads"), prefix: "/uploads/" });
app.register(graphql_1.graphqlPlugin);
app.listen({ port: 3000 }, err => {
    if (err)
        throw err;
    console.log("Server running at http://localhost:3000");
});

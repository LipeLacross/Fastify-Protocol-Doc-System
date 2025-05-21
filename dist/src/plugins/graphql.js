"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlPlugin = void 0;
const mercurius_1 = __importDefault(require("mercurius"));
const resolvers_1 = require("../graphql/resolvers");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const graphqlPlugin = async (fastify) => {
    const schema = fs_1.default.readFileSync(path_1.default.join(__dirname, "../graphql/schema.gql"), "utf8");
    fastify.register(mercurius_1.default, {
        schema,
        resolvers: resolvers_1.resolvers,
        graphiql: true,
        context: (request) => ({
            app: request.server
        })
    });
};
exports.graphqlPlugin = graphqlPlugin;

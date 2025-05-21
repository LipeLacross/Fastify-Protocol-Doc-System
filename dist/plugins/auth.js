"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPlugin = void 0;
const jwt_1 = __importDefault(require("@fastify/jwt"));
const authPlugin = async (fastify) => {
    fastify.register(jwt_1.default, { secret: process.env.JWT_SECRET || "supersecret" });
    fastify.decorate("authenticate", async (request, reply) => {
        try {
            await request.jwtVerify();
        }
        catch (err) {
            reply.code(401).send({ message: "Unauthorized" });
        }
    });
};
exports.authPlugin = authPlugin;

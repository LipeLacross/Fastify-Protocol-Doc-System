import { FastifyPluginAsync } from "fastify";
import {
  registerController,
  loginController
} from "../controllers/auth.controller";
import {
  RegisterSchema,
  LoginSchema
} from "../schemas/auth.schema";
import { zodToJsonSchema } from "zod-to-json-schema";

const registerJsonSchema = zodToJsonSchema(RegisterSchema, "RegisterSchema");
const loginJsonSchema = zodToJsonSchema(LoginSchema, "LoginSchema");

const authRoutes: FastifyPluginAsync = async (fastify) => {
  // Rota de registro
  fastify.post("/register", {
    schema: {
      body: registerJsonSchema,
      response: {
        201: {
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string" },
            role: { type: "string" },
            name: { type: "string" }
          }
        }
      }
    }
  }, registerController);

  // Rota de login
  fastify.post("/login", {
    schema: {
      body: loginJsonSchema,
      response: {
        200: {
          type: "object",
          properties: {
            token: { type: "string" }
          }
        }
      }
    }
  }, loginController);

  // Rota GET para verificar se auth está funcionando
  fastify.get("/", async () => ({
    message: "Auth endpoint funcionando",
    endpoints: ["/register", "/login"]
  }));
};

export default authRoutes;

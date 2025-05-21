"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function registerUser(data) {
    const hashed = await bcryptjs_1.default.hash(data.password, 10);
    const user = await prisma.user.create({
        data: { ...data, password: hashed }
    });
    return { id: user.id, email: user.email, role: user.role, name: user.name };
}
async function loginUser(data) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user)
        throw new Error("Invalid credentials");
    const valid = await bcryptjs_1.default.compare(data.password, user.password);
    if (!valid)
        throw new Error("Invalid credentials");
    // Aqui você deve gerar o JWT usando o fastify.jwt.sign no controller
    return user;
}

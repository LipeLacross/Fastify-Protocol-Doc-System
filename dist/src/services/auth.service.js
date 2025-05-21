"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function registerUser(data, fastify) {
    const hashed = await bcryptjs_1.default.hash(data.password, 10);
    const user = await fastify.prisma.user.create({
        data: { ...data, password: hashed }
    });
    return { id: user.id, email: user.email, role: user.role, name: user.name };
}
async function loginUser(data, fastify) {
    const user = await fastify.prisma.user.findUnique({ where: { email: data.email } });
    if (!user)
        throw new Error('Credenciais inválidas');
    const valid = await bcryptjs_1.default.compare(data.password, user.password);
    if (!valid)
        throw new Error('Credenciais inválidas');
    return user;
}

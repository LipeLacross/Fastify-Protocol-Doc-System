"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = registerController;
exports.loginController = loginController;
const auth_service_1 = require("../services/auth.service");
async function registerController(request, reply) {
    const user = await (0, auth_service_1.registerUser)(request.body);
    reply.code(201).send(user);
}
async function loginController(request, reply) {
    const token = await (0, auth_service_1.loginUser)(request.body);
    reply.send({ token });
}

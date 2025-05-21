"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_1 = require("../src/index");
(0, vitest_1.describe)('Auth', () => {
    (0, vitest_1.beforeAll)(async () => {
        await index_1.app.ready(); // Inicializa o servidor
    });
    (0, vitest_1.afterAll)(async () => {
        await index_1.app.close(); // Encerra o servidor
    });
    (0, vitest_1.it)('should register a user', async () => {
        const response = await index_1.app.inject({
            method: 'POST',
            url: '/auth/register',
            payload: {
                email: 'test@example.com',
                password: 'senhaSegura123',
                role: 'user',
                name: 'Test User'
            }
        });
        (0, vitest_1.expect)(response.statusCode).toBe(201);
    });
});

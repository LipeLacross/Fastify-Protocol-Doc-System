"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_1 = require("../src/index");
(0, vitest_1.describe)('Documents', () => {
    (0, vitest_1.beforeAll)(async () => {
        await index_1.app.ready();
    });
    (0, vitest_1.afterAll)(async () => {
        await index_1.app.close();
    });
    (0, vitest_1.it)('should create a document', async () => {
        const response = await index_1.app.inject({
            method: 'POST',
            url: '/documents',
            headers: {
                authorization: `Bearer ${process.env.TEST_TOKEN}`
            },
            payload: {
                titulo: 'Documento Teste',
                autor: 'Autor Teste',
                status: 'ativo'
            }
        });
        (0, vitest_1.expect)(response.statusCode).toBe(201);
    });
});

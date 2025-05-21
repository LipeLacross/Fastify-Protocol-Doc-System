import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '../src/index'

describe('Auth', () => {
  beforeAll(async () => {
    await app.ready() // Inicializa o servidor
  })

  afterAll(async () => {
    await app.close() // Encerra o servidor
  })

  it('should register a user', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        email: 'test@example.com',
        password: 'senhaSegura123',
        role: 'user',
        name: 'Test User'
      }
    })

    expect(response.statusCode).toBe(201)
  })
})

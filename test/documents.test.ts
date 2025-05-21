import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '../src/index'

describe('Documents', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a document', async () => {
    const response = await app.inject({
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
    })

    expect(response.statusCode).toBe(201)
  })
})

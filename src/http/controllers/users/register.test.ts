import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    // é preciso executar para o nosso app estar pronto para receber requisições
    await app.ready()
  })

  afterAll(() => {
    // é preciso fechar a aplicação para liberar a porta
    app.close()
  })

  it('should be able to register a new user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})

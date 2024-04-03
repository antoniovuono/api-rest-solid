import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'

export async function gymsRoutes(app: FastifyInstance) {
  // todas as rotas que forem executadas pra baixo dessa linha serão rotas autenticadas
  app.addHook('onRequest', verifyJWT)
}

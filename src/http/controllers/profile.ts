import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  // garante que a rota não possa ser chamada se o token não existir
  await request.jwtVerify()

  console.log(request.user.sub)

  return reply.status(200).send()
}

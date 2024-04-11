import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({ email, password })

    // generate token with fastify jwt
    const token = await reply.jwtSign(
      // payload: não queremos passar nada
      {
        role: user.role,
      },
      {
        sign: {
          // signature for jwt token
          sub: user.id,
        },
      },
    )

    // generate refresh token
    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        // / - todo backend pode ler esse cookie
        path: '/',
        // secure: define se nosso cookie vai ser encriptado com HTTPs
        secure: true,
        // sameSite: so vai ser acessivel dentro do mesmo dominio (site)
        sameSite: true,
        // significa que o cookie só vai ser acessado pelo back-end e não pode ficar salvo dentro do front-end
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}

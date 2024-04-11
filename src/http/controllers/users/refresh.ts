import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  // onlyCookie: Vai olhar pro cookie pra ver se existe o refresh token e não olha o header
  await request.jwtVerify({ onlyCookie: true })

  const { role } = request.user

  // generate a new token with fastify jwt
  const token = await reply.jwtSign(
    // payload: não queremos passar nada
    {
      role,
    },
    {
      sign: {
        // signature for jwt token
        sub: request.user.sub,
      },
    },
  )

  // generate a new refresh token
  const refreshToken = await reply.jwtSign(
    {
      role,
    },
    {
      sign: {
        sub: request.user.sub,
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
}

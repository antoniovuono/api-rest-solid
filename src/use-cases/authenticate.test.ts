import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should authenticate a user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'jhondoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    expect(() =>
      authenticateUseCase.execute({
        email: 'jhondoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password_hash: await hash('123456', 6),
    })

    expect(
      async () =>
        await authenticateUseCase.execute({
          email: 'jhondoe@example.com',
          password: 'wrong-password',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { AuthenticateUserUseCase } from './authenticate-user'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let authenticateUserUseCase: AuthenticateUserUseCase
let userRepository: InMemoryUserRepository

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)
  })

  it('should authenticate a user', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'jhon@doe.com',
      phone: '41999998888',
      password: await hash('password', 6),
      avatar: null,
    })

    const { user } = await authenticateUserUseCase.execute({
      email: 'jhon@doe.com',
      password: 'password',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not authenticate a user with invalid email', async () => {
    await expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'jhon@doe.com',
        password: 'password',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not authenticate a user with invalid password', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'jhon@doe.com',
      phone: '41999998888',
      password: await hash('password', 6),
      avatar: null,
    })

    await expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'jhon@doe.com',
        password: 'password2',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

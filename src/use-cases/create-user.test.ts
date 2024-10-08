import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { CreateUserUseCase } from './create-user'
import { ResourceAlreadyExists } from './errors/resource-already-exists-error'
import { PasswordSizeError } from './errors/password-size-error'
import { compare } from 'bcryptjs'

let createUserUseCase: CreateUserUseCase
let usersRepository: InMemoryUserRepository

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
  })

  it('should be able create a new user', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'jhon@doe.com',
      phone: '41999998888',
      password: 'password',
      avatar: null,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'jhon@doe.com',
      phone: '41999998888',
      password: 'password',
      avatar: null,
    })

    const passwordIsHashed = await compare('password', user.password)

    expect(passwordIsHashed).toBeTruthy()
  })

  it('should not be able create a new user with an already registered email', async () => {
    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'jhon@doe.com',
      phone: '41999998888',
      password: 'password',
      avatar: null,
    })

    await expect(async () => {
      await createUserUseCase.execute({
        name: 'John Doe',
        email: 'jhon@doe.com',
        phone: '41999998888',
        password: 'password',
        avatar: null,
      })
    }).rejects.toBeInstanceOf(ResourceAlreadyExists)
  })

  it('should not be able create a new user with an already registered phone', async () => {
    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'jhon@doe.com',
      phone: '41999998888',
      password: 'password',
      avatar: null,
    })

    await expect(async () => {
      await createUserUseCase.execute({
        name: 'John Doe',
        email: 'jhon2@doe.com',
        phone: '41999998888',
        password: 'password',
        avatar: null,
      })
    }).rejects.toBeInstanceOf(ResourceAlreadyExists)
  })

  it('should not be able create a new user with a password less than 8 characters', async () => {
    await expect(async () => {
      await createUserUseCase.execute({
        name: 'John Doe',
        email: 'jhon@doe.com',
        phone: '41999998888',
        password: '1234',
        avatar: null,
      })
    }).rejects.toBeInstanceOf(PasswordSizeError)
  })
})

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'

let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
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

  it.todo(
    'should not be able create a new user with an already registered email',
  )

  it.todo(
    'should not be able create a new user with an already registered phone',
  )

  it.todo(
    'should not be able create a new user with a password less than 8 characters',
  )
})

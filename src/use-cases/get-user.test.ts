import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { GetUserUseCase } from './get-user'
import { ResourceNotFound } from './errors/resource-not-found'

let getUserUseCase: GetUserUseCase
let userRepository: InMemoryUserRepository

describe('Get User Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    getUserUseCase = new GetUserUseCase(userRepository)
  })

  it('should be able to get a user', async () => {
    const { id } = await userRepository.create({
      name: 'John Doe',
      email: 'jhon@doe.com',
      phone: '41999998888',
      password: 'password',
      avatar: null,
    })

    const { user } = await getUserUseCase.execute({
      userId: id,
    })

    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'John Doe',
        email: 'jhon@doe.com',
        phone: '41999998888',
        password: 'password',
        avatar: null,
      }),
    )
  })

  it('should not be able to get a non-existent user', async () => {
    await expect(async () => {
      await getUserUseCase.execute({
        userId: 'non-existent-user-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})

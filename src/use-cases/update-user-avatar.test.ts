import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { UpdateUserAvatarUseCase } from './update-user-avatar'
import { hash } from 'bcryptjs'

import { ResourceNotFound } from './errors/resource-not-found'
import { EmptyFieldError } from './errors/empty-field-error'

let usersRepository: InMemoryUserRepository
let updateUserAvatarUseCase: UpdateUserAvatarUseCase

describe('Update User Avatar Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    updateUserAvatarUseCase = new UpdateUserAvatarUseCase(usersRepository)
  })

  it('should not be able to update user avatar with invalid user id', async () => {
    await expect(async () => {
      await updateUserAvatarUseCase.execute({
        userId: 'invalid-id',
        file: undefined,
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it('should not be able to update user avatar with invalid user id', async () => {
    const { id } = await usersRepository.create({
      name: 'John Doe',
      email: 'jhon@doe.com',
      phone: '41999998888',
      password: await hash('password', 6),
      avatar: null,
    })

    await expect(async () => {
      await updateUserAvatarUseCase.execute({
        userId: id,
        file: undefined,
      })
    }).rejects.toBeInstanceOf(EmptyFieldError)
  })
})

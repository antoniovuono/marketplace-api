import { UserRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'

interface GetUserUseCaseRequest {
  userId: string
}

interface GetUserUseCaseResponse {
  user: User
}

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) throw new ResourceNotFound('User')

    return { user }
  }
}

import { User } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repository'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  phone: string
  password: string
  avatar: string | null
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    name,
    email,
    phone,
    password,
    avatar
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const user = await this.userRepository.create({
      name,
      email,
      phone,
      password,
      avatar
    })

    return { user }
  }
}

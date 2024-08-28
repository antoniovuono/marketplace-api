import { UserRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'
import { MultipartFile } from '@fastify/multipart'
import { EmptyFieldError } from './errors/empty-field-error'
import { DiskStorage } from '@/utils/storage/DiskStorage'

interface UpdateUserAvatarUseCaseRequest {
  userId: string
  file: MultipartFile | undefined
}

interface UpdateUserAvatarUseCaseResponse {
  user: User
}

export class UpdateUserAvatarUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    userId,
    file,
  }: UpdateUserAvatarUseCaseRequest): Promise<UpdateUserAvatarUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new ResourceNotFound('User')
    if (!file || !file.filename) throw new EmptyFieldError()

    const upload = new DiskStorage(file, 'avatar')
    const filePath = upload.save()

    if (user.avatar) {
      upload.delete(user.avatar)
    }

    const updatedUser = await this.usersRepository.updateAvatar(
      filePath,
      userId,
    )

    return { user: updatedUser }
  }
}

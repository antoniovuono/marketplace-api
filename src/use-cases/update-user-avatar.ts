import { UserRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'
import { MultipartFile } from '@fastify/multipart'
import path from 'path'
import fs from 'fs'
import { EmptyFieldError } from './errors/empty-field-error'

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

    const uploadPath = path.resolve(__dirname, '../../tmp/avatar')

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }

    const filePath = path.join(uploadPath, file.filename)

    const writeStream = fs.createWriteStream(filePath)
    file.file.pipe(writeStream)

    if (user.avatar) {
      fs.unlinkSync(user.avatar)
    }

    const updatedUser = await this.usersRepository.updateAvatar(
      filePath,
      userId,
    )

    return { user: updatedUser }
  }
}

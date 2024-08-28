import { EmptyFieldError } from '@/use-cases/errors/empty-field-error'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { makeUpdateUserAvatarUseCase } from '@/use-cases/factories/make-update-user-avatar-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function updateAvatar(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const file = await request.file()

    const updateAvatarUserUseCase = makeUpdateUserAvatarUseCase()

    await updateAvatarUserUseCase.execute({
      file,
      userId: request.user.sub,
    })

    return reply.status(200).send({ message: 'Avatar updated' })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof EmptyFieldError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}

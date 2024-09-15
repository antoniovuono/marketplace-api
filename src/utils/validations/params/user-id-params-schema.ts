import { z } from 'zod'

export const userIdParamsSchema = z.object({
  userId: z
    .string({
      required_error: 'User ID is required',
      invalid_type_error: 'User ID must be a string',
    })
    .uuid({
      message: 'Invalid User ID',
    }),
})

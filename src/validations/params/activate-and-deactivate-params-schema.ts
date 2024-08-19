import { z } from 'zod'

export const activateAndDeactivateParamsSchema = z.object({
  saleId: z
    .string({
      required_error: 'Sale ID is required',
      invalid_type_error: 'Sale ID must be a string',
    })
    .uuid({
      message: 'Invalid Sale ID',
    }),
})

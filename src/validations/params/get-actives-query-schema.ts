import { z } from 'zod'

export const getActivesQuerySchema = z.object({
  page: z.coerce.number().int().positive(),
})

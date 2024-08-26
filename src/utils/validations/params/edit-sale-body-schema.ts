import { z } from 'zod'

export const editSaleBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  condition: z.enum(['NOVO', 'USADO']).optional(),
  price: z.number().optional(),
  acceptSwap: z.boolean().optional(),
  paymentMethod: z
    .array(z.enum(['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO']))
    .optional(),
})

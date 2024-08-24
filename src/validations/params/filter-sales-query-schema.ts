import { z } from 'zod'

export const filterSalesQuerySchema = z.object({
  page: z.coerce.number().int().positive(),
  condition: z.enum(['NOVO', 'USADO']).optional(),
  paymentMethods: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        return val.split(',')
      }
      return val
    },
    z.array(z.enum(['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO'])),
  ),
  acceptSwap: z
    .string()
    .transform((value) => value === 'true')
    .optional(),
})

import { z } from 'zod'

export const createSaleBodySchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
  description: z.string({ required_error: 'Description is required' }),
  condition: z.enum(['NOVO', 'USADO'], {
    required_error: 'Condition is required',
  }),
  price: z.number({ required_error: 'Price is required' }),
  acceptSwap: z.boolean({ required_error: 'Accept swap is required' }),
  paymentMethod: z.array(
    z.enum(['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO']),
  ),
})

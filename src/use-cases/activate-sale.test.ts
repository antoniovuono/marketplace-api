import { InMemorySaleRepository } from '@/repositories/in-memory/in-memory-sale-repository'
import { ActivateSaleUseCase } from './activate-sale'
import { ResourceNotFound } from './errors/resource-not-found'

let activateSaleUseCase: ActivateSaleUseCase
let salesRepository: InMemorySaleRepository

describe('Activate Sale Use Case', () => {
  beforeEach(() => {
    salesRepository = new InMemorySaleRepository()
    activateSaleUseCase = new ActivateSaleUseCase(salesRepository)
  })

  it('should be able to activate a sale', async () => {
    const { id: saleId } = await salesRepository.create({
      title: 'Title',
      description: 'Description',
      condition: 'NOVO',
      price: 100,
      accept_swap: false,
      is_active: false,
      payment_methods: ['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO'],
      user_id: '1',
    })

    const { sale } = await activateSaleUseCase.execute({
      saleId,
    })

    expect(sale.is_active).toBe(true)
  })
  it('should not be able to activate a non-existent sale', async () => {
    await expect(async () => {
      await activateSaleUseCase.execute({
        saleId: 'non-existent-sale-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})

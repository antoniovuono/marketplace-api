import { InMemorySaleRepository } from '@/repositories/in-memory/in-memory-sale-repository'
import { ResourceNotFound } from './errors/resource-not-found'
import { DeactivateSaleUseCase } from './deactivate'

let deactivateSaleUseCase: DeactivateSaleUseCase
let salesRepository: InMemorySaleRepository

describe('Activate Sale Use Case', () => {
  beforeEach(() => {
    salesRepository = new InMemorySaleRepository()
    deactivateSaleUseCase = new DeactivateSaleUseCase(salesRepository)
  })

  it('should be able to deactivate a sale', async () => {
    const { id: saleId } = await salesRepository.create({
      title: 'Title',
      description: 'Description',
      condition: 'NOVO',
      price: 100,
      accept_swap: false,
      payment_methods: ['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO'],
      user_id: '1',
    })

    const { sale } = await deactivateSaleUseCase.execute({
      saleId,
    })

    expect(sale.is_active).toBe(false)
  })
  it('should not be able to activate a non-existent sale', async () => {
    await expect(async () => {
      await deactivateSaleUseCase.execute({
        saleId: 'non-existent-sale-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})

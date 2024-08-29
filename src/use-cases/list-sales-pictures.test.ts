import { InMemorySalePhotosRepository } from '@/repositories/in-memory/in-memory-sale-photos-repository'
import { ListSalesPicturesUseCase } from './list-sales-pictures'

let salesPhotosRepository: InMemorySalePhotosRepository
let listSalesPictureUseCase: ListSalesPicturesUseCase

describe('List Sales Pictures Use Case', () => {
  beforeEach(() => {
    salesPhotosRepository = new InMemorySalePhotosRepository()
    listSalesPictureUseCase = new ListSalesPicturesUseCase(
      salesPhotosRepository,
    )
  })

  it('should return a list of photos from unique sale', async () => {
    await salesPhotosRepository.addPhotos([
      {
        user_id: '1',
        sale_id: '1',
        url: 'photo1',
      },
      {
        user_id: '1',
        sale_id: '1',
        url: 'photo2',
      },
    ])

    const { photos } = await listSalesPictureUseCase.execute({ saleId: '1' })

    expect(photos).toHaveLength(2)
  })
})

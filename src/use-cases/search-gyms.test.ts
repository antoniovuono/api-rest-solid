import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let gymRepository: InMemoryGymRepository
let searchGymUseCase: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    searchGymUseCase = new SearchGymsUseCase(gymRepository)
  })

  it('should be able to search for gyms', async () => {
    for (let i = 0; i <= 1; i++) {
      await gymRepository.create({
        title: `Gym Example ${i}`,
        description: null,
        phone: null,
        latitude: -15.7972663,
        longitude: -47.8967661,
      })
    }

    const { gyms } = await searchGymUseCase.execute({
      page: 1,
      query: 'Gym Example 1',
    })

    expect(gyms.length).toEqual(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Gym Example 1',
      }),
    ])
  })

  it('should be able to fetch gym paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `Gym Example ${i}`,
        description: null,
        phone: null,
        latitude: -15.7972663,
        longitude: -47.8967661,
      })
    }

    const { gyms } = await searchGymUseCase.execute({
      query: 'Gym Example',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym Example 21' }),
      expect.objectContaining({ title: 'Gym Example 22' }),
    ])
  })
})

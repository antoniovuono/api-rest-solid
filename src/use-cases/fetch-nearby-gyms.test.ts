import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymRepository
let fetchNearbyUseCase: FetchNearbyUseCase

describe('Fetch Nearby Gyms', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository()
    fetchNearbyUseCase = new FetchNearbyUseCase(gymsRepository)
  })

  it('should return nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -23.5742356,
      longitude: -46.6834484,
    })

    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -15.7972663,
      longitude: -47.8967661,
    })

    const { gyms } = await fetchNearbyUseCase.execute({
      userLatitude: -15.7972663,
      userLongitude: -47.8967661,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})

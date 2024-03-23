import { describe, expect, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymRepository: InMemoryGymRepository
let createGymUseCase: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    createGymUseCase = new CreateGymUseCase(gymRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await createGymUseCase.execute({
      title: 'Gym Example',
      description: null,
      phone: null,
      latitude: -15.7972663,
      longitude: -47.8967661,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-errors'

let checkInsRepository: InMemoryCheckInsRepository
let gymRepository: InMemoryGymRepository
let checkInUseCase: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymRepository = new InMemoryGymRepository()
    checkInUseCase = new CheckInUseCase(checkInsRepository, gymRepository)

    await gymRepository.create({
      id: 'gym-id',
      title: 'Gym example',
      description: 'Description gym example',
      phone: '',
      latitude: -15.7972663,
      longitude: -47.8967661,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -15.7972663,
      userLongitude: -47.8967661,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2021, 0, 20, 8, 0, 0))

    await checkInUseCase.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -15.7972663,
      userLongitude: -47.8967661,
    })

    await expect(() =>
      checkInUseCase.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: -15.7972663,
        userLongitude: -47.8967661,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2021, 0, 20, 8, 0, 0))

    await checkInUseCase.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -15.7972663,
      userLongitude: -47.8967661,
    })

    vi.setSystemTime(new Date(2021, 0, 21, 8, 0, 0))

    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -15.7972663,
      userLongitude: -47.8967661,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymRepository.items.push({
      id: 'gym-id',
      title: 'Gym example',
      description: 'Description gym example',
      phone: '',
      latitude: new Decimal(23.5639556),
      longitude: new Decimal(-46.6261866),
    })

    await expect(() =>
      checkInUseCase.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: -23.9318036,
        userLongitude: -48.1751487,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})

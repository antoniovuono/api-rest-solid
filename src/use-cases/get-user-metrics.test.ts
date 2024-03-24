import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let getUserMetricsUseCase: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    for (let i = 0; i <= 2; i++) {
      await checkInsRepository.create({
        gym_id: `gym-id-${i}`,
        user_id: 'user-id-1',
      })
    }

    const { checkInsCount } = await getUserMetricsUseCase.execute({
      userId: 'user-id-1',
    })

    expect(checkInsCount).toBe(3)
  })
})

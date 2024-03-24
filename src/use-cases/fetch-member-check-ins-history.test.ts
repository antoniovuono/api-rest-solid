import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from './fetch-member-check-ins-history'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInsRepository: InMemoryCheckInsRepository
let fetchMemberCheckInsHistoryUseCase: FetchUserCheckInsHistoryUseCase

describe('Fetch Member Check Ins History Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    fetchMemberCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(
      checkInsRepository,
    )
  })

  it("should be able to fetch a member's check ins history", async () => {
    await checkInsRepository.create({
      gym_id: 'gym-id-1',
      user_id: 'user-id',
    })

    await checkInsRepository.create({
      gym_id: 'gym-id-2',
      user_id: 'user-id',
    })

    const { checkIns } = await fetchMemberCheckInsHistoryUseCase.execute({
      userId: 'user-id',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id-1' }),
      expect.objectContaining({ gym_id: 'gym-id-2' }),
    ])
  })

  it("should be able to fetch paginated member's check ins history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-id-${i}`,
        user_id: 'user-id',
      })
    }

    const { checkIns } = await fetchMemberCheckInsHistoryUseCase.execute({
      userId: 'user-id',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id-21' }),
      expect.objectContaining({ gym_id: 'gym-id-22' }),
    ])
  })
})

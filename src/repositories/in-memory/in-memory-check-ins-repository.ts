import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)

      const checkInIsOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && checkInIsOnSameDate
    })

    if (!checkOnSameDate) {
      return null
    }

    return checkOnSameDate
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)
    // Slice: retorna os indices exemplo: slice(0, 20) retorna os 20 primeiros elementos
  }

  async countByUserId(userId: string) {
    return this.items.filter((checkIn) => checkIn.user_id === userId).length
  }
}

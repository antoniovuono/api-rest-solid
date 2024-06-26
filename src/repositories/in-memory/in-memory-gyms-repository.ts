import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordenates'
import { FindManyNearbyParams, GymRepository } from '../gym-repository'
import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }

  async findById(id: string) {
    const gym = this.items.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearby(data: FindManyNearbyParams) {
    return this.items.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: data.latitude, longitude: data.longitude },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }
}

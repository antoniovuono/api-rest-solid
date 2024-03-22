import { GymRepository } from '../gym-repositories'
import { Gym } from '@prisma/client'

export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}

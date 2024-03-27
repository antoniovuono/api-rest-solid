import { PrismaGymRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsUseCase } from '../search-gyms'

export function makeSearchGymsUseCase() {
  const gymRepository = new PrismaGymRepository()
  const searchGymsUseCase = new SearchGymsUseCase(gymRepository)

  return searchGymsUseCase
}

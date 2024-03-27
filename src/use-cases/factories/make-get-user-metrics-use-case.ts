import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)
  return getUserMetricsUseCase
}

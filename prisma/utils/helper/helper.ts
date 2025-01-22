import { PrismaClient } from '@prisma/client'

export const create = async (count = 10, callback: (prisma: PrismaClient) => void) => {
  const prisma = new PrismaClient()
  for (let i = 0; i < count; i++) {
    callback(prisma)
  }
}

import { PrismaClient } from '@prisma/client'
import { create } from '../../helper/helper'
import { Random } from 'mockjs'
import { hash } from 'argon2'

export const userSeed = () => {
  create(30, async (prisma: PrismaClient) => {
    await prisma.user.create({
      data: {
        name: Random.string(5, 12),
        password: await hash(Random.string(6, 15)),
        email: Random.email(),
      },
    })
  })
}

console.log('DATABASE_URL from env:', process.env.DATABASE_URL)
console.log('Node environment:', process.env.NODE_ENV)

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Check the connection info
console.log('Prisma datasource config:', (prisma as any)._engine._datamodel)

async function test() {
  try {
    const count = await prisma.profile.count()
    console.log('Profile count:', count)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

test()
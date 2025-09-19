import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testClient() {
  console.log('Available Prisma client methods:', Object.keys(prisma).filter(key => !key.startsWith('$')))
  
  // Test the actual method names
  console.log('Has careerHighlight?', 'careerHighlight' in prisma)
  console.log('Has CareerHighlight?', 'CareerHighlight' in prisma) 
  console.log('Has career_highlight?', 'career_highlight' in prisma)
  
  await prisma.$disconnect()
}

testClient().catch(console.error)
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function checkNames() {
  const names = ['Austin', 'Hogan', 'Undertaker', 'Michaels', 'Triple H', 'John Cena']
  
  for (const name of names) {
    const profiles = await prisma.profile.findMany({
      where: {
        name: {
          contains: name
        }
      },
      select: {
        name: true,
        slug: true
      }
    })
    console.log(`${name}:`, profiles)
  }
  
  await prisma.$disconnect()
}

checkNames()
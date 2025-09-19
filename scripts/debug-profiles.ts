import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function debugProfiles() {
  const profiles = await prisma.profile.findMany({
    select: {
      name: true,
      slug: true
    }
  })
  
  console.log('Total profiles:', profiles.length)
  
  console.log('\nAll profiles:')
  profiles.forEach(p => console.log(`${p.name} | ${p.slug}`))
  
  await prisma.$disconnect()
}

debugProfiles()
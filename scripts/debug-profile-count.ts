import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function debugProfileCount() {
  try {
    console.log('Testing Prisma profile queries...')
    
    // Simple count
    const count = await prisma.profile.count()
    console.log(`Total profiles count: ${count}`)
    
    // Full query similar to API
    const profiles = await prisma.profile.findMany({
      select: {
        id: true,
        slug: true,
        name: true,
        type: true,
        debut: true,
        retired: true
      }
    })
    console.log(`Profiles with findMany: ${profiles.length}`)
    
    // Check if there are any conditions that might be limiting results
    const allProfiles = await prisma.profile.findMany()
    console.log(`All profiles (no select): ${allProfiles.length}`)
    
    // Check first few profiles
    console.log('\nFirst 5 profiles:')
    profiles.slice(0, 5).forEach(p => {
      console.log(`- ${p.name} (${p.slug})`)
    })
    
    console.log('\nQuery completed successfully!')
    
  } catch (error) {
    console.error('Error querying profiles:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debugProfileCount()
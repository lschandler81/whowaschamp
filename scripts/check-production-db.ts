// Script to check production database status
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkProductionData() {
  try {
    console.log('🔍 Checking production database...\n');
    console.log(`🗂️  Database URL: ${process.env.DATABASE_URL?.substring(0, 20)}...`);
    
    // Check basic counts
    const profilesCount = await prisma.profile.count();
    console.log(`👥 Total profiles: ${profilesCount}`);
    
    try {
      const rivalriesCount = await prisma.rivalry.count();
      console.log(`📊 Total rivalries: ${rivalriesCount}`);
    } catch (error) {
      console.log('❌ Rivalry table does not exist or cannot be accessed');
    }
    
    try {
      const highlightsCount = await prisma.careerHighlight.count();
      console.log(`✨ Total career highlights: ${highlightsCount}`);
    } catch (error) {
      console.log('❌ CareerHighlight table does not exist or cannot be accessed');
    }
    
    // Check if John Cena exists
    const johnCena = await prisma.profile.findUnique({
      where: { slug: 'john-cena' }
    });
    
    if (johnCena) {
      console.log(`\n🎯 John Cena profile found: ${johnCena.name}`);
      
      // Try to get rivalries for John Cena using raw SQL
      try {
        const rivalries = await prisma.$queryRaw`
          SELECT COUNT(*) as count FROM rivalries 
          WHERE wrestler1Id = ${johnCena.id} OR wrestler2Id = ${johnCena.id}
        ` as any[];
        console.log(`   - Total rivalries: ${rivalries[0]?.count || 0}`);
      } catch (error) {
        console.log('   - Could not query rivalries (table may not exist)');
      }
      
      try {
        const highlights = await prisma.$queryRaw`
          SELECT COUNT(*) as count FROM career_highlights 
          WHERE profileId = ${johnCena.id}
        ` as any[];
        console.log(`   - Career highlights: ${highlights[0]?.count || 0}`);
      } catch (error) {
        console.log('   - Could not query career highlights (table may not exist)');
      }
    } else {
      console.log('❌ John Cena profile not found');
    }
    
  } catch (error) {
    console.error('❌ Error checking production data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkProductionData();
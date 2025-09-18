import { PrismaClient } from '@prisma/client';
import { importAllWrestlers } from './import-all-wrestlers';
import { importWomensWrestlers } from './import-womens-wrestlers';
import { importTagTeamSpecialists } from './import-tag-teams';

const prisma = new PrismaClient();

async function importCompleteWrestlingDatabase() {
  console.log('🚀 Starting complete wrestling database import...\n');
  console.log('This will import 100+ wrestling profiles across multiple categories:\n');
  console.log('• 50+ Male Wrestling Champions (WWE/WCW Legends)');
  console.log('• 10+ Women\'s Wrestling Champions');
  console.log('• 10+ Tag Team Specialists\n');
  
  const startTime = Date.now();
  let totalProfiles = 0;
  let totalChampionships = 0;

  try {
    // 1. Import main male wrestlers
    console.log('═══════════════════════════════════════');
    console.log('🥇 PHASE 1: IMPORTING MALE CHAMPIONS');
    console.log('═══════════════════════════════════════\n');
    
    await importAllWrestlers();
    
    // Count profiles after first import
    const maleCount = await prisma.profile.count({ where: { type: 'wrestler' } });
    const maleChampionships = await prisma.championship.count();
    
    console.log(`\n✅ Phase 1 Complete: ${maleCount} profiles imported`);
    totalProfiles += maleCount;
    totalChampionships += maleChampionships;

    // 2. Import women wrestlers
    console.log('\n═══════════════════════════════════════');
    console.log('👩 PHASE 2: IMPORTING WOMEN CHAMPIONS');
    console.log('═══════════════════════════════════════\n');
    
    await importWomensWrestlers();
    
    // Count total profiles after second import
    const totalAfterWomen = await prisma.profile.count({ where: { type: 'wrestler' } });
    const womenCount = totalAfterWomen - maleCount;
    const totalChampionshipsAfterWomen = await prisma.championship.count();
    const womenChampionships = totalChampionshipsAfterWomen - maleChampionships;
    
    console.log(`\n✅ Phase 2 Complete: ${womenCount} women profiles imported`);
    totalProfiles = totalAfterWomen;
    totalChampionships = totalChampionshipsAfterWomen;

    // 3. Import tag teams
    console.log('\n═══════════════════════════════════════');
    console.log('👥 PHASE 3: IMPORTING TAG TEAM SPECIALISTS');
    console.log('═══════════════════════════════════════\n');
    
    await importTagTeamSpecialists();
    
    // Final count
    const finalProfileCount = await prisma.profile.count({ where: { type: 'wrestler' } });
    const tagTeamCount = finalProfileCount - totalProfiles;
    const finalChampionshipCount = await prisma.championship.count();
    const tagTeamChampionships = finalChampionshipCount - totalChampionships;
    
    console.log(`\n✅ Phase 3 Complete: ${tagTeamCount} tag team profiles imported`);
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    // Final summary
    console.log('\n' + '='.repeat(60));
    console.log('🎊 COMPLETE WRESTLING DATABASE IMPORT FINISHED! 🎊');
    console.log('='.repeat(60));
    console.log(`⏱️  Total Import Time: ${duration} seconds`);
    console.log(`👨 Male Champions: ${maleCount} profiles`);
    console.log(`👩 Women Champions: ${womenCount} profiles`);
    console.log(`👥 Tag Team Specialists: ${tagTeamCount} profiles`);
    console.log(`📊 TOTAL PROFILES: ${finalProfileCount} wrestling legends`);
    console.log(`🏆 TOTAL CHAMPIONSHIPS: ${finalChampionshipCount} title reigns`);
    
    // Get breakdown by era
    const eraBreakdown = await prisma.wrestlerProfile.groupBy({
      by: ['era'],
      _count: {
        era: true
      },
      orderBy: {
        _count: {
          era: 'desc'
        }
      }
    });

    console.log('\n📈 BREAKDOWN BY ERA:');
    eraBreakdown.forEach(era => {
      console.log(`   ${era.era}: ${era._count.era} wrestlers`);
    });

    // Get breakdown by promotion
    const promotionBreakdown = await prisma.profilePromotion.groupBy({
      by: ['promotionId'],
      _count: {
        promotionId: true
      },
      orderBy: {
        _count: {
          promotionId: 'desc'
        }
      },
      take: 5
    });

    console.log('\n🏢 TOP PROMOTIONS:');
    for (const promo of promotionBreakdown) {
      const promotion = await prisma.promotion.findUnique({ 
        where: { id: promo.promotionId } 
      });
      if (promotion) {
        console.log(`   ${promotion.name}: ${promo._count.promotionId} wrestlers`);
      }
    }

    console.log('\n🌟 Your wrestling database is now complete with over 100 legendary profiles!');
    console.log('   Ready to power your "Who Was Champ?" application with real wrestling history.');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('\n❌ Error during complete import:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  importCompleteWrestlingDatabase().catch(console.error);
}

export { importCompleteWrestlingDatabase };
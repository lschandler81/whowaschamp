import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function exportProfilesToJson() {
  try {
    console.log('Exporting all profiles to JSON...');
    
    const profiles = await prisma.profile.findMany({
      include: {
        wrestler: true,
        fighter: {
          include: {
            divisions: true
          }
        },
        promotions: {
          include: {
            promotion: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    console.log(`Found ${profiles.length} profiles to export`);

    // Transform the data to match our Profile types
    const transformedProfiles = profiles.map(dbProfile => {
      const baseProfile = {
        id: dbProfile.id,
        slug: dbProfile.slug,
        name: dbProfile.name,
        nickname: dbProfile.nickname,
        type: dbProfile.type as 'wrestler' | 'fighter',
        thumbnail: dbProfile.thumbnail,
        tagline: dbProfile.tagline,
        promotions: dbProfile.promotions?.map((p: any) => p.promotion.name) || [],
        activeYears: {
          start: dbProfile.debut ? new Date(dbProfile.debut).getFullYear() : 1980,
          end: dbProfile.retired ? new Date(dbProfile.retired).getFullYear() : undefined
        },
        hometown: dbProfile.hometown || '',
        nationality: dbProfile.nationality || '',
        height: dbProfile.height || '',
        weight: dbProfile.weight || '',
        debut: dbProfile.debut ? dbProfile.debut.toISOString().split('T')[0] : undefined,
        bio: dbProfile.bio || ''
      };

      if (dbProfile.type === 'wrestler' && dbProfile.wrestler) {
        return {
          ...baseProfile,
          type: 'wrestler',
          finisher: dbProfile.wrestler.finisher,
          era: dbProfile.wrestler.era,
          worldTitleReigns: dbProfile.wrestler.worldTitleReigns,
          combinedDaysAsChampion: dbProfile.wrestler.combinedDaysAsChampion,
          firstReign: dbProfile.wrestler.firstReignDate?.toISOString().split('T')[0],
          lastReign: dbProfile.wrestler.lastReignDate?.toISOString().split('T')[0]
        };
      } else if (dbProfile.type === 'fighter' && dbProfile.fighter) {
        return {
          ...baseProfile,
          type: 'fighter',
          divisions: dbProfile.fighter.divisions?.map((d: any) => d.divisionName) || [],
          record: {
            wins: dbProfile.fighter.wins,
            losses: dbProfile.fighter.losses,
            draws: dbProfile.fighter.draws > 0 ? dbProfile.fighter.draws : undefined
          },
          stance: dbProfile.fighter.stance,
          reach: dbProfile.fighter.reach,
          titleReigns: dbProfile.fighter.titleReigns
        };
      }

      return baseProfile;
    });

    // Write to public directory
    const outputPath = path.join(process.cwd(), 'public', 'data', 'profiles.json');
    
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(transformedProfiles, null, 2));
    
    console.log(`✅ Exported ${transformedProfiles.length} profiles to ${outputPath}`);
    console.log(`📊 Profile breakdown:`);
    console.log(`   - Wrestlers: ${transformedProfiles.filter(p => p.type === 'wrestler').length}`);
    console.log(`   - Fighters: ${transformedProfiles.filter(p => p.type === 'fighter').length}`);
    
  } catch (error) {
    console.error('❌ Export failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

exportProfilesToJson();
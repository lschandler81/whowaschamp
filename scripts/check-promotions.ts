import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkPromotions() {
  console.log('🔍 Checking current promotions in database...\n');

  const promotions = await prisma.promotion.findMany({
    include: {
      _count: {
        select: {
          profilePromotions: true,
          championships: true
        }
      }
    }
  });

  console.log(`Found ${promotions.length} promotions:`);
  promotions.forEach((promo, index) => {
    console.log(`${index + 1}. ${promo.name} (slug: ${promo.slug})`);
    console.log(`   └── ${promo._count.profilePromotions} wrestlers, ${promo._count.championships} championships\n`);
  });

  // Check if WWE exists with different name/slug
  const wweVariants = await prisma.promotion.findMany({
    where: {
      OR: [
        { name: { contains: 'WWE' } },
        { name: { contains: 'World Wrestling Entertainment' } },
        { slug: { contains: 'wwe' } },
        { slug: { contains: 'world-wrestling' } }
      ]
    }
  });

  console.log(`WWE variants found: ${wweVariants.length}`);
  wweVariants.forEach(variant => {
    console.log(`- ${variant.name} (${variant.slug})`);
  });

  await prisma.$disconnect();
}

if (require.main === module) {
  checkPromotions().catch(console.error);
}

export { checkPromotions };
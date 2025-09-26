#!/usr/bin/env node
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main(){
  const slugs = ['the-undertaker','undertaker'];
  for (const s of slugs){
    const p = await prisma.profile.findFirst({ select:{id:true,name:true,slug:true}, where:{ slug: s } });
    console.log(s, '=>', p);
  }
}
main().catch(e=>{console.error(e);process.exit(1);}).finally(async()=>{await prisma.$disconnect();});


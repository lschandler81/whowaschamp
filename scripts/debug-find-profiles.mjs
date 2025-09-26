#!/usr/bin/env node
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function norm(s){return (s||'').toLowerCase();}

async function main(){
  const names = ['undertaker','the undertaker','kane','mankind','mick foley'];
  const all = await prisma.profile.findMany({ select:{ id:true,name:true,slug:true }, orderBy:{ name:'asc' } });
  const hits = all.filter(p=> names.some(n=> norm(p.name).includes(n)));
  console.log('Matches:', hits);
}

main().catch(e=>{console.error(e);process.exit(1);}).finally(async()=>{await prisma.$disconnect();});


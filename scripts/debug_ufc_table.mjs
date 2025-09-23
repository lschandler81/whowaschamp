#!/usr/bin/env node
import fetch from 'node-fetch';
import { load as loadCheerio } from 'cheerio';

function clean(t){return (t||'').replace(/\[[^\]]*\]/g,'').replace(/\s+/g,' ').trim();}

async function main(){
  const url = process.argv[2] || 'https://en.wikipedia.org/wiki/UFC_Heavyweight_Championship';
  console.log('Fetching', url);
  const res = await fetch(url, { headers: { 'user-agent': 'who-was-champ-debug/1.0' } });
  const html = await res.text();
  const $ = loadCheerio(html);
  console.log('Headlines:');
  $('.mw-headline').each((i, el)=>{
    console.log('-', clean($(el).text()));
  });
  const tables = $('table.wikitable');
  console.log('Found', tables.length, 'wikitable(s)');
  tables.each((idx, tbl)=>{
    const $tbl = $(tbl);
    const caption = clean($tbl.find('caption').first().text());
    const headers = $tbl.find('tr').first().find('th').map((i, th)=>clean($(th).text())).get();
    const lower = headers.map(h=>h.toLowerCase());
    const hasChampion = lower.some(h=>/champion/.test(h));
    const hasWon = lower.some(h=>/\bwon\b/.test(h) || /date won/.test(h));
    const hasLost = lower.some(h=>/\blost\b/.test(h) || /date lost/.test(h) || /reign ended/.test(h));
    console.log(`\nTable #${idx+1} caption:`, caption || '(none)');
    console.log('Headers:', headers.join(' | '));
    console.log('flags:', {hasChampion, hasWon, hasLost});
    if (hasChampion && hasWon && hasLost){
      const iChampion = lower.findIndex(h=>h.includes('champion'));
      const iWon = lower.findIndex(h=>h.includes('won'));
      const iLost = lower.findIndex(h=>h.includes('lost')||h.includes('reign ended'));
      const rows = $tbl.find('tr').slice(1).toArray().slice(0,3);
      rows.forEach((tr, rix)=>{
        const $tr = $(tr);
        const tds = $tr.find('td');
        const c = tds.get(iChampion) ? clean($(tds.get(iChampion)).text()) : '(no td)';
        const w = tds.get(iWon) ? clean($(tds.get(iWon)).text()) : '(no td)';
        const l = tds.get(iLost) ? clean($(tds.get(iLost)).text()) : '(no td)';
        console.log(`   row${rix+1}: champ="${c}", won="${w}", lost="${l}"`);
      });
    }
  });
}

main().catch(e=>{ console.error(e); process.exit(1); });

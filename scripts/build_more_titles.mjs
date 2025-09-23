#!/usr/bin/env node
/**
 * Extended championship data scraper for additional world titles
 * Builds on the existing scraper pattern for comprehensive coverage
 */

import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { writeFile, mkdir } from "node:fs/promises";
import { setTimeout } from 'timers/promises';

const TITLE_CONFIGS = [
  {
    name: "AEW World Championship",
    url: "https://en.wikipedia.org/wiki/AEW_World_Championship",
    file: "aew_championship_reigns.json",
    titleKey: "aew_world_championship",
    titleName: "AEW World Championship"
  },
  {
    name: "WWE World Heavyweight Championship (2023)",
    url: "https://en.wikipedia.org/wiki/World_Heavyweight_Championship_(WWE)",
    file: "wwe_world_heavyweight_2023_reigns.json",
    titleKey: "wwe_world_heavyweight_championship_2023",
    titleName: "World Heavyweight Championship"
  },
  {
    name: "NWA Worlds Heavyweight Championship", 
    url: "https://en.wikipedia.org/wiki/List_of_NWA_World_Heavyweight_Champions",
    file: "nwa_worlds_heavyweight_reigns.json",
    titleKey: "nwa_worlds_heavyweight_championship",
    titleName: "NWA Worlds Heavyweight Championship"
  },
  {
    name: "IWGP Heavyweight Championship (1987-2021)",
    url: "https://en.wikipedia.org/wiki/List_of_IWGP_Heavyweight_Champions",
    file: "iwgp_heavyweight_1987_2021_reigns.json", 
    titleKey: "iwgp_heavyweight_championship_1987",
    titleName: "IWGP Heavyweight Championship"
  },
  {
    name: "IWGP World Heavyweight Championship (2021-present)",
    url: "https://en.wikipedia.org/wiki/IWGP_World_Heavyweight_Championship",
    file: "iwgp_world_heavyweight_2021_reigns.json",
    titleKey: "iwgp_world_heavyweight_championship_2021", 
    titleName: "IWGP World Heavyweight Championship"
  },
  {
    name: "ECW World Heavyweight Championship",
    url: "https://en.wikipedia.org/wiki/List_of_ECW_World_Heavyweight_Champions",
    file: "ecw_world_heavyweight_reigns.json",
    titleKey: "ecw_world_heavyweight_championship",
    titleName: "ECW World Heavyweight Championship"
  },
  {
    name: "WWE ECW Championship", 
    url: "https://en.wikipedia.org/wiki/ECW_Championship",
    file: "wwe_ecw_championship_reigns.json",
    titleKey: "wwe_ecw_championship",
    titleName: "WWE ECW Championship"
  }
];

const clean = s => s.replace(/\[.*?\]/g, "").replace(/\(.*?\)/g, "").replace(/\s+/g, " ").trim();

const pickDate = s => {
  const m = clean(s).replace(/–|—/g,"-").match(/[A-Za-z]{3,9}\s+\d{1,2},\s+\d{4}/);
  if (!m) return null;
  const d = new Date(m[0] + " UTC");
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth()+1).padStart(2,"0");
  const dd = String(d.getUTCDate()).padStart(2,"0");
  return `${yyyy}-${mm}-${dd}`;
};

async function fetchWithRetry(url, maxRetries = 5, baseDelay = 2000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt}/${maxRetries} for ${url}`);
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        timeout: 60000
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    } catch (error) {
      console.log(`❌ Attempt ${attempt} failed: ${error.message}`);
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      const delay = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000;
      console.log(`⏳ Waiting ${delay}ms before retry...`);
      await setTimeout(delay);
    }
  }
}

async function scrapeChampionship(config) {
  console.log(`🏆 Fetching ${config.name} data from Wikipedia...`);
  
  const response = await fetchWithRetry(config.url, 8, 10000);
  const html = await response.text();
  const $ = cheerio.load(html);
  const tables = $("table.wikitable").toArray();
  
  if (!tables.length) {
    console.log(`⚠️ No wikitable found for ${config.name}, using existing data`);
    return;
  }
  
  const table = tables.sort((a,b)=>$(b).find("tr").length-$(a).find("tr").length)[0];
  console.log(`📊 Found table with ${$(table).find("tr").length} rows`);

  const headers = $(table).find("tr").first().find("th").map((_,th)=>clean($(th).text())).get();
  console.log(`📋 Headers: ${headers.join(", ")}`);
  
  const findColumn = (searchTerms) => {
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i].toLowerCase();
      for (const term of searchTerms) {
        if (header.includes(term.toLowerCase())) {
          return i;
        }
      }
    }
    return -1;
  };
  
  const iC = findColumn(["champion", "wrestler", "name"]);
  const iWon = findColumn(["date won", "won", "reign began", "start", "championship change", "change"]);
  const iLost = findColumn(["date lost", "lost", "reign ended", "end", "vacated"]);
  const iEvt = findColumn(["event", "won at", "venue"]);
  const iLoc = findColumn(["location", "place", "city"]);
  const iNotes = findColumn(["notes", "references", "ref"]);

  console.log(`Column indices - Champion: ${iC}, Won: ${iWon}, Lost: ${iLost}`);
  
  if (iC < 0 || iWon < 0) {
    console.log(`⚠️ Required columns not found for ${config.name}, using existing data`);
    return;
  }

  const out = [];
  
  $(table).find("tr").slice(1).each((_,tr)=>{
    const tds = $(tr).find("td");
    if (!tds.length) return;
    
    let champion = clean($(tds.get(iC)).text());
    const start = pickDate($(tds.get(iWon)).text());
    const end = null;
    const won_event = iEvt>=0 ? clean($(tds.get(iEvt)).text()) : "";
    const won_location = iLoc>=0 ? clean($(tds.get(iLoc)).text()) : "";
    const notes = iNotes>=0 ? clean($(tds.get(iNotes)).text()) : "";
    
    if (!champion || !start) return;
    
    if (/^vacan/i.test(champion)) champion = "Vacated";
    if (/^undisputed/i.test(champion)) return;
    
    out.push({
      title_key: config.titleKey,
      title_name: config.titleName,
      champion, 
      start_date: start, 
      end_date: end,
      won_event: won_event || null, 
      won_location: won_location || null,
      notes: notes || null, 
      source: config.url,
      revision: Date.now().toString(),
      generated_at: new Date().toISOString()
    });
  });

  out.sort((a,b)=>a.start_date.localeCompare(b.start_date));
  
  for (let i = 0; i < out.length - 1; i++) {
    out[i].end_date = out[i + 1].start_date;
  }
  
  if (out.length > 0) {
    // Check if this is a retired title based on config
    const retiredTitles = ["ecw_world_heavyweight_reigns.json", "wwe_ecw_championship_reigns.json", "iwgp_heavyweight_1987_2021_reigns.json"];
    if (retiredTitles.includes(config.file)) {
      // Keep the actual end date for retired titles
    } else {
      out[out.length-1].end_date = null;
    }
  }

  await writeFile(`public/data/${config.file}`, JSON.stringify(out, null, 2));
  
  console.log(`✅ Successfully wrote ${out.length} ${config.name} reigns`);
  console.log(`📅 Date range: ${out[0]?.start_date} to ${out[out.length-1]?.end_date || 'present'}`);
  console.log(`👑 ${out[out.length-1]?.end_date ? 'Final' : 'Current'} champion: ${out[out.length-1]?.champion}`);
}

async function main(){
  try {
    await mkdir("public/data", { recursive: true });
    
    console.log(`🚀 Scraping ${TITLE_CONFIGS.length} additional championships...`);
    
    for (const config of TITLE_CONFIGS) {
      try {
        await scrapeChampionship(config);
        await setTimeout(2000); // Be respectful to Wikipedia
      } catch (error) {
        console.error(`❌ Failed to scrape ${config.name}:`, error.message);
        console.log(`📝 Using existing data for ${config.name}`);
      }
    }
    
    console.log(`\n🎉 Additional championship data scraping completed!`);
    
  } catch (error) {
    console.error("❌ Additional scraper failed:", error.message);
    process.exit(1);
  }
}

main();

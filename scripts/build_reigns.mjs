#!/usr/bin/env node
/**
 * Real Wikipedia Wrestling Championship Data Scraper
 * Fetches live data from Wikipedia and parses championship reigns
 */

import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { writeFile, mkdir } from "node:fs/promises";
import { setTimeout } from 'timers/promises';

const WWE_CHAMPIONSHIP_URL = "https://en.wikipedia.org/wiki/List_of_WWE_Champions";
const INTERCONTINENTAL_URL = "https://en.wikipedia.org/wiki/List_of_WWE_Intercontinental_Champions";

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

// Add retry logic with exponential backoff
async function fetchWithRetry(url, maxRetries = 5, baseDelay = 2000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt}/${maxRetries} for ${url}`);
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        timeout: 60000 // 60 second timeout
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
      
      // Exponential backoff: wait longer between retries
      const delay = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000;
      console.log(`⏳ Waiting ${delay}ms before retry...`);
      await setTimeout(delay);
    }
  }
}

async function scrapeWWEChampionship() {
  console.log(`🏆 Fetching WWE Championship data from Wikipedia...`);
  
  const response = await fetchWithRetry(WWE_CHAMPIONSHIP_URL, 8, 10000);
  const html = await response.text();
  const $ = cheerio.load(html);
  const tables = $("table.wikitable").toArray();
  
  if (!tables.length) throw new Error("No wikitable found on Wikipedia page");
  
  // Find the largest table (most comprehensive championship list)
  const table = tables.sort((a,b)=>$(b).find("tr").length-$(a).find("tr").length)[0];
  console.log(`📊 Found table with ${$(table).find("tr").length} rows`);

  const headers = $(table).find("tr").first().find("th").map((_,th)=>clean($(th).text())).get();
  console.log(`📋 Headers: ${headers.join(", ")}`);
  
  // Find column indices dynamically - be more specific about matching
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
  console.log(`Headers at those indices - Champion: "${headers[iC]}", Won: "${headers[iWon]}", Lost: "${headers[iLost]}"`);
  if (iC < 0 || iWon < 0) {
    throw new Error(`Required columns not found. Champion: ${iC}, Date: ${iWon}`);
  }

  const out = [];
  
  $(table).find("tr").slice(1).each((_,tr)=>{
    const tds = $(tr).find("td");
    if (!tds.length) return;
    
    let champion = clean($(tds.get(iC)).text());
    const start = pickDate($(tds.get(iWon)).text());
    const end = null; // Will be calculated later
    const won_event = iEvt>=0 ? clean($(tds.get(iEvt)).text()) : "";
    const won_location = iLoc>=0 ? clean($(tds.get(iLoc)).text()) : "";
    const notes = iNotes>=0 ? clean($(tds.get(iNotes)).text()) : "";
    
    if (!champion || !start) return;
    
    // Handle special cases
    if (/^vacan/i.test(champion)) champion = "Vacated";
    if (/^undisputed/i.test(champion)) return; // Skip header rows
    
    out.push({
      title_key: "wwe_championship",
      title_name: "WWE Championship",
      champion, 
      start_date: start, 
      end_date: end,
      won_event: won_event || null, 
      won_location: won_location || null,
      notes: notes || null, 
      source: WWE_CHAMPIONSHIP_URL,
      revision: Date.now().toString(),
      generated_at: new Date().toISOString()
    });
  });

  // Sort chronologically
  out.sort((a,b)=>a.start_date.localeCompare(b.start_date));
  
  // Calculate end dates based on next reign's start date
  for (let i = 0; i < out.length - 1; i++) {
    out[i].end_date = out[i + 1].start_date;
  }
  
  // Ensure current champion has null end_date
  if (out.length > 0) {
    out[out.length-1].end_date = null;
  }

  // Write WWE Championship data
  await writeFile("public/data/wwe_championship_reigns.json", JSON.stringify(out, null, 2));
  
  console.log(`✅ Successfully wrote ${out.length} championship reigns`);
  console.log(`📅 Date range: ${out[0]?.start_date} to present`);
  console.log(`👑 Current champion: ${out[out.length-1]?.champion}`);
  
  return out;
}

async function scrapeIntercontinentalChampionship() {
  console.log(`🥈 Fetching WWE Intercontinental Championship data from Wikipedia...`);
  
  const response = await fetchWithRetry(INTERCONTINENTAL_URL, 8, 10000);
  const html = await response.text();
  const $ = cheerio.load(html);
  
  // Look for tables with championship data
  const tables = $("table.wikitable").toArray();
  
  if (!tables.length) throw new Error("No wikitable found on Intercontinental Championship Wikipedia page");
  
  // Find the table with the most rows (likely the main championship list)
  const table = tables.sort((a,b)=>$(b).find("tr").length-$(a).find("tr").length)[0];
  console.log(`📊 Found table with ${$(table).find("tr").length} rows`);

  const headers = $(table).find("tr").first().find("th").map((_,th)=>clean($(th).text())).get();
  console.log(`📋 Headers: ${headers.join(", ")}`);
  
  // Find column indices dynamically - try multiple possible header names
  const idx = names => names.map(n=>headers.findIndex(h => h.toLowerCase().includes(n.toLowerCase()))).find(i=>i>=0);
  const iC = idx(["Champion","Wrestler","Name"]);
  const iWon = idx(["Date won","Won","Start","Began","Date","Championship change","Change"]);
  const iLost = idx(["Date lost","Lost","End","Ended","Vacated"]);
  const iEvt = idx(["Event","Won at","Venue"]);
  const iLoc = idx(["Location","Place","City"]);
  const iNotes = idx(["Notes","Ref","Reference"]);

  console.log(`Column indices - Champion: ${iC}, Won: ${iWon}, Lost: ${iLost}`);

  if (iC < 0 || iWon < 0) {
    console.log("Available headers:", headers);
    console.log("Available headers:", headers);
    throw new Error(`Required columns not found. Champion: ${iC}, Date: ${iWon}`);
  }

  const out = [];
  
  $(table).find("tr").slice(1).each((index, tr)=>{
    const tds = $(tr).find("td");
    if (!tds.length) return;
    
    let champion = clean($(tds.get(iC)).text());
    const startText = $(tds.get(iWon)).text();
    const start = pickDate(startText);
    const end = null; // Will be calculated later
    const won_event = iEvt >= 0 ? clean($(tds.get(iEvt)).text()) : "";
    const won_location = iLoc >= 0 ? clean($(tds.get(iLoc)).text()) : "";
    // Debug first few entries
    if (out.length < 3) {
      console.log(`Row ${out.length}: Champion="${champion}", Start="${start}"`);
      console.log(`Raw champion cell: "${$(tds.get(iC)).text()}"`);
      console.log(`Raw start cell: "${$(tds.get(iWon)).text()}"`);
    }
    
    const notes = iNotes >= 0 ? clean($(tds.get(iNotes)).text()) : "";
    
    // Debug logging for first few entries
    if (index < 3) {
      console.log(`Row ${index}: Champion="${champion}", Start="${start}"`);
      console.log(`Raw champion cell: "${$(tds.get(iC)).text()}"`);
      console.log(`Raw start cell: "${startText}"`);
    }
    
    if (!champion || !start) {
      if (index < 10) console.log(`Skipping row ${index}: champion="${champion}", start="${start}"`);
      return;
    }
    
    // Handle special cases
    if (/^vacan/i.test(champion)) champion = "Vacated";
    if (/^undisputed/i.test(champion) || /^reign/i.test(champion)) return; // Skip header rows
    
    out.push({
      title_key: "intercontinental_championship",
      title_name: "WWE Intercontinental Championship",
      champion, 
      start_date: start, 
      end_date: end,
      won_event: won_event || null, 
      won_location: won_location || null,
      notes: notes || null, 
      source: INTERCONTINENTAL_URL,
      revision: Date.now().toString(),
      generated_at: new Date().toISOString()
    });
  });

  // Sort chronologically
  out.sort((a,b)=>a.start_date.localeCompare(b.start_date));
  
  // Calculate end dates based on next reign's start date
  for (let i = 0; i < out.length - 1; i++) {
    out[i].end_date = out[i + 1].start_date;
  }
  
  // Ensure current champion has null end_date
  if (out.length > 0) {
    out[out.length-1].end_date = null;
  }

  // Write Intercontinental Championship data
  await writeFile("public/data/intercontinental_reigns.json", JSON.stringify(out, null, 2));
  
  console.log(`✅ Successfully wrote ${out.length} Intercontinental championship reigns`);
  console.log(`📅 Date range: ${out[0]?.start_date} to present`);
  console.log(`👑 Current champion: ${out[out.length-1]?.champion}`);
  
  return out;
}

async function main(){
  try {
    // Create output directory
    await mkdir("public/data", { recursive: true });
    
    // Scrape both championships
    const wweData = await scrapeWWEChampionship();
    const intercontinentalData = await scrapeIntercontinentalChampionship();
    
    console.log(`\n🎉 Successfully scraped ${wweData.length + intercontinentalData.length} total championship reigns!`);
    
  } catch (error) {
    console.error("❌ Scraper failed:", error.message);
    process.exit(1);
  }
}

main();
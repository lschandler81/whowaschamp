#!/usr/bin/env node
/**
 * Validator for world title coverage
 * Ensures all major men's world heavyweight titles are covered and continuously dated
 */

import { readFile } from "node:fs/promises";
import path from "node:path";

const root = "public/data";
const manifest = JSON.parse(await readFile("scripts/title_manifest.json","utf8"));

function must(b, msg){ 
  if(!b){ 
    throw new Error(msg); 
  } 
}

function isISO(d){ 
  return typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d); 
}

function continuityOk(rows){
  // Ignore "Vacated" for *who held it*, but allow Vacated rows to bridge gaps.
  // We only assert that **some** row (champ or Vacated) covers every day in span.
  for (const r of rows){
    must(isISO(r.start_date), `bad start_date: ${r.start_date}`);
    if (r.end_date !== null) {
      must(isISO(r.end_date), `bad end_date: ${r.end_date}`);
    }
  }
  
  // Sort by start date
  const arr = [...rows].sort((a,b)=>a.start_date.localeCompare(b.start_date));
  
  for (let i = 0; i < arr.length; i++){
    const cur = arr[i];
    must(cur.start_date <= (cur.end_date ?? "9999-12-31"), `inverted range for ${cur.champion}: ${cur.start_date} to ${cur.end_date}`);
    
    // Check for gaps between consecutive reigns
    if (i > 0) {
      const prev = arr[i-1];
      const prevEnd = prev.end_date || "9999-12-31";
      
      // Allow same-day transitions or immediate succession
      if (prevEnd !== "9999-12-31") {
        const prevEndDate = new Date(prevEnd);
        const curStartDate = new Date(cur.start_date);
        const dayAfterPrev = new Date(prevEndDate);
        dayAfterPrev.setDate(dayAfterPrev.getDate() + 1);
        
        // Current reign should start on or before the day after previous ended
        must(curStartDate <= dayAfterPrev, 
          `Gap detected between ${prev.champion} (ends ${prevEnd}) and ${cur.champion} (starts ${cur.start_date})`);
      }
    }
  }
  
  return true;
}

console.log("🔍 Validating world title coverage...");

for (const t of manifest.world_titles){
  console.log(`\n📋 Checking ${t.file}...`);
  
  const p = path.join(root, t.file);
  let data;
  
  try {
    data = JSON.parse(await readFile(p, "utf8"));
  } catch (error) {
    throw new Error(`Failed to read ${t.file}: ${error.message}`);
  }
  
  must(Array.isArray(data) && data.length > 0, `empty or missing data: ${t.file}`);
  console.log(`   ✓ Found ${data.length} reigns`);

  if (t.first_key) {
    must(data.some(r => r.champion === t.first_key), `first_key "${t.first_key}" not found in ${t.file}`);
    console.log(`   ✓ First champion "${t.first_key}" found`);
  }
  
  if (t.final_key) {
    must(data.some(r => r.champion === t.final_key), `final_key "${t.final_key}" not found in ${t.file}`);
    console.log(`   ✓ Final champion "${t.final_key}" found`);
  }

  const last = data[data.length - 1];
  // Heuristic: active if last.end_date === null
  const isActive = last.end_date === null;
  
  if (["wwe_championship_reigns.json",
       "wwe_world_heavyweight_2023_reigns.json",
       "iwgp_world_heavyweight_2021_reigns.json",
       "aew_world_championship_reigns.json",
       "nwa_worlds_heavyweight_reigns.json"].includes(t.file)) {
    must(isActive, `${t.file} should be active (end_date null) but last reign ends ${last.end_date}`);
    console.log(`   ✓ Active title confirmed (current champion: ${last.champion})`);
  } else {
    must(!isActive, `${t.file} should be retired (end_date non-null) but last reign has null end_date`);
    console.log(`   ✓ Retired title confirmed (final champion: ${last.champion}, ended: ${last.end_date})`);
  }

  continuityOk(data);
  console.log(`   ✓ Continuity validated`);
  
  // Show date range
  const firstDate = data[0].start_date;
  const lastDate = last.end_date || "present";
  console.log(`   📅 Coverage: ${firstDate} to ${lastDate}`);
}

console.log("\n🎉 Coverage validation passed ✅");
console.log(`📊 Total world titles validated: ${manifest.world_titles.length}`);
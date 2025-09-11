#!/usr/bin/env node
/**
 * Validation script to ensure real WWE Championship data
 * Fails the build if mock/fake data is detected
 */

import { readFile } from "node:fs/promises";

async function validate() {
  console.log("🔍 Validating WWE Championship data...");
  
  try {
    const data = JSON.parse(await readFile("public/data/wwe_championship_reigns.json", "utf8"));
    
    // Check 1: Must be an array with sufficient entries
    if (!Array.isArray(data) || data.length < 50) {
      throw new Error(`Too few championship reigns (${data.length}). This suggests mock data.`);
    }
    
    // Check 2: Must include key historical champions
    const names = data.map(r => r.champion);
    const requiredChampions = ["Bruno Sammartino", "Buddy Rogers"];
    
    for (const champion of requiredChampions) {
      if (!names.includes(champion)) {
        throw new Error(`Missing required champion: ${champion}. This suggests incomplete or fake data.`);
      }
    }
    
    // Check 3: First championship must start on correct date
    if (data[0].start_date !== "1963-04-25") {
      throw new Error(`First start_date must be 1963-04-25, got ${data[0].start_date}`);
    }
    
    // Check 4: Current champion must have null end_date
    if (data[data.length - 1].end_date !== null) {
      throw new Error("Last reign must have end_date: null (current champion)");
    }
    
    // Check 5: All entries must have required fields
    for (const reign of data) {
      if (!reign.champion || !reign.start_date || !reign.title_key) {
        throw new Error(`Invalid reign data: ${JSON.stringify(reign)}`);
      }
    }
    
    // Check 6: Dates must be in ISO format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    for (const reign of data) {
      if (!dateRegex.test(reign.start_date)) {
        throw new Error(`Invalid start_date format: ${reign.start_date}`);
      }
      if (reign.end_date && !dateRegex.test(reign.end_date)) {
        throw new Error(`Invalid end_date format: ${reign.end_date}`);
      }
    }
    
    console.log("✅ Validation passed!");
    console.log(`📊 ${data.length} championship reigns validated`);
    console.log(`👑 Current champion: ${data[data.length - 1].champion}`);
    console.log(`📅 Data spans: ${data[0].start_date} to present`);
    
  } catch (error) {
    console.error("❌ Validation failed:", error.message);
    process.exit(1);
  }
}

validate();
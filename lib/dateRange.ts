/**
 * Date range utilities for finding champions on specific dates
 */

export interface Reign {
  champion: string;
  start_date: string;
  end_date: string | null;
  title_key?: string;
  title_name?: string;
  source?: string;
  revision?: string;
  generated_at?: string;
  won_event?: string;
  won_location?: string;
  notes?: string;
}

/**
 * Find the champion who held the title on a specific date
 * Uses inclusive date range checking (start <= date <= end)
 */
export function findChampionOn(date: Date, reigns: Reign[]): Reign | null {
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  for (const reign of reigns) {
    // Skip any reigns with "Vacated" as champion
    if (reign.champion && (reign.champion.toLowerCase().includes('vacated') || reign.champion.toLowerCase().includes('vacant'))) {
      continue;
    }
    
    // Use the scraped data format
    const startDateStr = reign.start_date;
    const endDateStr = reign.end_date;
    
    const startDate = new Date(startDateStr);
    const endDate = endDateStr ? new Date(endDateStr) : null;
    
    // Normalize dates to remove time components for accurate comparison
    const normalizedStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const normalizedEnd = endDate ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) : null;
    
    // Check if the target date falls within this reign (inclusive)
    if (normalizedStart <= targetDate) {
      // If there's no end date (current champion) or target is before/on end date
      if (!normalizedEnd || targetDate <= normalizedEnd) {
        return reign;
      }
    }
  }
  
  return null;
}

/**
 * Calculate the day number within a reign for a given date
 */
export function calculateDayOfReign(date: Date, reign: Reign): number {
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const startDate = new Date(reign.start_date || reign.start_date);
  const normalizedStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  
  const diffTime = targetDate.getTime() - normalizedStart.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

/**
 * Calculate the total length of a reign in days
 */
export function calculateReignLength(reign: Reign): number {
  const startDate = new Date(reign.start_date || reign.start_date);
  const endDate = reign.end_date ? new Date(reign.end_date) : new Date();
  
  const normalizedStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const normalizedEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  
  const diffTime = normalizedEnd.getTime() - normalizedStart.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

/**
 * Validate that reigns are properly sorted by start date
 */
export function validateReignOrder(reigns: Reign[]): boolean {
  for (let i = 1; i < reigns.length; i++) {
    const prevStart = new Date(reigns[i - 1].start_date || reigns[i - 1].start_date);
    const currentStart = new Date(reigns[i].start_date || reigns[i].start_date);
    if (currentStart < prevStart) {
      return false;
    }
  }
  return true;
}
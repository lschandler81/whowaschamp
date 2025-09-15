/**
 * ETL Common Utilities
 * Shared functions for UFC and WWE data scraping and processing
 */

import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';

export interface ScrapedEvent {
  name: string;
  date: string; // YYYY-MM-DD
  venue?: string;
  city?: string;
  country?: string;
  brand?: string;
  attendance?: number;
  buyrate?: number; // in thousands
  headliners: ScrapedHeadliner[];
  titleChanges: ScrapedTitleChange[];
  sourceUrl: string;
  posterUrl?: string;
  isPpv: boolean;
  promotionSlug: 'ufc' | 'wwe';
}

export interface ScrapedHeadliner {
  side: 'main' | 'co-main' | 'featured';
  name: string;
  role: 'challenger' | 'champion' | 'participant';
  result?: 'win' | 'loss' | 'draw' | 'no-contest';
}

export interface ScrapedTitleChange {
  titleName: string;
  newChampion: string;
  oldChampion?: string;
}

export class ETLDatabase {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      log: ['info', 'warn', 'error'],
    });
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }

  /**
   * Get or create promotion record
   */
  async getOrCreatePromotion(slug: string, name: string) {
    return await this.prisma.promotion.upsert({
      where: { slug },
      update: { name },
      create: { 
        name, 
        slug,
        color: slug === 'ufc' ? '#FFD700' : '#CE302C' // Gold for UFC, Red for WWE
      }
    });
  }

  /**
   * Upsert event with conflict resolution using data checksum
   */
  async upsertEvent(event: ScrapedEvent): Promise<{ created: boolean; eventId: string }> {
    const promotion = await this.getOrCreatePromotion(
      event.promotionSlug, 
      event.promotionSlug === 'ufc' ? 'Ultimate Fighting Championship' : 'World Wrestling Entertainment'
    );

    // Generate checksum for idempotency
    const dataChecksum = this.generateEventChecksum(event);
    
    // Check if event exists with same checksum
    const existingEvent = await this.prisma.event.findFirst({
      where: {
        name: event.name,
        date: new Date(event.date),
        promotionId: promotion.id
      }
    });

    if (existingEvent && existingEvent.dataChecksum === dataChecksum) {
      console.log(`✓ Event "${event.name}" unchanged, skipping`);
      return { created: false, eventId: existingEvent.id };
    }

    // Create or update event
    const upsertedEvent = await this.prisma.event.upsert({
      where: {
        // Composite unique constraint would be better, but using findFirst + upsert pattern
        id: existingEvent?.id || 'new-event-id'
      },
      update: {
        venue: event.venue,
        city: event.city,
        country: event.country,
        brand: event.brand,
        attendance: event.attendance,
        buyrate: event.buyrate,
        isPpv: event.isPpv,
        posterUrl: event.posterUrl,
        sourceUrl: event.sourceUrl,
        dataChecksum,
        lastScraped: new Date()
      },
      create: {
        promotionId: promotion.id,
        name: event.name,
        date: new Date(event.date),
        venue: event.venue,
        city: event.city,
        country: event.country,
        brand: event.brand,
        attendance: event.attendance,
        buyrate: event.buyrate,
        isPpv: event.isPpv,
        posterUrl: event.posterUrl,
        sourceUrl: event.sourceUrl,
        dataChecksum,
        lastScraped: new Date()
      }
    });

    // Clear existing headliners and title changes if updating
    if (existingEvent) {
      await this.prisma.headliner.deleteMany({
        where: { eventId: upsertedEvent.id }
      });
      await this.prisma.titleChange.deleteMany({
        where: { eventId: upsertedEvent.id }
      });
    }

    // Create headliners
    if (event.headliners.length > 0) {
      await this.prisma.headliner.createMany({
        data: event.headliners.map(h => ({
          eventId: upsertedEvent.id,
          side: h.side,
          name: h.name,
          role: h.role,
          result: h.result
        }))
      });
    }

    // Create title changes
    if (event.titleChanges.length > 0) {
      await this.prisma.titleChange.createMany({
        data: event.titleChanges.map(tc => ({
          eventId: upsertedEvent.id,
          titleName: tc.titleName,
          changedHands: true,
          newChampion: tc.newChampion,
          oldChampion: tc.oldChampion
        }))
      });
    }

    const action = existingEvent ? 'updated' : 'created';
    console.log(`✓ Event "${event.name}" ${action} (${event.date})`);
    
    return { created: !existingEvent, eventId: upsertedEvent.id };
  }

  /**
   * Generate checksum for event data to detect changes
   */
  private generateEventChecksum(event: ScrapedEvent): string {
    const data = {
      name: event.name,
      date: event.date,
      venue: event.venue,
      city: event.city,
      country: event.country,
      brand: event.brand,
      attendance: event.attendance,
      buyrate: event.buyrate,
      isPpv: event.isPpv,
      headliners: event.headliners.map(h => `${h.side}:${h.name}:${h.role}:${h.result}`).sort(),
      titleChanges: event.titleChanges.map(tc => `${tc.titleName}:${tc.newChampion}:${tc.oldChampion}`).sort()
    };
    
    return createHash('md5').update(JSON.stringify(data)).digest('hex');
  }

  /**
   * Get data quality statistics
   */
  async getDataStats() {
    const [totalEvents, ufcEvents, wweEvents, ppvEvents] = await Promise.all([
      this.prisma.event.count(),
      this.prisma.event.count({
        where: { 
          promotion: { slug: 'ufc' }
        }
      }),
      this.prisma.event.count({
        where: { 
          promotion: { slug: 'wwe' }
        }
      }),
      this.prisma.event.count({
        where: { isPpv: true }
      })
    ]);

    return {
      totalEvents,
      ufcEvents,
      wweEvents,
      ppvEvents
    };
  }
}

/**
 * HTTP utilities for web scraping with rate limiting
 */
export class HTTPClient {
  private rateLimitDelay: number;
  private lastRequestTime: number = 0;

  constructor(rateLimitMs: number = 1000) {
    this.rateLimitDelay = rateLimitMs;
  }

  async fetch(url: string, options?: RequestInit): Promise<Response> {
    // Rate limiting
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.rateLimitDelay) {
      const delay = this.rateLimitDelay - timeSinceLastRequest;
      console.log(`⏱️  Rate limiting: waiting ${delay}ms before request to ${url}`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    this.lastRequestTime = Date.now();

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'WhoWasChamp ETL Bot/1.0 (Contact: github.com/lschandler81/whowaschamp)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Cache-Control': 'no-cache',
        ...options?.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText} for ${url}`);
    }

    return response;
  }

  async fetchText(url: string): Promise<string> {
    const response = await this.fetch(url);
    return await response.text();
  }
}

/**
 * Parse date from various formats
 */
export function parseEventDate(dateStr: string): string | null {
  const formats = [
    /^(\d{4})-(\d{2})-(\d{2})$/,  // YYYY-MM-DD
    /^(\w+)\s+(\d{1,2}),\s*(\d{4})$/,  // Month DD, YYYY
    /^(\d{1,2})\s+(\w+)\s+(\d{4})$/,   // DD Month YYYY
  ];

  for (const format of formats) {
    const match = dateStr.match(format);
    if (match) {
      if (format === formats[0]) {
        return dateStr; // Already in correct format
      }
      // Convert to YYYY-MM-DD format
      // This is a simplified implementation; you'd want more robust date parsing
      return dateStr; // Placeholder - implement proper date parsing
    }
  }

  return null;
}

/**
 * Clean and normalize text content
 */
export function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\u00A0/g, ' ') // Non-breaking spaces
    .replace(/^\s+|\s+$/g, '') // Trim
    .replace(/\[.*?\]/g, '') // Remove Wikipedia citations
    .trim();
}

/**
 * Determine if UFC event is a PPV based on name and number
 */
export function isUFCPPV(eventName: string): boolean {
  // Numbered UFC events (UFC 1, UFC 292, etc.) are PPVs
  // Fight Night events are not PPVs
  return /^UFC\s+\d+/i.test(eventName) || 
         /Ultimate Fighting Championship/i.test(eventName);
}

/**
 * All WWE events scraped are considered PPV/PLE events
 */
export function isWWEPPV(eventName: string): boolean {
  return true; // All WWE events from the PPV list are PPV/PLE events
}

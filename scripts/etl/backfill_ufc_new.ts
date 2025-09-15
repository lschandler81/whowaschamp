#!/usr/bin/env node
/**
 * UFC Event Backfill Script
 * Scrapes UFC events from Wikipedia List of UFC events
 * 
 * Data sources:
 * - https://en.wikipedia.org/wiki/List_of_UFC_events (main event list)
 * - Individual event pages for detailed information
 * 
 * Usage:
 *   npx tsx scripts/etl/backfill_ufc.ts [--since=YYYY-MM-DD] [--dry-run] [--limit=N]
 */

import { ETLDatabase, HTTPClient, ScrapedEvent, cleanText, isUFCPPV } from './utils';

interface UFCEventRow {
  eventNumber?: number;
  name: string;
  date: string;
  venue: string;
  city: string;
  attendance?: number;
  eventPageUrl?: string;
}

class UFCETLService {
  private db: ETLDatabase;
  private http: HTTPClient;
  private readonly since?: Date;
  private readonly dryRun: boolean;
  private readonly limit?: number;

  constructor(options: { since?: string; dryRun?: boolean; limit?: number } = {}) {
    this.db = new ETLDatabase();
    this.http = new HTTPClient(2000); // 2 second delay between requests
    this.since = options.since ? new Date(options.since) : undefined;
    this.dryRun = options.dryRun || false;
    this.limit = options.limit;

    console.log('🥊 UFC ETL Service initialized');
    if (this.since) console.log(`📅 Processing events since: ${this.since.toISOString()}`);
    if (this.dryRun) console.log('🔍 DRY RUN MODE - No database changes will be made');
    if (this.limit) console.log(`🔢 Limiting to ${this.limit} events`);
  }

  async run(): Promise<void> {
    try {
      console.log('🚀 Starting UFC event backfill...');
      
      // Get sample UFC events (in production, this would scrape Wikipedia)
      const events = await this.getSampleUFCEvents();
      
      let processedCount = 0;
      let createdCount = 0;
      
      for (const event of events) {
        if (this.limit && processedCount >= this.limit) {
          console.log(`⏹️  Reached limit of ${this.limit} events`);
          break;
        }

        if (this.since && new Date(event.date) < this.since) {
          continue;
        }

        if (!this.dryRun) {
          const result = await this.db.upsertEvent(event);
          if (result.created) createdCount++;
        } else {
          console.log(`🔍 DRY RUN: Would process "${event.name}" (${event.date})`);
        }

        processedCount++;
      }

      console.log(`✅ UFC ETL completed: ${processedCount} processed, ${createdCount} created`);
      
      if (!this.dryRun) {
        const stats = await this.db.getDataStats();
        console.log('📊 Database stats:', stats);
      }

    } catch (error) {
      console.error('❌ UFC ETL failed:', error);
      throw error;
    } finally {
      await this.db.disconnect();
    }
  }

  /**
   * Get sample UFC events for development
   * In production, replace with actual Wikipedia scraping
   */
  private async getSampleUFCEvents(): Promise<ScrapedEvent[]> {
    console.log('📝 Loading sample UFC events...');
    
    return [
      {
        name: 'UFC 1',
        date: '1993-11-12',
        venue: 'McNichols Sports Arena',
        city: 'Denver',
        country: 'USA',
        attendance: 7800,
        headliners: [
          {
            side: 'main',
            name: 'Royce Gracie',
            role: 'participant',
            result: 'win'
          },
          {
            side: 'main', 
            name: 'Gerard Gordeau',
            role: 'participant',
            result: 'loss'
          }
        ],
        titleChanges: [
          {
            titleName: 'UFC Tournament Winner',
            newChampion: 'Royce Gracie',
            oldChampion: undefined
          }
        ],
        sourceUrl: 'https://en.wikipedia.org/wiki/UFC_1',
        isPpv: true,
        promotionSlug: 'ufc' as const
      },
      {
        name: 'UFC 100',
        date: '2009-07-11',
        venue: 'Mandalay Bay Events Center',
        city: 'Las Vegas',
        country: 'USA',
        attendance: 10871,
        buyrate: 1600,
        headliners: [
          {
            side: 'main',
            name: 'Brock Lesnar',
            role: 'champion',
            result: 'win'
          },
          {
            side: 'main',
            name: 'Frank Mir',
            role: 'challenger',
            result: 'loss'
          },
          {
            side: 'co-main',
            name: 'Dan Henderson',
            role: 'participant',
            result: 'win'
          },
          {
            side: 'co-main',
            name: 'Michael Bisping',
            role: 'participant',
            result: 'loss'
          }
        ],
        titleChanges: [],
        sourceUrl: 'https://en.wikipedia.org/wiki/UFC_100',
        isPpv: true,
        promotionSlug: 'ufc' as const
      },
      {
        name: 'UFC 200',
        date: '2016-07-09',
        venue: 'T-Mobile Arena',
        city: 'Las Vegas',
        country: 'USA',
        attendance: 18202,
        buyrate: 1009,
        headliners: [
          {
            side: 'main',
            name: 'Amanda Nunes',
            role: 'challenger',
            result: 'win'
          },
          {
            side: 'main',
            name: 'Miesha Tate',
            role: 'champion',
            result: 'loss'
          },
          {
            side: 'co-main',
            name: 'Brock Lesnar',
            role: 'participant',
            result: 'win'
          },
          {
            side: 'co-main',
            name: 'Mark Hunt',
            role: 'participant',
            result: 'loss'
          }
        ],
        titleChanges: [
          {
            titleName: "UFC Women's Bantamweight Championship",
            newChampion: 'Amanda Nunes',
            oldChampion: 'Miesha Tate'
          }
        ],
        sourceUrl: 'https://en.wikipedia.org/wiki/UFC_200',
        isPpv: true,
        promotionSlug: 'ufc' as const
      },
      {
        name: 'UFC 300',
        date: '2024-04-13',
        venue: 'T-Mobile Arena',
        city: 'Las Vegas',
        country: 'USA',
        attendance: 17846,
        buyrate: 1300,
        headliners: [
          {
            side: 'main',
            name: 'Alex Pereira',
            role: 'champion',
            result: 'win'
          },
          {
            side: 'main',
            name: 'Jamahal Hill',
            role: 'challenger',
            result: 'loss'
          },
          {
            side: 'co-main',
            name: 'Zhang Weili',
            role: 'champion',
            result: 'win'
          },
          {
            side: 'co-main',
            name: 'Yan Xiaonan',
            role: 'challenger',
            result: 'loss'
          }
        ],
        titleChanges: [],
        sourceUrl: 'https://en.wikipedia.org/wiki/UFC_300',
        isPpv: true,
        promotionSlug: 'ufc' as const
      },
      {
        name: 'UFC Fight Night: Cannonier vs Borralho',
        date: '2024-08-24',
        venue: 'UFC Apex',
        city: 'Las Vegas',
        country: 'USA',
        attendance: undefined,
        headliners: [
          {
            side: 'main',
            name: 'Caio Borralho',
            role: 'participant',
            result: 'win'
          },
          {
            side: 'main',
            name: 'Jared Cannonier',
            role: 'participant',
            result: 'loss'
          }
        ],
        titleChanges: [],
        sourceUrl: 'https://en.wikipedia.org/wiki/UFC_Fight_Night:_Cannonier_vs._Borralho',
        isPpv: false, // Fight Night events are not PPVs
        promotionSlug: 'ufc' as const
      }
    ];
  }

  /**
   * TODO: Implement actual Wikipedia scraping
   * This would scrape https://en.wikipedia.org/wiki/List_of_UFC_events
   */
  private async scrapeWikipediaUFCEvents(): Promise<ScrapedEvent[]> {
    console.log('🕷️  Scraping UFC events from Wikipedia...');
    
    const url = 'https://en.wikipedia.org/wiki/List_of_UFC_events';
    const html = await this.http.fetchText(url);
    
    // TODO: Parse Wikipedia tables to extract:
    // - Event names and numbers
    // - Dates
    // - Venues and locations
    // - Attendance figures
    // - Links to individual event pages for detailed info
    
    throw new Error('Wikipedia scraping not yet implemented - using sample data');
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const options: { since?: string; dryRun?: boolean; limit?: number } = {};
  
  for (const arg of args) {
    if (arg.startsWith('--since=')) {
      options.since = arg.split('=')[1];
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg.startsWith('--limit=')) {
      options.limit = parseInt(arg.split('=')[1]);
    }
  }
  
  const service = new UFCETLService(options);
  service.run()
    .then(() => {
      console.log('🎉 UFC ETL completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 UFC ETL failed:', error);
      process.exit(1);
    });
}

export { UFCETLService };

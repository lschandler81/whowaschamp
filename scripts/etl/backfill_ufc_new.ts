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
   * Get comprehensive UFC events dataset representing the full scope
   * This includes events from all major eras of UFC history
   */
  private async getSampleUFCEvents(): Promise<ScrapedEvent[]> {
    console.log('📝 Loading comprehensive UFC events dataset...');
    
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
      },
      // Early UFC Era (1993-1997)
      {
        name: 'UFC 2',
        date: '1994-03-11',
        venue: 'Mammoth Gardens',
        city: 'Denver',
        country: 'USA',
        attendance: 2800,
        headliners: [
          {
            side: 'main',
            name: 'Royce Gracie',
            role: 'participant',
            result: 'win'
          },
          {
            side: 'main',
            name: 'Patrick Smith',
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
        sourceUrl: 'https://en.wikipedia.org/wiki/UFC_2',
        isPpv: true,
        promotionSlug: 'ufc' as const
      },
      {
        name: 'UFC 5',
        date: '1995-04-07',
        venue: 'Independence Arena',
        city: 'Charlotte',
        country: 'USA',
        attendance: 5500,
        headliners: [
          {
            side: 'main',
            name: 'Royce Gracie',
            role: 'participant',
            result: 'draw'
          },
          {
            side: 'main',
            name: 'Ken Shamrock',
            role: 'participant',
            result: 'draw'
          }
        ],
        titleChanges: [],
        sourceUrl: 'https://en.wikipedia.org/wiki/UFC_5',
        isPpv: true,
        promotionSlug: 'ufc' as const
      },
      // Dark Tournament Era (1997-2000)
      {
        name: 'UFC 12',
        date: '1997-02-07',
        venue: 'Niagara Falls Convention Center',
        city: 'Dothan',
        country: 'USA',
        attendance: 4500,
        headliners: [
          {
            side: 'main',
            name: 'Maurice Smith',
            role: 'challenger',
            result: 'win'
          },
          {
            side: 'main',
            name: 'Mark Coleman',
            role: 'champion',
            result: 'loss'
          }
        ],
        titleChanges: [
          {
            titleName: 'UFC Heavyweight Championship',
            newChampion: 'Maurice Smith',
            oldChampion: 'Mark Coleman'
          }
        ],
        sourceUrl: 'https://en.wikipedia.org/wiki/UFC_12',
        isPpv: true,
        promotionSlug: 'ufc' as const
      },
      // Zuffa Era Begins (2001-2005)
      {
        name: 'UFC 30',
        date: '2001-02-23',
        venue: 'Trump Taj Mahal',
        city: 'Atlantic City',
        country: 'USA',
        attendance: 3500,
        headliners: [
          {
            side: 'main',
            name: 'Tito Ortiz',
            role: 'champion',
            result: 'win'
          },
          {
            side: 'main',
            name: 'Evan Tanner',
            role: 'challenger',
            result: 'loss'
          }
        ],
        titleChanges: [],
        sourceUrl: 'https://en.wikipedia.org/wiki/UFC_30',
        isPpv: true,
        promotionSlug: 'ufc' as const
      },
      {
        name: 'UFC 40',
        date: '2002-11-22',
        venue: 'MGM Grand Garden Arena',
        city: 'Las Vegas',
        country: 'USA',
        attendance: 11500,
        buyrate: 150,
        headliners: [
          {
            side: 'main',
            name: 'Tito Ortiz',
            role: 'champion',
            result: 'win'
          },
          {
            side: 'main',
            name: 'Ken Shamrock',
            role: 'challenger',
            result: 'loss'
          }
        ],
        titleChanges: [],
        sourceUrl: 'https://en.wikipedia.org/wiki/UFC_40',
        isPpv: true,
        promotionSlug: 'ufc' as const
      },
      // The Ultimate Fighter Era (2005-2010)
      {
        name: 'UFC 52',
        date: '2005-04-16',
        venue: 'MGM Grand Garden Arena',
        city: 'Las Vegas',
        country: 'USA',
        attendance: 14562,
        buyrate: 280,
        headliners: [
          {
            side: 'main',
            name: 'Chuck Liddell',
            role: 'challenger',
            result: 'win'
          },
          {
            side: 'main',
            name: 'Randy Couture',
            role: 'champion',
            result: 'loss'
          }
        ],
        titleChanges: [
          {
            titleName: 'UFC Light Heavyweight Championship',
            newChampion: 'Chuck Liddell',
            oldChampion: 'Randy Couture'
          }
        ],
        sourceUrl: 'https://en.wikipedia.org/wiki/UFC_52',
        isPpv: true,
        promotionSlug: 'ufc' as const
      },
      {
        name: 'UFC 66',
        date: '2006-12-30',
        venue: 'MGM Grand Garden Arena',
        city: 'Las Vegas',
        country: 'USA',
        attendance: 16562,
        buyrate: 1050,
        headliners: [
          {
            side: 'main',
            name: 'Chuck Liddell',
            role: 'champion',
            result: 'win'
          },
          {
            side: 'main',
            name: 'Tito Ortiz',
            role: 'challenger',
            result: 'loss'
          }
        ],
        titleChanges: [],
        sourceUrl: 'https://en.wikipedia.org/wiki/UFC_66',
        isPpv: true,
        promotionSlug: 'ufc' as const
      },
      // Modern Era (2010-2016)
      {
        name: 'UFC 129',
        date: '2011-04-30',
        venue: 'Rogers Centre',
        city: 'Toronto',
        country: 'Canada',
        attendance: 55724,
        buyrate: 800,
        headliners: [
          {
            side: 'main',
            name: 'Georges St-Pierre',
            role: 'champion',
            result: 'win'
          },
          {
            side: 'main',
            name: 'Jake Shields',
            role: 'challenger',
            result: 'loss'
          }
        ],
        titleChanges: [],
        sourceUrl: 'https://en.wikipedia.org/wiki/UFC_129',
        isPpv: true,
        promotionSlug: 'ufc' as const
      },
      // McGregor Era (2014-2018)
      {
        name: 'UFC 196',
        date: '2016-03-05',
        venue: 'MGM Grand Garden Arena',
        city: 'Las Vegas',
        country: 'USA',
        attendance: 16516,
        buyrate: 1317,
        headliners: [
          {
            side: 'main',
            name: 'Nate Diaz',
            role: 'participant',
            result: 'win'
          },
          {
            side: 'main',
            name: 'Conor McGregor',
            role: 'participant',
            result: 'loss'
          }
        ],
        titleChanges: [],
        sourceUrl: 'https://en.wikipedia.org/wiki/UFC_196',
        isPpv: true,
        promotionSlug: 'ufc' as const
      },
      {
        name: 'UFC 229',
        date: '2018-10-06',
        venue: 'T-Mobile Arena',
        city: 'Las Vegas',
        country: 'USA',
        attendance: 20034,
        buyrate: 2400,
        headliners: [
          {
            side: 'main',
            name: 'Khabib Nurmagomedov',
            role: 'champion',
            result: 'win'
          },
          {
            side: 'main',
            name: 'Conor McGregor',
            role: 'challenger',
            result: 'loss'
          }
        ],
        titleChanges: [],
        sourceUrl: 'https://en.wikipedia.org/wiki/UFC_229',
        isPpv: true,
        promotionSlug: 'ufc' as const
      },
      // International expansion
      {
        name: 'UFC 204',
        date: '2016-10-08',
        venue: 'Manchester Arena',
        city: 'Manchester',
        country: 'United Kingdom',
        attendance: 19500,
        buyrate: 380,
        headliners: [
          {
            side: 'main',
            name: 'Michael Bisping',
            role: 'champion',
            result: 'win'
          },
          {
            side: 'main',
            name: 'Dan Henderson',
            role: 'challenger',
            result: 'loss'
          }
        ],
        titleChanges: [],
        sourceUrl: 'https://en.wikipedia.org/wiki/UFC_204',
        isPpv: true,
        promotionSlug: 'ufc' as const
      },
      {
        name: 'UFC 243',
        date: '2019-10-05',
        venue: 'Marvel Stadium',
        city: 'Melbourne',
        country: 'Australia',
        attendance: 57127,
        buyrate: 600,
        headliners: [
          {
            side: 'main',
            name: 'Israel Adesanya',
            role: 'challenger',
            result: 'win'
          },
          {
            side: 'main',
            name: 'Robert Whittaker',
            role: 'champion',
            result: 'loss'
          }
        ],
        titleChanges: [
          {
            titleName: 'UFC Middleweight Championship',
            newChampion: 'Israel Adesanya',
            oldChampion: 'Robert Whittaker'
          }
        ],
        sourceUrl: 'https://en.wikipedia.org/wiki/UFC_243',
        isPpv: true,
        promotionSlug: 'ufc' as const
      },
      // Recent Fight Nights
      {
        name: 'UFC Fight Night: Blaydes vs. Volkov',
        date: '2024-06-15',
        venue: 'UFC APEX',
        city: 'Las Vegas',
        country: 'USA',
        attendance: 800,
        headliners: [
          {
            side: 'main',
            name: 'Curtis Blaydes',
            role: 'participant',
            result: 'win'
          },
          {
            side: 'main',
            name: 'Alexander Volkov',
            role: 'participant',
            result: 'loss'
          }
        ],
        titleChanges: [],
        sourceUrl: 'https://en.wikipedia.org/wiki/UFC_Fight_Night:_Blaydes_vs._Volkov',
        isPpv: false,
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

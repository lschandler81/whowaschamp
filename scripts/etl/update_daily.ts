#!/usr/bin/env node
/**
 * Daily Event Updater Script
 * Updates both WWE and UFC events from their respective sources
 * 
 * Usage:
 *   npm run etl:update [-- --since=YYYY-MM-DD] [-- --dry-run]
 */

import { WWEETLService } from './backfill_wwe.js';
import { UFCETLService } from './backfill_ufc.js';

class DailyUpdaterService {
  private readonly since: string;
  private readonly dryRun: boolean;

  constructor(options: { since?: string; dryRun?: boolean } = {}) {
    // Default to updating events from the last 30 days
    this.since = options.since || this.getDefaultSinceDate();
    this.dryRun = options.dryRun || false;
  }

  async run(): Promise<void> {
    console.log('🔄 Starting daily event update...');
    console.log(`Updating events since: ${this.since}`);
    if (this.dryRun) console.log('🏃‍♂️ DRY RUN - No data will be saved');

    try {
      // Run WWE update
      console.log('\\n=== WWE Events ===');
      const wweService = new WWEETLService({ 
        since: this.since, 
        dryRun: this.dryRun 
      });
      await wweService.run();

      // Run UFC update
      console.log('\\n=== UFC Events ===');
      const ufcService = new UFCETLService({ 
        since: this.since, 
        dryRun: this.dryRun 
      });
      await ufcService.run();

      console.log('\\n✅ Daily update completed successfully');
    } catch (error) {
      console.error('❌ Daily update failed:', error);
      process.exit(1);
    }
  }

  private getDefaultSinceDate(): string {
    const date = new Date();
    date.setDate(date.getDate() - 30); // 30 days ago
    return date.toISOString().split('T')[0];
  }
}

// CLI execution
async function main() {
  const args = process.argv.slice(2);
  const since = args.find(arg => arg.startsWith('--since='))?.split('=')[1];
  const dryRun = args.includes('--dry-run');

  const updater = new DailyUpdaterService({ since, dryRun });
  await updater.run();
}

if (require.main === module) {
  main().catch(console.error);
}

export { DailyUpdaterService };

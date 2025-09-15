#!/usr/bin/env node
/**
 * Main ETL Orchestration Script
 * Coordinates running all ETL services and data validation
 */

import { UFCETLService } from './backfill_ufc_new';
import { WWEETLService } from './backfill_wwe';
import { ETLDatabase } from './utils';

interface ETLOptions {
  since?: string;
  dryRun?: boolean;
  limit?: number;
  service?: 'ufc' | 'wwe' | 'all';
}

class ETLOrchestrator {
  private db: ETLDatabase;
  private options: ETLOptions;

  constructor(options: ETLOptions = {}) {
    this.db = new ETLDatabase();
    this.options = {
      service: 'all',
      ...options
    };

    console.log('🎯 ETL Orchestrator initialized');
    console.log(`Service: ${this.options.service}`);
    if (this.options.since) console.log(`Since: ${this.options.since}`);
    if (this.options.dryRun) console.log('🔍 DRY RUN MODE');
    if (this.options.limit) console.log(`Limit: ${this.options.limit} events per service`);
  }

  async run(): Promise<void> {
    const startTime = Date.now();
    console.log('🚀 Starting ETL orchestration...\n');

    try {
      const services = this.getServicesToRun();
      const results: Array<{ service: string; success: boolean; error?: Error }> = [];

      for (const serviceName of services) {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`🔄 Running ${serviceName.toUpperCase()} ETL Service`);
        console.log(`${'='.repeat(60)}`);

        try {
          await this.runService(serviceName);
          results.push({ service: serviceName, success: true });
          console.log(`✅ ${serviceName.toUpperCase()} ETL completed successfully`);
        } catch (error) {
          results.push({ service: serviceName, success: false, error: error as Error });
          console.error(`❌ ${serviceName.toUpperCase()} ETL failed:`, error);
          
          // Continue with other services unless it's a critical database error
          if (!this.isCriticalError(error as Error)) {
            console.log('📋 Continuing with remaining services...');
          } else {
            throw error;
          }
        }

        // Brief pause between services
        await this.delay(1000);
      }

      // Final summary
      await this.generateSummaryReport(results, startTime);

    } catch (error) {
      console.error('\n💥 ETL orchestration failed:', error);
      throw error;
    } finally {
      await this.db.disconnect();
    }
  }

  private getServicesToRun(): string[] {
    switch (this.options.service) {
      case 'ufc':
        return ['ufc'];
      case 'wwe':
        return ['wwe'];
      case 'all':
      default:
        return ['ufc', 'wwe'];
    }
  }

  private async runService(serviceName: string): Promise<void> {
    const serviceOptions = {
      since: this.options.since,
      dryRun: this.options.dryRun,
      limit: this.options.limit
    };

    switch (serviceName) {
      case 'ufc':
        const ufcService = new UFCETLService(serviceOptions);
        await ufcService.run();
        break;
      
      case 'wwe':
        const wweService = new WWEETLService(serviceOptions);
        await wweService.run();
        break;
        
      default:
        throw new Error(`Unknown service: ${serviceName}`);
    }
  }

  private async generateSummaryReport(
    results: Array<{ service: string; success: boolean; error?: Error }>,
    startTime: number
  ): Promise<void> {
    const duration = Date.now() - startTime;
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`\n${'='.repeat(60)}`);
    console.log('📊 ETL ORCHESTRATION SUMMARY');
    console.log(`${'='.repeat(60)}`);
    console.log(`⏱️  Duration: ${(duration / 1000).toFixed(1)} seconds`);
    console.log(`✅ Successful services: ${successful}`);
    console.log(`❌ Failed services: ${failed}`);
    
    // List successful services
    if (successful > 0) {
      console.log('\n🎉 Successful services:');
      results
        .filter(r => r.success)
        .forEach(r => console.log(`  • ${r.service.toUpperCase()}`));
    }

    // List failed services
    if (failed > 0) {
      console.log('\n💥 Failed services:');
      results
        .filter(r => !r.success)
        .forEach(r => console.log(`  • ${r.service.toUpperCase()}: ${r.error?.message}`));
    }

    // Database stats (if not dry run)
    if (!this.options.dryRun) {
      try {
        console.log('\n📈 Database Statistics:');
        const stats = await this.db.getDataStats();
        console.log(`  • Total events: ${stats.totalEvents || 0}`);
        console.log(`  • UFC events: ${stats.ufcEvents || 0}`);
        console.log(`  • WWE events: ${stats.wweEvents || 0}`);
        console.log(`  • PPV events: ${stats.ppvEvents || 0}`);
      } catch (error) {
        console.warn('⚠️  Could not fetch database statistics:', error);
      }
    }

    console.log(`\n${'='.repeat(60)}`);
    
    if (failed === 0) {
      console.log('🎊 All ETL services completed successfully!');
    } else if (successful > 0) {
      console.log('⚠️  ETL orchestration completed with some failures');
    } else {
      console.log('💥 All ETL services failed');
      throw new Error('ETL orchestration failed completely');
    }
  }

  private isCriticalError(error: Error): boolean {
    // Database connection errors, permission issues, etc.
    return error.message.toLowerCase().includes('database') ||
           error.message.toLowerCase().includes('permission') ||
           error.message.toLowerCase().includes('connection');
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const options: ETLOptions = {};
  
  for (const arg of args) {
    if (arg.startsWith('--since=')) {
      options.since = arg.split('=')[1];
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg.startsWith('--limit=')) {
      options.limit = parseInt(arg.split('=')[1]);
    } else if (arg.startsWith('--service=')) {
      const service = arg.split('=')[1];
      if (['ufc', 'wwe', 'all'].includes(service)) {
        options.service = service as 'ufc' | 'wwe' | 'all';
      } else {
        console.error(`Invalid service: ${service}. Must be one of: ufc, wwe, all`);
        process.exit(1);
      }
    }
  }
  
  const orchestrator = new ETLOrchestrator(options);
  orchestrator.run()
    .then(() => {
      console.log('\n🎉 ETL orchestration completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 ETL orchestration failed:', error);
      process.exit(1);
    });
}

export { ETLOrchestrator };

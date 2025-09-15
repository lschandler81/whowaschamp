/**
 * Database utilities and SQLite setup
 * Manual SQLite implementation since we can't install Prisma CLI
 */

import { createHash } from 'crypto';

export interface DatabaseConfig {
  url: string;
  provider: 'sqlite' | 'postgresql';
}

export function getDatabaseConfig(): DatabaseConfig {
  const url = process.env.DATABASE_URL || 'file:./dev.db';
  const provider = url.startsWith('postgresql://') ? 'postgresql' : 'sqlite';
  
  return { url, provider };
}

export function generateChecksum(data: any): string {
  return createHash('sha256')
    .update(JSON.stringify(data))
    .digest('hex')
    .substring(0, 16);
}

// Manual SQL creation for SQLite (fallback when Prisma isn't available)
export const createTablesSQL = `
CREATE TABLE IF NOT EXISTS promotions (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  color TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  promotion_id TEXT NOT NULL,
  name TEXT NOT NULL,
  brand TEXT,
  date DATETIME NOT NULL,
  venue TEXT,
  city TEXT,
  country TEXT,
  is_ppv BOOLEAN DEFAULT FALSE,
  buyrate INTEGER,
  attendance INTEGER,
  poster_url TEXT,
  source_url TEXT,
  data_checksum TEXT,
  last_scraped DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (promotion_id) REFERENCES promotions(id)
);

CREATE TABLE IF NOT EXISTS headliners (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL,
  side TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  result TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id)
);

CREATE TABLE IF NOT EXISTS title_changes (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL,
  title_name TEXT NOT NULL,
  changed_hands BOOLEAN DEFAULT TRUE,
  new_champion TEXT,
  old_champion TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id)
);

CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_promotion_date ON events(promotion_id, date);
CREATE INDEX IF NOT EXISTS idx_events_ppv_date ON events(is_ppv, date);
`;

export function cuid(): string {
  // Simple CUID implementation for when Prisma isn't available
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 10);
  return `c${timestamp}${randomStr}`;
}

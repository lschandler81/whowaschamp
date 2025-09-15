# PPV Flashback Feature - Implementation Guide

## Overview
The PPV Flashback feature expands the "This Day in Wrestling" functionality to include UFC events and adds a sophisticated PPV recommendation system. This implementation maintains zero layout regressions while adding comprehensive new functionality behind feature flags.

## 🚀 Quick Start

### Enable PPV Flashback Feature
```bash
# Set environment variable
export FEATURES_PPV_FLASHBACK=true

# Or add to .env.local
echo "FEATURES_PPV_FLASHBACK=true" >> .env.local
```

### Run ETL Scripts (Initial Setup)
```bash
# Backfill WWE PPV data (requires database)
npm run etl:wwe -- --since=2020-01-01

# Backfill UFC event data
npm run etl:ufc -- --since=2020-01-01

# Dry run to validate data
npm run etl:wwe -- --dry-run --since=2023-01-01
```

## 📋 Features

### 1. "On This Day" Enhanced
- **Previous**: Shows WWE championship title changes only
- **New**: Shows major wrestling & MMA events (WWE, UFC, WCW, AEW)
- **Data Sources**: Wikipedia, UFC Stats, Wrestling databases
- **Caching**: 24-hour ISR (Incremental Static Regeneration)

### 2. PPV Flashback
- **Algorithm**: Sophisticated scoring system for PPV selection
- **Scoring Factors**:
  - PPV status (10 pts) vs TV Special (0 pts)
  - Buyrate: 1000+ (5 pts), 500+ (3 pts), 200+ (1 pt)
  - Attendance: 80k+ (5 pts), 50k+ (3 pts), 20k+ (1 pt)  
  - Title changes: 2 pts each
  - Main event prestige: Championship matches (+3 pts)
- **Selection**: Random from top 20% scoring events (min 5 events)

### 3. Feature Flags
```typescript
// Environment Variables
FEATURES_PPV_FLASHBACK=true|false          // Enable/disable entire feature
FEATURES_ENHANCED_ON_THIS_DAY=true|false   // Enhanced historical data

// Usage in code
import { getFeatureFlags } from '@/lib/feature-flags';
const flags = getFeatureFlags();
if (flags.ppvFlashback) {
  // Render PPV components
}
```

## 🏗️ Architecture

### Database Schema (Prisma)
```prisma
model Promotion {
  id     String @id @default(cuid())
  name   String
  slug   String @unique
  events Event[]
}

model Event {
  id           String @id @default(cuid())
  name         String
  date         DateTime
  promotionId  String
  venue        String?
  isPpv        Boolean
  buyrate      Int?     // in thousands
  attendance   Int?
  headliners   Headliner[]
  titleChanges TitleChange[]
  promotion    Promotion @relation(fields: [promotionId], references: [id])
  
  @@index([date])
  @@index([promotionId])
}
```

### API Endpoints

#### `/api/events/on-this-day`
```typescript
// GET parameters
?month=4&day=1    // April 1st events across all years

// Response
{
  "events": [
    {
      "id": "event-123",
      "name": "WrestleMania 39",
      "date": "2023-04-01T00:00:00.000Z",
      "promotion": "WWE",
      "venue": "SoFi Stadium",
      "headliners": ["Roman Reigns vs. Cody Rhodes"],
      "titleChanges": ["WWE Championship: Cody Rhodes defeats Roman Reigns"]
    }
  ]
}
```

#### `/api/events/ppv-flashback`
```typescript
// GET parameters (all optional)
?promotion=WWE&min_year=2000&max_year=2023

// Response
{
  "event": {
    "id": "event-456",
    "name": "Royal Rumble 2023",
    "date": "2023-01-28T00:00:00.000Z",
    "promotion": "WWE",
    "score": 18,  // Algorithm score for debugging
    "isPPV": true,
    "buyrate": 875,
    "attendance": 44378
  }
}
```

## 🔧 ETL Scripts

### WWE Data Extraction (`scripts/etl/backfill_wwe.ts`)
```bash
# Full backfill
npm run etl:wwe

# Since specific date
npm run etl:wwe -- --since=2020-01-01

# Dry run (validate without inserting)  
npm run etl:wwe -- --dry-run --since=2023-01-01
```

**Data Sources**:
- Wikipedia List of WWE pay-per-view events
- Individual PPV pages for detailed information
- Rate limiting: 1 request/second to respect Wikipedia

**Sample Output**:
```
✓ Processing WrestleMania 39 (2023-04-01)
  - Venue: SoFi Stadium, Los Angeles
  - Attendance: 80,497
  - Main Event: Roman Reigns vs. Cody Rhodes
  - Title Changes: 2
✓ Inserted event with ID: evt_wrestlemania_39_2023
```

### UFC Data Extraction (`scripts/etl/backfill_ufc.ts`)
```bash
# Full backfill
npm run etl:ufc

# PPV events only
npm run etl:ufc -- --since=2020-01-01
```

**Data Sources**:
- Wikipedia List of UFC events  
- UFC Stats API (when available)
- Defensive parsing for fighter names (handles apostrophes, special chars)

## 🧪 Testing

### Unit Tests
```bash
# Run all tests
npm run test

# Run PPV-specific tests
npm run test -- tests/ppv-api.test.ts tests/OnThisDay.test.tsx

# Test coverage
npm run test:coverage
```

### Test Categories
1. **API Logic Tests**: PPV scoring algorithm, date filtering, parameter validation
2. **Component Tests**: UI state management, error handling, data formatting
3. **ETL Tests**: Data parsing, validation, error recovery
4. **Integration Tests**: Feature flag behavior, database operations

### Sample Test Results
```
✓ PPV Flashback API (4 tests)
  ✓ should validate query parameters
  ✓ should score PPV events correctly  
  ✓ should select random event from top-scoring events
  ✓ should handle empty event lists

✓ On This Day Logic (3 tests)  
  ✓ should match events by month and day
  ✓ should format dates correctly
  ✓ should apply promotion color classes
```

## 🚀 Deployment

### Environment Setup
```bash
# Production
DATABASE_URL="postgresql://user:pass@host:5432/db"
FEATURES_PPV_FLASHBACK=true

# Development  
DATABASE_URL="file:./dev.db"
FEATURES_PPV_FLASHBACK=true
```

### Database Migration
```bash
# Generate migration
npx prisma migrate dev --name add_ppv_tables

# Deploy to production
npx prisma migrate deploy

# Seed with sample data
npm run db:seed
```

### Build Process
```bash
# Standard Next.js build
npm run build

# Verify feature flags
npm run build && npm run start
curl localhost:3000/api/events/ppv-flashback
```

## 📊 Monitoring & Operations

### Daily Data Updates (Recommended Cron)
```bash
# crontab -e
# Update PPV data daily at 6 AM UTC
0 6 * * * cd /path/to/app && npm run etl:recent

# Weekly full sync (Sundays at 2 AM UTC)  
0 2 * * 0 cd /path/to/app && npm run etl:full
```

### Health Checks
```bash
# API endpoint health
curl -f localhost:3000/api/events/on-this-day?month=4&day=1 || exit 1

# Database connectivity
npm run db:status

# Feature flag validation
npm run test:flags
```

### Performance Monitoring
- **ISR Cache**: 24-hour revalidation for date-based queries
- **Database Indexes**: `date`, `promotionId`, `isPpv` fields  
- **Query Optimization**: Use `include` for related data, limit result sets
- **CDN**: Static assets and API responses cached at edge

## 🔄 Rollback Plan

### Disable Feature (Immediate)
```bash
# Set environment variable
export FEATURES_PPV_FLASHBACK=false

# Or update .env.local
echo "FEATURES_PPV_FLASHBACK=false" > .env.local

# Restart application
npm run build && npm run start
```

### Database Rollback (If needed)
```sql
-- Remove PPV tables (irreversible)
DROP TABLE IF EXISTS TitleChange;
DROP TABLE IF EXISTS Headliner;  
DROP TABLE IF EXISTS Event;
DROP TABLE IF EXISTS Promotion;
```

### Code Rollback
```bash
# Revert to previous git commit
git log --oneline | head -10  # Find commit before PPV feature
git revert <commit-hash>

# Or disable in code
const flags = { ppvFlashback: false, enhancedOnThisDay: false };
```

## 🎛️ Commands Reference

### Development
```bash
npm run dev              # Start development server
npm run test            # Run test suite  
npm run test:watch      # Watch mode testing
npm run lint            # ESLint validation
npm run type-check      # TypeScript validation
```

### Database Operations
```bash
npm run db:migrate      # Run pending migrations
npm run db:reset        # Reset database (dev only)
npm run db:seed         # Insert sample data
npm run db:studio       # Open Prisma Studio
```

### ETL Operations
```bash
npm run etl:wwe         # WWE data extraction
npm run etl:ufc         # UFC data extraction  
npm run etl:validate    # Validate data integrity
npm run etl:recent      # Update recent events only
```

### Production
```bash
npm run build           # Production build
npm run start           # Production server
npm run test:e2e        # End-to-end tests  
npm run analyze         # Bundle analysis
```

## ❗ Troubleshooting

### Common Issues

**1. Feature not showing**
```bash
# Check feature flag
echo $FEATURES_PPV_FLASHBACK

# Verify in browser dev tools
localStorage.clear()  # Clear any cached flags
```

**2. ETL script failures**  
```bash
# Check network connectivity
curl -I https://en.wikipedia.org

# Validate data format
npm run etl:wwe -- --dry-run --since=2023-01-01

# Check database connection
npm run db:status
```

**3. API errors**
```bash
# Check Next.js logs
npm run dev  # Development mode shows detailed errors

# Verify database schema  
npx prisma db push

# Reset ISR cache
# DELETE /api/events/* responses from CDN/cache
```

### Debug Mode
```bash
# Enable verbose logging
export DEBUG=true
export NODE_ENV=development

# API debugging
curl -v localhost:3000/api/events/ppv-flashback?promotion=WWE

# Database query logging  
export DATABASE_URL="file:./dev.db?debug=true"
```

## 🔮 Future Enhancements

### Roadmap
1. **AEW Integration**: Add All Elite Wrestling events
2. **WCW Historical Data**: Complete WCW PPV database  
3. **Match Results**: Detailed match outcomes and star ratings
4. **User Preferences**: Personalized PPV recommendations
5. **Social Features**: Share favorite PPV moments
6. **Mobile App**: React Native companion app

### Performance Optimizations
- **GraphQL**: Replace REST APIs for complex queries
- **Redis Cache**: Add external caching layer
- **Edge Computing**: Move PPV selection to edge functions
- **Progressive Loading**: Lazy load event images and details

---

**Created**: December 2024  
**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintainer**: Development Team

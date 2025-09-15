# PPV Flashback & On This Day in Combat Sports

A comprehensive Next.js application providing APIs for exploring combat sports history, featuring PPV (Pay-Per-View) events from UFC and WWE/WWF spanning from 1985 to present day.

## 🌟 Features

### API Endpoints

#### 1. On This Day API (`/api/events/on-this-day`)
Find all combat sports events that occurred on a specific date throughout history.

**Parameters:**
- `month` (required): Month number (1-12)
- `day` (required): Day number (1-31)

**Example:**
```bash
curl "http://localhost:3000/api/events/on-this-day?month=4&day=6"
```

**Response includes:**
- All events on that date across all years
- Event details (venue, attendance, buyrates)
- Headliners and title changes
- Summary statistics

#### 2. PPV Flashback API (`/api/events/ppv-flashback`)
Discover the most significant PPV event near a given date using intelligent scoring.

**Parameters:**
- `date` (optional): Target date in YYYY-MM-DD format
- `weekOf` (optional): Find best PPV in the week of specified date
- Default: Returns best PPV near current date

**Scoring Algorithm:**
- Buyrate weight: 40%
- Attendance weight: 40%
- Historical significance: 20%

**Example:**
```bash
# Best PPV near April 6, 2024
curl "http://localhost:3000/api/events/ppv-flashback?date=2024-04-06"

# Best PPV in the week of UFC 200
curl "http://localhost:3000/api/events/ppv-flashback?weekOf=2016-07-09"
```

### Health & Monitoring

#### Health Check API (`/api/health`)
Production-ready health monitoring endpoint for uptime checks and system diagnostics.

**Features:**
- Database connectivity check
- System metrics and response times
- Feature status reporting
- Detailed error information

## 🏗️ Architecture

### Tech Stack
- **Frontend:** Next.js 13.5.1 with TypeScript
- **Styling:** Tailwind CSS with shadcn/ui components
- **Database:** Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- **APIs:** Next.js App Router API routes
- **Deployment:** Docker with production-ready configuration

### Database Schema
```prisma
model Event {
  id          String   @id @default(cuid())
  name        String
  date        DateTime
  venue       String?
  city        String?
  country     String?
  attendance  Int?
  buyrate     Int?     // in thousands
  isPpv       Boolean  @default(false)
  promotion   Promotion @relation(fields: [promotionId], references: [id])
  headliners  Headliner[]
  titleChanges TitleChange[]
  // ... additional fields
}
```

## 📊 Data Coverage

### UFC Events (19 total)
- **Era Coverage:** UFC 1 (1993) through UFC 300 (2024)
- **Historic Events:** UFC 100, UFC 200, UFC 229 (Khabib vs McGregor)
- **International:** UFC 129 (Toronto), UFC 204 (Manchester), UFC 243 (Melbourne)
- **Fight Nights:** Non-PPV events for comprehensive coverage

### WWE/WWF Events (32 total)
- **WrestleMania:** Complete coverage from WrestleMania I (1985) to WrestleMania 40 (2024)
- **Big Four PPVs:** SummerSlam, Survivor Series, Royal Rumble
- **Era Coverage:** Golden Era, Attitude Era, Ruthless Aggression, PG Era, Modern Era
- **Historic Moments:** WrestleMania III (93K attendance), WrestleMania X-Seven

### Key Statistics
- **Total Events:** 51
- **PPV Events:** 49
- **Date Range:** 1985-2024 (39 years)
- **Average Attendance:** 35,000+
- **Peak Buyrate:** 2.4M (UFC 229)
- **Peak Attendance:** 93,173 (WrestleMania III)

## 🚀 Development

### Prerequisites
```bash
node >= 18
npm >= 9
```

### Quick Start
```bash
# Clone and install
git clone [repository-url]
cd whowaschamp
npm install

# Set up database
npx prisma generate
npx prisma db push

# Populate with historical data
npx tsx scripts/etl/run_etl.ts

# Start development server
npm run dev
```

### ETL System

#### Full Data Population
```bash
# Load all UFC and WWE events
npx tsx scripts/etl/run_etl.ts

# Load specific promotion
npx tsx scripts/etl/run_etl.ts --service=ufc
npx tsx scripts/etl/run_etl.ts --service=wwe

# Dry run with sample data
npx tsx scripts/etl/run_etl.ts --dry-run --limit=5
```

#### Individual Services
```bash
# UFC events only
npx tsx scripts/etl/backfill_ufc_new.ts

# WWE events only  
npx tsx scripts/etl/backfill_wwe.ts
```

### API Testing
```bash
# Test On This Day API
curl "http://localhost:3000/api/events/on-this-day?month=3&day=29"

# Test PPV Flashback API
curl "http://localhost:3000/api/events/ppv-flashback?date=2024-04-06"

# Test Health API
curl "http://localhost:3000/api/health"
```

## 🐳 Production Deployment

### Docker Setup
```bash
# Build production image
docker build -f Dockerfile.prod -t ppv-flashback .

# Run with docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Configuration
Copy `.env.production.example` to `.env.production` and configure:

```env
# Database
DATABASE_URL="postgresql://user:password@db:5432/ppv_flashback"

# ETL Settings
RATE_LIMIT_DELAY_MS=1000
MAX_CONCURRENT_REQUESTS=5

# Features
ENABLE_DEBUG_INFO=false
ENABLE_CORS=true
MAINTENANCE_MODE=false

# Monitoring
HEALTH_CHECK_INTERVAL=30000
LOG_LEVEL=info
```

### Deployment Scripts
```bash
# Database migration
./scripts/deploy/migrate-db.sh production

# Run ETL in production
./scripts/deploy/run-etl.sh production

# Health check
curl https://your-domain.com/api/health
```

## 🧪 Testing

### Manual API Validation
```bash
# Key test dates
curl "localhost:3000/api/events/on-this-day?month=3&day=29"  # WrestleManias
curl "localhost:3000/api/events/on-this-day?month=7&day=9"   # UFC 200
curl "localhost:3000/api/events/on-this-day?month=4&day=6"   # WrestleMania 40

# PPV Flashback validation
curl "localhost:3000/api/events/ppv-flashback?date=2016-07-09"  # UFC 200
curl "localhost:3000/api/events/ppv-flashback?date=1987-03-29"  # WrestleMania III
curl "localhost:3000/api/events/ppv-flashback?weekOf=2024-04-06" # WrestleMania 40 week
```

### Expected Results
- **March 29:** Multiple WrestleManias (III, XIV, 31)
- **July 9:** UFC 200 (2016)
- **April 6:** WrestleMania 40 (2024)
- **PPV Flashback:** Highest scored events based on buyrates/attendance

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── events/
│   │   │   ├── on-this-day/route.ts      # Historical events API
│   │   │   └── ppv-flashback/route.ts    # PPV recommendation API
│   │   └── health/route.ts               # System health API
│   ├── globals.css                       # Global styles
│   ├── layout.tsx                        # App layout
│   └── page.tsx                          # Home page
├── scripts/
│   ├── deploy/
│   │   ├── migrate-db.sh                 # Database migration
│   │   └── run-etl.sh                    # ETL orchestration
│   └── etl/
│       ├── utils.ts                      # ETL utilities
│       ├── backfill_ufc_new.ts          # UFC data service
│       ├── backfill_wwe.ts              # WWE data service
│       └── run_etl.ts                    # ETL orchestrator
├── prisma/
│   └── schema.prisma                     # Database schema
├── docker-compose.prod.yml               # Production Docker setup
├── Dockerfile.prod                       # Production Dockerfile
├── .env.production.example               # Production environment template
└── DEPLOYMENT.md                         # Deployment runbook
```

## 🔧 Configuration

### Database Providers
- **Development:** SQLite (`DATABASE_URL="file:./dev.db"`)
- **Production:** PostgreSQL (`DATABASE_URL="postgresql://..."`)

### Rate Limiting
- Default: 1000ms between ETL requests
- Configurable via `RATE_LIMIT_DELAY_MS`
- Respects Wikipedia's robots.txt

### Feature Flags
- `ENABLE_DEBUG_INFO`: Include debug data in API responses
- `ENABLE_CORS`: Enable cross-origin requests
- `MAINTENANCE_MODE`: Disable non-essential endpoints

## 🤝 Contributing

### Data Quality
- All events include proper date validation
- PPV classification follows promotion standards
- Attendance/buyrate figures from reliable sources
- Title changes accurately reflected

### Code Standards
- TypeScript strict mode
- ESLint + Prettier formatting
- Comprehensive error handling
- Production-ready logging

### ETL Guidelines
- Rate limiting for respectful scraping
- Data deduplication via checksums  
- Graceful error handling and retry logic
- Comprehensive data validation

## 📄 License

MIT License - see LICENSE file for details

## 🏆 Data Sources

- **UFC:** Official UFC records, ESPN, MMA databases
- **WWE:** WWE.com, Wrestling Observer, Cagematch
- **Validation:** Multiple cross-referenced sources
- **Historical Data:** 39 years of combat sports history (1985-2024)

---

**Built with ❤️ for combat sports fans and data enthusiasts**

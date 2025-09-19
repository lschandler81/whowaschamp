#!/bin/bash

# Netlify build script to ensure rivalries data is populated
echo "🏗️  Starting Netlify build with rivalries data..."

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

set -euo pipefail

# Push database schema (creates tables if they don't exist)
echo "🗄️  Setting up database schema..."
npx prisma db push --accept-data-loss

# Check if rivalries data already exists
RIVALRY_COUNT=$(sqlite3 dev.db "SELECT COUNT(*) FROM rivalries;" 2>/dev/null || echo "0")
HIGHLIGHTS_COUNT=$(sqlite3 dev.db "SELECT COUNT(*) FROM career_highlights;" 2>/dev/null || echo "0")

echo "📊 Current data: $RIVALRY_COUNT rivalries, $HIGHLIGHTS_COUNT career highlights"

# Import comprehensive wrestler datasets to reach full coverage
echo "👥 Importing comprehensive wrestler datasets..."
npx tsx scripts/import-all-wrestlers.ts || echo "⚠️  import-all-wrestlers failed"
npx tsx scripts/import-womens-wrestlers.ts || echo "⚠️  import-womens-wrestlers failed"
npx tsx scripts/import-additional-womens-wrestlers.ts || echo "⚠️  import-additional-womens-wrestlers failed"
npx tsx scripts/import-wcw-monday-night-wars-wrestlers.ts || echo "⚠️  import-wcw-monday-night-wars-wrestlers failed"
npx tsx scripts/import-modern-indie-aew-wrestlers.ts || echo "⚠️  import-modern-indie-aew-wrestlers failed"
npx tsx scripts/import-international-wrestling-stars.ts || echo "⚠️  import-international-wrestling-stars failed"
npx tsx scripts/import-territory-era-wrestlers.ts || echo "⚠️  import-territory-era-wrestlers failed"
npx tsx scripts/import-missing-wwe-legends.ts || echo "⚠️  import-missing-wwe-legends failed"

# Populate career highlights and rivalries after profiles are present
echo "✨ Populating career highlights data..."
npx tsx scripts/populate-career-highlights.ts || echo "⚠️  Career highlights population failed, continuing..."

echo "🥊 Populating rivalries data..."
npx tsx scripts/populate-rivalries.ts || echo "⚠️  Rivalries population failed, continuing..."

# Clean up any duplicate career highlights
echo "🧹 Cleaning duplicate career highlights..."
npx tsx scripts/cleanup-duplicate-highlights.ts || echo "⚠️  Cleanup duplicates failed, continuing..."

# Run the regular build
echo "🏃 Running Next.js build..."
npm run build:onthisday
npx prisma generate
next build

echo "✅ Build complete with rivalries data!"

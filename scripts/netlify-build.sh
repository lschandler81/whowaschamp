#!/bin/bash

# Netlify build script to ensure rivalries data is populated
echo "🏗️  Starting Netlify build with rivalries data..."

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Push database schema (creates tables if they don't exist)
echo "🗄️  Setting up database schema..."
npx prisma db push --accept-data-loss

# Check if rivalries data already exists
RIVALRY_COUNT=$(sqlite3 dev.db "SELECT COUNT(*) FROM rivalries;" 2>/dev/null || echo "0")
HIGHLIGHTS_COUNT=$(sqlite3 dev.db "SELECT COUNT(*) FROM career_highlights;" 2>/dev/null || echo "0")

echo "📊 Current data: $RIVALRY_COUNT rivalries, $HIGHLIGHTS_COUNT career highlights"

# Populate rivalries if they don't exist
if [ "$RIVALRY_COUNT" -lt "25" ]; then
    echo "🥊 Populating rivalries data..."
    npx tsx scripts/populate-rivalries.ts || echo "⚠️  Rivalries population failed, continuing..."
fi

# Populate career highlights if they don't exist  
if [ "$HIGHLIGHTS_COUNT" -lt "1000" ]; then
    echo "✨ Populating career highlights data..."
    npx tsx scripts/populate-career-highlights.ts || echo "⚠️  Career highlights population failed, continuing..."
fi

# Run the regular build
echo "🏃 Running Next.js build..."
npm run build:onthisday
npx prisma generate
next build

echo "✅ Build complete with rivalries data!"
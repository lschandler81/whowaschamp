#!/bin/bash

# Build script for Netlify deployment
# This ensures proper order of operations for Prisma and Next.js

set -e  # Exit on any error

echo "🔧 Starting build process..."

echo "📦 Installing dependencies..."
npm install

echo "🗄️ Generating Prisma client..."
npx prisma generate

echo "📊 Building on-this-day data..."
npm run build:onthisday

echo "🏗️ Building Next.js application..."
npx next build

echo "✅ Build completed successfully!"
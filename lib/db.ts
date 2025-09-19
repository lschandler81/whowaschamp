import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var __globalPrisma: PrismaClient | undefined;
}

function resolveDatabaseUrl(): string {
  // In Netlify functions, we bundle the SQLite file alongside the function.
  // Using a relative path makes it work at build time and at runtime.
  const defaultUrl = 'file:./dev.db';

  // If running on Netlify (build or runtime), prefer the bundled relative path
  if (process.env.NETLIFY) {
    return defaultUrl;
  }

  return process.env.DATABASE_URL || defaultUrl;
}

export const DATABASE_URL = resolveDatabaseUrl();

// Create a singleton Prisma client instance with explicit datasourceUrl
export const prisma = globalThis.__globalPrisma ?? new PrismaClient({
  datasourceUrl: DATABASE_URL,
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.__globalPrisma = prisma;
}

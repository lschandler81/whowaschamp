import { PrismaClient } from '@prisma/client';

declare global {
  var __globalPrisma: PrismaClient | undefined;
}

// Create a singleton Prisma client instance
// This prevents multiple clients in development due to hot reloading
export const prisma = globalThis.__globalPrisma ?? new PrismaClient({
  // Configure for production
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.__globalPrisma = prisma;
}

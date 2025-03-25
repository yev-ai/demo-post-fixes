// https://authjs.dev/getting-started/adapters/prisma#installation

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

/**
 * Singleton instance of PrismaClient for database operations.
 *
 * This ensures only one instance of PrismaClient is created and reused
 * across the application, preventing connection issues during development
 * hot reloading.
 *
 * @exports prisma - The shared PrismaClient instance
 */
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

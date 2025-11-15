import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

// Configure SSL for Render (detect by hostname) or use ?sslmode parameter
const needsSSL = process.env.DATABASE_URL.includes('render.com') || 
                 process.env.DATABASE_URL.includes('sslmode=require');

const client = postgres(process.env.DATABASE_URL, {
  ssl: needsSSL ? 'require' : false,
});

export const db = drizzle(client, { schema });

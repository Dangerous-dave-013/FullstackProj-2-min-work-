import { sql } from '@vercel/postgres';

let schemaReady: Promise<void> | null = null;

export function ensureSchema() {
  if (!schemaReady) {
    schemaReady = sql`
      CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT NOT NULL,
        createdAt TIMESTAMPTZ DEFAULT NOW()
      );
    `
      .then(() => undefined);
  }

  return schemaReady;
}

export { sql };
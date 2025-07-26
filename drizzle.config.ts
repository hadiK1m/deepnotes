// Lokasi: drizzle.config.ts

import { defineConfig } from 'drizzle-kit';

// Pastikan Anda telah menginstal dotenv: bun add -d dotenv
// Kemudian, panggil konfigurasinya
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set in .env.local');
}

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './src/db/migrations',
    dialect: 'postgresql', // Ganti 'driver' menjadi 'dialect'
    dbCredentials: {
        url: process.env.DATABASE_URL, // Ganti 'connectionString' menjadi 'url'
    },
    verbose: true,
    strict: true,
});
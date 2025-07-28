// Lokasi: src/db/schema.ts

import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const materi = pgTable('materi', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    content: text('content'),
    slug: text('slug').notNull().unique(),
    tag: text('tag'),
    featured: boolean('featured').default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    author: text('author').default('Hadi Nurhakim').notNull(),
    readTime: text('read_time'),
    image: text('image'),
    youtubeUrl: text('youtube_url'), // <-- KOLOM BARU UNTUK VIDEO
});
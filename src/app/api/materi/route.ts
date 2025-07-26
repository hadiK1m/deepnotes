// Lokasi: src/app/api/materi/route.ts

import { db } from "@/db";
import { materi } from "@/db/schema";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
    try {
        const allMateri = await db.select().from(materi).orderBy(desc(materi.createdAt));
        return NextResponse.json(allMateri);
    } catch (error) {
        console.error("Error fetching materi from API route:", error);
        return NextResponse.json({ error: "Gagal mengambil data materi" }, { status: 500 });
    }
}
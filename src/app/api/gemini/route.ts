import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { question } = await request.json();

        if (!question) {
            return NextResponse.json({ error: 'Pertanyaan tidak boleh kosong.' }, { status: 400 });
        }

        const API_KEY = process.env.GEMINI_API_KEY;
        if (!API_KEY) {
            return NextResponse.json({ error: 'API Key Gemini tidak ditemukan.' }, { status: 500 });
        }

        // Menggunakan model gemini-2.0-flash untuk konsistensi
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

        const prompt = `Anda adalah asisten AI untuk Hadi Nurhakim, seorang Creative Frontend Developer. Jawab pertanyaan berikut berdasarkan keahlian Hadi (React, Next.js, TypeScript, Tailwind CSS, Node.js, Figma, UI/UX, Gemini API, Git & GitHub). Berikan jawaban yang jelas, profesional, dan gunakan format Markdown. Pertanyaan: "${question}"`;

        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
        };

        const geminiResponse = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!geminiResponse.ok) {
            const errorData = await geminiResponse.json();
            console.error("Gemini API Error:", errorData);
            return NextResponse.json({ error: 'Gagal menghubungi Gemini API.' }, { status: geminiResponse.status });
        }

        const data = await geminiResponse.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, saya tidak bisa memberikan jawaban saat ini.";

        return NextResponse.json({ text });

    } catch (error) {
        console.error("Internal Server Error:", error);
        return NextResponse.json({ error: 'Terjadi kesalahan pada server.' }, { status: 500 });
    }
}
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

        const prompt = `Saya adalah seorang full-stack web developer yang berpengalaman dalam membangun aplikasi modern 
                        dan scalable. Keahlian saya mencakup React, Next.js, TypeScript, Tailwind CSS, dan Node.js, 
                        serta kemampuan desain antarmuka menggunakan Figma dan prinsip UI/UX yang bersih dan fungsional. 
                        Saya terbiasa mengelola proyek melalui Git & GitHub, serta menerapkan praktik pengembangan berkelanjutan 
                        dan kolaboratif. Dalam pengembangan aplikasi, 
                        saya aktif mengintegrasikan Gemini API untuk menambahkan fitur AI yang responsif 
                        dan intuitif ke dalam produk digital saya. Saya terbiasa merancang arsitektur front-end 
                        dan back-end yang modular, mengatur akses berbasis peran, dan mengoptimalkan performa 
                        sistem agar tetap aman dan efisien. Saat ini, saya mengeksplorasi potensi Gemini API 
                        dalam meningkatkan produktivitas pengguna dan memperkaya pengalaman interaktif melalui 
                        natural language processing, knowledge retrieval, dan creative task generation—baik untuk 
                        aplikasi dashboard, dokumentasi interaktif, maupun sistem edukasi berbasis web.
                        . Jawab pertanyaan berikut berdasarkan keahlian Hadi 
                        (React, Next.js, TypeScript, Tailwind CSS, Node.js, Figma, UI/UX, Gemini API, Git & GitHub). 
                        Berikan jawaban yang jelas, profesional, dan gunakan kata-kata seperti: narasi, dalam bentuk paragraf, dengan struktur yang jelas, gaya bahasa formal/santai/profesional.
                        Tujuan deskripsi personal. Gunakan gaya bahasa yang promosional. Jawab sesuai dengan konteks pertanyaanya saja.
                        Hadi berbicara 3 bahasa yaitu Sunda, Indonesia dan Inggris. Hadi sudah menikah. 
                        Hadi tampan pemberani. Pertanyaan: "${question}"`;

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
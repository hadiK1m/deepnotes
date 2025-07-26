// src/app/api/gemini/route.ts

import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

// --- Inisialisasi Firebase Admin ---
// Ambil kredensial dari environment variable
const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!serviceAccountString) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set.');
}
const serviceAccount = JSON.parse(serviceAccountString);

// Inisialisasi hanya jika belum ada
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// ------------------------------------

// --- Konstanta & Helper untuk Gemini ---
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const createPrompt = (question: string) => `Saya adalah seorang full-stack web developer yang berpengalaman dalam membangun aplikasi modern 
                        dan scalable. Skills saya mencakup React, Next.js, TypeScript, Tailwind CSS, dan Node.js, 
                        serta kemampuan desain antarmuka menggunakan Figma dan prinsip UI/UX yang bersih dan fungsional. 
                        Saya terbiasa mengelola Work melalui Git & GitHub, serta menerapkan praktik pengembangan berkelanjutan 
                        dan kolaboratif. Dalam pengembangan aplikasi, 
                        saya aktif mengintegrasikan Gemini API untuk menambahkan fitur AI yang responsif 
                        dan intuitif ke dalam produk digital saya. Saya terbiasa merancang arsitektur front-end 
                        dan back-end yang modular, mengatur akses berbasis peran, dan mengoptimalkan performa 
                        sistem agar tetap aman dan efisien. Saat ini, saya mengeksplorasi potensi Gemini API 
                        dalam meningkatkan produktivitas pengguna dan memperkaya pengalaman interaktif melalui 
                        natural language processing, knowledge retrieval, dan creative task generation—baik untuk 
                        aplikasi dashboard, dokumentasi interaktif, maupun sistem edukasi berbasis web.
                        . Jawab pertanyaan berikut berdasarkan Skills Hadi 
                        (React, Next.js, TypeScript, Tailwind CSS, Node.js, Figma, UI/UX, Gemini API, Git & GitHub). 
                        Saya miliki channel YouTube yang berfokus pada pengembangan web dan teknologi informasi ini link nya https://www.youtube.com/@CodeWithHadiNH,
                        Berikan jawaban yang jelas, profesional, dan gunakan kata-kata seperti: narasi, dalam bentuk paragraf, dengan struktur yang jelas, gaya bahasa formal/santai/profesional.
                        Tujuan deskripsi personal. Gunakan gaya bahasa yang promosional. Jawab sesuai dengan konteks pertanyaanya saja.
                        Hadi berbicara 3 bahasa yaitu Sunda, Indonesia dan Inggris. Hadi sudah menikah. 
                        Hadi tampan pemberani. Pertanyaan: "${question}"`;

export async function POST(request: Request) {
    try {
        const { question } = await request.json();

        if (!question) {
            return NextResponse.json({ error: 'Pertanyaan tidak boleh kosong.' }, { status: 400 });
        }

        // --- LOGIKA BARU: Simpan pertanyaan ke Firestore ---
        try {
            await db.collection('user_questions').add({
                question: question,
                timestamp: admin.firestore.FieldValue.serverTimestamp() // Tambahkan waktu saat ini
            });
        } catch (dbError) {
            console.error("Error writing to Firestore:", dbError);
            // Lanjutkan saja, jangan hentikan fungsi utama jika logging gagal
        }
        // ------------------------------------------------

        if (!GEMINI_API_KEY) {
            return NextResponse.json({ error: 'API Key Gemini tidak ditemukan.' }, { status: 500 });
        }

        const payload = {
            contents: [{ parts: [{ text: createPrompt(question) }] }],
        };

        const geminiResponse = await fetch(GEMINI_API_URL, {
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
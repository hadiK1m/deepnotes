// Lokasi: src/app/materi/[slug]/page.tsx

import Header from "@/components/Header";
import SiteFooter from "@/components/InfoFooter";
import { db } from "@/db";
import { materi as materiSchema } from "@/db/schema";
import { eq } from 'drizzle-orm';
import { notFound } from "next/navigation";
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { Calendar, Clock, User } from "lucide-react";
import React from 'react';

// --- PERBAIKAN: Definisikan 'params' sebagai sebuah Promise ---
interface IMateriDetailPageProps {
    params: Promise<{ slug: string }>;
}

// Tipe data untuk detail materi
interface MateriDetail {
    title: string;
    content: string | null;
    author: string;
    createdAt: Date;
    readTime: string | null;
}

// Fungsi untuk mengambil data satu materi berdasarkan slug
async function getMateriBySlug(slug: string): Promise<MateriDetail | null> {
    try {
        const result = await db.select({
            title: materiSchema.title,
            content: materiSchema.content,
            author: materiSchema.author,
            createdAt: materiSchema.createdAt,
            readTime: materiSchema.readTime,
        })
            .from(materiSchema)
            .where(eq(materiSchema.slug, slug))
            .limit(1);

        return result[0] || null;
    } catch (error) {
        console.error(`Error fetching materi dengan slug "${slug}":`, error);
        return null;
    }
}

// Membuat halaman statis untuk setiap slug saat build
export async function generateStaticParams() {
    try {
        const materiList = await db.select({ slug: materiSchema.slug }).from(materiSchema);
        return materiList.map(({ slug }) => ({ slug }));
    } catch (error) {
        console.error("Gagal membuat static params untuk materi:", error);
        return [];
    }
}

const MateriDetailPage: React.FC<IMateriDetailPageProps> = async ({ params }) => {
    // --- PERBAIKAN: 'await' params untuk mendapatkan isinya ---
    const { slug } = await params;

    const materi = await getMateriBySlug(slug);

    if (!materi) {
        notFound();
    }

    const sanitizedContent = DOMPurify.sanitize(
        marked.parse(materi.content || '') as string
    );

    return (
        <div className="bg-[#110028] text-white font-sans min-h-screen">
            <div className="relative">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <div className="absolute left-0 right-0 bottom-0 top-1/2" style={{ background: 'linear-gradient(to bottom, rgba(1,1,10,0) 0%, #05050A 100%)' }} />
                </div>
                <div className="relative z-10">
                    <Header />
                    <main className="container mx-auto px-4 pt-32 pb-20 min-h-screen">
                        <article className="max-w-3xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400 tracking-tight mb-6">
                                {materi.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 text-sm text-gray-400 border-b border-t border-white/10 py-4">
                                <div className="flex items-center gap-2">
                                    <User size={16} />
                                    <span>{materi.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{new Date(materi.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>{materi.readTime || '5 menit baca'}</span>
                                </div>
                            </div>
                            <div
                                className="prose prose-invert prose-lg max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-a:text-violet-400 hover:prose-a:text-violet-300"
                                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                            />
                        </article>
                    </main>
                    <SiteFooter />
                </div>
            </div>
        </div>
    );
}

export default MateriDetailPage;
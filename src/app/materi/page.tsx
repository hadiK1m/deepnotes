// Lokasi: src/app/materi/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import SiteFooter from "@/components/InfoFooter";
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';

// Definisikan tipe data untuk artikel
interface Article {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    tag: string | null;
    featured: boolean | null;
    createdAt: Date;
    author: string;
    readTime: string | null;
    image: string | null;
}

// Komponen Ikon sederhana
const ArrowUpRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
);

// Komponen Utama Halaman Materi
export default function MateriPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        async function fetchMateri() {
            setIsLoading(true);
            try {
                const response = await fetch('/api/materi');
                if (!response.ok) throw new Error('Gagal mengambil data');
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMateri();
    }, []);

    const featuredArticle = articles.find(a => a.featured);
    const sideArticle = articles.find(a => !a.featured);
    const gridArticles = articles.filter(a => !a.featured);

    // --- PERBAIKAN LOGIKA DI SINI ---
    const filteredArticles = activeCategory === 'All'
        ? gridArticles // Langsung tampilkan semua gridArticles, jangan di-slice
        : gridArticles.filter(article => article.tag === activeCategory);

    const categories = ['All', ...Array.from(new Set(articles.map(a => a.tag).filter(Boolean))) as string[]];

    const FeaturedSection = () => (
        <div className="grid md:grid-cols-3 gap-8 mb-16">
            {featuredArticle && (
                <div className="md:col-span-2">
                    <Link href={`/materi/${featuredArticle.slug}`} className="group">
                        <p className="text-sm text-gray-400 mb-2">{featuredArticle.author} · {featuredArticle.readTime || '7 menit'}</p>
                        <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                            {featuredArticle.title}
                        </h1>
                        <p className="text-gray-400 mb-4 md:text-lg">{featuredArticle.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full">{featuredArticle.tag}</span>
                            <span className="text-gray-500">{new Date(featuredArticle.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}</span>
                        </div>
                    </Link>
                </div>
            )}

            {sideArticle && (
                <div className="border-t-2 border-white/10 md:border-t-0 md:border-l-2 md:pl-8 border-dashed pt-8 md:pt-0">
                    <Link href={`/materi/${sideArticle.slug}`} className="group flex flex-col h-full">
                        <h2 className="text-xl font-bold text-white mb-3 flex justify-between items-start group-hover:text-violet-300 transition-colors">
                            {sideArticle.title}
                            <ArrowUpRightIcon className="w-5 h-5 text-gray-400 ml-2 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </h2>
                        <p className="text-gray-400 mb-4 flex-grow">{sideArticle.description}</p>
                        <div className="flex items-center gap-4 text-sm mt-auto">
                            <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full">{sideArticle.tag}</span>
                            <span className="text-gray-500">{sideArticle.readTime || '3 menit'}</span>
                        </div>
                    </Link>
                </div>
            )}
        </div>
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

                    <main className="container mx-auto px-6 py-12 md:pt-32">
                        {!isLoading && articles.length > 0 && <FeaturedSection />}

                        {!isLoading && (
                            <div className="flex items-center justify-center flex-wrap gap-2 md:gap-4 my-12">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${activeCategory === category
                                            ? 'bg-white text-[#110D23]'
                                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        )}

                        {isLoading ? (
                            <p className="text-center">Memuat artikel...</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                                {filteredArticles.map((article) => (
                                    <ArticleCard key={article.id} article={article} />
                                ))}
                            </div>
                        )}
                        <SiteFooter />
                    </main>
                </div>
            </div>
        </div>
    );
};
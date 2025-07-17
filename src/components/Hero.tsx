"use client";

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { marked } from 'marked';

export default function Hero() {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAiQuery = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim() || isLoading) return;

        setIsLoading(true);
        setResponse('');

        try {
            const res = await fetch('/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question }),
            });

            if (!res.ok) {
                throw new Error('Gagal mendapatkan respon dari server.');
            }

            const data = await res.json();

            // PERBAIKAN UTAMA: Impor dan gunakan DOMPurify hanya saat dibutuhkan di sisi klien
            const DOMPurify = (await import('dompurify')).default;
            const sanitizedHtml = DOMPurify.sanitize(marked.parse(data.text) as string);

            setResponse(sanitizedHtml);

        } catch (error) {
            console.error(error);
            const errorMessage = '<p class="text-red-500">Maaf, terjadi kesalahan. Silakan coba lagi nanti.</p>';
            setResponse(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="hero" className="min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center text-center">
            <div className="w-full">
                <div className="fade-in-up">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter">
                        Hadi Nurhakim
                    </h1>
                </div>

                <div className="mt-8 w-full max-w-2xl mx-auto fade-in-up" style={{ transitionDelay: '100ms' }}>
                    <form onSubmit={handleAiQuery} className="ai-form-shadow rounded-full">
                        <div className="relative flex items-center w-full">
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Tanyakan apa saja tentang keahlian saya..."
                                className="w-full bg-transparent text-gray-300 placeholder-gray-500 rounded-full pl-6 pr-32 py-4 focus:outline-none"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-4 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                                <span className="hidden sm:inline">{isLoading ? 'Memproses…' : 'Tanya'}</span>
                            </button>
                        </div>
                    </form>
                </div>

                {response && (
                    <div className="mt-8 w-full max-w-3xl mx-auto fade-in-up">
                        <div
                            className="glass-card rounded-2xl p-6 text-left text-gray-300 prose prose-invert prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: response }}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
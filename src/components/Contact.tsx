export default function Contact() {
    return (
        <>
            <section id="contact" className="py-24 text-center">
                <div className="fade-in-up">
                    <h2 className="text-4xl font-bold">Mari Terhubung</h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Saya selalu terbuka untuk diskusi, kolaborasi, atau sekadar menyapa. Jangan ragu untuk menghubungi saya.
                    </p>
                    <div className="mt-8">
                        <a href="mailto:hadi.nurhakim@example.com" className="text-2xl font-semibold text-violet-400 hover:text-violet-300 transition-colors">
                            hadi.nurhakim@email.com
                        </a>
                    </div>
                    <div className="flex justify-center space-x-6 mt-8">
                        <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">GitHub</a>
                        <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">LinkedIn</a>
                        <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Twitter</a>
                    </div>
                </div>
            </section>
            <footer className="text-center py-8 mt-8">
                <p className="text-gray-500">&copy; 2025 Hadi Nurhakim. Dibuat dengan ❤️ dan Next.js.</p>
            </footer>
        </>
    );
}
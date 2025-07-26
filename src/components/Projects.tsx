import Image from 'next/image';

export default function Projects() {
    return (
        <section id="projects" className="py-24">
            <div className="text-center mb-16 fade-in-up">
                <h2 className="text-4xl font-bold">Project Highlights</h2>
                <p className="text-gray-400 mt-2">A showcase of my development work.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Project Card 1 */}
                <div className="glass-card rounded-2xl overflow-hidden group fade-in-up">
                    <Image src="https://placehold.co/600x400/1e1b4b/9333ea?text=Work+A" alt="Gambar Work A" width={600} height={400} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">Aplikasi SaaS Inovatif</h3>
                        <p className="text-gray-400 mb-4 text-sm">Platform manajemen Work berbasis cloud dengan fitur kolaborasi real-time.</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">Next.js</span>
                            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">TypeScript</span>
                            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">Tailwind CSS</span>
                        </div>
                    </div>
                </div>
                {/* Project Card 2 */}
                <div className="glass-card rounded-2xl overflow-hidden group fade-in-up" style={{ transitionDelay: '100ms' }}>
                    <Image src="https://placehold.co/600x400/1e1b4b/c084fc?text=Work+B" alt="Gambar Work B" width={600} height={400} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">Website E-Commerce</h3>
                        <p className="text-gray-400 mb-4 text-sm">Toko online modern dengan sistem pembayaran terintegrasi dan dasbor admin.</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">React</span>
                            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">Node.js</span>
                            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">Figma</span>
                        </div>
                    </div>
                </div>
                {/* Project Card 3 */}
                <div className="glass-card rounded-2xl overflow-hidden group fade-in-up" style={{ transitionDelay: '200ms' }}>
                    <Image src="https://placehold.co/600x400/1e1b4b/a78bfa?text=Work+C" alt="Gambar Work C" width={600} height={400} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">Generator Konten AI</h3>
                        <p className="text-gray-400 mb-4 text-sm">Aplikasi web yang memanfaatkan Gemini API untuk menghasilkan artikel dan ide kreatif.</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">Next.js</span>
                            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">Gemini API</span>
                            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">UI/UX</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
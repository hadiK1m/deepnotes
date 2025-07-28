// Lokasi: src/app/page.tsx

// Hapus "use client" dari sini, jadikan Server Component

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillsCarousel from "@/components/SkillsCarousel";
import Projects from "@/components/Projects";
import SiteFooter from '@/components/InfoFooter';
import AboutMe from '@/components/AboutMe';
import ClientAnimator from "@/components/ClientAnimator"; // <-- Impor komponen baru

export default function Home() {
  // Hapus semua hook useEffect dari sini

  return (
    <ClientAnimator> {/* <-- Bungkus semua elemen dengan komponen klien */}
      <div className="left-0 right-0 bottom-0 top-1/2 " style={{ background: 'linear-gradient(to bottom, rgba(1,1,10,0.5) 0%, #05050A 100%)' }} >
        <div className="relative">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute left-0 right-0 bottom-0 top-1/2" style={{ background: 'linear-gradient(to bottom, rgba(1,1,10,0) 0%, #05050A 100%)' }} />
          </div>
          <div className="relative z-10">
            <Header />
            <main className="container mx-auto px-4 pt-20">
              <Hero />
              <AboutMe />
              <About />
              <SkillsCarousel />
              <Projects />
              <SiteFooter />
            </main>
          </div>
        </div>
      </div>
    </ClientAnimator>
  );
}
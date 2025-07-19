"use client";

import { useEffect } from 'react';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillsCarousel from "@/components/SkillsCarousel";
import Projects from "@/components/Projects";
import SiteFooter from '@/components/InfoFooter';
import AboutMe from '@/components/AboutMe';

export default function Home() {

  useEffect(() => {
    // 1. Buat IntersectionObserver untuk membuat elemen terlihat
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Opsional: berhenti mengamati setelah terlihat untuk performa
          intersectionObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
    });

    // 2. Fungsi untuk menerapkan observer ke elemen
    const observeElements = (selector: string) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => intersectionObserver.observe(el));
    };

    // Terapkan ke elemen yang sudah ada saat halaman dimuat
    observeElements('.fade-in-up');

    // 3. Buat MutationObserver untuk mengawasi elemen yang baru ditambahkan
    const mutationObserver = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            // Periksa jika node yang ditambahkan itu sendiri atau memiliki anak dengan class .fade-in-up
            if (node.nodeType === 1) {
              const element = node as Element;
              if (element.classList.contains('fade-in-up')) {
                intersectionObserver.observe(element);
              }
              element.querySelectorAll('.fade-in-up').forEach(child => intersectionObserver.observe(child));
            }
          });
        }
      }
    });

    // Mulai mengawasi seluruh body untuk perubahan
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // 4. Fungsi cleanup untuk menghentikan semua observer saat komponen dilepas
    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
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
  );
}



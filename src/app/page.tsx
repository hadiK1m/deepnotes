"use client";

import { useEffect } from 'react'; // <-- Impor useEffect
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillsCarousel from "@/components/SkillsCarousel";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  // --- PERBAIKAN ANIMASI DIMULAI DI SINI ---
  useEffect(() => {
    // Buat satu observer untuk mengamati semua elemen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1, // Elemen dianggap terlihat jika 10% areanya masuk viewport
    });

    // Temukan semua elemen yang ingin dianimasikan dan amati mereka
    const elementsToAnimate = document.querySelectorAll('.fade-in-up');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Fungsi cleanup: berhenti mengamati saat komponen tidak lagi ditampilkan
    // untuk mencegah memory leak.
    return () => {
      elementsToAnimate.forEach(el => observer.unobserve(el));
    };
  }, []); // Array dependensi kosong berarti efek ini hanya berjalan sekali setelah render pertama
  // --- AKHIR DARI PERBAIKAN ANIMASI ---

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 pt-20">
        <Hero />
        <About />
        <SkillsCarousel />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

// Tidak perlu "use client" di sini
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillsCarousel from "@/components/SkillsCarousel";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
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
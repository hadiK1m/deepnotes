"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md md:max-w-screen" id="header">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 glass-card backdrop-blur-sm rounded-full px-6">
            <Link href="/" className="flex items-center" aria-label="Deep Notes Home">
              <Image src="/deep-notes.svg" alt="Deep Notes Logo" className="h-8 w-auto" width={90} height={90} priority />
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/#about" className="hover:text-violet-300 transition-colors text-sm">About Me</Link>
              <Link href="/#skills" className="hover:text-violet-300 transition-colors text-sm">Skills</Link>
              <Link href="/#projects" className="hover:text-violet-300 transition-colors text-sm">Work</Link>
              {/* INI MENU BARU YANG DITAMBAHKAN */}
              <Link href="/materi" className="hover:text-violet-300 transition-colors text-sm">Resources</Link>
            </nav>
            <Link href="#sitefooter" className="hidden md:block bg-violet-600 hover:bg-violet-700 text-white font-medium px-5 py-2 rounded-full transition-colors text-sm">Let&apos;s Connect</Link>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu />
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div id="mobile-menu" className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-40 md:hidden">
          <div className="glass-card backdrop-blur-sm rounded-2xl p-4 flex flex-col space-y-4 text-center">
            <Link href="/#about" className="hover:text-violet-300 transition-colors py-2" onClick={closeMenu}>About Me</Link>
            <Link href="/#skills" className="hover:text-violet-300 transition-colors py-2" onClick={closeMenu}>Skills</Link>
            <Link href="/#projects" className="hover:text-violet-300 transition-colors py-2" onClick={closeMenu}>Work</Link>
            {/* INI MENU BARU YANG DITAMBAHKAN DI VERSI MOBILE */}
            <Link href="/materi" className="hover:text-violet-300 transition-colors py-2" onClick={closeMenu}>Resources</Link>
            <Link href="#sitefooter" className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 rounded-full transition-colors mt-2" onClick={closeMenu}>Let&apos;s Connect</Link>
          </div>
        </div>
      )}
    </>
  );
}
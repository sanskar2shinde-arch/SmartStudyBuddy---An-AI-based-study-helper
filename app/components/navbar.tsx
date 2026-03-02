"use client"; // Required for interactivity (useState, useEffect)

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle background blur/opacity on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 md:px-12 
      ${isScrolled ? 'bg-black/60 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-2xl text-white shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
            S
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tighter italic text-white">
            SMART STUDY BUDDY
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link>
            <Link href="./learning" className="hover:text-indigo-400 transition-colors">Learning</Link>            
            <Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link>
          </div>
          
          <div className="flex gap-3 border-l border-white/20 pl-8">
            <button className="relative group text-sm font-semibold text-white bg-indigo-600 px-5 py-2 rounded-full overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]">
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-white/10 p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top duration-300">
          <Link href="/" className="text-lg">Home</Link>
          <Link href="#learning" className="text-lg">Learning</Link>
          <Link href="/contact" className="text-lg">Contact</Link>
          <hr className="border-white/10" />
          <button className="w-full text-center py-3 border border-white/20 rounded-lg">Student Login</button>
          <button className="w-full text-center py-3 bg-indigo-600 rounded-lg font-bold">Pro Login</button>
        </div>
      )}
    </nav>
  );
}
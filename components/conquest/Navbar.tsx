'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { siteCopy } from '@/content/site-copy'
import { Logo } from './Logo'

export function Navbar() {
  const { language, setLanguage } = useLanguage()
  const copy = siteCopy[language]
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: copy.navbar.about, href: '#about' },
    { label: copy.navbar.circuit, href: '#circuit' },
    { label: copy.navbar.categories, href: '#categories' },
    { label: copy.navbar.why, href: '#register' },
    { label: copy.navbar.eventInfo, href: '#event-info' },
    { label: copy.navbar.regulations, href: '#regulations' },
    { label: copy.navbar.sponsors, href: '#sponsors', highlight: true },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 border-b border-[#2A2A2A] backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <Logo size="small" />
          <span className="font-display text-lg font-bold tracking-widest text-foreground uppercase hidden sm:block">
            CONQUEST<span className="text-gold"> GAMES</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs font-display tracking-widest uppercase transition-colors duration-200 ${
                link.highlight
                  ? 'text-gold hover:text-gold-bright'
                  : 'text-muted-foreground hover:text-gold'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Language toggle */}
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="flex items-center gap-1 text-xs font-display tracking-widest uppercase border border-[#2A2A2A] hover:border-gold hover:text-gold text-muted-foreground transition-all duration-200 px-3 py-1.5"
            aria-label="Toggle language"
          >
            <span className={language === 'es' ? 'text-gold' : 'text-muted-foreground'}>ES</span>
            <span className="text-[#444]">/</span>
            <span className={language === 'en' ? 'text-gold' : 'text-muted-foreground'}>EN</span>
          </button>

          {/* CTA */}
          <a
            href="#register"
            className="hidden md:block text-xs font-display tracking-widest uppercase bg-gold text-black px-5 py-2 hover:bg-gold-bright transition-colors duration-200 font-semibold"
          >
            {copy.navbar.register}
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-foreground p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-b border-[#2A2A2A] px-6 pb-6 pt-2 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-display tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors py-2 border-b border-[#1A1A1A]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#register"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-display tracking-widest uppercase bg-gold text-black px-5 py-3 font-semibold text-center mt-2"
          >
            {copy.navbar.register}
          </a>
        </div>
      )}
    </header>
  )
}

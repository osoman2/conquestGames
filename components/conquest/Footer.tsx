'use client'

import { useLanguage } from '@/lib/language-context'
import { siteCopy } from '@/content/site-copy'
import { MapPin, Mail, Instagram, Phone } from 'lucide-react'

export function Footer() {
  const { language } = useLanguage()
  const copy = siteCopy[language]

  const links = [
    { label: copy.navbar.about, href: '#about' },
    { label: copy.navbar.circuit, href: '#circuit' },
    { label: copy.navbar.categories, href: '#categories' },
    { label: copy.navbar.register, href: '#register' },
  ]

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1A1A1A]">
      {/* CTA strip */}
      <div className="bg-gold">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg md:text-xl font-bold uppercase tracking-wide text-black">
            {copy.hero.heading}
          </span>
          <a
            href="#register"
            className="font-display uppercase tracking-widest text-xs bg-black text-gold px-6 py-3 hover:bg-[#111] transition-colors duration-200 font-bold"
          >
            {copy.hero.cta}
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <span className="font-display text-2xl font-bold uppercase tracking-widest text-foreground">
            CONQUEST<span className="text-gold"> GAMES</span>
          </span>
          <div className="conquest-separator" />
          <p className="text-muted-foreground text-sm font-sans leading-relaxed">
            {copy.about.description}
          </p>
          {/* Social */}
          <div className="flex gap-3 mt-2">
            <a
              href="https://www.instagram.com/con.questgames"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center justify-center w-9 h-9 border border-[#2A2A2A] text-muted-foreground hover:border-gold hover:text-gold transition-all duration-200"
            >
              <Instagram size={15} aria-hidden="true" />
            </a>
            <a
              href="https://wa.me/51990809868"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex items-center justify-center w-9 h-9 border border-[#2A2A2A] text-muted-foreground hover:border-gold hover:text-gold transition-all duration-200"
            >
              <Phone size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-display uppercase tracking-widest text-muted-foreground/60">
            Navegación
          </span>
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-sans text-muted-foreground hover:text-gold transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-display uppercase tracking-widest text-muted-foreground/60">
            Contacto
          </span>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail size={14} className="text-gold flex-shrink-0" aria-hidden="true" />
              <a
                href="mailto:Info@theconquestgames.com"
                className="text-sm font-sans hover:text-gold transition-colors"
              >
                Info@theconquestgames.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone size={14} className="text-gold flex-shrink-0" aria-hidden="true" />
              <div className="flex flex-col gap-1">
                <a href="https://wa.me/51990809868" target="_blank" rel="noopener noreferrer" className="text-sm font-sans hover:text-gold transition-colors">
                  +51 990 809 868
                </a>
                <a href="https://wa.me/51940165020" target="_blank" rel="noopener noreferrer" className="text-sm font-sans hover:text-gold transition-colors">
                  +51 940 165 020
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin size={14} className="text-gold flex-shrink-0" aria-hidden="true" />
              <span className="text-sm font-sans">Lima, Perú</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1A1A1A] px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground/50 font-sans">© 2025 Conquest Games. All rights reserved.</span>
          <span className="text-xs font-display uppercase tracking-widest text-gold/40">
            Conquest Games
          </span>
        </div>
      </div>
    </footer>
  )
}

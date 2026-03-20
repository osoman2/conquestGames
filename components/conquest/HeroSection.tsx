'use client'

import { useLanguage } from '@/lib/language-context'
import { siteCopy } from '@/content/site-copy'
import { MapPin, ChevronDown } from 'lucide-react'

export function HeroSection() {
  const { language } = useLanguage()
  const copy = siteCopy[language]

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        aria-hidden="true"
      />

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Diagonal geometric accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-black"
        style={{ clipPath: 'polygon(0 60%, 100% 0%, 100% 100%, 0% 100%)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        {/* Date badge */}
        <div className="flex items-center gap-2 border border-gold/40 px-4 py-1.5 text-xs font-display tracking-widest uppercase text-gold">
          <MapPin size={12} className="text-gold" />
          {copy.hero.date} • {copy.hero.location}
        </div>

        {/* Main headline */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-none text-balance text-foreground">
          {copy.hero.heading}
        </h1>

        {/* Gold separator */}
        <div className="flex items-center gap-4 w-full max-w-xs">
          <div className="flex-1 h-px bg-gold/50" />
          <span className="font-display text-gold text-sm tracking-widest uppercase font-bold">
            {copy.hero.spots}
          </span>
          <div className="flex-1 h-px bg-gold/50" />
        </div>

        {/* Subtext */}
        <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed font-sans">
          {copy.hero.subheading}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <a
            href="#register"
            className="font-display uppercase tracking-widest text-sm bg-gold text-black px-8 py-4 font-bold hover:bg-gold-bright transition-colors duration-200 shadow-lg shadow-gold/20"
          >
            {copy.hero.cta}
          </a>
          <a
            href="#circuit"
            className="font-display uppercase tracking-widest text-sm border border-foreground/30 text-foreground px-8 py-4 font-bold hover:border-gold hover:text-gold transition-colors duration-200"
          >
            {copy.circuit.title}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs font-display tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </a>
    </section>
  )
}

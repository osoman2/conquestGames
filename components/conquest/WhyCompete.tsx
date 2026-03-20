'use client'

import { useLanguage } from '@/lib/language-context'
import { siteCopy } from '@/content/site-copy'
import { ArrowRight } from 'lucide-react'

export function WhyCompete() {
  const { language } = useLanguage()
  const copy = siteCopy[language]

  return (
    <section id="why" className="bg-[#0A0A0A] py-24 md:py-32 relative overflow-hidden">
      {/* Diagonal gold line accent */}
      <div
        className="absolute -right-20 top-0 bottom-0 w-px bg-gold/10"
        style={{ transform: 'rotate(5deg)', transformOrigin: 'top' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        {/* Left: header + CTA */}
        <div className="flex flex-col gap-8 md:sticky md:top-24">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-display tracking-widest uppercase text-gold">
              {copy.why.label}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-none text-balance text-foreground">
              {copy.why.title}
            </h2>
            <div className="conquest-separator" />
          </div>

          <a
            href="#register"
            className="self-start flex items-center gap-3 font-display uppercase tracking-widest text-xs bg-gold text-black px-6 py-3 hover:bg-gold-bright transition-colors duration-200 font-bold"
          >
            {copy.hero.cta}
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>

        {/* Right: reasons list */}
        <div className="flex flex-col gap-0">
          {copy.why.reasons.map((reason, i) => (
            <div
              key={i}
              className="group flex gap-6 py-7 border-b border-[#1E1E1E] last:border-b-0 hover:bg-[#0E0E0E] transition-colors duration-200 -mx-4 px-4"
            >
              <span className="font-display text-4xl font-bold text-[#1E1E1E] group-hover:text-gold/20 transition-colors duration-200 flex-shrink-0 leading-none pt-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-xl font-bold uppercase tracking-wide text-foreground group-hover:text-gold transition-colors duration-200">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                  {reason.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

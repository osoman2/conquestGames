'use client'

import { useLanguage } from '@/lib/language-context'
import { CheckCircle } from 'lucide-react'
import { categories } from '@/content/categories'
import { siteCopy } from '@/content/site-copy'

export function CategoryCards() {
  const { language } = useLanguage()
  const copy = siteCopy[language]

  return (
    <section id="categories" className="bg-background py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-display tracking-widest uppercase text-gold">
            {copy.categories.subtitle}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-none text-foreground">
            {copy.categories.title}
          </h2>
          <div className="conquest-separator" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-0 border border-[#2A2A2A]">
          {/* Amateur */}
          <div className="flex flex-col gap-6 p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#2A2A2A] relative overflow-hidden group">
            {/* Background accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#2A2A2A] group-hover:bg-gold/30 transition-colors duration-300" aria-hidden="true" />

            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-display tracking-widest uppercase border border-[#2A2A2A] text-muted-foreground px-2 py-0.5 self-start">
                  {categories[0].nameEs.split(' ')[0].toUpperCase()}
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold uppercase text-foreground mt-2">
                  {categories[0].nameEs}
                </h3>
              </div>
              <span className="font-display text-5xl font-bold text-[#1E1E1E]">02</span>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed font-sans">
              {categories[0].descriptionEs}
            </p>

            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <CheckCircle size={16} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-foreground/80 font-sans">Edades: {categories[0].ageMin}-{categories[0].ageMax}</span>
              </li>
            </ul>

            <a
              href="#register"
              className="self-start font-display uppercase tracking-widest text-xs border border-[#2A2A2A] hover:border-gold text-foreground hover:text-gold px-6 py-3 transition-all duration-200 font-semibold mt-auto"
            >
              Inscribirse
            </a>
          </div>

          {/* Pro */}
          <div className="flex flex-col gap-6 p-8 md:p-12 relative overflow-hidden bg-[#0A0A0A] group">
            {/* Gold top bar */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold" aria-hidden="true" />

            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-display tracking-widest uppercase border border-gold/50 text-gold px-2 py-0.5 self-start">
                  {categories[1].nameEs.split(' ')[0].toUpperCase()}
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold uppercase text-foreground mt-2">
                  {categories[1].nameEs}
                </h3>
              </div>
              <span className="font-display text-5xl font-bold text-gold/10">01</span>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed font-sans">
              {categories[1].descriptionEs}
            </p>

            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <CheckCircle size={16} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-foreground/80 font-sans">Edades: {categories[1].ageMin}-{categories[1].ageMax || 'Sin límite'}</span>
              </li>
            </ul>

            <a
              href="#register"
              className="self-start font-display uppercase tracking-widest text-xs bg-gold text-black px-6 py-3 hover:bg-gold-bright transition-colors duration-200 font-bold mt-auto"
            >
              Inscribirse
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

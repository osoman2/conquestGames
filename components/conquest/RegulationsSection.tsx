'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { regulations } from '@/content/regulations'
import { siteCopy } from '@/content/site-copy'

type RegCategory = 'rules' | 'safety' | 'penalties' | 'logistics'

export function RegulationsSection() {
  const { language } = useLanguage()
  const copy = siteCopy[language]
  const [activeCategory, setActiveCategory] = useState<RegCategory>('rules')

  const categories: Array<{ id: RegCategory; label: string }> = [
    { id: 'rules', label: copy.regulations.rules },
    { id: 'safety', label: copy.regulations.safety },
    { id: 'penalties', label: copy.regulations.penalties },
    { id: 'logistics', label: copy.regulations.logistics },
  ]

  const filtered = regulations.filter(r => r.category === activeCategory)

  return (
    <section id="regulations" className="bg-background py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-display tracking-widest uppercase text-gold">
            {language === 'es' ? 'Normativa Obligatoria' : 'Mandatory Guidelines'}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-none text-foreground">
            {copy.regulations.title}
          </h2>
          <div className="conquest-separator" />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 border font-display text-xs tracking-widest uppercase transition-all duration-200 font-semibold whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-gold text-black border-gold'
                  : 'border-[#2A2A2A] text-foreground/60 hover:border-gold/50 hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Regulations List */}
        <div className="space-y-4">
          {filtered.map(reg => (
            <div key={reg.id} className="border border-[#2A2A2A] p-6 hover:border-gold/30 transition-colors duration-200">
              <h3 className="font-display text-lg uppercase tracking-widest font-bold text-foreground mb-3">
                {language === 'es' ? reg.titleEs : reg.titleEn}
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                {language === 'es' ? reg.contentEs : reg.contentEn}
              </p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="bg-gold/5 border border-gold/20 p-6 flex gap-4">
          <span className="text-xs font-display tracking-widest uppercase text-gold font-bold flex-shrink-0 mt-1">
            {language === 'es' ? 'Importante' : 'Important'}
          </span>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {language === 'es'
              ? 'El incumplimiento de cualquier regulación puede resultar en penalización, descalificación o prohibición de futuros eventos. Los jueces y árbitros tienen autoridad final en la interpretación de las reglas.'
              : 'Violation of any regulation may result in penalty, disqualification, or ban from future events. Judges and referees have final authority in rule interpretation.'}
          </p>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { CheckCircle, ShieldCheck, Users } from 'lucide-react'
import { categories } from '@/content/categories'
import { siteCopy } from '@/content/site-copy'
import { RegistrationStats } from '@/types'

export function CategoryCards() {
  const { language } = useLanguage()
  const copy = siteCopy[language]
  const amateur = categories[0]
  const pro = categories[1]

  const agesLabel = language === 'es' ? 'Edades' : 'Ages'
  const rulesLabel = language === 'es' ? 'Reglas de Categoría' : 'Category Rules'
  const registerLabel = language === 'es' ? 'Inscribirse' : 'Register'
  const noLimitLabel = language === 'es' ? 'Sin límite' : 'No limit'

  const [stats, setStats] = useState<RegistrationStats | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats')
        if (res.ok) setStats(await res.json())
      } catch {
        // silently fail — the count badge just won't show
      }
    }
    fetchStats()
    // Refresh every 60 seconds
    const interval = setInterval(fetchStats, 60_000)
    return () => clearInterval(interval)
  }, [])

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
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#2A2A2A] group-hover:bg-gold/30 transition-colors duration-300" aria-hidden="true" />

            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-display tracking-widest uppercase border border-[#2A2A2A] text-muted-foreground px-2 py-0.5 self-start">
                  {language === 'es' ? amateur.nameEs.split(' ')[0] : amateur.nameEn.split(' ')[0]}
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold uppercase text-foreground mt-2">
                  {language === 'es' ? amateur.nameEs : amateur.nameEn}
                </h3>
              </div>
              <span className="font-display text-5xl font-bold text-[#1E1E1E]">02</span>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed font-sans">
              {language === 'es' ? amateur.descriptionEs : amateur.descriptionEn}
            </p>

            {/* Age */}
            <ul className="flex flex-col gap-2">
              <li className="flex items-start gap-3">
                <CheckCircle size={16} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-foreground/80 font-sans">18+</span>
              </li>
            </ul>

            {/* Category rules */}
            {(language === 'es' ? amateur.rulesEs : amateur.rulesEn) && (
              <div className="flex flex-col gap-3 border-t border-[#1A1A1A] pt-5">
                <div className="flex items-center gap-2 text-xs font-display uppercase tracking-widest text-muted-foreground">
                  <ShieldCheck size={12} className="text-gold" aria-hidden="true" />
                  {rulesLabel}
                </div>
                <ul className="flex flex-col gap-2">
                  {(language === 'es' ? amateur.rulesEs! : amateur.rulesEn!).map((rule, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground/70 font-sans leading-relaxed">
                      <span className="text-gold mt-1 flex-shrink-0">›</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Capacity bar */}
            <div className="flex flex-col gap-2 border-t border-[#1A1A1A] pt-4">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Users size={12} className="text-gold" aria-hidden="true" />
                  {language === 'es' ? 'Equipos' : 'Teams'}
                </span>
                <span className="text-foreground font-semibold">
                  {stats !== null ? stats.amateur : '—'}
                  <span className="text-muted-foreground font-normal"> / {amateur.maxSpots ?? 25}</span>
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#1E1E1E] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold/60 rounded-full transition-all duration-700"
                  style={{ width: stats !== null ? `${Math.min((stats.amateur / (amateur.maxSpots ?? 25)) * 100, 100)}%` : '0%' }}
                  aria-hidden="true"
                />
              </div>
              {stats !== null && stats.amateur >= (amateur.maxSpots ?? 25) && (
                <span className="text-xs text-red-400 font-sans font-semibold">
                  {language === 'es' ? '¡Cupos agotados!' : 'Sold out!'}
                </span>
              )}
            </div>

            <a
              href="#register"
              className="self-start font-display uppercase tracking-widest text-xs border border-[#2A2A2A] hover:border-gold text-foreground hover:text-gold px-6 py-3 transition-all duration-200 font-semibold mt-auto"
            >
              {registerLabel}
            </a>
          </div>

          {/* Pro */}
          <div className="flex flex-col gap-6 p-8 md:p-12 relative overflow-hidden bg-[#0A0A0A] group">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold" aria-hidden="true" />

            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-display tracking-widest uppercase border border-gold/50 text-gold px-2 py-0.5 self-start">
                  {language === 'es' ? pro.nameEs.split(' ')[0] : pro.nameEn.split(' ')[0]}
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold uppercase text-foreground mt-2">
                  {language === 'es' ? pro.nameEs : pro.nameEn}
                </h3>
              </div>
              <span className="font-display text-5xl font-bold text-gold/10">01</span>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed font-sans">
              {language === 'es' ? pro.descriptionEs : pro.descriptionEn}
            </p>

            {/* Age */}
            <ul className="flex flex-col gap-2">
              <li className="flex items-start gap-3">
                <CheckCircle size={16} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-foreground/80 font-sans">18+</span>
              </li>
            </ul>

            {/* Category rules */}
            {(language === 'es' ? pro.rulesEs : pro.rulesEn) && (
              <div className="flex flex-col gap-3 border-t border-[#2A2A2A] pt-5">
                <div className="flex items-center gap-2 text-xs font-display uppercase tracking-widest text-gold/70">
                  <ShieldCheck size={12} className="text-gold" aria-hidden="true" />
                  {rulesLabel}
                </div>
                <ul className="flex flex-col gap-2">
                  {(language === 'es' ? pro.rulesEs! : pro.rulesEn!).map((rule, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground/70 font-sans leading-relaxed">
                      <span className="text-gold mt-1 flex-shrink-0">›</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Capacity bar */}
            <div className="flex flex-col gap-2 border-t border-[#2A2A2A] pt-4">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Users size={12} className="text-gold" aria-hidden="true" />
                  {language === 'es' ? 'Cupos' : 'Spots'}
                </span>
                <span className="text-foreground font-semibold">
                  {stats !== null ? stats.pro : '—'}
                  <span className="text-muted-foreground font-normal"> / {pro.maxSpots ?? 50}</span>
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#1E1E1E] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full transition-all duration-700"
                  style={{ width: stats !== null ? `${Math.min((stats.pro / (pro.maxSpots ?? 50)) * 100, 100)}%` : '0%' }}
                  aria-hidden="true"
                />
              </div>
              {stats !== null && stats.pro >= (pro.maxSpots ?? 50) && (
                <span className="text-xs text-red-400 font-sans font-semibold">
                  {language === 'es' ? '¡Cupos agotados!' : 'Sold out!'}
                </span>
              )}
            </div>

            <a
              href="#register"
              className="self-start font-display uppercase tracking-widest text-xs bg-gold text-black px-6 py-3 hover:bg-gold-bright transition-colors duration-200 font-bold mt-auto"
            >
              {registerLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

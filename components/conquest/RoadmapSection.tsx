'use client'

import { useLanguage } from '@/lib/language-context'

export function RoadmapSection() {
  const { language } = useLanguage()

  return (
    <section id="roadmap" className="bg-background py-24 md:py-32 relative overflow-hidden">
      {/* Big background text */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[20vw] font-bold text-[#111] select-none pointer-events-none leading-none whitespace-nowrap"
        aria-hidden="true"
      >
        2026
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center justify-center min-h-[260px] gap-4">
        <span className="text-xs font-display tracking-widest uppercase text-gold">
          {language === 'es' ? 'Hoja de Ruta' : 'Roadmap'}
        </span>
        <p className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-none text-foreground/20 tracking-widest">
          {language === 'es' ? 'Próximamente' : 'Coming Soon'}
        </p>
        <div className="conquest-separator" />
      </div>
    </section>
  )
}

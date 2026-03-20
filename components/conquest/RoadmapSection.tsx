'use client'

import { useLanguage } from '@/lib/language-context'
import { User, BarChart2, Activity, TrendingUp, Calendar, Users } from 'lucide-react'

const icons = [User, BarChart2, Activity, TrendingUp, Calendar, Users]

const roadmapData = {
  es: {
    label: 'Hoja de Ruta',
    title: 'Hoja de Ruta 2026',
    subtitle: 'Fases principales de Conquest Games',
    phases: [
      { phase: 'Q1', title: 'Lanzamiento', text: 'Apertura de inscripciones' },
      { phase: 'Q2', title: 'Entrenamiento', text: 'Preparación de atletas' },
      { phase: 'Q3', title: 'Competencia', text: 'Día principal del evento' },
      { phase: 'Q4', title: 'Resultados', text: 'Clasificaciones finales' },
    ],
  },
  en: {
    label: 'Roadmap',
    title: 'Roadmap 2026',
    subtitle: 'Key phases of Conquest Games',
    phases: [
      { phase: 'Q1', title: 'Launch', text: 'Registration opens' },
      { phase: 'Q2', title: 'Training', text: 'Athlete preparation' },
      { phase: 'Q3', title: 'Competition', text: 'Main event day' },
      { phase: 'Q4', title: 'Results', text: 'Final standings' },
    ],
  },
}

export function RoadmapSection() {
  const { language } = useLanguage()
  const data = roadmapData[language]

  return (
    <section id="roadmap" className="bg-background py-24 md:py-32 relative overflow-hidden">
      {/* Big background text */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[20vw] font-bold text-[#111] select-none pointer-events-none leading-none whitespace-nowrap"
        aria-hidden="true"
      >
        2026
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-display tracking-widest uppercase text-gold">
              {data.label}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-none text-foreground">
              {data.title}
            </h2>
            <div className="conquest-separator" />
          </div>
          <p className="text-muted-foreground text-sm font-sans max-w-sm leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1A1A1A]">
          {data.phases.map((feature, i) => {
            const Icon = icons[i] || Activity
            return (
              <div
                key={i}
                className="group bg-[#0A0A0A] p-8 flex flex-col gap-4 hover:bg-[#0E0E0E] transition-colors duration-200 relative overflow-hidden"
              >
                {/* Corner accent on hover */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/0 group-hover:border-gold/60 transition-all duration-300" aria-hidden="true" />

                <div className="flex items-start justify-between">
                  <div className="flex items-center justify-center w-10 h-10 border border-[#2A2A2A] group-hover:border-gold/50 transition-colors duration-200">
                    <Icon size={18} className="text-gold" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-display uppercase tracking-widest border border-[#2A2A2A] text-muted-foreground/60 px-2 py-0.5">
                    {feature.phase}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground group-hover:text-gold transition-colors duration-200">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                  {feature.text}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

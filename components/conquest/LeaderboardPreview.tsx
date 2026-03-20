'use client'

import { useLanguage } from '@/lib/language-context'
import { siteCopy } from '@/content/site-copy'
import { Trophy, Medal } from 'lucide-react'

const posStyles: Record<number, { bg: string; text: string; border: string }> = {
  1: { bg: 'bg-gold/10', text: 'text-gold', border: 'border-gold/30' },
  2: { bg: 'bg-[#C0C0C0]/10', text: 'text-[#C0C0C0]', border: 'border-[#C0C0C0]/30' },
  3: { bg: 'bg-[#CD7F32]/10', text: 'text-[#CD7F32]', border: 'border-[#CD7F32]/30' },
}

export function LeaderboardPreview() {
  const { language } = useLanguage()
  const copy = siteCopy[language]
  const data = [
    { pos: 1, name: 'Alex Morales', time: '47:23', category: 'Pro' },
    { pos: 2, name: 'Sofia Rivera', time: '49:15', category: 'Pro' },
    { pos: 3, name: 'Juan Castillo', time: '51:42', category: 'Amateur' },
  ]

  return (
    <section id="leaderboard" className="bg-[#0A0A0A] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-display tracking-widest uppercase text-gold">
              Tabla de Posiciones
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-none text-foreground">
              Leaderboard
            </h2>
            <div className="conquest-separator" />
          </div>
          <p className="text-muted-foreground text-sm font-sans max-w-xs">
            Posiciones en vivo de atletas
          </p>
        </div>

        {/* Table */}
        <div className="border border-[#2A2A2A] overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-[#0E0E0E] border-b border-[#2A2A2A]">
            <span className="col-span-1 text-xs font-display uppercase tracking-widest text-muted-foreground">
              Pos.
            </span>
            <span className="col-span-6 text-xs font-display uppercase tracking-widest text-muted-foreground">
              Atleta
            </span>
            <span className="col-span-2 text-xs font-display uppercase tracking-widest text-muted-foreground text-right">
              Tiempo
            </span>
            <span className="col-span-3 text-xs font-display uppercase tracking-widest text-muted-foreground text-right">
              Categoría
            </span>
          </div>

          {/* Rows */}
          {data.map((row, i) => {
            const style = posStyles[row.pos]
            return (
              <div
                key={i}
                className={`grid grid-cols-12 gap-4 items-center px-6 py-5 border-b border-[#1A1A1A] last:border-b-0 transition-colors duration-150 hover:bg-[#0E0E0E] ${
                  row.pos <= 3 ? style.bg : ''
                }`}
              >
                {/* Position */}
                <div className="col-span-1 flex items-center">
                  {row.pos <= 3 ? (
                    <div className={`flex items-center justify-center w-8 h-8 border ${style.border}`}>
                      {row.pos === 1 ? (
                        <Trophy size={14} className={style.text} aria-hidden="true" />
                      ) : (
                        <Medal size={14} className={style.text} aria-hidden="true" />
                      )}
                    </div>
                  ) : (
                    <span className="font-display text-lg font-bold text-[#333]">
                      {String(row.pos).padStart(2, '0')}
                    </span>
                  )}
                </div>

                {/* Name */}
                <div className="col-span-6">
                  <span
                    className={`font-display text-base md:text-lg font-bold uppercase tracking-wide ${
                      row.pos <= 3 ? style.text : 'text-foreground'
                    }`}
                  >
                    {row.name}
                  </span>
                </div>

                {/* Time */}
                <div className="col-span-2 text-right">
                  <span className="font-display text-base md:text-lg font-bold text-foreground/70 tabular-nums">
                    {row.time}
                  </span>
                </div>

                {/* Category */}
                <div className="col-span-3 text-right">
                  <span
                    className={`text-xs font-display uppercase tracking-widest border px-2 py-0.5 ${
                      row.category === 'Pro'
                        ? 'border-gold/40 text-gold'
                        : 'border-[#2A2A2A] text-muted-foreground'
                    }`}
                  >
                    {row.category}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-xs text-muted-foreground/50 font-sans">
          * Datos simulados — clasificación oficial disponible tras la competencia.
        </p>
      </div>
    </section>
  )
}

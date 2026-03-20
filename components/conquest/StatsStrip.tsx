'use client'

import { useLanguage } from '@/lib/language-context'
import { siteCopy } from '@/content/site-copy'
import { Users, Tag, Clock, Zap } from 'lucide-react'

export function StatsStrip() {
  const { language } = useLanguage()
  const copy = siteCopy[language]

  const stats = [
    { icon: Users, value: copy.stats.athletes, sub: copy.stats.athletes_sub },
    { icon: Tag, value: copy.stats.categories, sub: copy.stats.categories_sub },
    { icon: Clock, value: copy.stats.time, sub: copy.stats.time_sub },
    { icon: Zap, value: copy.stats.format, sub: copy.stats.format_sub },
  ]

  return (
    <section className="bg-[#0E0E0E] border-y border-[#2A2A2A]" aria-label="Event stats">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#2A2A2A]">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-2 py-8 px-6 group"
            >
              <Icon
                size={20}
                className="text-gold mb-1 group-hover:scale-110 transition-transform duration-200"
                aria-hidden="true"
              />
              <span className="font-display text-2xl md:text-3xl font-bold uppercase tracking-wide text-foreground">
                {stat.value}
              </span>
              <span className="text-xs font-sans uppercase tracking-widest text-muted-foreground">
                {stat.sub}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

'use client'

import { useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useLanguage } from '@/lib/language-context'
import { Handshake } from 'lucide-react'

const sponsors = [
  { name: 'PowerFit', category: 'Gold' },
  { name: 'AthleticPro', category: 'Gold' },
  { name: 'Nutrimax', category: 'Silver' },
  { name: 'RunZone', category: 'Silver' },
  { name: 'EliteGear', category: 'Bronze' },
  { name: 'SportsPlex', category: 'Bronze' },
  { name: 'FitCore', category: 'Silver' },
  { name: 'ApexWear', category: 'Bronze' },
]

const categoryStyle: Record<string, string> = {
  Gold: 'border-gold/50 text-gold',
  Silver: 'border-[#C0C0C0]/40 text-[#C0C0C0]',
  Bronze: 'border-[#CD7F32]/40 text-[#CD7F32]',
}

export function SponsorsSection() {
  const { language } = useLanguage()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true })

  const autoplay = useCallback(() => {
    if (!emblaApi) return
    const interval = setInterval(() => emblaApi.scrollNext(), 2500)
    return () => clearInterval(interval)
  }, [emblaApi])

  useEffect(() => {
    const cleanup = autoplay()
    return cleanup
  }, [autoplay])

  const copy = {
    es: {
      label: 'Sponsors',
      title: 'Nuestros Patrocinadores',
      subtitle: 'Marcas que hacen posible Conquest Games',
      ctaLabel: '¿Quieres ser sponsor?',
      ctaText: 'Únete a las marcas que impulsan la élite deportiva de Latinoamérica.',
      ctaButton: 'Contáctanos',
    },
    en: {
      label: 'Sponsors',
      title: 'Our Sponsors',
      subtitle: 'Brands that make Conquest Games possible',
      ctaLabel: 'Become a Sponsor',
      ctaText: 'Join the brands driving elite sport across Latin America.',
      ctaButton: 'Get in Touch',
    },
  }[language]

  return (
    <section id="sponsors" className="bg-[#0A0A0A] py-20 md:py-28 border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-display tracking-widest uppercase text-gold">{copy.label}</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase leading-none text-foreground">
            {copy.title}
          </h2>
          <div className="conquest-separator" />
          <p className="text-muted-foreground text-sm font-sans mt-1">{copy.subtitle}</p>
        </div>

        {/* Layout: carousel + CTA */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

          {/* Carousel */}
          <div className="flex-1 overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {[...sponsors, ...sponsors].map((s, i) => (
                <div
                  key={i}
                  className={`flex-shrink-0 w-44 h-24 border ${categoryStyle[s.category]} bg-[#0E0E0E] flex flex-col items-center justify-center gap-1 px-4`}
                >
                  <span className="font-display text-base font-bold uppercase tracking-wide">{s.name}</span>
                  <span className={`text-[10px] font-display uppercase tracking-widest opacity-60`}>{s.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Panel */}
          <div className="lg:w-72 flex-shrink-0 border border-[#2A2A2A] bg-[#0E0E0E] p-6 flex flex-col gap-4 relative overflow-hidden">
            {/* Gold corner accent */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold" aria-hidden="true" />

            <div className="flex items-center justify-center w-10 h-10 border border-gold/30 bg-gold/10">
              <Handshake size={18} className="text-gold" aria-hidden="true" />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                {copy.ctaLabel}
              </h3>
              <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                {copy.ctaText}
              </p>
            </div>

            <a
              href="mailto:sponsors@conquestgames.com"
              className="mt-auto inline-block text-center text-xs font-display font-bold uppercase tracking-widest bg-gold text-black px-5 py-3 hover:bg-gold-bright transition-colors duration-200"
            >
              {copy.ctaButton}
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}


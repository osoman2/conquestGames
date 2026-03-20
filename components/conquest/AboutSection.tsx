'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useLanguage } from '@/lib/language-context'
import { siteCopy } from '@/content/site-copy'
import { Target } from 'lucide-react'

export function AboutSection() {
  const { language } = useLanguage()
  const copy = siteCopy[language]

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    const interval = setInterval(() => emblaApi.scrollNext(), 4500)
    return () => {
      emblaApi.off('select', onSelect)
      clearInterval(interval)
    }
  }, [emblaApi, onSelect])

  return (
    <section id="about" className="bg-background py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Text content */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-display tracking-widest uppercase text-gold">
              {copy.about.label}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-none text-balance text-foreground">
              {copy.about.title}
            </h2>
            <div className="conquest-separator" />
          </div>

          <p className="text-muted-foreground text-base leading-relaxed font-sans">
            {copy.about.description}
          </p>

          <div className="border-l-2 border-gold pl-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-gold">
              <Target size={16} aria-hidden="true" />
              <span className="font-display text-sm uppercase tracking-widest font-semibold">
                {copy.about.mission_title}
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed font-sans">
              {copy.about.mission_text}
            </p>
          </div>

          <a
            href="#register"
            className="self-start font-display uppercase tracking-widest text-xs bg-transparent border border-gold text-gold px-6 py-3 hover:bg-gold hover:text-black transition-all duration-200 font-semibold"
          >
            {copy.navbar.register}
          </a>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="relative overflow-hidden aspect-[4/5]" ref={emblaRef}>
            <div className="flex h-full">
              {/* Slide 1: Logo */}
              <div className="flex-shrink-0 w-full h-full bg-[#0A0A0A] flex items-center justify-center">
                <img
                  src="/branding/conquest-games-logo.svg"
                  alt="Conquest Games"
                  className="w-2/3 max-w-[260px] select-none"
                  draggable={false}
                />
              </div>
              {/* Slide 2: Athlete image */}
              <div className="flex-shrink-0 w-full h-full relative overflow-hidden">
                <img
                  src="/images/about-bg.jpg"
                  alt="Atleta Conquest Games realizando farmer carry"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
            </div>

            {/* Gold corner accent — top-right only (bottom-left conflicts with stat card) */}
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold z-10" aria-hidden="true" />
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-4 right-4 z-10 flex gap-2">
            {[0, 1].map((idx) => (
              <button
                key={idx}
                onClick={() => emblaApi?.scrollTo(idx)}
                className={`w-2 h-2 transition-all duration-300 ${selectedIndex === idx ? 'bg-gold w-5' : 'bg-white/40'}`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Floating stat card */}
          <div className="absolute -bottom-6 -left-6 bg-[#0E0E0E] border border-[#2A2A2A] p-6 hidden md:flex flex-col gap-1">
            <span className="font-display text-4xl font-bold text-gold">4.8</span>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-sans">km totales</span>
          </div>
        </div>
      </div>
    </section>
  )
}

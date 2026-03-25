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

  const WA_NUMBER = '51990809868'
  const WA_MSG_ES = encodeURIComponent('Hola, estoy interesado/a en ser sponsor de Conquest Games. Me gustaría recibir información sobre los paquetes de patrocinio disponibles.')
  const WA_MSG_EN = encodeURIComponent('Hello, I\'m interested in becoming a sponsor for Conquest Games. I\'d like to receive information about available sponsorship packages.')
  const EMAIL = 'Info@theconquestgames.com'
  const EMAIL_SUBJECT_ES = encodeURIComponent('Quiero ser Sponsor | Conquest Games')
  const EMAIL_SUBJECT_EN = encodeURIComponent('I want to be a Sponsor | Conquest Games')
  const EMAIL_BODY_ES = encodeURIComponent('Hola,\n\nEstoy interesado/a en ser sponsor de Conquest Games y me gustaría recibir información sobre los paquetes de patrocinio disponibles.\n\nQuedo en espera de su respuesta.\n\nSaludos,')
  const EMAIL_BODY_EN = encodeURIComponent('Hello,\n\nI am interested in becoming a sponsor for Conquest Games and would like to receive information about available sponsorship packages.\n\nLooking forward to your response.\n\nBest regards,')

  const copy = {
    es: {
      label: 'Sponsors',
      title: 'Nuestros Patrocinadores',
      subtitle: 'Marcas que hacen posible Conquest Games',
      ctaLabel: '¿Quieres ser sponsor?',
      ctaText: 'Únete a las marcas que impulsan la élite deportiva de Latinoamérica.',
      ctaButtonWa: 'WhatsApp',
      ctaButtonEmail: 'Enviar Email',
      waHref: `https://wa.me/${WA_NUMBER}?text=${WA_MSG_ES}`,
      emailHref: `mailto:${EMAIL}?subject=${EMAIL_SUBJECT_ES}&body=${EMAIL_BODY_ES}`,
    },
    en: {
      label: 'Sponsors',
      title: 'Our Sponsors',
      subtitle: 'Brands that make Conquest Games possible',
      ctaLabel: 'Become a Sponsor',
      ctaText: 'Join the brands driving elite sport across Latin America.',
      ctaButtonWa: 'WhatsApp',
      ctaButtonEmail: 'Send Email',
      waHref: `https://wa.me/${WA_NUMBER}?text=${WA_MSG_EN}`,
      emailHref: `mailto:${EMAIL}?subject=${EMAIL_SUBJECT_EN}&body=${EMAIL_BODY_EN}`,
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

            <div className="mt-auto flex flex-col gap-2">
              <a
                href={copy.waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-xs font-display font-bold uppercase tracking-widest bg-gold text-black px-5 py-3 hover:bg-gold-bright transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.527 5.845L.057 23.5l5.825-1.527A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.876 9.876 0 01-5.031-1.378l-.36-.214-3.733.979.999-3.645-.235-.374A9.865 9.865 0 012.106 12C2.106 6.54 6.54 2.106 12 2.106S21.894 6.54 21.894 12 17.46 21.894 12 21.894z"/></svg>
                {copy.ctaButtonWa}
              </a>
              <a
                href={copy.emailHref}
                className="inline-block text-center text-xs font-display uppercase tracking-widest text-muted-foreground hover:text-gold border border-[#2A2A2A] hover:border-gold px-5 py-2.5 transition-colors duration-200"
              >
                {copy.ctaButtonEmail}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}


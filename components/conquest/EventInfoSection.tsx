'use client'

import { useLanguage } from '@/lib/language-context'
import { eventData } from '@/content/event-data'
import { siteCopy } from '@/content/site-copy'
import { Clock, MapPin, Users, Gauge, CheckCircle } from 'lucide-react'

export function EventInfoSection() {
  const { language } = useLanguage()
  const copy = siteCopy[language]

  return (
    <section className="bg-[#0A0A0A] py-24 md:py-32 border-t border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-display tracking-widest uppercase text-gold">
            {language === 'es' ? 'Detalles Importantes' : 'Important Details'}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-none text-foreground">
            {copy.eventInfo.title}
          </h2>
          <div className="conquest-separator" />
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Date */}
          <div className="border border-[#2A2A2A] p-6 flex gap-4">
            <Clock size={24} className="text-gold flex-shrink-0" aria-hidden="true" />
            <div className="flex flex-col gap-2">
              <span className="text-xs font-display uppercase tracking-widest text-muted-foreground">
                {copy.eventInfo.date}
              </span>
              <p className="text-foreground font-display text-lg font-semibold">{eventData.date}</p>
              <p className="text-sm text-muted-foreground">{eventData.time}</p>
            </div>
          </div>

          {/* Location */}
          <div className="border border-[#2A2A2A] p-6 flex gap-4">
            <MapPin size={24} className="text-gold flex-shrink-0" aria-hidden="true" />
            <div className="flex flex-col gap-2">
              <span className="text-xs font-display uppercase tracking-widest text-muted-foreground">
                {copy.eventInfo.location}
              </span>
              <p className="text-foreground font-display text-lg font-semibold">{eventData.location}</p>
              <p className="text-sm text-muted-foreground">{eventData.address}</p>
            </div>
          </div>

          {/* Duration */}
          <div className="border border-[#2A2A2A] p-6 flex gap-4">
            <Gauge size={24} className="text-gold flex-shrink-0" aria-hidden="true" />
            <div className="flex flex-col gap-2">
              <span className="text-xs font-display uppercase tracking-widest text-muted-foreground">
                {copy.eventInfo.duration}
              </span>
              <p className="text-foreground font-display text-lg font-semibold">{eventData.duration}</p>
              <p className="text-sm text-muted-foreground">
                {language === 'es' ? 'Aprox. por atleta' : 'Approx. per athlete'}
              </p>
            </div>
          </div>

          {/* Capacity */}
          <div className="border border-[#2A2A2A] p-6 flex gap-4">
            <Users size={24} className="text-gold flex-shrink-0" aria-hidden="true" />
            <div className="flex flex-col gap-2">
              <span className="text-xs font-display uppercase tracking-widest text-muted-foreground">
                {copy.eventInfo.capacity}
              </span>
              <p className="text-foreground font-display text-lg font-semibold">{eventData.capacity}</p>
              <p className="text-sm text-muted-foreground">
                {language === 'es' ? 'Cupos totales' : 'Total spots'}
              </p>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="border border-[#2A2A2A] p-8 flex flex-col gap-6">
          <h3 className="font-display text-xl uppercase tracking-widest font-bold text-gold">
            {copy.eventInfo.requirements}
          </h3>
          <ul className="grid md:grid-cols-2 gap-4">
            {eventData.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-foreground/80 font-sans">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Amenities */}
        <div className="bg-gold/5 border border-gold/20 p-8 flex flex-col gap-6">
          <h3 className="font-display text-xl uppercase tracking-widest font-bold text-gold">
            {language === 'es' ? 'Facilidades' : 'Amenities'}
          </h3>
          <ul className="grid md:grid-cols-2 gap-4">
            {eventData.amenities.map((amenity, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-foreground/80 font-sans">{amenity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

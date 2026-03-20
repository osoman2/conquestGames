'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { circuitData } from '@/content/circuit-data'
import { X, ChevronRight, Activity, Dumbbell, Wind, AlertTriangle } from 'lucide-react'

type Stage = {
  id: number
  name: string
  distance?: string
  reps?: string
  label: string
  description: string
  tests: string
  tactical: string
  difficulty: string
}

const difficultyColors: Record<string, string> = {
  Moderado: 'text-green-400 border-green-400/30 bg-green-400/10',
  Moderate: 'text-green-400 border-green-400/30 bg-green-400/10',
  Alto: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  High: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  'Muy alto': 'text-orange-400 border-orange-400/30 bg-orange-400/10',
  'Very High': 'text-orange-400 border-orange-400/30 bg-orange-400/10',
  Extremo: 'text-red-400 border-red-400/30 bg-red-400/10',
  Extreme: 'text-red-400 border-red-400/30 bg-red-400/10',
  Final: 'text-red-400 border-red-400/30 bg-red-400/10',
}

const stageIcons: Record<string, React.ElementType> = {
  Running: Activity,
  Potencia: Dumbbell,
  Power: Dumbbell,
  Agarre: Dumbbell,
  Grip: Dumbbell,
  Explosivo: Wind,
  Explosive: Wind,
  Final: Activity,
}

export function InteractiveCircuit() {
  const { language } = useLanguage()
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null)
  const stages = circuitData.stages as Stage[]

  return (
    <section id="circuit" className="bg-[#0A0A0A] py-24 md:py-32 relative overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%), repeating-linear-gradient(90deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-16">
          <span className="text-xs font-display tracking-widest uppercase text-gold">
            {t.circuit.label}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-none text-foreground">
            {t.circuit.title}
          </h2>
          <div className="conquest-separator" />
          <p className="text-muted-foreground text-sm font-sans mt-2">{t.circuit.subtitle}</p>
        </div>

        {/* Circuit timeline */}
        <div className="relative flex flex-col gap-0">
          {/* Vertical connector line */}
          <div className="absolute left-6 md:left-8 top-6 bottom-6 w-px bg-[#2A2A2A]" aria-hidden="true" />

          {stages.map((stage, idx) => {
            const isRunning = stage.label === 'Running'
            const Icon = stageIcons[stage.label] || Activity
            const isSelected = selectedStage?.id === stage.id

            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(isSelected ? null : stage)}
                className={`relative flex items-start gap-6 md:gap-8 py-5 px-0 text-left group transition-all duration-200 ${
                  isSelected ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
                aria-label={`Ver detalles: ${stage.name}`}
              >
                {/* Step indicator */}
                <div
                  className={`relative z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-gold bg-gold text-black'
                      : isRunning
                      ? 'border-[#333] bg-[#111] text-muted-foreground group-hover:border-gold/50'
                      : 'border-gold/40 bg-[#111] text-gold group-hover:border-gold'
                  }`}
                >
                  <Icon size={20} aria-hidden="true" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2 md:gap-6 pt-2 md:pt-3 pb-5 border-b border-[#1A1A1A]">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className={`font-display text-lg md:text-xl font-bold uppercase tracking-wide transition-colors ${isSelected ? 'text-gold' : 'text-foreground group-hover:text-gold'}`}>
                      {stage.name}
                    </span>
                    <span className={`text-xs font-display uppercase tracking-widest border px-2 py-0.5 ${isRunning ? 'border-[#333] text-muted-foreground' : 'border-gold/30 text-gold/80'}`}>
                      {stage.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {stage.distance && (
                      <span className="font-display text-2xl font-bold text-foreground/60">
                        {stage.distance}
                      </span>
                    )}
                    {stage.reps && (
                      <span className="font-display text-lg font-bold text-foreground/60">
                        {stage.reps}
                      </span>
                    )}
                    <ChevronRight
                      size={16}
                      className={`text-gold transition-transform duration-200 ${isSelected ? 'rotate-90' : ''}`}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Detail panel */}
        {selectedStage && (
          <div className="mt-8 border border-[#2A2A2A] bg-[#0E0E0E] relative overflow-hidden">
            {/* Gold accent top bar */}
            <div className="h-0.5 bg-gold w-full" />

            <div className="p-6 md:p-10">
              <button
                onClick={() => setSelectedStage(null)}
                className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Cerrar detalle"
              >
                <X size={18} />
              </button>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-xs tracking-widest text-gold uppercase">
                      {String(selectedStage.id).padStart(2, '0')} / {String(stages.length).padStart(2, '0')}
                    </span>
                    <div className="flex-1 h-px bg-[#2A2A2A]" />
                    <span
                      className={`text-xs font-display uppercase tracking-widest border px-2 py-0.5 ${
                        difficultyColors[selectedStage.difficulty] || 'text-muted-foreground border-muted'
                      }`}
                    >
                      {t.circuit.difficulty_label}: {selectedStage.difficulty}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl font-bold uppercase text-foreground">
                    {selectedStage.name}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                    {selectedStage.description}
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2 border-l-2 border-gold pl-4">
                    <span className="text-xs font-display uppercase tracking-widest text-gold font-semibold">
                      {t.circuit.tests_label}
                    </span>
                    <p className="text-foreground/80 text-sm font-sans">{selectedStage.tests}</p>
                  </div>

                  <div className="flex flex-col gap-2 bg-[#0A0A0A] border border-[#2A2A2A] p-4">
                    <div className="flex items-center gap-2 text-gold">
                      <AlertTriangle size={14} aria-hidden="true" />
                      <span className="text-xs font-display uppercase tracking-widest font-semibold">
                        {t.circuit.tactical_label}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm italic font-sans">
                      {selectedStage.tactical}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

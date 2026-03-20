'use client'

import { useState } from 'react'
import { AlertCircle, AlertTriangle, Play, X } from 'lucide-react'
import { circuitStages, stageFlow } from '@/content/circuit-data'
import { siteCopy } from '@/content/site-copy'
import { useLanguage } from '@/lib/language-context'

// Label badge per stage
function getStageLabel(id: string, language: string): string {
  if (id === 'farmer-carry') return language === 'es' ? 'AGARRE' : 'GRIP'
  if (id === 'kettlebell-swings') return language === 'es' ? 'POTENCIA' : 'POWER'
  if (id === 'burpees') return language === 'es' ? 'EXPLOSIVO' : 'EXPLOSIVE'
  if (id === 'running-final') return language === 'es' ? 'META' : 'FINISH'
  return 'RUNNING'
}

// Exercise station vs running segment
function isStation(id: string): boolean {
  return id === 'farmer-carry' || id === 'kettlebell-swings' || id === 'burpees'
}

// Split a long text into two lines for SVG
function splitLine(text: string, max = 15): [string, string] {
  if (text.length <= max) return [text, '']
  const cut = text.lastIndexOf(' ', max)
  if (cut <= 0) return [text.slice(0, max), text.slice(max)]
  return [text.slice(0, cut), text.slice(cut + 1)]
}

// Fixed zone coordinates for the snake layout
const ZONES = [
  { x: 80,  y: 60,  w: 200, h: 100 }, // 01
  { x: 322, y: 60,  w: 156, h: 100 }, // 02
  { x: 520, y: 60,  w: 200, h: 100 }, // 03
  { x: 520, y: 222, w: 200, h: 100 }, // 04
  { x: 322, y: 222, w: 156, h: 100 }, // 05
  { x: 80,  y: 222, w: 200, h: 100 }, // 06
  { x: 200, y: 384, w: 340, h: 78  }, // 07
]

const difficultyStyle: Record<string, string> = {
  easy:   'border-green-700/50 text-green-500 bg-green-900/10',
  medium: 'border-yellow-700/50 text-yellow-500 bg-yellow-900/10',
  hard:   'border-red-700/50 text-red-500 bg-red-900/10',
}

export function CircuitVisualization() {
  const { language } = useLanguage()
  const copy = siteCopy[language]
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null)
  const selectedStage = circuitStages.find(s => s.id === selectedStageId) ?? null
  const handleToggle = (id: string) => setSelectedStageId(prev => prev === id ? null : id)

  return (
    <section id="circuit" className="bg-[#080808] py-24 md:py-32 border-t border-b border-[#2A2A2A] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: 'linear-gradient(#C9A84C 1px,transparent 1px),linear-gradient(90deg,#C9A84C 1px,transparent 1px)', backgroundSize: '60px 60px' }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-display tracking-widest uppercase text-gold">{copy.circuit.subtitle}</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-none text-foreground">{copy.circuit.title}</h2>
          <div className="conquest-separator" />
        </div>

        {/* Map card */}
        <div className="bg-[#0A0A0A] border border-[#1A1A1A]">
          {/* Title bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#1A1A1A]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gold" />
              <span className="text-xs font-display tracking-widest uppercase text-muted-foreground">
                {language === 'es' ? 'Mapa del Circuito' : 'Circuit Map'}
              </span>
            </div>
            <span className="text-xs font-display tracking-widest text-gold">7 {language === 'es' ? 'ETAPAS' : 'STAGES'}</span>
          </div>

          {/* SVG */}
          <div className="p-4 md:p-6 overflow-x-auto">
            <svg viewBox="0 0 800 490" className="w-full min-w-[520px] h-auto" aria-label="Circuit map">
              <defs>
                <marker id="aR" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L8,3z" fill="#C9A84C"/></marker>
                <marker id="aL" markerWidth="8" markerHeight="8" refX="1" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M8,0 L8,6 L0,3z" fill="#C9A84C"/></marker>
                <marker id="aD" markerWidth="8" markerHeight="8" refX="3" refY="7" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,0 L3,8z" fill="#C9A84C"/></marker>
              </defs>

              {/* Background track */}
              <rect x="60" y="40" width="680" height="430" fill="#0E0E0E" stroke="#1A1A1A" strokeWidth="1.5" rx="3"/>

              {/* Connection arrows */}
              <path d="M280,110 L320,110" stroke="#333" strokeWidth="2.5" strokeDasharray="6 3" markerEnd="url(#aR)" fill="none"/>
              <path d="M478,110 L518,110" stroke="#333" strokeWidth="2.5" strokeDasharray="6 3" markerEnd="url(#aR)" fill="none"/>
              <path d="M620,160 L620,220" stroke="#333" strokeWidth="2.5" strokeDasharray="6 3" markerEnd="url(#aD)" fill="none"/>
              <path d="M520,270 L480,270" stroke="#333" strokeWidth="2.5" strokeDasharray="6 3" markerEnd="url(#aL)" fill="none"/>
              <path d="M322,270 L282,270" stroke="#333" strokeWidth="2.5" strokeDasharray="6 3" markerEnd="url(#aL)" fill="none"/>
              <path d="M180,322 L180,385 L202,422" stroke="#333" strokeWidth="2.5" strokeDasharray="6 3" markerEnd="url(#aD)" fill="none"/>

              {/* Stage cards */}
              {stageFlow.map((stageId, idx) => {
                const stage = circuitStages.find(s => s.id === stageId)
                const z = ZONES[idx]
                if (!stage || !z) return null
                const sel = selectedStageId === stageId
                const stat = isStation(stageId)
                const name = (language === 'es' ? stage.nameEs : stage.nameEn).toUpperCase()
                const [l1, l2] = splitLine(name, 14)
                const cx = z.x + z.w / 2
                // Vertical layout inside card:
                // - number badge: top 18px
                // - name (1 or 2 lines): starts at ~32px from top
                // - metric: fixed at 62px from top
                // - label badge (stations only): bottom 22px
                const nameY = z.y + (l2 ? 32 : 40)
                const metricY = z.y + 64

                return (
                  <g key={stageId} onClick={() => handleToggle(stageId)} className="cursor-pointer"
                     role="button" tabIndex={0} aria-label={name} onKeyDown={e => e.key === 'Enter' && handleToggle(stageId)}>
                    <rect x={z.x} y={z.y} width={z.w} height={z.h}
                      fill={sel ? '#1A1500' : stat ? '#1A1500' : '#111111'}
                      stroke={sel ? '#C9A84C' : stat ? '#7A6510' : '#3A3A3A'}
                      strokeWidth={sel ? 2 : 1.5} rx="2"/>
                    {/* Number badge */}
                    <rect x={z.x} y={z.y} width={26} height={18} fill={sel ? '#C9A84C' : '#1E1E1E'}/>
                    <text x={z.x+13} y={z.y+13} textAnchor="middle" fontSize="9" fontWeight="bold"
                      fill={sel ? '#080808' : '#C9A84C'} fontFamily="monospace">{String(idx+1).padStart(2,'0')}</text>
                    {/* Name */}
                    <text x={cx} y={nameY} textAnchor="middle" fontSize="11" fontWeight="bold"
                      fill={sel ? '#C9A84C' : '#DDD'} fontFamily="sans-serif" letterSpacing="0.5">{l1}</text>
                    {l2 && <text x={cx} y={nameY+14} textAnchor="middle" fontSize="11" fontWeight="bold"
                      fill={sel ? '#C9A84C' : '#DDD'} fontFamily="sans-serif" letterSpacing="0.5">{l2}</text>}
                    {/* Distance / Reps */}
                    {(stage.distance || stage.reps) && (
                      <text x={cx} y={metricY} textAnchor="middle" fontSize="14" fontWeight="bold"
                        fill={sel ? '#EEE' : '#888'} fontFamily="sans-serif">
                        {stage.distance ?? `${stage.reps} reps`}
                      </text>
                    )}
                    {/* Label badge — only for exercise stations */}
                    {stat && (
                      <>
                        <rect x={cx-32} y={z.y+z.h-22} width={64} height={14} fill="none"
                          stroke={sel ? '#C9A84C' : '#7A6510'} strokeWidth="1" rx="1"/>
                        <text x={cx} y={z.y+z.h-11} textAnchor="middle" fontSize="8"
                          fill={sel ? '#C9A84C' : '#888'} fontFamily="sans-serif" letterSpacing="1">
                          {getStageLabel(stageId, language)}
                        </text>
                      </>
                    )}
                  </g>
                )
              })}

              {/* START / FINISH */}
              <rect x="80" y="42" width="44" height="14" fill="#C9A84C"/>
              <text x="102" y="52" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#080808" fontFamily="sans-serif">START</text>
              <rect x="492" y="444" width="48" height="14" fill="#C9A84C"/>
              <text x="516" y="454" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#080808" fontFamily="sans-serif">FINISH</text>

              {/* Legend */}
              <rect x="596" y="400" width="136" height="58" fill="#0A0A0A" stroke="#1A1A1A" strokeWidth="1" rx="2"/>
              <rect x="607" y="412" width="10" height="10" fill="#1A1500" stroke="#7A6510" strokeWidth="1.5"/>
              <text x="624" y="421" fontSize="9" fill="#999" fontFamily="sans-serif">{language === 'es' ? 'Estación' : 'Station'}</text>
              <rect x="607" y="430" width="10" height="10" fill="#111111" stroke="#3A3A3A" strokeWidth="1.5"/>
              <text x="624" y="439" fontSize="9" fill="#999" fontFamily="sans-serif">Running</text>
            </svg>
          </div>

          {/* Hint */}
          <div className="px-5 py-3 border-t border-[#1A1A1A] flex items-center gap-2 justify-center">
            <Play size={11} className="text-gold"/>
            <span className="text-xs font-display tracking-widest uppercase text-muted-foreground">
              {language === 'es' ? 'Haz clic en una zona para ver detalles' : 'Click a zone to view details'}
            </span>
          </div>
        </div>

        {/* Detail panel */}
        {selectedStage && (
          <div className="border border-[#2A2A2A] bg-[#0E0E0E] relative overflow-hidden">
            <div className="h-0.5 bg-gold"/>
            <div className="p-6 md:p-8">
              <button onClick={() => setSelectedStageId(null)}
                className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors" aria-label="Cerrar">
                <X size={16}/>
              </button>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <span className={`self-start text-xs font-display uppercase tracking-widest border px-2 py-0.5 ${difficultyStyle[selectedStage.difficulty]}`}>
                    {selectedStage.difficulty}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold uppercase text-foreground pr-6">
                    {language === 'es' ? selectedStage.nameEs : selectedStage.nameEn}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {language === 'es' ? selectedStage.descriptionEs : selectedStage.descriptionEn}
                  </p>
                  {(selectedStage.distance || selectedStage.reps) && (
                    <div className="flex gap-6">
                      {selectedStage.distance && (
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] text-muted-foreground uppercase font-display tracking-widest">{language === 'es' ? 'Distancia' : 'Distance'}</span>
                          <span className="text-2xl font-bold text-gold font-display">{selectedStage.distance}</span>
                        </div>
                      )}
                      {selectedStage.reps && (
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] text-muted-foreground uppercase font-display tracking-widest">Reps</span>
                          <span className="text-2xl font-bold text-gold font-display">{selectedStage.reps}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2 bg-[#0A0A0A] border border-[#2A2A2A] p-4">
                    <div className="flex items-center gap-2 text-gold">
                      <AlertTriangle size={13} aria-hidden="true"/>
                      <span className="text-[10px] font-display uppercase tracking-widest font-semibold">
                        {language === 'es' ? 'Consejo Táctico' : 'Tactical Tip'}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm italic">
                      {language === 'es' ? selectedStage.tactics.es : selectedStage.tactics.en}
                    </p>
                  </div>
                  <div className="bg-[#0A0A0A] border border-[#2A2A2A] aspect-video flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle size={24} className="text-gold/30"/>
                      <span className="text-[10px] font-mono text-gold/40">[ESPERANDO VIDEO]</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Note */}
        <div className="bg-gold/5 border border-gold/20 p-6 flex gap-4">
          <AlertCircle size={20} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true"/>
          <p className="text-sm text-foreground/80">
            {language === 'es'
              ? 'Este esquema representa el flujo de las 7 estaciones de Conquest Games. Incluye 2 rectas con Farmer Carry y 2 rectas con Burpees para máximo desafío.'
              : 'This diagram represents the flow of 7 stations at Conquest Games. It includes 2 running straights with Farmer Carry and 2 with Burpees for maximum challenge.'}
          </p>
        </div>
      </div>
    </section>
  )
}

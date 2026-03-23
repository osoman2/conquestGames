'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { translations } from '@/lib/i18n'
import { X, Play, Activity, Dumbbell, Wind, Anchor, Target, Zap, Trophy } from 'lucide-react'

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
  Moderado: 'text-green-400',
  Moderate: 'text-green-400',
  Alto: 'text-yellow-400',
  High: 'text-yellow-400',
  'Muy alto': 'text-orange-400',
  'Very High': 'text-orange-400',
  Extremo: 'text-red-400',
  Extreme: 'text-red-400',
  Final: 'text-red-400',
}

const stageIcons: Record<string, React.ElementType> = {
  Running: Activity,
  Potencia: Dumbbell,
  Power: Dumbbell,
  Agarre: Anchor,
  Grip: Anchor,
  Explosivo: Zap,
  Explosive: Zap,
  Final: Trophy,
}

// SVG zone coordinates for each stage (optimized for the race track layout)
const zoneCoordinates = [
  // Stage 1: Run 1km - Start zone (top left)
  { x: 80, y: 60, width: 200, height: 100, pathStart: { x: 180, y: 110 }, pathEnd: { x: 320, y: 110 } },
  // Stage 2: Sled Push - Station 1 (top middle)
  { x: 320, y: 60, width: 160, height: 100, pathStart: { x: 400, y: 110 }, pathEnd: { x: 520, y: 110 } },
  // Stage 3: Run 1km - Transition (top right)
  { x: 520, y: 60, width: 200, height: 100, pathStart: { x: 620, y: 160 }, pathEnd: { x: 620, y: 220 } },
  // Stage 4: Farmer Carry - Station 2 (right side)
  { x: 520, y: 220, width: 200, height: 100, pathStart: { x: 520, y: 270 }, pathEnd: { x: 400, y: 270 } },
  // Stage 5: Run 1km - Transition (bottom right)
  { x: 320, y: 220, width: 160, height: 100, pathStart: { x: 320, y: 270 }, pathEnd: { x: 200, y: 270 } },
  // Stage 6: Wall Balls - Station 3 (bottom left)
  { x: 80, y: 220, width: 200, height: 100, pathStart: { x: 180, y: 320 }, pathEnd: { x: 180, y: 380 } },
  // Stage 7: Final Sprint - Finish zone (bottom center)
  { x: 240, y: 380, width: 320, height: 80, pathStart: { x: 400, y: 420 }, pathEnd: { x: 400, y: 420 } },
]

export function InteractiveRaceMap() {
  const { language } = useLanguage()
  const t = translations[language]
  const lang = language
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null)
  const [hoveredStage, setHoveredStage] = useState<number | null>(null)
  const stages = t.circuit.stages as unknown as Stage[]

  const handleZoneClick = (stageId: number) => {
    const stage = stages.find((s) => s.id === stageId)
    if (stage) {
      setSelectedStage(selectedStage?.id === stageId ? null : stage)
    }
  }

  return (
    <section id="circuit" className="bg-[#080808] py-24 md:py-32 relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-12">
          <span className="text-xs font-display tracking-widest uppercase text-gold">
            {t.circuit.label}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-none text-foreground">
            {t.circuit.title}
          </h2>
          <div className="conquest-separator" />
          <p className="text-muted-foreground text-sm font-sans mt-2 max-w-xl">
            {t.circuit.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr,380px] gap-8 items-start">
          {/* Interactive SVG Map */}
          <div className="relative bg-[#0A0A0A] border border-[#1A1A1A] p-4 md:p-6">
            {/* Map title bar */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#1A1A1A]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gold" />
                <span className="text-xs font-display tracking-widest uppercase text-muted-foreground">
                  {lang === 'es' ? 'Mapa del Circuito' : 'Circuit Map'}
                </span>
              </div>
              <span className="text-xs font-display tracking-widest text-gold">
                7 {lang === 'es' ? 'ETAPAS' : 'STAGES'}
              </span>
            </div>

            <svg
              viewBox="0 0 800 500"
              className="w-full h-auto"
              aria-label="Interactive race circuit map"
            >
              <defs>
                {/* Gold glow filter */}
                <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feFlood floodColor="#C9A84C" floodOpacity="0.6" />
                  <feComposite in2="blur" operator="in" />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Track pattern */}
                <pattern id="trackPattern" patternUnits="userSpaceOnUse" width="20" height="20">
                  <rect width="20" height="20" fill="#0E0E0E" />
                  <line x1="0" y1="10" x2="20" y2="10" stroke="#1A1A1A" strokeWidth="0.5" />
                </pattern>

                {/* Arrow marker */}
                <marker
                  id="arrowGold"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M0,0 L0,6 L9,3 z" fill="#C9A84C" />
                </marker>
              </defs>

              {/* Background track */}
              <rect x="60" y="40" width="680" height="420" fill="url(#trackPattern)" rx="4" />

              {/* Track outline */}
              <rect
                x="60"
                y="40"
                width="680"
                height="420"
                fill="none"
                stroke="#1A1A1A"
                strokeWidth="2"
                rx="4"
              />

              {/* Connection paths between stages */}
              <g className="transition-opacity duration-300">
                {/* Path 1 -> 2 */}
                <path
                  d="M 280 110 L 320 110"
                  stroke="#2A2A2A"
                  strokeWidth="3"
                  strokeDasharray="8 4"
                  markerEnd="url(#arrowGold)"
                />
                {/* Path 2 -> 3 */}
                <path
                  d="M 480 110 L 520 110"
                  stroke="#2A2A2A"
                  strokeWidth="3"
                  strokeDasharray="8 4"
                  markerEnd="url(#arrowGold)"
                />
                {/* Path 3 -> 4 */}
                <path
                  d="M 620 160 L 620 220"
                  stroke="#2A2A2A"
                  strokeWidth="3"
                  strokeDasharray="8 4"
                  markerEnd="url(#arrowGold)"
                />
                {/* Path 4 -> 5 */}
                <path
                  d="M 520 270 L 480 270"
                  stroke="#2A2A2A"
                  strokeWidth="3"
                  strokeDasharray="8 4"
                  markerEnd="url(#arrowGold)"
                />
                {/* Path 5 -> 6 */}
                <path
                  d="M 320 270 L 280 270"
                  stroke="#2A2A2A"
                  strokeWidth="3"
                  strokeDasharray="8 4"
                  markerEnd="url(#arrowGold)"
                />
                {/* Path 6 -> 7 */}
                <path
                  d="M 180 320 L 180 380 L 240 420"
                  stroke="#2A2A2A"
                  strokeWidth="3"
                  strokeDasharray="8 4"
                  fill="none"
                  markerEnd="url(#arrowGold)"
                />
              </g>

              {/* Stage zones */}
              {stages.map((stage, idx) => {
                const zone = zoneCoordinates[idx]
                if (!zone) return null

                const isSelected = selectedStage?.id === stage.id
                const isHovered = hoveredStage === stage.id
                const isActive = isSelected || isHovered
                const isRunning = stage.label === 'Running'
                const Icon = stageIcons[stage.label] || Activity

                return (
                  <g
                    key={stage.id}
                    className="cursor-pointer"
                    onClick={() => handleZoneClick(stage.id)}
                    onMouseEnter={() => setHoveredStage(stage.id)}
                    onMouseLeave={() => setHoveredStage(null)}
                    role="button"
                    aria-label={`${stage.name}: ${stage.description}`}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleZoneClick(stage.id)}
                  >
                    {/* Zone background */}
                    <rect
                      x={zone.x}
                      y={zone.y}
                      width={zone.width}
                      height={zone.height}
                      fill={isActive ? '#141414' : '#0E0E0E'}
                      stroke={isActive ? '#C9A84C' : isRunning ? '#222' : '#333'}
                      strokeWidth={isActive ? 2 : 1}
                      rx="2"
                      className="transition-all duration-200"
                      filter={isSelected ? 'url(#goldGlow)' : undefined}
                    />

                    {/* Stage number badge */}
                    <rect
                      x={zone.x}
                      y={zone.y}
                      width="28"
                      height="20"
                      fill={isActive ? '#C9A84C' : isRunning ? '#1A1A1A' : '#222'}
                      className="transition-all duration-200"
                    />
                    <text
                      x={zone.x + 14}
                      y={zone.y + 14}
                      textAnchor="middle"
                      className="text-[10px] font-bold"
                      fill={isActive ? '#080808' : isRunning ? '#666' : '#C9A84C'}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </text>

                    {/* Stage name */}
                    <text
                      x={zone.x + zone.width / 2}
                      y={zone.y + 45}
                      textAnchor="middle"
                      className="text-[11px] font-bold uppercase tracking-wider"
                      fill={isActive ? '#C9A84C' : '#E0E0E0'}
                    >
                      {stage.name.length > 18 ? stage.name.substring(0, 16) + '...' : stage.name}
                    </text>

                    {/* Distance/Reps */}
                    <text
                      x={zone.x + zone.width / 2}
                      y={zone.y + 65}
                      textAnchor="middle"
                      className="text-[18px] font-bold"
                      fill={isActive ? '#F0F0F0' : '#888'}
                    >
                      {stage.distance || stage.reps || ''}
                    </text>

                    {/* Label tag */}
                    <rect
                      x={zone.x + zone.width / 2 - 30}
                      y={zone.y + 75}
                      width="60"
                      height="16"
                      fill="none"
                      stroke={isActive ? '#C9A84C' : isRunning ? '#333' : '#444'}
                      strokeWidth="1"
                      rx="1"
                    />
                    <text
                      x={zone.x + zone.width / 2}
                      y={zone.y + 86}
                      textAnchor="middle"
                      className="text-[8px] uppercase tracking-widest"
                      fill={isActive ? '#C9A84C' : '#666'}
                    >
                      {stage.label}
                    </text>
                  </g>
                )
              })}

              {/* Start/Finish markers */}
              <g>
                {/* START flag */}
                <rect x="80" y="42" width="50" height="16" fill="#C9A84C" />
                <text x="105" y="53" textAnchor="middle" className="text-[9px] font-bold uppercase" fill="#080808">
                  START
                </text>

                {/* FINISH flag */}
                <rect x="510" y="442" width="50" height="16" fill="#C9A84C" />
                <text x="535" y="453" textAnchor="middle" className="text-[9px] font-bold uppercase" fill="#080808">
                  FINISH
                </text>
              </g>

              {/* Legend */}
              <g transform="translate(600, 400)">
                <rect x="0" y="0" width="120" height="50" fill="#0A0A0A" stroke="#1A1A1A" strokeWidth="1" rx="2" />
                <circle cx="15" cy="18" r="5" fill="#C9A84C" />
                <text x="28" y="21" className="text-[8px]" fill="#888">{lang === 'es' ? 'Estación' : 'Station'}</text>
                <rect x="10" y="30" width="10" height="10" fill="none" stroke="#333" strokeWidth="1" />
                <text x="28" y="38" className="text-[8px]" fill="#888">{lang === 'es' ? 'Running' : 'Running'}</text>
              </g>
            </svg>

            {/* Instruction hint */}
            <div className="mt-4 pt-4 border-t border-[#1A1A1A] flex items-center justify-center gap-2 text-muted-foreground">
              <Play size={12} className="text-gold" />
              <span className="text-xs font-display tracking-widest uppercase">
                {lang === 'es' ? 'Haz clic en una zona para ver detalles' : 'Click a zone to view details'}
              </span>
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:sticky lg:top-24">
            {selectedStage ? (
              <div className="bg-[#0A0A0A] border border-[#1A1A1A] relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
                {/* Gold accent bar */}
                <div className="h-1 bg-gold w-full" />

                <div className="p-6">
                  <button
                    onClick={() => setSelectedStage(null)}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1"
                    aria-label="Close details"
                  >
                    <X size={16} />
                  </button>

                  {/* Stage header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gold flex items-center justify-center">
                      {(() => {
                        const Icon = stageIcons[selectedStage.label] || Activity
                        return <Icon size={18} className="text-black" />
                      })()}
                    </div>
                    <div>
                      <span className="text-xs font-display tracking-widest text-gold uppercase block">
                        {lang === 'es' ? 'Etapa' : 'Stage'} {String(selectedStage.id).padStart(2, '0')}
                      </span>
                      <span className={`text-xs ${difficultyColors[selectedStage.difficulty]}`}>
                        {selectedStage.difficulty}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold uppercase text-foreground mb-2">
                    {selectedStage.name}
                  </h3>

                  {/* Distance/Reps highlight */}
                  {(selectedStage.distance || selectedStage.reps) && (
                    <div className="bg-[#111] border border-[#222] px-4 py-3 mb-4 flex items-center justify-between">
                      <span className="text-xs font-display uppercase tracking-widest text-muted-foreground">
                        {selectedStage.distance ? (lang === 'es' ? 'Distancia' : 'Distance') : (lang === 'es' ? 'Repeticiones' : 'Reps')}
                      </span>
                      <span className="font-display text-2xl font-bold text-gold">
                        {selectedStage.distance || selectedStage.reps}
                      </span>
                    </div>
                  )}

                  <p className="text-muted-foreground text-sm leading-relaxed font-sans mb-6">
                    {selectedStage.description}
                  </p>

                  {/* Tests */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target size={12} className="text-gold" />
                      <span className="text-xs font-display uppercase tracking-widest text-gold font-semibold">
                        {t.circuit.tests_label}
                      </span>
                    </div>
                    <p className="text-foreground/80 text-sm font-sans pl-5">
                      {selectedStage.tests}
                    </p>
                  </div>

                  {/* Tactical tip */}
                  <div className="bg-[#0E0E0E] border-l-2 border-gold p-4">
                    <span className="text-xs font-display uppercase tracking-widest text-gold font-semibold block mb-2">
                      {t.circuit.tactical_label}
                    </span>
                    <p className="text-muted-foreground text-sm italic font-sans">
                      {selectedStage.tactical}
                    </p>
                  </div>

                  {/* Video placeholder */}
                  <div className="mt-6 bg-[#0E0E0E] border border-[#1A1A1A] aspect-video flex items-center justify-center group cursor-pointer hover:border-gold/50 transition-colors">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-gold transition-colors">
                      <Play size={32} />
                      <span className="text-xs font-display uppercase tracking-widest">
                        {lang === 'es' ? 'Ver técnica' : 'Watch technique'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="w-16 h-16 border border-[#2A2A2A] flex items-center justify-center mb-4">
                  <Activity size={24} className="text-muted-foreground" />
                </div>
                <h3 className="font-display text-lg font-bold uppercase text-foreground mb-2">
                  {lang === 'es' ? 'Selecciona una etapa' : 'Select a stage'}
                </h3>
                <p className="text-muted-foreground text-sm font-sans max-w-xs">
                  {lang === 'es'
                    ? 'Haz clic en cualquier zona del mapa para ver los detalles de la etapa, ejercicios y consejos tácticos.'
                    : 'Click on any zone in the map to view stage details, exercises, and tactical tips.'}
                </p>
              </div>
            )}

            {/* Stage list (compact) */}
            <div className="mt-4 bg-[#0A0A0A] border border-[#1A1A1A]">
              <div className="px-4 py-3 border-b border-[#1A1A1A]">
                <span className="text-xs font-display tracking-widest uppercase text-muted-foreground">
                  {lang === 'es' ? 'Todas las etapas' : 'All stages'}
                </span>
              </div>
              <div className="divide-y divide-[#1A1A1A]">
                {stages.map((stage, idx) => {
                  const isSelected = selectedStage?.id === stage.id
                  return (
                    <button
                      key={stage.id}
                      onClick={() => handleZoneClick(stage.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        isSelected ? 'bg-gold/10' : 'hover:bg-[#111]'
                      }`}
                    >
                      <span className={`text-xs font-display font-bold ${isSelected ? 'text-gold' : 'text-muted-foreground'}`}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className={`text-xs font-display uppercase tracking-wide flex-1 ${isSelected ? 'text-gold' : 'text-foreground'}`}>
                        {stage.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {stage.distance || stage.reps}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

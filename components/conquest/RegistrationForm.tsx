'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/lib/language-context'
import { AlertCircle, Pen, Trash2, Trophy, X } from 'lucide-react'
import { RegistrationFormData, SubmissionStatus, TeammateData } from '@/types'
import { siteCopy } from '@/content/site-copy'
import { categories } from '@/content/categories'

export function RegistrationForm() {
  const { language } = useLanguage()
  const copy = siteCopy[language]

  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    dni: '',
    email: '',
    phone: '',
    age: 18,
    category: categories[0].id,
    emergencyContactName: '',
    emergencyContactPhone: '',
    transferNumber: '',
    insuranceProvider: '',
    agreeToWaiver: false,
    agreeToTerms: false,
  })

  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [showWaiverModal, setShowWaiverModal] = useState(false)

  const isAmateur = formData.category === 'amateur'

  const emptyTeammate: TeammateData = { firstName: '', lastName: '', dni: '', age: 18 }
  const [teammate, setTeammate] = useState<TeammateData>(emptyTeammate)

  const handleTeammateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTeammate(prev => ({ ...prev, [name]: name === 'age' ? Number(value) : value }))
  }

  // Signature canvas — P1
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawingRef = useRef(false)
  const [hasSigned, setHasSigned] = useState(false)

  // Signature canvas — P2 (Amateur only)
  const canvasRef2 = useRef<HTMLCanvasElement>(null)
  const isDrawingRef2 = useRef(false)
  const [hasSigned2, setHasSigned2] = useState(false)

  useEffect(() => {
    if (showWaiverModal) {
      setHasSigned(false)
      setHasSigned2(false)
      setTimeout(() => {
        const initCanvas = (canvas: HTMLCanvasElement | null) => {
          if (!canvas) return
          canvas.width = canvas.offsetWidth || 260
          canvas.height = 120
          const ctx = canvas.getContext('2d')
          if (ctx) { ctx.fillStyle = '#1A1A1A'; ctx.fillRect(0, 0, canvas.width, canvas.height) }
        }
        initCanvas(canvasRef.current)
        initCanvas(canvasRef2.current)
      }, 50)
    }
  }, [showWaiverModal])

  const getCanvasPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    if ('touches' in e) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY }
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY }
  }

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    isDrawingRef.current = true
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const pos = getCanvasPos(e)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (!isDrawingRef.current) return
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.strokeStyle = '#C9A84C'
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    const pos = getCanvasPos(e)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    if (!hasSigned) setHasSigned(true)
  }

  const endDraw = () => { isDrawingRef.current = false }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#1A1A1A'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    setHasSigned(false)
  }

  // P2 canvas handlers
  const getCanvasPos2 = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef2.current!
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    if ('touches' in e) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY }
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY }
  }

  const startDraw2 = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    isDrawingRef2.current = true
    const ctx = canvasRef2.current?.getContext('2d')
    if (!ctx) return
    const pos = getCanvasPos2(e)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
  }

  const draw2 = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (!isDrawingRef2.current) return
    const ctx = canvasRef2.current?.getContext('2d')
    if (!ctx) return
    ctx.strokeStyle = '#C9A84C'
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    const pos = getCanvasPos2(e)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    if (!hasSigned2) setHasSigned2(true)
  }

  const endDraw2 = () => { isDrawingRef2.current = false }

  const clearCanvas2 = () => {
    const canvas = canvasRef2.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#1A1A1A'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    setHasSigned2(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeToWaiver || !formData.agreeToTerms) {
      alert(language === 'es' ? 'Debes aceptar todos los términos' : 'You must accept all terms')
      return
    }

    if (isAmateur && !formData.agreeToWaiverP2) {
      alert(language === 'es' ? 'El/la compañero/a también debe aceptar la exención de responsabilidad' : 'Your teammate must also accept the liability waiver')
      return
    }

    setStatus('loading')
    try {
      const payload: RegistrationFormData = {
        ...formData,
        teammate: isAmateur ? teammate : undefined,
      }
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        dni: '',
        email: '',
        phone: '',
        age: 18,
        category: categories[0].id,
        emergencyContactName: '',
        emergencyContactPhone: '',
        transferNumber: '',
        insuranceProvider: '',
        agreeToWaiver: false,
        agreeToTerms: false,
      })
      setTeammate(emptyTeammate)
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-[#0E0E0E] border border-[#2A2A2A] text-foreground px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold transition-colors duration-200 placeholder:text-muted-foreground/50'
  const labelClass = 'text-xs font-display uppercase tracking-widest text-muted-foreground'

  return (
    <section id="register" className="bg-background py-24 md:py-32 relative overflow-hidden">
      {/* BG accent */}
      <div className="absolute inset-0 bg-[#0A0A0A]" />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 40px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-display tracking-widest uppercase text-gold">
            {copy.registration.subtitle}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-none text-foreground">
            {copy.registration.title}
          </h2>
          <div className="conquest-separator" />
        </div>

        {/* Success state — inline fallback (hidden, modal handles this) */}

        {/* Error state */}
        {status === 'error' && (
          <div className="bg-red-900/20 border border-red-700/40 p-6 flex gap-4">
            <AlertCircle size={24} className="text-red-600 flex-shrink-0" aria-hidden="true" />
            <div className="flex flex-col gap-2">
              <span className="font-display uppercase tracking-widest text-sm text-red-600">
                {language === 'es' ? 'Error' : 'Error'}
              </span>
              <p className="text-sm text-foreground/80">
                {copy.registration.error}
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Personal Info */}
          <fieldset className="flex flex-col gap-6 border border-[#2A2A2A] p-8">
            <legend className="text-sm font-display uppercase tracking-widest text-gold">
              {isAmateur
                ? copy.registration.participant1
                : (language === 'es' ? 'Información Personal' : 'Personal Information')}
            </legend>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className={labelClass}>
                  {copy.registration.firstName}
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  maxLength={50}
                  value={formData.firstName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className={labelClass}>
                  {copy.registration.lastName}
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  maxLength={50}
                  value={formData.lastName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="dni" className={labelClass}>
                  {copy.registration.dni}
                </label>
                <input
                  id="dni"
                  name="dni"
                  type="text"
                  required
                  placeholder="12345678"
                  maxLength={8}
                  inputMode="numeric"
                  pattern="[0-9]{7,8}"
                  value={formData.dni}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="age" className={labelClass}>
                  {copy.registration.age}
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="18"
                  max="120"
                  required
                  value={formData.age}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="category" className={labelClass}>
                  {copy.registration.category}
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {categories.filter(cat => cat.id !== 'masters').map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {language === 'es' ? cat.nameEs : cat.nameEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          {/* Participant 2 — Amateur only */}
          {isAmateur && (
            <fieldset className="flex flex-col gap-6 border border-gold/30 bg-gold/5 p-8">
              <legend className="text-sm font-display uppercase tracking-widest text-gold">
                {copy.registration.participant2}
              </legend>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="teammate_firstName" className={labelClass}>
                    {copy.registration.firstName}
                  </label>
                  <input
                    id="teammate_firstName"
                    name="firstName"
                    type="text"
                    required={isAmateur}
                    maxLength={50}
                    value={teammate.firstName}
                    onChange={handleTeammateChange}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="teammate_lastName" className={labelClass}>
                    {copy.registration.lastName}
                  </label>
                  <input
                    id="teammate_lastName"
                    name="lastName"
                    type="text"
                    required={isAmateur}
                    maxLength={50}
                    value={teammate.lastName}
                    onChange={handleTeammateChange}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="teammate_dni" className={labelClass}>
                    {copy.registration.dni}
                  </label>
                  <input
                    id="teammate_dni"
                    name="dni"
                    type="text"
                    required={isAmateur}
                    placeholder="12345678"
                    maxLength={8}
                    inputMode="numeric"
                    pattern="[0-9]{7,8}"
                    value={teammate.dni}
                    onChange={handleTeammateChange}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="teammate_age" className={labelClass}>
                    {copy.registration.age}
                  </label>
                  <input
                    id="teammate_age"
                    name="age"
                    type="number"
                    min="18"
                    max="120"
                    required={isAmateur}
                    value={teammate.age}
                    onChange={handleTeammateChange}
                    className={inputClass}
                  />
                </div>
              </div>

            </fieldset>
          )}

          {/* Contact Info */}
          <fieldset className="flex flex-col gap-6 border border-[#2A2A2A] p-8">
            <legend className="text-sm font-display uppercase tracking-widest text-gold">
              {language === 'es' ? 'Información de Contacto' : 'Contact Information'}
            </legend>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className={labelClass}>
                  {copy.registration.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className={labelClass}>
                  {copy.registration.phone}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  maxLength={15}
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </fieldset>

          {/* Emergency Contact */}
          <fieldset className="flex flex-col gap-6 border border-[#2A2A2A] p-8">
            <legend className="text-sm font-display uppercase tracking-widest text-gold">
              {language === 'es' ? 'Contacto de Emergencia' : 'Emergency Contact'}
            </legend>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="emergencyContactName" className={labelClass}>
                  {copy.registration.emergencyContactName}
                </label>
                <input
                  id="emergencyContactName"
                  name="emergencyContactName"
                  type="text"
                  required
                  maxLength={50}
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="emergencyContactPhone" className={labelClass}>
                  {copy.registration.emergencyContactPhone}
                </label>
                <input
                  id="emergencyContactPhone"
                  name="emergencyContactPhone"
                  type="tel"
                  required
                  maxLength={15}
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </fieldset>

          {/* Payment & Insurance */}
          <fieldset className="flex flex-col gap-6 border border-[#2A2A2A] p-8">
            <legend className="text-sm font-display uppercase tracking-widest text-gold">
              {language === 'es' ? 'Pago y Seguro' : 'Payment & Insurance'}
            </legend>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="transferNumber" className={labelClass}>
                  {copy.registration.transferNumber}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  id="transferNumber"
                  name="transferNumber"
                  type="text"
                  required
                  maxLength={60}
                  placeholder={copy.registration.transferNumberPlaceholder}
                  value={formData.transferNumber}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="insuranceProvider" className={labelClass}>
                  {copy.registration.insuranceProvider}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  id="insuranceProvider"
                  name="insuranceProvider"
                  type="text"
                  required
                  maxLength={60}
                  placeholder={copy.registration.insuranceProviderPlaceholder}
                  value={formData.insuranceProvider}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </fieldset>

          {/* Legal Section */}
          <fieldset className="flex flex-col gap-6 border border-gold/20 bg-gold/5 p-8">
            <legend className="text-sm font-display uppercase tracking-widest text-gold">
              {language === 'es' ? 'Términos Legales' : 'Legal Terms'}
            </legend>

            <div className="flex items-start gap-3">
              <input
                id="agreeToWaiver"
                name="agreeToWaiver"
                type="checkbox"
                required
                checked={formData.agreeToWaiver}
                onChange={() => {
                  // Only uncheck if already accepted; checking requires modal + signature
                  if (formData.agreeToWaiver) {
                    setFormData(prev => ({ ...prev, agreeToWaiver: false }))
                    setHasSigned(false)
                  } else {
                    setShowWaiverModal(true)
                  }
                }}
                className="w-5 h-5 mt-1 accent-gold cursor-pointer"
              />
              <label htmlFor="agreeToWaiver" className="text-sm text-foreground/80 leading-relaxed cursor-pointer">
                <span className="font-semibold">{copy.registration.agreeToWaiver}</span>
                <button
                  type="button"
                  onClick={() => setShowWaiverModal(true)}
                  className="text-gold hover:underline ml-2"
                >
                  {language === 'es' ? 'Ver documento' : 'View document'}
                </button>
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                required
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-5 h-5 mt-1 accent-gold cursor-pointer"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-foreground/80 leading-relaxed cursor-pointer">
                {copy.registration.agreeToTerms}
              </label>
            </div>
          </fieldset>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-gold text-black px-6 py-4 font-display font-bold uppercase tracking-widest text-sm hover:bg-gold-bright disabled:opacity-50 transition-all duration-200"
          >
            {status === 'loading' ? (language === 'es' ? 'Enviando...' : 'Sending...') : copy.registration.submit}
          </button>
        </form>
      </div>

      {/* Waiver Modal */}
      {showWaiverModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-6">
          <div className="bg-[#111111] border border-[#2A2A2A] max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#0A0A0A] border-b border-[#2A2A2A] p-6 flex items-center justify-between">
              <h3 className="font-display text-lg uppercase tracking-widest">
                {language === 'es' ? 'Exención de Responsabilidad' : 'Liability Waiver'}
              </h3>
              <button
                onClick={() => setShowWaiverModal(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5 text-sm text-foreground/80 leading-relaxed font-sans">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-display uppercase tracking-widest text-gold font-semibold">
                  {language === 'es' ? '1. Asunción de Riesgos' : '1. Assumption of Risk'}
                </span>
                <p>{language === 'es'
                  ? 'Reconozco que la participación en Conquest Games implica riesgos inherentes, incluyendo lesiones físicas, caídas, fatiga extrema y otras complicaciones. Asumo plena responsabilidad por mi salud y bienestar durante el evento.'
                  : 'I acknowledge that participation in Conquest Games involves inherent risks including physical injury, falls, extreme fatigue and other complications. I assume full responsibility for my health and wellbeing during the event.'}</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-display uppercase tracking-widest text-gold font-semibold">
                  {language === 'es' ? '2. Aptitud Médica' : '2. Medical Fitness'}
                </span>
                <p>{language === 'es'
                  ? 'Certifico que estoy en condiciones físicas adecuadas para competir. He sido informado de los requisitos médicos y cuento con certificado médico vigente. El personal médico en sitio tiene autoridad para pausar o retirar mi participación por razones de seguridad.'
                  : 'I certify I am in adequate physical condition to compete. I have been informed of medical requirements and hold a valid medical certificate. On-site medical staff has authority to pause or withdraw my participation for safety reasons.'}</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-display uppercase tracking-widest text-gold font-semibold">
                  {language === 'es' ? '3. Exención de Responsabilidad' : '3. Liability Release'}
                </span>
                <p>{language === 'es'
                  ? 'Libero a Conquest Games, sus organizadores, patrocinadores y staff de toda responsabilidad civil por lesiones, daños materiales o pérdidas que puedan ocurrir durante el evento, siempre que no sean resultado de negligencia grave.'
                  : 'I release Conquest Games, its organizers, sponsors and staff from all civil liability for injuries, property damage or losses that may occur during the event, except in cases of gross negligence.'}</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-display uppercase tracking-widest text-gold font-semibold">
                  {language === 'es' ? '4. Uso de Imagen y Datos' : '4. Image & Data Use'}
                </span>
                <p>{language === 'es'
                  ? 'Autorizo el uso de mis datos personales para la gestión del evento y el uso de fotografías o videos en los que aparezca, para propósitos promocionales e informativos de Conquest Games.'
                  : 'I authorize the use of my personal data for event management and the use of photographs or videos featuring me, for Conquest Games promotional and informational purposes.'}</p>
              </div>

              {/* Signature pads */}
              <div className={`grid gap-4 pt-2 ${isAmateur ? 'md:grid-cols-2' : 'grid-cols-1'}`}>

                {/* P1 canvas */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-display uppercase tracking-widest text-gold font-semibold">
                      <Pen size={12} />
                      {isAmateur
                        ? (language === 'es' ? 'Firma Participante 1' : 'Participant 1 Signature')
                        : (language === 'es' ? 'Firma aquí para aceptar' : 'Sign here to accept')}
                    </div>
                    <button type="button" onClick={clearCanvas} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                      <Trash2 size={12} />
                      {language === 'es' ? 'Borrar' : 'Clear'}
                    </button>
                  </div>
                  <canvas
                    ref={canvasRef}
                    style={{ width: '100%', height: '120px', touchAction: 'none', cursor: 'crosshair' }}
                    className="border border-[#2A2A2A] hover:border-gold/40 transition-colors"
                    onMouseDown={startDraw}
                    onMouseMove={draw}
                    onMouseUp={endDraw}
                    onMouseLeave={endDraw}
                    onTouchStart={startDraw}
                    onTouchMove={draw}
                    onTouchEnd={endDraw}
                  />
                  {!hasSigned && (
                    <p className="text-xs text-muted-foreground/60 font-sans italic">
                      {language === 'es' ? '↑ Firma para habilitar' : '↑ Sign to enable'}
                    </p>
                  )}
                </div>

                {/* P2 canvas — Amateur only */}
                {isAmateur && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-display uppercase tracking-widest text-gold font-semibold">
                        <Pen size={12} />
                        {language === 'es' ? 'Firma Participante 2' : 'Participant 2 Signature'}
                      </div>
                      <button type="button" onClick={clearCanvas2} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                        <Trash2 size={12} />
                        {language === 'es' ? 'Borrar' : 'Clear'}
                      </button>
                    </div>
                    <canvas
                      ref={canvasRef2}
                      style={{ width: '100%', height: '120px', touchAction: 'none', cursor: 'crosshair' }}
                      className="border border-[#2A2A2A] hover:border-gold/40 transition-colors"
                      onMouseDown={startDraw2}
                      onMouseMove={draw2}
                      onMouseUp={endDraw2}
                      onMouseLeave={endDraw2}
                      onTouchStart={startDraw2}
                      onTouchMove={draw2}
                      onTouchEnd={endDraw2}
                    />
                    {!hasSigned2 && (
                      <p className="text-xs text-muted-foreground/60 font-sans italic">
                        {language === 'es' ? '↑ Firma para habilitar' : '↑ Sign to enable'}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-[#0A0A0A] border-t border-[#2A2A2A] p-6 flex gap-4">
              <button
                disabled={!hasSigned || (isAmateur && !hasSigned2)}
                onClick={() => {
                  setFormData(prev => ({ ...prev, agreeToWaiver: true, agreeToWaiverP2: isAmateur ? true : prev.agreeToWaiverP2 }))
                  setShowWaiverModal(false)
                }}
                className="flex-1 bg-gold text-black px-6 py-3 font-display font-bold uppercase tracking-widest text-xs hover:bg-gold-bright transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {language === 'es' ? 'Aceptar y Firmar' : 'Accept & Sign'}
              </button>
              <button
                onClick={() => setShowWaiverModal(false)}
                className="flex-1 border border-[#2A2A2A] text-foreground px-6 py-3 font-display font-bold uppercase tracking-widest text-xs hover:border-gold transition-all duration-200"
              >
                {language === 'es' ? 'Cerrar' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {status === 'success' && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6">
          <div className="bg-[#111111] border border-gold/40 max-w-md w-full flex flex-col items-center text-center p-10 gap-6 relative">

            {/* Close button */}
            <button
              onClick={() => setStatus('idle')}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>

            {/* Trophy icon */}
            <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
              <Trophy size={40} className="text-gold" />
            </div>

            {/* Title */}
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-2xl uppercase tracking-widest text-gold">
                {language === 'es' ? '¡Inscripción Exitosa!' : 'Registration Complete!'}
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed font-sans">
                {copy.registration.success}
              </p>
            </div>

            {/* Divider */}
            <div className="w-12 h-px bg-gold/40" />

            {/* Detail */}
            <p className="text-xs text-muted-foreground font-sans leading-relaxed">
              {language === 'es'
                ? 'Revisaremos tu inscripción y te contactaremos para confirmar tu cupo. ¡Prepárate para conquistar!'
                : 'We will review your registration and contact you to confirm your spot. Get ready to conquer!'}
            </p>

            {/* CTA */}
            <button
              onClick={() => setStatus('idle')}
              className="w-full bg-gold text-black px-6 py-3 font-display font-bold uppercase tracking-widest text-xs hover:bg-gold-bright transition-all duration-200"
            >
              {language === 'es' ? 'Cerrar' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

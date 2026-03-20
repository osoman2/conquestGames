'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/lib/language-context'
import { siteCopy } from '@/content/site-copy'
import { MessageCircle, X, Send, Bot, User, ExternalLink } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  text: string
  link?: { href: string; label: string }
}

/** Renders basic markdown: **bold**, *italic*, and line breaks */
function renderMarkdown(text: string): React.ReactNode {
  return text.split('\n').map((line, li) => (
    <span key={li}>
      {li > 0 && <br />}
      {line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).map((seg, si) => {
        if (seg.startsWith('**') && seg.endsWith('**'))
          return <strong key={si}>{seg.slice(2, -2)}</strong>
        if (seg.startsWith('*') && seg.endsWith('*'))
          return <em key={si}>{seg.slice(1, -1)}</em>
        return seg
      })}
    </span>
  ))
}

function detectSectionLink(text: string, lang: 'es' | 'en'): { href: string; label: string } | undefined {
  const lower = text.toLowerCase()
  if (lower.includes('inscripci') || lower.includes('register') || lower.includes('formulario') || lower.includes('form')) {
    return { href: '#register', label: lang === 'es' ? '→ Ir a Inscripción' : '→ Go to Registration' }
  }
  if (lower.includes('circuito') || lower.includes('circuit') || lower.includes('mapa') || lower.includes('map') || lower.includes('estacion')) {
    return { href: '#circuit', label: lang === 'es' ? '→ Ver el Circuito' : '→ View Circuit' }
  }
  if (lower.includes('categor')) {
    return { href: '#categories', label: lang === 'es' ? '→ Ver Categorías' : '→ View Categories' }
  }
  return undefined
}

export function ChatAssistantMock() {
  const { language } = useLanguage()
  const copy = siteCopy[language]
  const t = copy.chat
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: language === 'es' ? '¡Hola! Soy el asistente de Conquest Games. ¿En qué te puedo ayudar? 💪' : 'Hi! I\'m the Conquest Games assistant. How can I help you? 💪' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const sendMessage = async (text: string) => {
    if (!text.trim() || typing) return
    const userMsg: Message = { role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.text }))
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, lang: language, history }),
      })
      const data = await res.json() as { reply?: string; error?: string }
      const replyText = data.reply ?? (language === 'es' ? 'No pude procesar tu pregunta.' : 'Could not process your request.')
      const link = detectSectionLink(replyText, language)
      setMessages((prev) => [...prev, { role: 'assistant', text: replyText, link }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: language === 'es' ? 'Error de conexión. Intenta nuevamente.' : 'Connection error. Please try again.' }])
    } finally {
      setTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage(input)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-gold text-black shadow-2xl shadow-gold/30 hover:bg-gold-bright transition-colors duration-200"
        aria-label={open ? 'Cerrar asistente' : 'Abrir asistente'}
      >
        {open ? <X size={20} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 md:w-96 flex flex-col bg-[#0E0E0E] border border-[#2A2A2A] shadow-2xl shadow-black/80"
          role="dialog"
          aria-label={t.title}
        >
          {/* Gold top bar */}
          <div className="h-0.5 bg-gold" />

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1A1A1A]">
            <div className="flex items-center justify-center w-8 h-8 bg-gold/10 border border-gold/30">
              <Bot size={16} className="text-gold" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
                {t.title}
              </span>
              <span className="text-xs text-muted-foreground font-sans">Online</span>
            </div>
            <div className="ml-auto w-2 h-2 bg-green-400 rounded-full" aria-label="Online" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 max-h-72">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex-shrink-0 w-6 h-6 bg-gold/10 border border-gold/30 flex items-center justify-center mt-1">
                    <Bot size={12} className="text-gold" aria-hidden="true" />
                  </div>
                )}
                <div className="flex flex-col gap-1.5 max-w-[75%]">
                  <div
                    className={`px-3 py-2 text-sm font-sans leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gold text-black font-medium'
                        : 'bg-[#1A1A1A] text-foreground/90 border border-[#2A2A2A]'
                    }`}
                  >
                    {msg.role === 'assistant' ? renderMarkdown(msg.text) : msg.text}
                  </div>
                  {msg.link && (
                    <a
                      href={msg.link.href}
                      onClick={() => setOpen(false)}
                      className="text-xs text-gold hover:text-gold-bright font-display tracking-wide flex items-center gap-1 transition-colors"
                    >
                      <ExternalLink size={10} />
                      {msg.link.label}
                    </a>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="flex-shrink-0 w-6 h-6 bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center mt-1">
                    <User size={12} className="text-muted-foreground" aria-hidden="true" />
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex gap-2 items-center">
                <div className="flex-shrink-0 w-6 h-6 bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <Bot size={12} className="text-gold" aria-hidden="true" />
                </div>
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] px-4 py-3 flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          <div className="px-4 py-3 border-t border-[#1A1A1A] flex flex-wrap gap-1.5">
            {t.prompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(prompt)}
                className="text-xs font-sans border border-[#2A2A2A] text-muted-foreground hover:border-gold hover:text-gold px-2 py-1 transition-colors duration-150"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center border-t border-[#1A1A1A]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.placeholder}
              className="flex-1 bg-transparent px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
              aria-label="Message input"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || typing}
              className="px-4 py-3 text-gold hover:text-gold-bright transition-colors disabled:opacity-30"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

/* Force rebuild */
'use client'

import { LanguageProvider } from '@/lib/language-context'
import { Navbar } from '@/components/conquest/Navbar'
import { HeroSection } from '@/components/conquest/HeroSection'
import { StatsStrip } from '@/components/conquest/StatsStrip'
import { AboutSection } from '@/components/conquest/AboutSection'
import { CircuitVisualization } from '@/components/conquest/CircuitVisualization'
import { CategoryCards } from '@/components/conquest/CategoryCards'
import { WhyCompete } from '@/components/conquest/WhyCompete'
import { RegistrationForm } from '@/components/conquest/RegistrationForm'
import { EventInfoSection } from '@/components/conquest/EventInfoSection'
import { RegulationsSection } from '@/components/conquest/RegulationsSection'
import { RoadmapSection } from '@/components/conquest/RoadmapSection'
import { SponsorsSection } from '@/components/conquest/SponsorsSection'
import { Footer } from '@/components/conquest/Footer'
import { ChatAssistantMock } from '@/components/conquest/ChatAssistantMock'

export default function ConquestGamesPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <HeroSection />
          <StatsStrip />
          <AboutSection />
          <CircuitVisualization />
          <CategoryCards />
          <WhyCompete />
          <RegistrationForm />
          <EventInfoSection />
          <RegulationsSection />
          <RoadmapSection />
          <SponsorsSection />
        </main>
        <Footer />
        <ChatAssistantMock />
      </div>
    </LanguageProvider>
  )
}

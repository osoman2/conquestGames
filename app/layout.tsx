import type { Metadata } from 'next'
import { Inter, Oswald } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Conquest Games — Competencia Híbrida de Running y Entrenamiento Funcional',
  description:
    'Conquest Games es una competencia híbrida de élite que combina running y estaciones funcionales. 16 de mayo · Lima, Perú. Inscríbete ahora.',
  keywords: ['Conquest Games', 'competencia', 'running', 'funcional', 'Lima', 'Perú', 'atletas', 'HYROX'],
  icons: {
    icon: '/branding/conquest-games-logo.svg',
    apple: '/branding/conquest-games-logo.svg',
  },
  openGraph: {
    title: 'Conquest Games',
    description: 'Esto no es un juego. Es una conquista.',
    type: 'website',
    url: 'https://theconquestgames.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${oswald.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}

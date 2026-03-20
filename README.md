# Conquest Games — Sitio Web Oficial

Landing page oficial para **Conquest Games**, una competencia híbrida de running y entrenamiento funcional que se realiza en Lima, Perú.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript 5.7 |
| Estilos | Tailwind CSS 4 |
| UI Components | Radix UI + shadcn/ui |
| Carrusel | Embla Carousel |
| Formularios | React Hook Form + Zod |
| IA / Chat | Groq SDK (`openai/gpt-oss-20b`) |
| Iconos | Lucide React |
| Analytics | Vercel Analytics |

---

## Estructura del proyecto

```
conquergames/
├── app/
│   ├── page.tsx               # Página principal (composición de secciones)
│   ├── layout.tsx             # Layout raíz con fuentes y metadata
│   └── api/
│       ├── chat/route.ts      # Endpoint del asistente IA
│       ├── register/route.ts  # Endpoint de inscripción
│       └── leaderboard/route.ts
├── components/conquest/
│   ├── HeroSection.tsx        # Sección hero principal
│   ├── Navbar.tsx             # Barra de navegación (ES/EN, responsive)
│   ├── AboutSection.tsx       # Acerca del evento (carrusel)
│   ├── StatsStrip.tsx         # Estadísticas rápidas
│   ├── CategoryCards.tsx      # Tarjetas de categorías con reglas específicas
│   ├── CircuitVisualization.tsx
│   ├── InteractiveRaceMap.tsx
│   ├── WhyCompete.tsx
│   ├── RegistrationForm.tsx   # Formulario con firma digital y validación
│   ├── EventInfoSection.tsx
│   ├── RegulationsSection.tsx # Regulaciones por pestaña
│   ├── RoadmapSection.tsx     # Hoja de ruta 2026 (bilingüe)
│   ├── SponsorsSection.tsx    # Carrusel de sponsors + CTA
│   ├── ChatAssistantMock.tsx  # Chat flotante con IA
│   └── Footer.tsx
├── content/
│   ├── site-copy.ts           # Textos ES/EN de toda la app
│   ├── categories.ts          # Categorías y reglas específicas
│   ├── regulations.ts         # Regulaciones oficiales
│   ├── event-data.ts          # Datos del evento
│   └── circuit-data.ts        # Estaciones del circuito
├── types/
│   └── index.ts               # Tipos TypeScript compartidos
└── lib/
    ├── language-context.tsx   # Contexto global de idioma (ES/EN)
    └── utils.ts
```

---

## Instalación y desarrollo

```bash
# Clonar el repositorio
git clone <repo-url>
cd conquergames

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tu GROQ_API_KEY

# Iniciar servidor de desarrollo
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Variables de entorno

| Variable | Descripción |
|---|---|
| `GROQ_API_KEY` | API key de Groq para el asistente IA |

---

## Funcionalidades principales

- **Bilingüe (ES/EN)** — cambio de idioma en tiempo real sin recarga
- **Asistente IA** — chat flotante con conocimiento del evento (usa Groq)
- **Inscripción** — formulario con firma digital en canvas, validada antes de aceptar
- **Categorías** — Amateur y Pro, con reglas específicas por categoría
- **Regulaciones** — organizadas por pestaña (reglas, seguridad, penalizaciones, logística)
- **Sponsors** — carrusel auto-scroll con CTA para nuevos patrocinadores
- **Hoja de ruta** — fases 2026 completamente en ES/EN

---

## Scripts disponibles

```bash
pnpm dev      # Servidor de desarrollo
pnpm build    # Build de producción
pnpm start    # Servidor de producción
pnpm lint     # Lint con ESLint
```


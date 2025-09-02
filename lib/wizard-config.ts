export interface Proposal {
  title: string
  description: string
  details?: string
}

export interface WizardData {
  audience: string
  proposals: Proposal[]
  format: "text" | "email" | "pdf"
  language: "ES" | "EN"
  tone: "Profesional" | "Amigable" | "Persuasivo" | "Directo"
  meta: {
    createdAt: string
    appVersion: string
  }
}

export const defaultPreset: WizardData = {
  audience: "Director de marketing de TechGrowth",
  proposals: [
    {
      title: "Servicios de SEO mensual",
      description: "Optimización de contenido y linkbuilding",
      details:
        "Auditoría técnica, mapa de keywords, optimización on-page, linkbuilding. Caso similar: +120% tráfico en 4 meses.",
    },
  ],
  format: "email",
  language: "ES",
  tone: "Profesional",
  meta: {
    createdAt: "2025-09-02T12:00:00.000Z",
    appVersion: "0.1.0",
  },
}

export const wizardSteps = [
  { id: "audience", title: "Audiencia" },
  { id: "proposals", title: "Contenido" },
  { id: "format", title: "Formato" },
] as const

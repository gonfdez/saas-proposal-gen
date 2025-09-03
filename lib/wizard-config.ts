export interface WizardData {
  audience: string
  presentation: string
  content: string
  objective: string
  format: "text_message" | "email" | "pdf"
  language: "ES" | "EN"
  tone: "Profesional" | "Amigable" | "Persuasivo" | "Directo",
  includeEmojis: boolean,
  readingTime: number,
  meta: {
    createdAt: string
    appVersion: string
  }
}

export const defaultPreset: WizardData = {
  presentation: "Fulano Dominguez, Director de Ventas de SEO Consulting SL",
  audience: "Equipo de marketing de TechGrowth",
  content: "Servicios de SEO mensual\nOptimización de contenido y linkbuilding\nAuditoría técnica, mapa de keywords, optimización on-page, linkbuilding.\nCaso similar: +120% tráfico en 4 meses.",
  objective: "Agendar una llamada telefónica (Cuando les venga bien) donde les pueda comentar nuestros servicios más en detalle",
  format: "text_message",
  language: "ES",
  tone: "Profesional",
  includeEmojis: true,
  readingTime: 1,
  meta: {
    createdAt: "2025-09-02T12:00:00.000Z",
    appVersion: "0.1.0",
  },
}

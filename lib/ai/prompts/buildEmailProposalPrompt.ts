import { WizardData } from '../../wizard-config'

export function buildEmailProposalPrompt(data: WizardData): string {
  const { presentation, audience, content, objective, language, tone, includeEmojis, readingTime, formatNote } = data

  // Idioma y tono
  const languagePrompt = language === 'ES' ? 'español' : 'inglés'
  const toneMap = {
    'Profesional': language === 'ES' ? 'formal y profesional' : 'formal and professional',
    'Amigable': language === 'ES' ? 'cercano y amigable' : 'friendly and approachable',
    'Persuasivo': language === 'ES' ? 'persuasivo y convincente' : 'persuasive and compelling',
    'Directo': language === 'ES' ? 'directo y conciso' : 'direct and concise',
  }
  const toneInstructions = toneMap[tone as keyof typeof toneMap] || toneMap['Profesional']

  // Ajuste dinámico de longitud según tiempo de lectura
  const minWords = Math.max(150, readingTime * 200)
  const maxWords = Math.max(300, readingTime * 250)

  return `
Genera un correo electrónico comercial en ${languagePrompt} siguiendo estas instrucciones estrictamente:

OBJETIVO PRINCIPAL:
Crear un email persuasivo para un cliente potencial (${audience}).
El objetivo final es lograr: "${objective}".
El llamado a la acción debe reflejarlo, pero NO copiarlo textualmente.

CONTEXTO DE REFERENCIA:
- Presentación de quién envía el correo: ${presentation}.
- Información clave sobre el servicio o propuesta (usa esto solo como guía, nunca literalmente):
${content}

FORMATO DE SALIDA:
- Devuelve solo el texto final del email, sin etiquetas como "Asunto:" o "Cuerpo:".
- El email debe incluir:
  1. **Asunto** breve y atractivo en la primera línea.  
  2. **Saludo inicial** cordial y adecuado a ${audience}.
  3. **Introducción** breve que conecte y genere interés.
  4. **Beneficios clave** y propuesta de valor.
  5. **Cierre** con llamado a la acción claro y motivador.
  6. **Firma** con nombre y cargo de ${presentation}.
${formatNote.length > 0 ? `- Nota adicional a considerar para el formato: ${formatNote}` : ''}

TONO:
Utiliza un estilo ${toneInstructions}.

LONGITUD:
Entre ${minWords} y ${maxWords} palabras.

${includeEmojis ? 'EMOJIS: Puedes incluir hasta 2 emojis sutiles y relevantes en el cuerpo del correo, nunca en el asunto.' : ''}

REGLAS IMPORTANTES:
- NO repitas literalmente la información proporcionada.
- NO añadas listas con viñetas, salvo que sean muy naturales en el texto.
- NO incluyas explicaciones ni frases como "Aquí tienes tu email".
- Devuelve directamente el texto del correo, listo para enviar.

Genera el correo ahora.
`.trim()
}

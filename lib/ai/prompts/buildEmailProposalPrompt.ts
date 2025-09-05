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
- Devuelve la respuesta en **HTML limpio y semántico**, sin estilos inline ni atributos innecesarios.
- Usa estas etiquetas de forma correcta:
  - <strong> para **negritas**  
  - <em> para *cursivas*  
  - <u> para _subrayados_  
  - <a href="URL"> para enlaces
  - <p> para párrafos
  - <br> solo cuando sea estrictamente necesario
- El HTML debe contener:
  1. La primera línea como <h2>Asunto del correo</h2>.
  2. El cuerpo en varios <p>, según corresponda.

TONO:
Utiliza un estilo ${toneInstructions}.

LONGITUD:
Entre ${minWords} y ${maxWords} palabras.

${includeEmojis ? 'EMOJIS: Puedes incluir hasta 2 emojis sutiles y relevantes en el cuerpo del correo, nunca en el asunto.' : ''}

REGLAS IMPORTANTES:
- NO añadas listas <ul> o <ol>.
- NO uses etiquetas de estilo como <span> con CSS inline.
- Devuelve **solo el HTML**, sin explicaciones adicionales.

Genera el correo ahora.
`.trim()

}

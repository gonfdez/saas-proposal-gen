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
  const minWords = Math.max(80, readingTime * 120)
  const maxWords = Math.max(150, readingTime * 180)

  return `
Genera un correo electrónico en ${languagePrompt} siguiendo estas instrucciones estrictamente:

OBJETIVO PRINCIPAL:
El correo va dirigido a: ${audience}.
El objetivo final es lograr: "${objective}".
La llamada a la acción debe reflejarlo, pero NO copiarlo textualmente.

CONTEXTO DE REFERENCIA:
- Quién envía el correo es: ${presentation}.
- Información clave sobre el servicio o propuesta (usa esto solo como guía, nunca literalmente):
${content}

FORMATO DE SALIDA:
- Devuelve la respuesta en HTML PURO y SEMÁNTICO, sin estilos inline ni atributos innecesarios, la salida debe ser HTML PURO.
- Usa estas etiquetas de forma correcta:
  - <h1>, <h2> o <h3> para títulos
  - <blockquote> para citas
  - <strong> para negritas
  - <em> para cursivas  
  - <u> para subrayados 
  - <a href="..."> para enlaces
  - <p> para párrafos
  - <br> para saltos de línea cuando sea necesario
  - <ul> o <ol> para listas
- El HTML debe contener:
  1. La primera línea como <h2>Asunto del correo</h2>.
  2. El cuerpo en varios <p>, según corresponda.

${formatNote.length > 0 ? `NOTA DEL USUARIO SOBRE EL CONTENIDO DEL CORREO:
  Intenta seguir esta indicación siempre que no interfiera con las pautas de "FORMATO DE SALIDA" descritas anteriormente: ${formatNote}` : ''}

TONO:
Utiliza un estilo ${toneInstructions}.

LONGITUD:
Entre ${minWords} y ${maxWords} palabras.

${includeEmojis ? 'EMOJIS: Puedes incluir emojis sutiles y relevantes en el cuerpo del correo, pero sin exagerar y nunca en el asunto.' : ''}

REGLAS IMPORTANTES:
- NO uses etiquetas de estilo como <span> con CSS inline.
- NO te inventes enlaces en el cuerpo del correo. Solo usa aquellos que te han dado en "OBJETIVO PRINCIPAL" o "CONTEXTO DE REFERENCIA" cuando sean necesarios.
- Devuelve SOLO EL CÓDIGO HTML, sin explicaciones adicionales.

Genera el correo ahora.
`.trim()

}

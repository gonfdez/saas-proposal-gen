import { WizardData } from '../wizard-config';

export function buildTextMessageProposalPrompt(data: WizardData): string {
  const { presentation, audience, content, objective, language, tone, includeEmojis, readingTime } = data;

  // Idioma y tono
  const languagePrompt = language === 'ES' ? 'español' : 'inglés';
  const toneMap = {
    'Profesional': language === 'ES' ? 'formal y profesional' : 'formal and professional',
    'Amigable': language === 'ES' ? 'cercano y amigable' : 'friendly and approachable',
    'Persuasivo': language === 'ES' ? 'persuasivo y convincente' : 'persuasive and compelling',
    'Directo': language === 'ES' ? 'directo y conciso' : 'direct and concise',
  };
  const toneInstructions = toneMap[tone as keyof typeof toneMap] || toneMap['Profesional'];

  // Ajuste dinámico de longitud según tiempo de lectura
  const minWords = Math.max(80, readingTime * 120);
  const maxWords = Math.max(150, readingTime * 180);

  return `
Genera una propuesta comercial en ${languagePrompt} siguiendo estas instrucciones estrictamente:

OBJETIVO PRINCIPAL:
Crear un mensaje de texto persuasivo y breve para un cliente potencial (${audience}). 
El objetivo final de este mensaje es lograr lo siguiente: "${objective}". 
Este objetivo debe reflejarse en el llamado a la acción, pero NO debe copiarse textualmente. 

CONTEXTO DE REFERENCIA:
- Presentación de quién envía el mensaje: ${presentation}.
- Información clave sobre el servicio o propuesta (usa esto solo como guía, nunca literalmente):
${content}

FORMATO:
- Salida en texto plano, sin numeraciones, sin etiquetas como "Título:" o "Descripción:", sin markdown.
- Debe sonar natural y conversacional, adecuado para WhatsApp o mensajes directos.

ESTRUCTURA PSICOLÓGICA:
1. Inicio que capture la atención y genere cercanía.
2. Presentación breve y natural de quién eres (usando como referencia la presentación dada).
3. Explica de forma clara los beneficios clave y el valor que ofreces, conectando con las necesidades de ${audience}.
4. Genera deseo, mostrando cómo tu propuesta puede mejorar su situación o resolver un problema.
5. Finaliza con un llamado a la acción directo y motivador, alineado con el objetivo definido.

TONO:
Utiliza un estilo ${toneInstructions}.

LONGITUD:
Entre ${minWords} y ${maxWords} palabras.

${includeEmojis ? 'EMOJIS: Integra hasta 3 emojis sutiles y relevantes para dar calidez al mensaje, sin exagerar.' : ''}

REGLAS IMPORTANTES:
- No repitas textualmente la información proporcionada por el usuario, úsala solo como guía.
- No incluyas listas con viñetas ni numeraciones en el mensaje final.
- No añadas frases como "Aquí tienes tu mensaje" ni explicaciones.
- El resultado debe ser únicamente el texto final, listo para enviar.

Genera directamente el mensaje final ahora.
`.trim();
}

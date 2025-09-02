import { WizardData } from '../wizard-config';

export function buildTextProposalPrompt(data: WizardData): string {
  const { presentation, audience, proposals, language, tone } = data;
  
  const languagePrompt = language === 'ES' ? 'español' : 'inglés';
  const toneInstructions = getToneInstructions(tone, language);
  
  let prompt = `Genera una propuesta comercial profesional en ${languagePrompt} con las siguientes características:\n\n`;
  
  prompt += `FORMATO: Texto plano limpio y bien estructurado\n`;
  prompt += `TONO: ${toneInstructions}\n\n`;
  
  if (presentation) {
    prompt += `PRESENTACIÓN (quién soy):\n${presentation}\n\n`;
  }
  
  prompt += `DESTINATARIO:\n${audience}\n\n`;
  
  prompt += `PROPUESTAS A INCLUIR:\n`;
  proposals.forEach((proposal, index) => {
    prompt += `${index + 1}. TÍTULO: ${proposal.title}\n`;
    prompt += `   DESCRIPCIÓN: ${proposal.description}\n`;
    if (proposal.details) {
      prompt += `   DETALLES: ${proposal.details}\n`;
    }
    prompt += `\n`;
  });
  
  prompt += `INSTRUCCIONES ESPECÍFICAS:\n`;
  prompt += `- Crea una propuesta comercial completa y persuasiva\n`;
  prompt += `- Incluye una introducción personalizada para el destinatario\n`;
  if (presentation) {
    prompt += `- Comienza presentándote usando la información proporcionada\n`;
  }
  prompt += `- Desarrolla cada propuesta con beneficios claros y específicos\n`;
  prompt += `- Incluye un call-to-action claro al final\n`;
  prompt += `- Mantén un ${toneInstructions} durante toda la propuesta\n`;
  prompt += `- El resultado debe ser texto plano sin formato markdown\n`;
  prompt += `- Longitud aproximada: 300-500 palabras\n\n`;
  
  prompt += `Genera ÚNICAMENTE el contenido de la propuesta, sin prefijos como "Aquí tienes" o explicaciones adicionales.`;
  
  return prompt;
}

function getToneInstructions(tone: string, language: string): string {
  const toneMap = {
    'Profesional': language === 'ES' ? 'tono formal y profesional' : 'formal and professional tone',
    'Amigable': language === 'ES' ? 'tono cercano y amigable' : 'friendly and approachable tone',
    'Persuasivo': language === 'ES' ? 'tono persuasivo y convincente' : 'persuasive and compelling tone',
    'Directo': language === 'ES' ? 'tono directo y conciso' : 'direct and concise tone'
  };
  
  return toneMap[tone as keyof typeof toneMap] || toneMap['Profesional'];
}
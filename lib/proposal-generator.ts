import { WizardData } from './wizard-config';
import { generateWithGemini } from './ai/gemini';
import { buildTextMessageProposalPrompt } from './ai/prompts';

export interface GeneratedProposal {
  content: string;
  format: WizardData['format'];
  generatedAt: string;
  originalData: WizardData;
}

export async function generateProposal(data: WizardData): Promise<GeneratedProposal> {
  let content: string;
  
  switch (data.format) {
    case 'text_message':
      content = await generateTextProposal(data);
      break;
    case 'email':
      // TODO: Implementar más adelante
      content = await generateTextProposal(data); // Por ahora usa text
      break;
    case 'pdf':
      // TODO: Implementar más adelante
      content = await generateTextProposal(data); // Por ahora usa text
      break;
    default:
      throw new Error(`Formato no soportado: ${data.format}`);
  }
  
  return {
    content,
    format: data.format,
    generatedAt: new Date().toISOString(),
    originalData: data
  };
}

async function generateTextProposal(data: WizardData): Promise<string> {
  const prompt = buildTextMessageProposalPrompt(data);
  return await generateWithGemini(prompt);
}

import type { NextApiRequest, NextApiResponse } from "next";
import { WizardData } from "@/lib/wizard-config";
import { generateProposal, GeneratedProposal } from "@/lib/proposal-generator";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const wizardData: WizardData = req.body;
    
    // Log para debugging
    console.log("Generating proposal for:", {
      audience: wizardData.audience,
      format: wizardData.format,
      language: wizardData.language,
      proposalsCount: wizardData.proposals.length
    });

    // Generar la propuesta con IA
    const result: GeneratedProposal = await generateProposal(wizardData);
    
    console.log("Proposal generated successfully");
    
    res.status(200).json(result);
    
  } catch (error) {
    console.error("Error generating proposal:", error);
    
    res.status(500).json({ 
      message: "Error generating proposal",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
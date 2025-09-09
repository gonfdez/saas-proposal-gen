"use client"

import ProposalWizard from "@/components/blocks/proposal-wizard/proposal-wizard";
import { Language } from "@/lib/translations";
import { useLocale } from "next-intl";

export default function ProposalGeneratorPage() {
  const currentLang = useLocale() as Language

  return (
    <div className="min-vh-screen bg-background lg:mt-12">
      <ProposalWizard initialLanguage={currentLang} />
    </div>
  );
}

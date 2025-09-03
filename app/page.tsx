import { headers } from "next/headers";
import ProposalWizard from "@/components/ProposalWizard";
import { Language } from "@/lib/translations";

export default async function Home() {
  const headersList = await headers();
  const acceptLanguage = await headersList.get("accept-language") || "";

  // Detectamos en el servidor usando la cabecera
  const serverLang = acceptLanguage.split(",")[0].split("-")[0];
  const initialLang: Language = serverLang === "es" ? "es" : "en";

  return (
    <div className="min-h-screen bg-background lg:mt-12">
      <ProposalWizard initialLanguage={initialLang} />
    </div>
  );
}

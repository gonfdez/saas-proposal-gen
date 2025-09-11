import ProposalWizard from "@/components/blocks/proposal-wizard/proposal-wizard"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SiteHeader } from "@/components/dashboard/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/server";
import { Language } from "@/lib/translations";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
  const locale = await (await params).locale

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" user={user} />
      <SidebarInset className="bg-white/60">
        <SiteHeader />
        <div className="@container/main py-8 px-3">
          <ProposalWizard initialLanguage={locale as Language} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

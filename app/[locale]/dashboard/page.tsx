"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import ProposalWizard from "@/components/blocks/proposal-wizard/proposal-wizard"
import { useLocale } from "next-intl"
import { Language } from "@/lib/translations"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "@/i18n/navigation"
import { User } from "@supabase/supabase-js"

export default function DashboardPage() {
  const currentLang = useLocale() as Language
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
      if (!session) router.push("/auth/login")
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [router])

  if (!user) return null // O puedes poner un spinner

  return (
    <ScrollArea className="h-full w-full">
      <ProposalWizard initialLanguage={currentLang} />
    </ScrollArea>
  )
}

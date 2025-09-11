"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useTranslations } from "next-intl"

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations("languageSwitcher")

  const switchLanguage = (locale: string) => {
    if (!pathname) return
    const segments = pathname.split("/")
    segments[1] = locale
    router.push(segments.join("/"))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage("en")}>{t("english")}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage("es")}>{t("spanish")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

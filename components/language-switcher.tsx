"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useTranslations } from "next-intl"

export function LanguageSwitcher({ className, withLabel, buttonVariant, buttonSize }: {
  className?: string,
  withLabel?: boolean,
  buttonVariant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined,
  buttonSize?: "default" | "sm" | "lg" | "icon" | null | undefined
}) {
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
        <Button
          variant={buttonVariant || "ghost"}
          className={`${className || ""} focus:outline-none focus-visible:ring-0`}
          size={buttonSize}
        >
          <Globe />
          {withLabel && t("language")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage("en")}>{t("english")}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage("es")}>{t("spanish")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

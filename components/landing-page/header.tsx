"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Zap, Menu } from "lucide-react"
import { Link } from "@/i18n/navigation"

export function Header() {
  const t = useTranslations("navigation")
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href={"/"}>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">ProposalAI</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <LanguageSwitcher />
          <Button variant="ghost" className="hover:text-foreground">
            <Link href={"/pricing"}>{t("pricing")}</Link>
          </Button>
          <Button variant="outline"><Link href={"/auth/login"}>{t("login")}</Link></Button>
        </nav>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                    <Zap className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-bold text-foreground">ProposalAI</span>
                </div>

                <div className="flex flex-col space-y-4">
                  <LanguageSwitcher />
                  <Button
                    variant="ghost"
                    className="justify-start text-muted-foreground hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("pricing")}
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent" onClick={() => setIsOpen(false)}>
                    <Link href={"/auth/login"}>{t("login")}</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

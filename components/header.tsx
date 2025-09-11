"use server"

import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Link } from "@/i18n/navigation"
import { Logo } from "./logo"
import { Zap, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { getTranslations } from "next-intl/server"

export default async function Header() {
  const t = await getTranslations("navigation")

  const supabase = await  createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center">
      <div className="container flex h-16 items-center justify-between px-4">
        <Logo />

        <nav className="hidden md:flex items-center space-x-6">
          <LanguageSwitcher />
          <Button variant="ghost" className="hover:text-foreground">
            <Link href={"/pricing"}>{t("pricing")}</Link>
          </Button>

          {session ? (
            <Button variant="outline">
              <Link href={"/dashboard"}>{t("dashboard")}</Link>
            </Button>
          ) : (
            <Button variant="outline">
              <Link href={"/auth/login"}>{t("login")}</Link>
            </Button>
          )}
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
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
                  >
                    <Link href="/pricing">{t("pricing")}</Link>
                  </Button>

                  {session ? (
                    <Button variant="outline" className="justify-start bg-transparent">
                      <Link href={"/dashboard"}>{t("dashboard")}</Link>
                    </Button>
                  ) : (
                    <Button variant="outline" className="justify-start bg-transparent">
                      <Link href={"/auth/login"}>{t("login")}</Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

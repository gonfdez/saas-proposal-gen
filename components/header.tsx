"use server"

import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Link } from "@/i18n/navigation"
import { Logo } from "./logo"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { getTranslations } from "next-intl/server"

export default async function Header() {
  const t = await getTranslations("navigation")

  const supabase = await createClient()
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
            <SheetContent side="right" className="w-[300px] sm:w-[400px] py-10 px-6">
              <SheetHeader>
                <SheetTitle className="flex justify-center">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4">
                <LanguageSwitcher withLabel buttonVariant={"outline"} className="justify-start w-fit" />
                <Button variant="outline" className="w-fit">
                  <Link href="/pricing">{t("pricing")}</Link>
                </Button>
                {session ? (
                  <Button variant="outline" className="w-fit">
                    <Link href={"/dashboard"}>{t("dashboard")}</Link>
                  </Button>
                ) : (
                  <Button variant="outline" className="w-fit">
                    <Link href={"/auth/login"}>{t("login")}</Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

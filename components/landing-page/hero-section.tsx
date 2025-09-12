"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { Link } from "@/i18n/navigation"

export function HeroSection() {
  const t = useTranslations("hero")

  return (
    <section className="flex flex-col gap-16 px-8 p-12 lg:py-24 text-center items-center z-40">
      <div className="flex flex-col items-center justify-center gap-8  max-w-[1500px]">
        <h1 className="mb-0 text-balance font-medium text-6xl md:text-7xl xl:text-[5.25rem]">
          {t("title")}
        </h1>
        <p className="mt-0 mb-0 text-balance text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
        <div className="flex items-center gap-10">
          <Button asChild>
            <Link href="#">
              {t("cta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link className="no-underline" href="#">
              <Play className="mr-2 h-4 w-4" />
              {t("demo")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

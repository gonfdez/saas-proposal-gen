"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  const t = useTranslations("hero")

  return (
    <section className="relative py-20 lg:py-32 flex justify-center">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">{t("title")}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground text-pretty">{t("subtitle")}</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="text-base">
              {t("cta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="text-base bg-transparent">
              <Play className="mr-2 h-4 w-4" />
              {t("demo")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

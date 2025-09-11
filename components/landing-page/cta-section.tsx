"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  const t = useTranslations("cta")

  return (
    <section className="py-20 flex justify-center px-6">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">{t("title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">{t("subtitle")}</p>
          <div className="mt-8">
            <Button size="lg" className="text-base">
              {t("button")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">{t("no_credit_card")}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

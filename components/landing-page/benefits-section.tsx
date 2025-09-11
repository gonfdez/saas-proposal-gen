"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Brain, Target, TrendingUp } from "lucide-react"

export function BenefitsSection() {
  const t = useTranslations("benefits")

  const benefits = [
    {
      icon: Zap,
      title: t("speed.title"),
      description: t("speed.description"),
    },
    {
      icon: Brain,
      title: t("quality.title"),
      description: t("quality.description"),
    },
    {
      icon: Target,
      title: t("consistency.title"),
      description: t("consistency.description"),
    },
    {
      icon: TrendingUp,
      title: t("results.title"),
      description: t("results.description"),
    },
  ]

  return (
    <section className="py-20 bg-muted/50 flex justify-center px-6">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">{t("title")}</h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <benefit.icon className="mx-auto h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { MousePointer, Edit, Sparkles } from "lucide-react"

export function HowItWorksSection() {
  const t = useTranslations("how_it_works")

  const steps = [
    {
      icon: MousePointer,
      title: t("step1.title"),
      description: t("step1.description"),
      number: "01",
    },
    {
      icon: Edit,
      title: t("step2.title"),
      description: t("step2.description"),
      number: "02",
    },
    {
      icon: Sparkles,
      title: t("step3.title"),
      description: t("step3.description"),
      number: "03",
    },
  ]

  return (
    <section className="py-20 flex justify-center px-6">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">{t("title")}</h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-6 text-center">
                <div className="absolute -top-4 left-6 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {step.number}
                </div>
                <step.icon className="mx-auto h-12 w-12 text-primary mb-4 mt-4" />
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

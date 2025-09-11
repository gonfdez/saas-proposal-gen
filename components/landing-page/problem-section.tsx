"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, TrendingDown, AlertCircle } from "lucide-react"

export function ProblemSection() {
  const t = useTranslations("problem")

  const problems = [
    {
      icon: Clock,
      title: t("time_waste.title"),
      description: t("time_waste.description"),
    },
    {
      icon: TrendingDown,
      title: t("inconsistency.title"),
      description: t("inconsistency.description"),
    },
    {
      icon: AlertCircle,
      title: t("missed_opportunities.title"),
      description: t("missed_opportunities.description"),
    },
  ]

  return (
    <section className="py-20 flex justify-center px-6">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">{t("title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">{t("subtitle")}</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
          {problems.map((problem, index) => (
            <Card key={index} className="border-destructive/20">
              <CardContent className="p-6 text-center">
                <problem.icon className="mx-auto h-12 w-12 text-destructive mb-4" />
                <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>
                <p className="text-sm text-muted-foreground">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

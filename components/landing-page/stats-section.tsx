"use client"

import { useTranslations } from "next-intl"

export function StatsSection() {
  const t = useTranslations("stats")

  return (
    <section className="py-16 bg-muted/50 flex justify-center px-6">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">4.5 hrs</div>
            <div className="mt-2 text-sm text-muted-foreground">{t("time_saved")}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">73%</div>
            <div className="mt-2 text-sm text-muted-foreground">{t("conversion_rate")}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">50K+</div>
            <div className="mt-2 text-sm text-muted-foreground">{t("proposals_generated")}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

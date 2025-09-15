"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { FlickeringGrid } from "../ui/shadcn-io/flickering-grid"

export function HeroSection() {
  const t = useTranslations("hero")

  return (
    <section className="relative flex flex-col gap-16 px-8 p-12 lg:py-24 text-center items-center min-h-[calc(100vh-4rem)]">
      <FlickeringGrid
        className="absolute inset-0"
        squareSize={5}
        gridGap={12}
        flickerChance={0.3}
        color="var(--primary)"
        maxOpacity={0.15}
      />
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 max-w-[1500px] flex-1">
        <h1 className="mb-2 text-balance font-medium text-5xl lg:text-7xl tracking-tighter!">
          {t("title")}
        </h1>
        <p className="mt-0 mb-10 text-balance text-lg text-muted-foreground bg-background w-fit rounded-lg p-1">
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
            <Link className="no-underline" href="/demo">
              <Play className="mr-2 h-4 w-4" />
              {t("demo")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

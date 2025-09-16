"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { FlickeringGrid } from "../ui/shadcn-io/flickering-grid"
import { Safari } from "../ui/shadcn-io/safari"

export function HeroSection() {
  const t = useTranslations("hero")

  return (
    <section className="relative flex flex-col gap-8 px-8 lg:px-16 p-12 lg:py-24 text-center items-center min-h-[calc(100vh-4rem)]">
      <FlickeringGrid
        className="absolute inset-0"
        squareSize={5}
        gridGap={12}
        flickerChance={0.3}
        color="var(--primary)"
        maxOpacity={0.10}
      />
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        <div className="flex flex-col items-center justify-center gap-8 text-start">
          <h1 className="text-balance font-medium text-5xl lg:text-7xl tracking-tighter!">
            {t("title")}
          </h1>
          <p className="text-balance text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>
        <div className="relative">
          <Safari
            url={`${process.env.NEXT_PUBLIC_URL}/dashboard`}
            className="size-full"
            imageSrc={undefined}
          />
        </div>
      </div>
      <div className="flex items-center gap-10 z-10">
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
    </section>
  )
}

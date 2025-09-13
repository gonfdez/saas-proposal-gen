"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, FileText, Share2, Edit3 } from "lucide-react"
import LetterGlitchBackground from "../ui/shadcn-io/letter-glitch-background"

export function SolutionSection() {
  const t = useTranslations("solution")

  const features = [
    {
      icon: Mail,
      title: t("email.title"),
      description: t("email.description"),
    },
    {
      icon: FileText,
      title: t("pdf.title"),
      description: t("pdf.description"),
    },
    {
      icon: Share2,
      title: t("social.title"),
      description: t("social.description"),
    },
    {
      icon: Edit3,
      title: t("customization.title"),
      description: t("customization.description"),
    },
  ]

  return (
    <section className="relative py-20 bg-muted/50 flex justify-center">
      <div className="absolute inset-0 z-9">
        <LetterGlitchBackground
          glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
          glitchSpeed={200}
          centerVignette={false}
          outerVignette={false}
          smooth={true}
          fontSize={60}
          charWidth={70}
          charHeight={80}
        />
      </div>
      <div className="w-full z-10">
        <div className="bg-card w-full mx-auto text-center p-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">{t("title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">{t("subtitle")}</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 px-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <feature.icon className="mx-auto h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

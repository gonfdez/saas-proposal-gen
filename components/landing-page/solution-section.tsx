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
    <section className="relative py-20 flex justify-center items-center min-h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 z-9">
        <LetterGlitchBackground
          glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={false}
          smooth={true}
          fontSize={7}
          charWidth={20}
          charHeight={20}
        />
      </div>
      <div className="w-full z-10">
        <div className="p-6 flex flex-col items-center justify-center gap-8 text-center">
          <h1 className="mb-2 text-balance font-medium text-5xl lg:text-7xl tracking-tighter!">{t("title")}</h1>
          <p className="my-0 text-balance text-lg text-muted-foreground bg-background w-fit rounded-lg p-1">{t("subtitle")}</p>
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

"use server"

import Header from "@/components/header"
import { HeroSection } from "@/components/landing-page/hero-section"
import { StatsSection } from "@/components/landing-page/stats-section"
import { ProblemSection } from "@/components/landing-page/problem-section"
import { SolutionSection } from "@/components/landing-page/solution-section"
import { HowItWorksSection } from "@/components/landing-page/how-it-works-section"
import { BenefitsSection } from "@/components/landing-page/benefits-section"
import { CTASection } from "@/components/landing-page/cta-section"
import { DemoToast } from "@/components/demo-toast"

export default async function HomePage() {
  return (
    <>
      <DemoToast />
      <Header />
      <HeroSection />
      <StatsSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <BenefitsSection />
      <CTASection />
    </>
  )
}

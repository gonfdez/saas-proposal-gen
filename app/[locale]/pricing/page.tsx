"use client"

import PricingSection from "@/components/pricing-section"
import FaqSection from "@/components/faq-section"

export default function PricingPage() {
  return (
    <>
      <PricingSection className="min-h-[calc(100vh-4rem)]"/>
      <FaqSection className="py-20 px-6 bg-white"/>
    </>
  )
}

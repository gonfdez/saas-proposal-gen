"use client"

import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { toast } from "sonner"

export function DemoToast() {
  const t = useTranslations('demo')
  useEffect(() => {
    setTimeout(() => {
      toast.dismiss()
      toast(t('toast'), {
        duration: Infinity,
        className: "w-fit! font-bold",
        position: "top-center"
      })
    }, 300)
  }, [t])
  return null // No renderiza nada en el DOM, solo dispara el toast
}

"use client"

import type React from "react"

import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function ForgotPasswordPage() {

  const locale = useLocale();
  const t = useTranslations("auth")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const supabase = createClient()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/${locale}/auth/reset-password`,
      })
      if (error) {
        console.error(error.message)
        setError(t("resetError"))
      } else {
        setMessage(t("resetLinkSent"))
      }
    } catch {
      setError(t("resetError"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <Link
          href={"/auth/login"}
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("backToLogin")}
        </Link>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-6">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">{t("resetPassword")}</CardTitle>
            <CardDescription className="text-slate-600 mt-2">{t("resetPasswordDescription")}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {message && (
              <Alert className="border-emerald-200 bg-emerald-50">
                <AlertDescription className="text-emerald-800">{message}</AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  {t("email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  required
                  className="h-11 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? t("sendingResetLink") : t("sendResetLink")}
              </Button>
            </form>

            <div className="text-center pt-4">
              <Link
                href={"/auth/login"}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                {t("rememberPassword")} {t("backToLogin")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { translations, type Language } from "@/lib/translations"
import { type WizardData, defaultPreset } from "@/lib/wizard-config"
import StepHelpDialog from "./step-help-dialog"
import WizardConfigButtons from "./wizard-config-buttons"
import ProposalDisplay from "./proposal-display"
import { GeneratedProposal } from "@/lib/proposal-generator"
import { Edit, FileText, Mail, MessageSquareText, MousePointer, Sparkles } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import confetti from "canvas-confetti"
import { useLocale } from "next-intl"

export default function ProposalWizard() {

  const locale = useLocale()
  const [language, setLanguage] = useState<Language>(locale as Language)
  
  const [currentStep, setCurrentStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<GeneratedProposal | null>(null)
  
  const [formData, setFormData] = useState<WizardData>({
    presentation: "",
    audience: "",
    content: "",
    objective: "",
    format: "text_message",
    language: "ES",
    tone: "Profesional",
    includeEmojis: true,
    readingTime: 1,
    formatNote: "",
    meta: {
      createdAt: new Date().toISOString(),
      appVersion: "0.1.0",
    },
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const t = translations[language]
  const totalSteps = 3
  const progress = ((currentStep + 1) / totalSteps) * 100

  const stepBadgeTitles = [
    { icon: MousePointer, title: t.step1.badgeTitle },
    { icon: Edit, title: t.step2.badgeTitle },
    { icon: Sparkles, title: t.step3.badgeTitle }]

  const loadPreset = () => {
    setFormData(defaultPreset)
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}
    const formData = trimFormData();

    if (step === 1) {
      if (!formData.audience || formData.audience.length === 0) {
        newErrors.audience = t.validation.required
      }
      if (formData.content.length === 0) {
        newErrors.content = t.validation.required
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    trimFormData();
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const trimFormData = () => {
    const refinedFormData: WizardData = {
      ...formData,
      audience: formData.audience.trim(),
      presentation: formData.presentation.trim(),
      content: formData.content.trim(),
      objective: formData.objective.trim(),
      formatNote: formData.formatNote.trim(),
    }
    setFormData(refinedFormData);
    return refinedFormData;
  }

  const generateProposal = async () => {
    if (!validateStep(currentStep)) return

    setIsGenerating(true)
    console.info("Form data generated with the wizard", formData)

    try {
      const response = await fetch("/api/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          meta: {
            ...formData.meta,
            createdAt: new Date().toISOString(),
          },
        }),
      })

      const data = await response.json()
      setResult(data)
      console.info("Data returned from backend", data)
      nextStep()
    } catch (error) {
      console.error("Error generating proposal:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    if (currentStep === 2 && result) {
      confetti({
        particleCount: 300,  // más confeti
        spread: 160,         // más dispersión
        startVelocity: 45,   // velocidad inicial
        origin: { x: 0.5, y: 0.5 }, // centro de la pantalla
        zIndex: 9999,        // encima de todo
      });
    }
  }, [currentStep, result]);



  return (<>
    <div className="max-w-4xl mx-auto space-y-6 py-8 px-3">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t.wizard.title}</h1>
        <WizardConfigButtons language={language} loadPreset={loadPreset} setLanguage={setLanguage} />
      </div>

      <Progress value={progress} className="w-full" />
      <div className="flex items-center justify-center gap-4 md:gap-8">
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
          {stepBadgeTitles.map((step, index) => {
            const isActive = index === currentStep
            const isCompleted = index < currentStep

            const variantClasses = isActive
              ? "bg-primary text-primary-foreground"
              : isCompleted
                ? "bg-secondary text-secondary-foreground"
                : "border border-gray-200 text-gray-500"

            return (
              <div
                key={index}
                className={`flex flex-1 items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm sm:text-lg font-medium text-center transition-colors ${variantClasses}`}
              >
                <step.icon className="h-5 w-5 shrink-0" />
                <span className="truncate">{step.title}</span>
              </div>
            )
          })}
        </div>
      </div>

      {currentStep === 0 && (
        <div className="space-y-4">
          <div className="space-y-4">
            <Label htmlFor="presentation" className="text-lg font-semibold">
              {t.step1.chooseFormatLabel}
              <StepHelpDialog language={language} stepIndex={0} />
            </Label>
            <div className="flex flex-col md:flex-row gap-4">
              <Toggle
                aria-label="Toggle text message"
                variant="outline"
                pressed={formData.format === "text_message"} // <- Aquí controlamos el estado visual
                onPressedChange={(pressed) => {
                  if (pressed)
                    setFormData((prev) => ({
                      ...prev,
                      format: "text_message", // Si se presiona, asigna; si no, limpia
                    }))
                }}
                className="w-fit"
              >
                <MessageSquareText className="w-5 h-5" />{t.step1.formatOptions.text}
              </Toggle>
              <Toggle
                aria-label="Toggle email"
                variant="outline"
                pressed={formData.format === "email"}
                onPressedChange={(pressed) => {
                  if (pressed)
                    setFormData((prev) => ({
                      ...prev,
                      format: "email",
                    }))
                }}
                className="w-fit"
              >
                <Mail className="w-5 h-5" />{t.step1.formatOptions.email}
              </Toggle>
              <Toggle
                aria-label="Toggle PDF"
                variant="outline"
                pressed={formData.format === "pdf"}
                onPressedChange={(pressed) => {
                  if (pressed)
                    setFormData((prev) => ({
                      ...prev,
                      format: "pdf",
                    }))
                }}
                className="w-fit"
              >
                <FileText className="w-5 h-5" />{t.step1.formatOptions.pdf}
              </Toggle>
            </div>
          </div>
          <div className="space-y-4">
            <Label className="text-lg font-semibold">{t.step1.language}</Label>
            <Select
              value={formData.language}
              onValueChange={(value: "ES" | "EN") => setFormData((prev) => ({ ...prev, language: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ES">{t.step1.languageOptions.es}</SelectItem>
                <SelectItem value="EN">{t.step1.languageOptions.en}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <Label className="text-lg font-semibold">{t.step1.tone}</Label>
            <Select
              value={formData.tone}
              onValueChange={(value: "Profesional" | "Amigable" | "Persuasivo" | "Directo") =>
                setFormData((prev) => ({ ...prev, tone: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Profesional">{t.step1.toneOptions.Profesional}</SelectItem>
                <SelectItem value="Amigable">{t.step1.toneOptions.Amigable}</SelectItem>
                <SelectItem value="Persuasivo">{t.step1.toneOptions.Persuasivo}</SelectItem>
                <SelectItem value="Directo">{t.step1.toneOptions.Directo}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <Label className="text-lg font-semibold">{t.step1.includeEmojis}</Label>
            <Select
              value={formData.includeEmojis ? "yes" : "no"}
              onValueChange={(value: "yes" | "no") =>
                setFormData((prev) => ({ ...prev, includeEmojis: value === "yes" ? true : false }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">{t.step1.includeEmojisOptions.yes}</SelectItem>
                <SelectItem value="no">{t.step1.includeEmojisOptions.no}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <Label className="text-lg font-semibold">{t.step1.readingTime}</Label>
            <Select
              value={String(formData.readingTime)}
              onValueChange={(value: string) =>
                setFormData((prev) => ({ ...prev, readingTime: Number(value) }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{t.step1.readingTimeOptions.less1min}</SelectItem>
                <SelectItem value="2">{t.step1.readingTimeOptions.less2mins}</SelectItem>
                <SelectItem value="3">{t.step1.readingTimeOptions.less3mins}</SelectItem>
                <SelectItem value="4">{t.step1.readingTimeOptions.less4mins}</SelectItem>
                <SelectItem value="5">{t.step1.readingTimeOptions.less5mins}</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>
      )}

      {currentStep === 1 && (
        <div className="space-y-4">
          <Label htmlFor="presentation" className="text-lg font-semibold">
            {t.step2.presentationLabel}
            <StepHelpDialog language={language} stepIndex={0} />
          </Label>
          <Textarea
            id="presentation"
            value={formData.presentation || ""}
            onChange={(e) => setFormData((prev) => ({ ...prev, presentation: e.target.value }))}
            placeholder={t.step2.presentationPlaceholder}
            className={errors.presentation ? "border-red-500" : ""}
          />

          <Label htmlFor="audience" className="text-lg font-semibold">
            {t.step2.audienceLabel}
            <StepHelpDialog language={language} stepIndex={0} />
          </Label>
          <Textarea
            id="audience"
            value={formData.audience}
            onChange={(e) => setFormData((prev) => ({ ...prev, audience: e.target.value }))}
            placeholder={t.step2.audiencePlaceholder}
            className={errors.audience ? "border-red-500" : ""}
          />
          {errors.audience && <p className="text-sm text-red-500 mt-1">{errors.audience}</p>}

          <Label className="text-lg font-semibold">{t.step2.content}
            <StepHelpDialog language={language} stepIndex={1} />
          </Label>
          <Textarea
            value={formData.content || ""}
            onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
            placeholder={t.step2.contentPlaceholder}
            className={errors["content"] ? "border-red-500" : ""}
          />
          {errors["content"] && (
            <p className="text-sm text-red-500">{errors["content"]}</p>
          )}

          <Label className="text-lg font-semibold">{t.step2.objective}
            <StepHelpDialog language={language} stepIndex={1} />
          </Label>
          <Textarea
            value={formData.objective || ""}
            onChange={(e) => setFormData((prev) => ({ ...prev, objective: e.target.value }))}
            placeholder={t.step2.objectivePlaceholder}
            className={errors["objective"] ? "border-red-500" : ""}
          />
        </div>
      )}

      {(currentStep === 2 && result) && (
        <div className="space-y-4">
          <ProposalDisplay result={result} setResult={setResult} language={language} />
        </div>
      )}

      <div className="flex justify-between">
        {currentStep !== 0 ?
          <Button onClick={prevStep} disabled={currentStep === 0} variant="outline">
            {t.buttons.back}
          </Button> : <div></div>
        }

        {currentStep < 1 && (
          <Button onClick={nextStep}>{t.buttons.next}</Button>
        )}
        {currentStep === 1 && (
          <Button onClick={generateProposal} disabled={isGenerating}>
            {isGenerating ? "Generando..." : t.buttons.generate}
          </Button>
        )}
      </div>
    </div>
  </>
  )
}

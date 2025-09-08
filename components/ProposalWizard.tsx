"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { translations, type Language } from "@/lib/translations"
import { type WizardData, defaultPreset } from "@/lib/wizard-config"
import StepHelpDialog from "./StepHelpDialog"
import WizardConfigButtons from "./WizardConfigButtons"
import ProposalDisplay from "./ProposalDisplay"
import { GeneratedProposal } from "@/lib/proposal-generator"
import { FileText, Mail, MessageSquareText } from "lucide-react"

interface ProposalWizardProps {
  initialLanguage: Language
}

export default function ProposalWizard(props: ProposalWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [language, setLanguage] = useState<Language>(props.initialLanguage)
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<GeneratedProposal | null>(null)
  // const [editingResult, setEditingResult] = useState<WizardData | null>(null)

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

  const stepBadgeTitles = [t.step1.badgeTitle, t.step2.badgeTitle, t.step3.badgeTitle]

  const loadPreset = () => {
    setFormData(defaultPreset)
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}
    const formData = trimFormData();

    if (step === 0) {
      if (!formData.audience || formData.audience.length === 0) {
        newErrors.audience = t.validation.required
      }
    }

    if (step === 1) {
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
      // setEditingResult(data)
      console.info("Data returned from backend", data)
    } catch (error) {
      console.error("Error generating proposal:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  if (result) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex flex-col flex-row gap-6 justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t.result.title}</h1>
            <p className="text-muted-foreground">{t.result.subtitle}</p>
          </div>
          <WizardConfigButtons language={language} loadPreset={loadPreset} setLanguage={setLanguage} />
        </div>
        <ProposalDisplay result={result} setResult={setResult} language={language} />
        <Button onClick={() => setResult(null)} variant="outline">
          {t.buttons.back}
        </Button>
      </div>
    )
  }

  return (<>
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t.wizard.title}</h1>
        <WizardConfigButtons language={language} loadPreset={loadPreset} setLanguage={setLanguage} />
      </div>

      <Progress value={progress} className="w-full" />
      <div className="flex items-center justify-center gap-4 md:gap-8">
        {stepBadgeTitles.map((step, index) => (
          <Badge variant={index === currentStep ? "default" : index < currentStep ? "secondary" : "outline"} className="text-md" key={index}>
            {index + 1}. {step}
          </Badge>
        ))}
      </div>

      <Card>
        <CardContent className="space-y-6">
          {currentStep === 0 && (
            <div className="space-y-4">
              <Label htmlFor="presentation" className="text-lg font-semibold">
                {t.step1.presentationLabel}
                <StepHelpDialog language={language} stepIndex={0} />
              </Label>
              <Textarea
                id="presentation"
                value={formData.presentation || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, presentation: e.target.value }))}
                placeholder={t.step1.presentationPlaceholder}
                className={errors.presentation ? "border-red-500" : ""}
              />

              <Label htmlFor="audience" className="text-lg font-semibold">
                {t.step1.title}
                <StepHelpDialog language={language} stepIndex={0} />
              </Label>
              <Textarea
                id="audience"
                value={formData.audience}
                onChange={(e) => setFormData((prev) => ({ ...prev, audience: e.target.value }))}
                placeholder={t.step1.placeholder}
                className={errors.audience ? "border-red-500" : ""}
              />
              {errors.audience && <p className="text-sm text-red-500 mt-1">{errors.audience}</p>}
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
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

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">{t.step3.format}</Label>
                  <RadioGroup
                    value={formData.format}
                    onValueChange={(value: "text_message" | "email" | "pdf") =>
                      setFormData((prev) => ({ ...prev, format: value }))
                    }
                  >

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="text_message" id="text_message" />
                      <Label htmlFor="text_message"><MessageSquareText className="w-5 h-5" />{t.step3.options.text}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" />
                      <Label htmlFor="email"><Mail className="w-5 h-5" />{t.step3.options.email}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pdf" id="pdf" disabled />
                      <Label htmlFor="pdf"><FileText className="w-5 h-5" />{t.step3.options.pdf}</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">{t.step3.language}</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value: "ES" | "EN") => setFormData((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ES">Español</SelectItem>
                      <SelectItem value="EN">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">{t.step3.tone}</Label>
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
                      <SelectItem value="Profesional">{t.step3.toneOptions.Profesional}</SelectItem>
                      <SelectItem value="Amigable">{t.step3.toneOptions.Amigable}</SelectItem>
                      <SelectItem value="Persuasivo">{t.step3.toneOptions.Persuasivo}</SelectItem>
                      <SelectItem value="Directo">{t.step3.toneOptions.Directo}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">{t.step3.includeEmojis}</Label>
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
                      <SelectItem value="yes">{t.step3.includeEmojisOptions.yes}</SelectItem>
                      <SelectItem value="no">{t.step3.includeEmojisOptions.no}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">{t.step3.readingTime}</Label>
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
                      <SelectItem value="1">{t.step3.readingTimeOptions.less1min}</SelectItem>
                      <SelectItem value="2">{t.step3.readingTimeOptions.less2mins}</SelectItem>
                      <SelectItem value="3">{t.step3.readingTimeOptions.less3mins}</SelectItem>
                      <SelectItem value="4">{t.step3.readingTimeOptions.less4mins}</SelectItem>
                      <SelectItem value="5">{t.step3.readingTimeOptions.less5mins}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <Label className="text-lg font-semibold">{t.step3.formatNote}
                  <StepHelpDialog language={language} stepIndex={2} />
                </Label>
                <Textarea
                  value={formData.formatNote || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, formatNote: e.target.value }))}
                  placeholder={t.step3.formatNotePlaceholder}
                  className={errors["formatNote"] ? "border-red-500" : ""}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        {currentStep !== 0 ?
          <Button onClick={prevStep} disabled={currentStep === 0} variant="outline">
            {t.buttons.back}
          </Button> : <div></div>
        }

        {currentStep < totalSteps - 1 ? (
          <Button onClick={nextStep}>{t.buttons.next}</Button>
        ) : (
          <Button onClick={generateProposal} disabled={isGenerating}>
            {isGenerating ? "Generando..." : t.buttons.generate}
          </Button>
        )}
      </div>
    </div>
  </>
  )
}

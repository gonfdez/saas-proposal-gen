"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Copy, Download } from "lucide-react"
import { translations, type Language } from "@/lib/translations"
import { type WizardData, type Proposal, defaultPreset } from "@/lib/wizard-config"
import StepHelpDialog from "./StepHelpDialog"
import WizardConfigButtons from "./WizardConfigButtons"

export default function ProposalWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [language, setLanguage] = useState<Language>("es")
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<WizardData | null>(null)
  const [editingResult, setEditingResult] = useState<WizardData | null>(null)

  const [formData, setFormData] = useState<WizardData>({
    audience: "",
    proposals: [{ title: "", description: "", details: "" }],
    format: "email",
    language: "ES",
    tone: "Profesional",
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

    if (step === 0) {
      if (!formData.audience || formData.audience.length < 3) {
        newErrors.audience = formData.audience.length === 0 ? t.validation.required : t.validation.minLength
      }
    }

    if (step === 1) {
      if (formData.proposals.length === 0 || !formData.proposals[0].title) {
        newErrors.proposals = t.validation.required
      }
      formData.proposals.forEach((proposal, index) => {
        if (!proposal.title) {
          newErrors[`proposal-${index}`] = t.validation.required
        }
      })
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const addProposal = () => {
    setFormData((prev) => ({
      ...prev,
      proposals: [...prev.proposals, { title: "", description: "", details: "" }],
    }))
  }

  const removeProposal = (index: number) => {
    if (formData.proposals.length > 1) {
      setFormData((prev) => ({
        ...prev,
        proposals: prev.proposals.filter((_, i) => i !== index),
      }))
    }
  }

  const updateProposal = (index: number, field: keyof Proposal, value: string) => {
    setFormData((prev) => ({
      ...prev,
      proposals: prev.proposals.map((proposal, i) => (i === index ? { ...proposal, [field]: value } : proposal)),
    }))
  }

  const generateProposal = async () => {
    if (!validateStep(currentStep)) return

    setIsGenerating(true)

    try {
      const response = await fetch("/api/mock-echo", {
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
      setEditingResult(data)
    } catch (error) {
      console.error("Error generating proposal:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    if (editingResult) {
      navigator.clipboard.writeText(JSON.stringify(editingResult, null, 2))
    }
  }

  const downloadJSON = () => {
    if (editingResult) {
      const blob = new Blob([JSON.stringify(editingResult, null, 2)], {
        type: "application/json",
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "proposal.json"
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  if (result) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t.result.title}</h1>
            <p className="text-muted-foreground">{t.result.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setResult(null)} variant="outline">
              {t.buttons.back}
            </Button>
            <Button onClick={copyToClipboard} variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              {t.buttons.copy}
            </Button>
            <Button onClick={downloadJSON}>
              <Download className="w-4 h-4 mr-2" />
              {t.buttons.download}
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t.result.jsonPreview}</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(editingResult, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (<>
    <WizardConfigButtons language={language} loadPreset={loadPreset} setLanguage={setLanguage} />
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">{t.wizard.title}</h1>

      <div className="space-y-4">
        <Progress value={progress} className="w-full" />
        <div className="flex items-center justify-center gap-6">
          {stepBadgeTitles.map((step, index) => (
              <Badge variant={index === currentStep ? "default" : index < currentStep ? "secondary" : "outline"} className="text-sm" key={index}>
                {index + 1}. {step}
              </Badge>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="space-y-6">
          {currentStep === 0 && (
            <div className="space-y-4">
              <Label htmlFor="audience" className="text-lg font-semibold">
                {t.step1.title}
                <StepHelpDialog language={language} stepIndex={0} />
              </Label>
              <Input
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
              <Label className="text-lg font-semibold">{t.step2.title}
                <StepHelpDialog language={language} stepIndex={1} />
              </Label>

              {formData.proposals.map((proposal, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="font-medium">
                        {t.step2.titleLabel} {index + 1}
                      </Label>
                      {formData.proposals.length > 1 && (
                        <Button onClick={() => removeProposal(index)} variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <Input
                      value={proposal.title}
                      onChange={(e) => updateProposal(index, "title", e.target.value)}
                      placeholder={t.step2.placeholder}
                      className={errors[`proposal-${index}`] ? "border-red-500" : ""}
                    />
                    {errors[`proposal-${index}`] && (
                      <p className="text-sm text-red-500">{errors[`proposal-${index}`]}</p>
                    )}

                    <Input
                      value={proposal.description || ""}
                      onChange={(e) => updateProposal(index, "description", e.target.value)}
                      placeholder={t.step2.descriptionLabel}
                    />

                    <Textarea
                      value={proposal.details || ""}
                      onChange={(e) => updateProposal(index, "details", e.target.value)}
                      placeholder={t.step2.detailsLabel}
                      rows={3}
                    />
                  </div>
                </Card>
              ))}

              <Button onClick={addProposal} variant="outline" className="w-full bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                {t.step2.addAnother}
              </Button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold">{t.step3.title}
                <StepHelpDialog language={language} stepIndex={2} />
              </Label>

              <div className="space-y-6">

                <Label className="font-medium mb-3 block">Formato</Label>
                <RadioGroup
                  value={formData.format}
                  onValueChange={(value: "text" | "email" | "pdf") =>
                    setFormData((prev) => ({ ...prev, format: value }))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text" id="text" />
                    <Label htmlFor="text">{t.step3.options.text}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email" />
                    <Label htmlFor="email">{t.step3.options.email}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pdf" id="pdf" />
                    <Label htmlFor="pdf">{t.step3.options.pdf}</Label>
                  </div>
                </RadioGroup>


                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-medium">{t.step3.language}</Label>
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

                  <div className="space-y-2">
                    <Label className="font-medium">{t.step3.tone}</Label>
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
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button onClick={prevStep} disabled={currentStep === 0} variant="outline">
          {t.buttons.back}
        </Button>

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

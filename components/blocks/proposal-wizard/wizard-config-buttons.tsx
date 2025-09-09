"use client";

import { translations, type Language } from "@/lib/translations"
import { Button } from "../../ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { Bolt } from "lucide-react";
import { Label } from "../../ui/label";

interface WizardConfigButtonsProps {
  loadPreset: () => void,
  language: Language,
  setLanguage: Dispatch<SetStateAction<Language>>
}

export default function WizardConfigButtons(props: WizardConfigButtonsProps) {
  const t = translations[props.language];
  const language = props.language;

  const [open, setOpen] = useState(false)

  const handleLoadPreset = () => {
    props.loadPreset()
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline"><Bolt /></Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Config menu</SheetTitle>
          <SheetDescription>
            Some config stuff
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 p-4">
          <Button onClick={handleLoadPreset} variant="outline" size="sm" className="font-normal">
            Load text proposal preset
          </Button>
          <Label>{t.language.label}</Label>
          <Select value={language} onValueChange={(value: Language) => props.setLanguage(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="es">{t.language.es}</SelectItem>
              <SelectItem value="en">{t.language.en}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SheetContent>
    </Sheet>
  )
}
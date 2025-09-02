"use client";

import { translations, type Language } from "@/lib/translations"
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Bolt } from "lucide-react";

interface WizardConfigButtonsProps {
  loadPreset: () => void,
  language: Language,
  setLanguage: Dispatch<SetStateAction<Language>>
}

export default function WizardConfigButtons(props: WizardConfigButtonsProps) {
  const t = translations[props.language];
  const language = props.language;

  return (
    <Sheet>
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
          <Button onClick={props.loadPreset} variant="outline" size="sm">
            Load Preset
          </Button>
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
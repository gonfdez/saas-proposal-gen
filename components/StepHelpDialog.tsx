import { HelpCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { translations, type Language } from "@/lib/translations"

interface StepHelpDialogProps {
  language: Language,
  stepIndex: number
}


export default function StepHelpDialog(props: StepHelpDialogProps) {
  const t = translations[props.language];
  const index = props.stepIndex;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {index === 0 && t.help.step1.title}
            {index === 1 && t.help.step2.title}
            {index === 2 && t.help.step3.title}
          </DialogTitle>
          <DialogDescription>
            {index === 0 && t.help.step1.content}
            {index === 1 && t.help.step2.content}
            {index === 2 && t.help.step3.content}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
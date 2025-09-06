import { JSX, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { Language, translations } from "@/lib/translations";

interface TextProposalDisplayProps {
  language: Language
  HeaderComponent: () => JSX.Element
  content: string,
  editContent: (newContent: string) => void
}

export default function TextProposalDisplay({ language, HeaderComponent, content, editContent }: TextProposalDisplayProps) {
  const t = translations[language]

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto"; // Reset para calcular bien
    textarea.style.height = `${textarea.scrollHeight + 5}px`; // Ajusta a contenido
  };

  useEffect(() => {
    const handleResize = () => autoResize();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const copyContent = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="space-y-4">
      <HeaderComponent />
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <label className="text-sm font-medium text-muted-foreground">{t.proposalTextDisplay.content}</label>
          <Button size={"sm"} onClick={copyContent} variant="outline">
            <Copy className="w-4 h-4 mr-2" /> {t.buttons.copyContent}
          </Button>
        </div>
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => editContent(e.target.value)}
          className="bg-card border rounded-lg p-6 whitespace-pre-wrap text-foreground w-full"
        />
      </div>
    </div>
  );
}
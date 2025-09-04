import { JSX, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Copy, Edit } from "lucide-react";

interface TextProposalDisplayProps {
  HeaderComponent: () => JSX.Element
  content: string,
  editContent: (newContent: string) => void
}

export default function TextProposalDisplay({ HeaderComponent, content, editContent }: TextProposalDisplayProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto"; // Reset para calcular bien
    textarea.style.height = `${textarea.scrollHeight + 10}px`; // Ajusta a contenido
  };

  useEffect(() => {
    autoResize(); // Ajusta cuando se monte el componente
  }, [content]);

  useEffect(() => {
    const handleResize = () => autoResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const copyContent = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <HeaderComponent />
        <div className="flex gap-4">
          <Button size={"sm"} onClick={copyContent} variant="outline">
            <Edit className="w-4 h-4 mr-2" /> Edit content
          </Button>
          <Button size={"sm"} onClick={copyContent} variant="outline">
            <Copy className="w-4 h-4 mr-2" /> Copy Text
          </Button>
        </div>
      </div>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => editContent(e.target.value)}
        onInput={autoResize}
        className="bg-card border rounded-lg p-6 whitespace-pre-wrap text-foreground w-full"
        placeholder="Escribe tu propuesta aquí..."
      />
    </div>
  );
}
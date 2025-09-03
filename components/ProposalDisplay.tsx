import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, FileText, Mail, MessageSquareText } from "lucide-react"
import { type Language } from "@/lib/translations"
import { GeneratedProposal } from "@/lib/proposal-generator"
import { SetStateAction, useEffect, useRef } from "react"

interface ProposalDisplayProps {
  result: GeneratedProposal;
  setResult: (value: SetStateAction<GeneratedProposal | null>) => void;
  language: Language;
}

export default function ProposalDisplay({ result, setResult, language }: ProposalDisplayProps) {
  const copyContent = () => {
    if (result.content) {
      navigator.clipboard.writeText(result.content);
    }
  };

  const editContent = (newContent: string) => { 
    setResult((prev) => { 
      if (!prev) return prev;
      return {
        ...prev, content: newContent 
      }
    }) 
  }

  const formatIcons = {
    text_message: MessageSquareText,
    email: Mail,
    pdf: FileText
  }

  const formatLabels = {
    text_message: language === 'es' ? 'Mensaje de texto' : 'Text',
    email: language === 'es' ? 'Email' : 'Email',
    pdf: 'PDF'
  };

  const FormatIcon = formatIcons[result.format]

  return (
    <div className="space-y-4">
      {/* Header con información del formato */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-center gap-2">
          <div className="flex items-center gap-2">
            <FormatIcon className="w-5 h-5 text-muted-foreground" />
            <Badge variant="secondary">
              {formatLabels[result.format]}
            </Badge>
          </div>
          <span className="text-sm text-muted-foreground">
            {new Date(result.generatedAt).toLocaleString()}
          </span>
        </div>

        {result.format === 'text_message' && (
          <Button onClick={copyContent} variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            {language === 'es' ? 'Copiar texto' : 'Copy text'}
          </Button>
        )}
      </div>

      {/* Contenido según formato */}
      {result.format === 'text_message' ? (
        <TextProposalDisplay
          content={result.content}
          editContent={editContent}
        />
      ) : (
        <JSONFallbackDisplay result={result} language={language} />
      )}
    </div>
  );
}

// Componente para mostrar propuestas de texto
function TextProposalDisplay({ content, editContent }: { content: string, editContent: (newContent: string) => void }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto"; // Reset para calcular bien
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta a contenido
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

  return (
    <div className="prose prose-sm max-w-none">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => editContent(e.target.value)}
        onInput={autoResize}
        className="bg-card border rounded-lg p-6 whitespace-pre-wrap text-foreground w-full overflow-hidden"
        placeholder="Escribe tu propuesta aquí..."
      />
    </div>
  );
}

// Componente fallback para mostrar JSON (formatos no implementados)
function JSONFallbackDisplay({ result, language }: { result: GeneratedProposal; language: Language }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'es' ? 'Vista previa (JSON)' : 'Preview (JSON)'}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {language === 'es'
            ? 'El formato solicitado aún no está implementado. Mostrando datos en JSON.'
            : 'Requested format not yet implemented. Showing JSON data.'}
        </p>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
          {JSON.stringify(result, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
}
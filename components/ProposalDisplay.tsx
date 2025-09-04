import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Mail, MessageSquareText } from "lucide-react"
import { type Language } from "@/lib/translations"
import { GeneratedProposal } from "@/lib/proposal-generator"
import { SetStateAction } from "react"
import TextProposalDisplay from "./TextProposalDisplay"
import EmailProposalDisplay from "./EmailProposalDisplay";

interface ProposalDisplayProps {
  result: GeneratedProposal;
  setResult: (value: SetStateAction<GeneratedProposal | null>) => void;
  language: Language;
}

export default function ProposalDisplay({ result, setResult, language }: ProposalDisplayProps) {

  const editTextContent = (newContent: string) => {
    setResult((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        content: newContent
      }
    });
  };

  const formatIcons = {
    text_message: MessageSquareText,
    email: Mail,
    pdf: FileText
  };

  const formatLabels = {
    text_message: language === 'es' ? 'Mensaje de texto' : 'Text message',
    email: language === 'es' ? 'Email' : 'Email',
    pdf: 'PDF'
  };

  const FormatIcon = formatIcons[result.format];

  const HeaderComponent = () => (
    <div className="flex items-center gap-4">
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
  );

  return (
    <div className="space-y-4">
      {result.format === 'text_message' && (
        <TextProposalDisplay
          HeaderComponent={HeaderComponent}
          content={result.content}
          editContent={editTextContent}
        />
      )}

      {result.format === 'email' && (
        <EmailProposalDisplay
          HeaderComponent={HeaderComponent}
          content={result.content}
          editContent={editTextContent}
        />
      )}

      {result.format === 'pdf' && (
        <JSONFallbackDisplay result={result} language={language} />
      )}
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
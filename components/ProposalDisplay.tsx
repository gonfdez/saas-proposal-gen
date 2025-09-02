import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, FileText } from "lucide-react"
import { type Language } from "@/lib/translations"
import { GeneratedProposal } from "@/lib/proposal-generator"

interface ProposalDisplayProps {
  result: GeneratedProposal;
  language: Language;
}

export default function ProposalDisplay({ result, language }: ProposalDisplayProps) {
  const copyContent = () => {
    if (result.content) {
      navigator.clipboard.writeText(result.content);
    }
  };

  const formatLabels = {
    text: language === 'es' ? 'Texto' : 'Text',
    email: language === 'es' ? 'Email' : 'Email',
    pdf: 'PDF'
  };

  return (
    <div className="space-y-4">
      {/* Header con información del formato */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-center gap-2">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-muted-foreground" />
            <Badge variant="secondary">
              {formatLabels[result.format]}
            </Badge>
          </div>
          <span className="text-sm text-muted-foreground">
            {new Date(result.generatedAt).toLocaleString()}
          </span>
        </div>

        {result.format === 'text' && (
          <Button onClick={copyContent} variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            {language === 'es' ? 'Copiar texto' : 'Copy text'}
          </Button>
        )}
      </div>

      {/* Contenido según formato */}
      {result.format === 'text' ? (
        <TextProposalDisplay content={result.content} />
      ) : (
        <JSONFallbackDisplay result={result} language={language} />
      )}
    </div>
  );
}

// Componente para mostrar propuestas de texto
function TextProposalDisplay({ content }: { content: string }) {
  return (
    <div className="prose prose-sm max-w-none">
      <div className="bg-background border rounded-lg p-6">
        <div className="whitespace-pre-wrap text-foreground leading-relaxed">
          {content}
        </div>
      </div>
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
import { JSX, useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";
import { Copy } from "lucide-react";
import { Editor } from "@/components/blocks/editor-00/editor"

import { $getRoot, $insertNodes, SerializedEditorState } from "lexical";
import { createHeadlessEditor } from '@lexical/headless';
import { $generateNodesFromDOM } from '@lexical/html';
import { nodes } from "../editor-00/nodes";
import { Language, translations } from "@/lib/translations";

function htmlToSerializedEditorState(htmlString: string): SerializedEditorState {
  // Crea un editor temporal para la conversión
  const tempEditor = createHeadlessEditor({
    namespace: 'temp-conversion',
    nodes: nodes, // Agrega aquí los nodos personalizados que uses en tu editor principal
    onError: (error) => console.error('Temp editor error:', error),
  });

  tempEditor.update(
    () => {
      // Parse el HTML
      const parser = new DOMParser();
      const dom = parser.parseFromString(htmlString, 'text/html');

      // Genera los nodos de Lexical desde el DOM
      const nodes = $generateNodesFromDOM(tempEditor, dom);

      // Limpia el root y selecciónalo
      const root = $getRoot();
      root.clear();
      root.select();

      // Inserta los nodos
      $insertNodes(nodes);
    },
    {
      discrete: true, // Para asegurar que la actualización sea síncrona
    }
  );

  // Obtén el estado serializado
  return tempEditor.getEditorState().toJSON();
}

interface EmailProposalDisplayProps {
  language: Language
  HeaderComponent: () => JSX.Element;
  content: string;
}

export default function EmailProposalDisplay({ language, HeaderComponent, content }: EmailProposalDisplayProps) {
  const t = translations[language]
  
  const subjectRef = useRef<HTMLTextAreaElement>(null);

  // Extraer <h2> como asunto y el resto como cuerpo
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");

  const subjectFromHtml = doc.querySelector("h2")?.textContent?.trim() ?? "";
  const bodyHtml = doc.body.innerHTML.replace(doc.querySelector("h2")?.outerHTML ?? "", "").trim();

  const [subject, setSubject] = useState(subjectFromHtml);
  const [editorState, setEditorState] = useState<SerializedEditorState>(() =>
    htmlToSerializedEditorState(bodyHtml)
  );

  const autoResize = (ref: React.RefObject<HTMLTextAreaElement | null>) => {
    const textarea = ref.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight + 5}px`;
  };

  useEffect(() => {
    const handleResize = () => autoResize(subjectRef);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubjectChange = (newSubject: string) => {
    setSubject(newSubject);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-4 w-full">
      {/* Header y botones de copiar */}
      <div className="flex flex-col md:flex-row gap-y-2 md:justify-between md:items-center">
        <HeaderComponent />
      </div>

      {/* Campo para asunto */}
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <label className="text-sm font-medium text-muted-foreground">{t.proposalEmailDisplay.subject}</label>
          <Button size="sm" onClick={() => copyToClipboard(subject)} variant="outline">
            <Copy className="w-4 h-4 mr-2" /> {t.buttons.copySubject}
          </Button>
        </div>
        <textarea
          ref={subjectRef}
          value={subject}
          onChange={(e) => handleSubjectChange(e.target.value)}
          rows={1}
          className="bg-card border rounded-lg p-4 whitespace-pre-wrap text-foreground w-full font-semibold resize-none"
          placeholder="Escribe el asunto aquí..."
        />
      </div>

      {/* Editor enriquecido para el cuerpo */}
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <label className="text-sm font-medium text-muted-foreground">{t.proposalEmailDisplay.body}</label>
          <Button size="sm" onClick={() => console.log("TODO")} variant="outline">
            <Copy className="w-4 h-4 mr-2" /> {t.buttons.copyBody}
          </Button>
        </div>
        <Editor
          editorSerializedState={editorState}
          onSerializedChange={(value) => setEditorState(value)}
        />
      </div>
    </div>
  );
}

import { JSX, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { Editor } from "@/components/blocks/editor-00/editor"
import { SerializedEditorState } from "lexical";

export function bodyToSerializedState(body: string): SerializedEditorState {
  return {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: body,
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  } as unknown as SerializedEditorState
}

interface EmailProposalDisplayProps {
  HeaderComponent: () => JSX.Element;
  content: string;
}

export default function EmailProposalDisplay({ HeaderComponent, content }: EmailProposalDisplayProps) {
  const subjectRef = useRef<HTMLTextAreaElement>(null);

  // Estado para asunto
  const [subject, setSubject] = useState(() => {
    const lines = content.split("\n");
    return lines[0]?.trim() ?? "";
  });

  // Estado para el cuerpo
  const [editorState, setEditorState] =
    useState<SerializedEditorState>(bodyToSerializedState(content.split("\n").slice(1).join("\n").trim()));

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
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" onClick={() => copyToClipboard(subject)} variant="outline">
            <Copy className="w-4 h-4 mr-2" /> Copy Subject
          </Button>
          <Button size="sm" onClick={() => console.log("TODO")} variant="outline">
            <Copy className="w-4 h-4 mr-2" /> Copy Body
          </Button>
          <Button size="sm" onClick={() => console.log("TODO")} variant="outline">
            <Copy className="w-4 h-4 mr-2" /> Copy All
          </Button>
        </div>
      </div>

      {/* Campo para asunto */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">Asunto</label>
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
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">Cuerpo</label>
        <Editor
          editorSerializedState={editorState}
          onSerializedChange={(value) => setEditorState(value)}
        />
      </div>
    </div>
  );
}

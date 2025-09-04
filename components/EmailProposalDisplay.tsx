import { JSX, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";

interface EmailProposalDisplayProps {
  HeaderComponent: () => JSX.Element;
  content: string;
  editContent: (newContent: string) => void;
}

export default function EmailProposalDisplay({ HeaderComponent, content, editContent }: EmailProposalDisplayProps) {
  const subjectRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const [subject, setSubject] = useState(()=>{
    const lines = content.split("\n");
    return lines[0].trim() ?? "";
  });
  const [body, setBody] = useState(()=>{
    const lines = content.split("\n");
    return lines.slice(1).join("\n").trim();
  });

  const autoResize = (ref: React.RefObject<HTMLTextAreaElement | null>) => {
    const textarea = ref.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight + 5}px`;
  };
  
  useEffect(() => {
    const handleResize = () => {
      autoResize(subjectRef);
      autoResize(bodyRef);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubjectChange = (newSubject: string) => {
    setSubject(newSubject);
    editContent(`${newSubject}\n${body}`);
  };

  const handleBodyChange = (newBody: string) => {
    setBody(newBody);
    editContent(`${subject}\n${newBody}`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col md:flex-row gap-y-2 md:justify-between md:items-center">
        <HeaderComponent />
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" onClick={() => copyToClipboard(subject)} variant="outline">
            <Copy className="w-4 h-4 mr-2" /> Copy Subject
          </Button>
          <Button size="sm" onClick={() => copyToClipboard(body)} variant="outline">
            <Copy className="w-4 h-4 mr-2" /> Copy Body
          </Button>
          <Button size="sm" onClick={() => copyToClipboard(`${subject}\n${body}`)} variant="outline">
            <Copy className="w-4 h-4 mr-2" /> Copy All
          </Button>
        </div>
      </div>

      {/* Asunto */}
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

      {/* Cuerpo */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">Cuerpo</label>
        <textarea
          ref={bodyRef}
          value={body}
          onChange={(e) => handleBodyChange(e.target.value)}
          className="bg-card border rounded-lg p-6 whitespace-pre-wrap text-foreground w-full min-h-[200px] resize-none"
          placeholder="Escribe el contenido del email aquí..."
        />
      </div>
    </div>
  );
}

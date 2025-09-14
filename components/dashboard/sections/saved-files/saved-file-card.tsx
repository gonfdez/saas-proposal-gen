import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Mail, MessageSquareText, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { SavedFile } from "../../context/dashboard-context";

interface SavedFileCardProps {
  savedFile: SavedFile
  onDelete: (id: string) => void
  onEdit: (savedFile: SavedFile) => void
}

export const SavedFileCard: React.FC<SavedFileCardProps> = ({ savedFile, onDelete, onEdit }) => (
  <Card className="h-fit">
    <CardHeader className="flex flex-row items-start justify-between">
      <div className="space-y-1.5">
        <CardTitle className="flex items-center gap-2">
          {savedFile.type === "text_message" ? (
            <><MessageSquareText className="h-4 w-4" /> Mensaje de texto</>
          ) : (
            <><Mail className="h-4 w-4" />Email</>
          )}
        </CardTitle>
        <CardDescription>Generado el {new Date(savedFile.meta.createdAt).toLocaleString()}</CardDescription>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(savedFile)}>
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(savedFile.id)} className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground border p-2">
        {savedFile.content}
      </p>
    </CardContent>
  </Card>
);
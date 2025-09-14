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
import { Mail, MoreHorizontal, Pencil, Text, Trash2 } from "lucide-react";
import { SavedFile } from "../../context/dashboard-context";

interface SavedFileCardProps {
  savedFile: SavedFile;
  onDelete: (id: string) => void;
  onEdit: (savedFile: SavedFile) => void;
}

export const SavedFileCard: React.FC<SavedFileCardProps> = ({ savedFile, onDelete, onEdit }) => (
  <Card>
    <CardHeader className="flex flex-row items-start justify-between">
      <div className="space-y-1.5">
        <CardTitle className="flex items-center gap-2">
          {savedFile.type === "text_message" ? (
            <Text className="h-5 w-5 text-muted-foreground" />
          ) : (
            <Mail className="h-5 w-5 text-muted-foreground" />
          )}
        </CardTitle>
        <CardDescription>Profile {savedFile.profileId}</CardDescription>
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
      <p className="text-sm text-muted-foreground line-clamp-3">
        {savedFile.content}
      </p>
    </CardContent>
  </Card>
);
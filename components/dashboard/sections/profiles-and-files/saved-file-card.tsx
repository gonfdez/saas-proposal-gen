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
import { useTranslations } from "next-intl";

interface SavedFileCardProps {
  savedFile: SavedFile
  onDelete: (id: string) => void
  onEdit: (savedFile: SavedFile) => void
}

export const SavedFileCard: React.FC<SavedFileCardProps> = ({ savedFile, onDelete, onEdit }) => {
  const t = useTranslations('dashboard.profilesAndFiles')

  const renderFileCardTitle = () => {
    switch (savedFile.type) {
      case "text_message":
        return <><MessageSquareText className="h-4 w-4" />{t('textMessage')}</>
      case "email":
        return <><Mail className="h-4 w-4" />{t('email')}</>
      default:
        return <>Unknown</>
    }
  }

  const renderFileThumbnail = () => {
    switch (savedFile.type) {
      case "text_message":
        return (
          <div className="max-h-100 overflow-y-auto rounded-sm border bg-background p-3 text-sm leading-relaxed">
            <p className="whitespace-pre-wrap">
              {savedFile.content}
            </p>
          </div>
        )
      case "email":
        return (
          <div className="max-h-100 overflow-y-auto rounded-sm border bg-background p-3 text-sm leading-relaxed">
            <div
              className="space-y-3 [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:mb-4 [&>p]:mb-3 [&>p]:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: savedFile.content }}
            />
          </div>
        )
      default:
        return (
          <p className="text-sm text-muted-foreground border p-2">
            {savedFile.content}
          </p>
        )
    }
  }

  return (
    <Card className="h-fit cursor-default">
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="space-y-1.5">
          <CardTitle className="flex items-center gap-2">
            {renderFileCardTitle()}
          </CardTitle>
          <CardDescription>{t('generatedAt')} {new Date(savedFile.meta.createdAt).toLocaleString()}</CardDescription>
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
              {t('edit')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(savedFile.id)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4 text-red-600" />
              {t('delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        {renderFileThumbnail()}
      </CardContent>
    </Card>
  );
}
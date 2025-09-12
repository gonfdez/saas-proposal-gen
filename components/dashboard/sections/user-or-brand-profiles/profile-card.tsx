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
import { Building, MoreHorizontal, Pencil, Trash2, User } from "lucide-react";
import { Profile } from "./user-or-brand-profiles-section";

interface ProfileCardProps {
  profile: Profile;
  onDelete: (id: string) => void;
  onEdit: (profile: Profile) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onDelete, onEdit }) => (
  <Card>
    <CardHeader className="flex flex-row items-start justify-between">
      <div className="space-y-1.5">
        <CardTitle className="flex items-center gap-2">
          {profile.type === "brand" ? (
            <Building className="h-5 w-5 text-muted-foreground" />
          ) : (
            <User className="h-5 w-5 text-muted-foreground" />
          )}
          {profile.name}
        </CardTitle>
        <CardDescription>{profile.role}</CardDescription>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(profile)}>
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(profile.id)} className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground line-clamp-3">
        {profile.valueProposition}
      </p>
    </CardContent>
  </Card>
);
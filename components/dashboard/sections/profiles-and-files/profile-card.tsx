import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Badge } from "@/components/ui/badge";
import { Profile } from "../../context/dashboard-context";
import React from "react";

interface ProfileCardProps {
  profile: Profile
  showBadge?: boolean
  badgeText: string
  onClick?: () => void
  onDelete?: (id: string) => void
  onEdit?: (profile: Profile) => void
  className?: string
  footer?: React.ReactNode
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, showBadge = false, onClick, onDelete, onEdit, className, badgeText, footer }) => (
  <Card className={`relative ${showBadge && 'ring-2 ring-primary'} ${className || ''}`} onClick={() => onClick && onClick()}>
    {showBadge && (
      <Badge className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2 rounded-full">
        {badgeText}
      </Badge>
    )}
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
      {(onEdit || onDelete) &&
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onEdit &&
              <DropdownMenuItem onClick={() => onEdit(profile)}>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
            }
            {onDelete &&
              <DropdownMenuItem onClick={() => onDelete(profile.id)} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </DropdownMenuItem>
            }
          </DropdownMenuContent>
        </DropdownMenu>
      }
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground line-clamp-3">
        {profile.valueProposition}
      </p>
    </CardContent>
    {footer &&
      <CardFooter>
        {footer}
      </CardFooter>
    }
  </Card>
);
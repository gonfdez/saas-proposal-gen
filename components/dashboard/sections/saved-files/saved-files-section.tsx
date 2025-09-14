"use client";

import React from "react";
import { SavedFileCard } from "./saved-file-card";
import useDashboard from "../../context/useDashboard";
import { Button } from "@/components/ui/button";
import { MousePointer, PlusCircle } from "lucide-react";
import { ProfileCard } from "../user-or-brand-profiles/profile-card";
import { Label } from "@/components/ui/label";

export default function SavedFilesSection() {
  const { savedFiles, handleDeleteSavedFile, handleEditSavedFile, selectedProfile } = useDashboard()

  if (!selectedProfile) return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 h-full flex flex-col">
      <p className="text-muted-foreground">
        Necesitas tener un perfil seleccionado para ver los archivos generados con ese perfil.
      </p>
      <Button className="w-fit">
        <MousePointer className="mr-2 h-4 w-4" /> Seleccionar un perfil
      </Button>
    </div>
  )

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 h-full flex flex-col">
      <p className="text-muted-foreground">
        Gestiona los archivos que has generado usando este perfil.
      </p>
      <ProfileCard
        className={"w-full lg:w-fit"}
        key={selectedProfile.id}
        profile={selectedProfile}
        showBadge={true}
        badgeText="Perfil seleccionado"
        footer={
          <Button variant={'outline'} className="w-full">
            <MousePointer className="mr-2 h-4 w-4" /> Cambiar a otro perfil
          </Button>
        }
      />
      {savedFiles.length > 0 ? (
        <div className="space-y-3">
          <Label>Archivos generados:</Label>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedFiles.map((savedFile) => (
              <SavedFileCard
                key={savedFile.id}
                savedFile={savedFile}
                onDelete={handleDeleteSavedFile}
                onEdit={handleEditSavedFile}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center">
          <h3 className="text-xl font-semibold">No tienes archivos todavía</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Crea tu primer contenido para verlo aqui.
          </p>
          <Button className="mt-6">
            <PlusCircle className="mr-2 h-4 w-4" /> Generar Primer Contenido
          </Button>
        </div>
      )}
    </div>
  );
};
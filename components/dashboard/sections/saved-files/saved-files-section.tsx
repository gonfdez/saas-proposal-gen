"use client";

import React from "react";
import { SavedFileCard } from "./saved-file-card";
import useDashboard from "../../context/useDashboard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function SavedFilesSection() {
  const { savedFiles, handleDeleteSavedFile, handleEditSavedFile } = useDashboard()

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 h-full flex flex-col">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground">
          Gestiona los archivos de contenido que has generado
        </p>
        <Button variant={"outline"}>
          <PlusCircle className="mr-2 h-4 w-4" /> Generar Nuevo Contenido
        </Button>
      </div>
      {savedFiles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {savedFiles.map((savedFile) => (
            <SavedFileCard
              key={savedFile.id}
              savedFile={savedFile}
              onDelete={handleDeleteSavedFile}
              onEdit={handleEditSavedFile}
            />
          ))}
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
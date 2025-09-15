"use client";

import React from "react";
import { NewProfileDialog } from "./new-profile-dialog";
import useDashboard from "../../context/useDashboard";
import { Label } from "@/components/ui/label";
import SavedFilesList from "./saved-files-list";
import ProfilesList from "./profiles-list";

export default function ProfilesAndFilesSection() {
  const {
    profiles,
    fetchProfiles,
  } = useDashboard()

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 h-full flex flex-col">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground">
          Gestiona las diferentes identidades que usará la IA para generar contenido.
          Cada perfil tiene un tono y una propuesta de valor únicos.
        </p>
        <NewProfileDialog onProfileCreated={fetchProfiles} />
      </div>
      {profiles.length > 0 ? (
        <>
          <ProfilesList />
          <SavedFilesList />
        </>
      ) : (
        <div className="space-y-3 flex flex-col h-full">
          <Label>Tus perfiles:</Label>
          <div className="flex-1 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center">
            <h3 className="text-xl font-semibold">No tienes perfiles todavía</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Crea tu primer perfil para empezar a generar contenido personalizado.
            </p>
            <div className="mt-6">
              <NewProfileDialog onProfileCreated={fetchProfiles} isFirstProfile={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
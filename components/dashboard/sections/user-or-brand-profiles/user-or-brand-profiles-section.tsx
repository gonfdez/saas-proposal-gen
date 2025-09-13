"use client";

import React from "react";
import { NewProfileDialog } from "./new-profile-dialog";
import { ProfileCard } from "./profile-card";
import useDashboard from "../../context/useDashboard";

export default function UserOrBrandProfilesSection() {
  const { selectedProfile, setSelectedProfile, profiles, fetchProfiles, handleDeleteProfile, handleEditProfile } = useDashboard()

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground">
          Gestiona las diferentes identidades que usará la IA para generar contenido.
          Cada perfil tiene un tono y una propuesta de valor únicos.
        </p>
        <NewProfileDialog onProfileCreated={fetchProfiles} />
      </div>
      {profiles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onDelete={handleDeleteProfile}
              onEdit={handleEditProfile}
              isSelected={profile.id === selectedProfile?.id}
              onSelect={() => setSelectedProfile(profile)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center mt-10">
          <h3 className="text-xl font-semibold">No tienes perfiles todavía</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Crea tu primer perfil para empezar a generar contenido personalizado.
          </p>
          <div className="mt-6">
            <NewProfileDialog onProfileCreated={fetchProfiles} isFirstProfile={true} />
          </div>
        </div>
      )}
    </div>
  );
};
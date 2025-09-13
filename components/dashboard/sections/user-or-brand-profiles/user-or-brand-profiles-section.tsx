"use client";

import React, { useState, useEffect } from "react";
import { NewProfileDialog } from "./new-profile-dialog";
import { ProfileCard } from "./profile-card";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export type Profile = {
  id: string;
  type: "personal" | "brand";
  name: string;
  role: string;
  valueProposition: string;
  targetAudience: string;
  toneOfVoice: "profesional" | "inspirador" | "tecnico" | "cercano";
};

export default function UserOrBrandProfilesSection() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simula la obtención de datos
  const fetchProfiles = () => {
    console.log("Fetching profiles...");
    setIsLoading(true);
    // TODO: Reemplaza esto con tu llamada real a Supabase
    // const { data, error } = await supabase.from('profiles').select('*');
    // if (data) setProfiles(data);

    // Mock data por ahora
    const mockData: Profile[] = [
      { id: "1", type: "personal", name: "Juan Pérez", role: "Consultor de Marketing Digital", valueProposition: "Ayudo a empresas B2B a generar leads cualificados.", targetAudience: "Directores de Marketing en empresas de tecnología.", toneOfVoice: "profesional" },
      { id: "2", type: "brand", name: "Acme Corp", role: "Agencia de Crecimiento", valueProposition: "Escalamos startups con estrategias de growth hacking.", targetAudience: "Startups en fase de crecimiento.", toneOfVoice: "inspirador" }
    ];

    setTimeout(() => { // Simula el delay de la red
      setProfiles(mockData);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleDeleteProfile = (id: string) => {
    console.log("Deleting profile:", id);
    // TODO: Llama a tu función de Supabase para eliminar
    // await supabase.from('profiles').delete().match({ id });
    fetchProfiles(); // Vuelve a cargar los perfiles
  };

  const handleEditProfile = (profile: Profile) => {
    console.log("Editing profile:", profile);
    // Aquí puedes abrir un diálogo de edición, similar al de creación
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-full"><Spinner size={30} /></div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
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
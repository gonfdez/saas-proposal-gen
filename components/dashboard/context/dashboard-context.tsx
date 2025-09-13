"use client"

import { User } from '@supabase/supabase-js';
import React, { createContext, useEffect, useState } from 'react';
import { DashboardSectionKey } from '../dashboard-sections';

export type Profile = {
  id: string;
  type: "personal" | "brand";
  name: string;
  role: string;
  valueProposition: string;
  targetAudience: string;
  toneOfVoice: "profesional" | "inspirador" | "tecnico" | "cercano";
};

export interface DashboardContextValue {
  isLoading: boolean,
  activeSection: DashboardSectionKey;
  setActiveSection: (newSection: DashboardSectionKey) => void;
  profiles: Profile[];
  fetchProfiles: () => void;
  handleDeleteProfile: (id: string) => void;
  handleEditProfile: (profile: Profile) => void;
  selectedProfile: Profile | null;
  setSelectedProfile: (newSelectedProfile: Profile | null) => void;
  user: User;
}

export const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

interface DashboardProviderProps {
  children: React.ReactNode
  user: User
}

export const DashboardProvider = (props: DashboardProviderProps) => {
  const [activeSection, setActiveSection] = useState<DashboardSectionKey>(DashboardSectionKey.OVERVIEW);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

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
      setSelectedProfile(mockData[0])
      setIsLoading(false);
    }, 500);
  };

  const handleDeleteProfile = (id: string) => {
    console.log("Deleting profile:", id);
    // TODO: Llama a tu función de Supabase para eliminar el profile
    fetchProfiles(); // Vuelve a cargar los perfiles
  };

  const handleEditProfile = (profile: Profile) => {
    console.log("Editing profile:", profile);
    // TODO: Llama a tu función de Supabase para actualizar el profile
    fetchProfiles(); // Vuelve a cargar los perfiles
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const value = {
    isLoading,
    activeSection,
    setActiveSection,
    profiles,
    fetchProfiles,
    handleDeleteProfile,
    handleEditProfile,
    selectedProfile,
    setSelectedProfile,
    user: props.user,
  };

  return (
    <DashboardContext.Provider value={value}>
      {props.children}
    </DashboardContext.Provider>
  );
};

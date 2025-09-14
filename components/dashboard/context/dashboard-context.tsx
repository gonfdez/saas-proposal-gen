"use client"

import { User } from '@supabase/supabase-js';
import React, { createContext, useEffect, useState } from 'react';
import { DashboardSectionKey } from '../dashboard-sections';

export type Profile = {
  id: string
  type: "personal" | "brand"
  name: string
  role: string
  valueProposition: string
  targetAudience: string
  toneOfVoice: "profesional" | "inspirador" | "tecnico" | "cercano"
};

export type SavedFile = {
  id: string;
  type: "email" | "pdf" | "text_message"
  profileId: string
  content: string
  meta: {
    createdAt: string
  }
}

export interface DashboardContextValue {
  isLoading: boolean,
  user: User;
  activeSection: DashboardSectionKey;
  setActiveSection: (newSection: DashboardSectionKey) => void;
  profiles: Profile[];
  fetchProfiles: () => void;
  handleDeleteProfile: (id: string) => void;
  handleEditProfile: (profile: Profile) => void;
  selectedProfile: Profile | null;
  setSelectedProfile: (newSelectedProfile: Profile | null) => void;
  savedFiles: SavedFile[]
  fetchSavedFiles: () => void
  handleDeleteSavedFile: (id: string) => void;
  handleEditSavedFile: (savedFile: SavedFile) => void;
}

export const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

interface DashboardProviderProps {
  children: React.ReactNode
  user: User
}

export const DashboardProvider = (props: DashboardProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<DashboardSectionKey>(DashboardSectionKey.OVERVIEW);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [savedFiles, setSavedFiles] = useState<SavedFile[]>([]);

  // PROFILES FUNCTIONS
  const fetchProfiles = () => {
    console.log("Fetching profiles...");
    setIsLoading(true);

    // TODO: Reemplaza esto con tu llamada real a Supabase
    // Mock data por ahora
    const mockData: Profile[] = [
      { id: "1", type: "personal", name: "Juan Pérez", role: "Consultor de Marketing Digital", valueProposition: "Ayudo a empresas B2B a generar leads cualificados.", targetAudience: "Directores de Marketing en empresas de tecnología.", toneOfVoice: "profesional" },
      { id: "2", type: "brand", name: "Acme Corp", role: "Agencia de Crecimiento", valueProposition: "Escalamos startups con estrategias de growth hacking.", targetAudience: "Startups en fase de crecimiento.", toneOfVoice: "inspirador" }
    ];
    setTimeout(() => { // Simula el delay de la red
      setProfiles(mockData);
      // setSelectedProfile(mockData[0])
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

  // SAVED FILES FUNCTIONS
  const fetchSavedFiles = () => {
    console.log("Fetching saved files...");
    setIsLoading(true);

    // TODO: Reemplaza esto con tu llamada real a Supabase
    // Mock data por ahora
    const mockData: SavedFile[] = [
      { id: "1", type: "text_message", profileId: "1", content: "¡Hola Equipo de Marketing de TechGrowth! Espero que este mensaje les encuentre bien. Soy Fulano Dominguez, Director de Ventas de SEO Consulting SL.\nMe he tomado la libertad de contactarles porque me entusiasma su trabajo y creo que podría tener una propuesta interesante para ustedes. En SEO Consulting SL, nos especializamos en optimizar la visibilidad online de empresas como la suya. Imaginen un aumento significativo en el tráfico web, con clientes potenciales tocando a la puerta de forma constante.\nHemos logrado resultados sorprendentes para otros clientes, incluyendo un incremento superior al 120% en el tráfico orgánico en tan solo cuatro meses. Nuestra estrategia incluye análisis exhaustivos, optimización de contenido y una sólida estrategia de linkbuilding.\nMe encantaría charlar con ustedes y explicarles cómo podemos potenciar el posicionamiento de TechGrowth. ¿Qué les parecería si coordinamos una breve conversación telefónica para explorar cómo podemos impulsar sus resultados? Estoy disponible cuando les venga bien. ¡Espero su respuesta!", meta: { createdAt: new Date().toISOString() } },
      { id: "2", type: "email", profileId: "1", content: '<h2>Propuesta de Colaboración: Impulso SEO para TechGrowth</h2>\n\n<p>Estimado equipo de marketing de TechGrowth,</p>\n\n<p>Espero que este correo les encuentre bien. Mi nombre es Fulano Dominguez, Director de Ventas de SEO Consulting SL, y les escribo con una propuesta que podría llevar su presencia online al siguiente nivel. En SEO Consulting SL, nos especializamos en servicios de SEO mensual, incluyendo optimización de contenido y linkbuilding, auditoría técnica, mapa de keywords y optimización on-page. </p>\n\n<p>Hemos logrado resultados significativos para clientes similares, como un <strong>incremento del +120% en tráfico orgánico en solo cuatro meses</strong>. Nos encantaría replicar ese éxito con TechGrowth.</p>\n\n<p>Entendemos el valor de una estrategia SEO sólida y el impacto directo que tiene en el crecimiento. Por eso, me gustaría mucho tener la oportunidad de conversar con ustedes y explicarles cómo podemos ayudarles a alcanzar sus objetivos de marketing digital.</p>\n\n<p>¿Les parecería bien <strong>agendar una breve llamada</strong> donde pueda detallarles nuestros servicios?</p>\n\n<p>Quedo a su disposición. </p>\n\n<p>Saludos cordiales,</p>\n\n<p>Fulano Dominguez<br>Director de Ventas, SEO Consulting SL</p>', meta: { createdAt: new Date().toISOString() } }
    ];
    setTimeout(() => { // Simula el delay de la red
      setSavedFiles(mockData);
      setIsLoading(false);
    }, 500);
  };

  const handleDeleteSavedFile = (id: string) => {
    console.log("Deleting savedFile:", id);
    // TODO: Llama a tu función de Supabase para eliminar el savedFile
    fetchSavedFiles(); // Vuelve a cargar los savedFiles
  };

  const handleEditSavedFile = (savedFile: SavedFile) => {
    console.log("Editing savedFile:", savedFile);
    // TODO: Llama a tu función de Supabase para actualizar el savedFile
    fetchSavedFiles(); // Vuelve a cargar los savedFiles
  };

  useEffect(() => {
    fetchProfiles()
    fetchSavedFiles()
  }, []);

  const value = {
    isLoading,
    user: props.user,
    activeSection,
    setActiveSection,
    profiles,
    fetchProfiles,
    handleDeleteProfile,
    handleEditProfile,
    selectedProfile,
    setSelectedProfile,
    savedFiles,
    fetchSavedFiles,
    handleDeleteSavedFile,
    handleEditSavedFile
  };

  return (
    <DashboardContext.Provider value={value}>
      {props.children}
    </DashboardContext.Provider>
  );
};

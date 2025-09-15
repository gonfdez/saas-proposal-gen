"use client"

import { User } from '@supabase/supabase-js';
import React, { createContext, useEffect, useState } from 'react';
import { DashboardSectionKey } from '../dashboard-sections';
import { mockProfiles, mockSavedFiles } from './demo-mock-data';

export type Profile = {
  id: string
  type: "personal" | "brand"
  name: string
  role: string
  valueProposition: string
  targetAudience: string
  toneOfVoice: "professional" | "inspiring" | "technical" | "friendly"
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
  const [activeSection, setActiveSection] = useState<DashboardSectionKey>(DashboardSectionKey.PROFILES_AND_FILES);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [savedFiles, setSavedFiles] = useState<SavedFile[]>([]);

  // PROFILES FUNCTIONS
  const fetchProfiles = () => {
    console.log("Fetching profiles...");
    setIsLoading(true);

    // TODO: Reemplaza esto con tu llamada real a Supabase
    setProfiles(mockProfiles);  // Mock data por ahora
    setIsLoading(false);
  };

  const handleDeleteProfile = (id: string) => {
    console.log("Deleting profile:", id);
    // TODO: Llama a tu función de Supabase para eliminar el profile
  };

  const handleEditProfile = (profile: Profile) => {
    console.log("Editing profile:", profile);
    // TODO: Llama a tu función de Supabase para actualizar el profile
  };

  // SAVED FILES FUNCTIONS
  const fetchSavedFiles = () => {
    console.log("Fetching saved files...");
    setIsLoading(true);

    // TODO: Reemplaza esto con tu llamada real a Supabase
    setSavedFiles(mockSavedFiles);  // Mock data por ahora
    setIsLoading(false);
  };

  const handleDeleteSavedFile = (id: string) => {
    console.log("Deleting savedFile:", id);
    // TODO: Llama a tu función de Supabase para eliminar el savedFile
  };

  const handleEditSavedFile = (savedFile: SavedFile) => {
    console.log("Editing savedFile:", savedFile);
    // TODO: Llama a tu función de Supabase para actualizar el savedFile
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

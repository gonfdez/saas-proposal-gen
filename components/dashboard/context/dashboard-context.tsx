"use client"

import { User } from '@supabase/supabase-js';
import React, { createContext, useState } from 'react';
import { DashboardSectionKey } from '../dashboard-sections';

export interface DashboardContextValue {
  activeSection: DashboardSectionKey;
  setActiveSection: (newSection: DashboardSectionKey) => void;
  user: User;
}

export const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

interface DashboardProviderProps {
  children: React.ReactNode
  user: User
}

export const DashboardProvider = (props: DashboardProviderProps) => {
  const [activeSection, setActiveSection] = useState<DashboardSectionKey>(DashboardSectionKey.OVERVIEW);

  const value = {
    activeSection,
    setActiveSection,
    user: props.user,
  };

  return (
    <DashboardContext.Provider value={value}>
      {props.children}
    </DashboardContext.Provider>
  );
};

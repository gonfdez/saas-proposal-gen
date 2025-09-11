"use client"

import { User } from '@supabase/supabase-js';
import React, { createContext, useState } from 'react';
import { dashboardData, DashboardData } from './data';

export interface DashboardContextValue {
  activeSection: string;
  setActiveSection: (newSection: string) => void;
  user: User;
  data: DashboardData
}

export const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

interface DashboardProviderProps {
  children: React.ReactNode
  user: User
}

export const DashboardProvider = (props: DashboardProviderProps) => {
  const [activeSection, setActiveSection] = useState<string>('Overview');

  const value = {
    activeSection,
    setActiveSection,
    user: props.user,
    data: dashboardData
  };

  return (
    <DashboardContext.Provider value={value}>
      {props.children}
    </DashboardContext.Provider>
  );
};

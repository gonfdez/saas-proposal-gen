"use client";

import React from "react";
import useDashboard from "../../hooks/useDashboard";
import ProposalWizard from "../proposal-wizard/proposal-wizard";
import { DashboardSectionKey } from "./dashboard-sections";
import ProfilesAndFilesSection from "./sections/profiles-and-files/profiles-and-files-section";
import PricingSection from "../pricing-section";
import { Spinner } from "../ui/shadcn-io/spinner";
import GetHelpSection from "./sections/get-help/get-help-section";

const DashboardRenderer: React.FC = () => {
  const { activeSection, isLoading } = useDashboard();

  const notFoundSection = (sectionKey: DashboardSectionKey) => (
    <div className="flex justify-center items-center h-full">
      Section {`"${sectionKey}"`} not found
    </div>
  );
  const loadingSection = () => (<div className="flex justify-center items-center h-full"><Spinner size={30} /></div>)

  const renderSection = () => {
    if (isLoading)
      return loadingSection()

    switch (activeSection) {
      case DashboardSectionKey.PROFILES_AND_FILES:
        return <ProfilesAndFilesSection />;
      case DashboardSectionKey.MAIL_GENERATOR:
        return <ProposalWizard />;
      case DashboardSectionKey.PRICIND_AND_PLANS:
        return <PricingSection className="h-full" />
      case DashboardSectionKey.GET_HELP:
        return <GetHelpSection/>
      default:
        return notFoundSection(activeSection);
    }
  };

  return (
    <div className="@container/main h-full">
      {renderSection()}
    </div>
  );
};

export default DashboardRenderer;

"use client";

import React from "react";
import useDashboard from "./context/useDashboard";
import ProposalWizard from "../proposal-wizard/proposal-wizard";
import { DashboardSectionKey } from "./dashboard-sections";
import UserOrBrandProfilesSection from "./sections/user-or-brand-profiles/user-or-brand-profiles-section";
import OverviewSection from "./sections/overview/overview-section";
import PricingSection from "../pricing-section";

const DashboardRenderer: React.FC = () => {
  const { activeSection } = useDashboard();

  const notFoundSection = (sectionKey: DashboardSectionKey) => (
    <div className="flex justify-center items-center h-full">
      Section {`"${sectionKey}"`} not found
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case DashboardSectionKey.OVERVIEW:
        return <OverviewSection />;
      case DashboardSectionKey.USER_OR_BRAND_PROFILES:
        return <UserOrBrandProfilesSection />;
      case DashboardSectionKey.MAIL_GENERATOR:
        return <ProposalWizard />;
      case DashboardSectionKey.PRICIND_AND_PLANS:
        return <PricingSection className="h-full" />
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

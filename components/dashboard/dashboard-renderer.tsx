"use client";

import React from "react";
import useDashboard from "./context/useDashboard";
import ProposalWizard from "../proposal-wizard/proposal-wizard";
import PricingPage from "@/app/[locale]/pricing/page";
import { DashboardSectionKey } from "./context/dashboard-sections";

const DashboardRenderer: React.FC = () => {
  const { activeSection } = useDashboard();

  const notFoundSection = (sectionKey: DashboardSectionKey) => (
    <div className="flex justify-center items-center h-full">
      Section {`"${sectionKey}"`} not found
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case DashboardSectionKey.MAIL_GENERATOR:
        return <ProposalWizard />;
      case DashboardSectionKey.PRICIND_AND_PLANS:
        return <PricingPage />;
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

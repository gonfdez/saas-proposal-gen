"use client";

import React from "react";
import useDashboard from "./context/useDashboard";
import ProposalWizard from "../proposal-wizard/proposal-wizard";
import PricingPage from "@/app/[locale]/pricing/page";

const DashboardRenderer: React.FC = () => {
  const { activeSection } = useDashboard();

  const renderSection = () => {
    switch (activeSection) {
      case "Overview":
        return (
          <div className="flex justify-center items-center h-full">
            Overview
          </div>
        );
      case "Mail Generator":
        return <ProposalWizard />;
      case "Pricing and Plans":
        return <PricingPage />;
      default:
        return (
          <div className="flex justify-center items-center h-full">
            Section not found
          </div>
        );
    }
  };

  return (
    <div className="@container/main h-full">
      {renderSection()}
    </div>
  );
};

export default DashboardRenderer;

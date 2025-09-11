"use client";

import React from "react";
import useDashboard from "./context/useDashboard";
import ProposalWizard from "../proposal-wizard/proposal-wizard";

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
      default:
        return (
          <div className="flex justify-center items-center h-full">
            Section not found
          </div>
        );
    }
  };

  return (
    <div className="@container/main py-8 px-3 h-full">
      {renderSection()}
    </div>
  );
};

export default DashboardRenderer;

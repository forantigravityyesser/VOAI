"use client";

import React, { useState } from "react";
import { BarChart3, PieChart } from "lucide-react";
import FinanceView from "../components/finance-view";

export default function FinanceContainer() {
  const [activeTab, setActiveTab] = useState<"basic" | "advanced">("advanced");
  const [hasFinancialData, setHasFinancialData] = useState(false);

  const tabs = [
    { id: "basic", label: "Базовая аналитика", icon: BarChart3 },
    { id: "advanced", label: "Углубленная аналитика", icon: PieChart }
  ];

  return (
    <FinanceView 
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      hasFinancialData={hasFinancialData}
      setHasFinancialData={setHasFinancialData}
      tabs={tabs}
    />
  );
}

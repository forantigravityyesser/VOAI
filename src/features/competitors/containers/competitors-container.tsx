"use client";

import React from "react";
import CompetitorsView from "../components/competitors-view";
import { competitorMetrics, competitorsList } from "../mock-data/competitors.data";

export default function CompetitorsContainer() {
  return (
    <CompetitorsView 
      metrics={competitorMetrics}
      competitors={competitorsList}
    />
  );
}

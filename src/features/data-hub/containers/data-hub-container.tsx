"use client";

import React from "react";
import DataHubView from "../components/data-hub-view";
import { dataCategories, dataInsights } from "../mock-data/data-hub.data";

export default function DataHubContainer() {
  return (
    <DataHubView 
      categories={dataCategories}
      insights={dataInsights}
    />
  );
}

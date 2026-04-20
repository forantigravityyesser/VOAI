"use client";

import React from "react";
import HelpView from "../components/help-view";
import { tickets, helpCategories } from "../mock-data/help.data";

export default function HelpContainer() {
  return (
    <HelpView 
      tickets={tickets}
      helpCategories={helpCategories}
    />
  );
}

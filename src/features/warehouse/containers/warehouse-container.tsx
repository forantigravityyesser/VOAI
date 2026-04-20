"use client";

import React, { useState, useEffect, useMemo } from "react";
import WarehouseView from "../components/warehouse-view";
import { warehouseService } from "../services/warehouse.service";
import { WarehouseTab } from "@/core/types/warehouse.types";
import { useWarehouseCharts } from "../hooks/use-warehouse-charts";

export default function WarehouseContainer() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<WarehouseTab>("Здоровье склада");

  const data = useMemo(() => warehouseService.getInitialData(), []);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const {
    deadStockOption,
    bubbleOption,
    gaugeOption,
    spaceEfficiencyOption
  } = useWarehouseCharts(isMounted, data);

  return (
    <WarehouseView
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isMounted={isMounted}
      deadStockOption={deadStockOption}
      bubbleOption={bubbleOption}
      gaugeOption={gaugeOption}
      spaceEfficiencyOption={spaceEfficiencyOption}
      stockData={data.stocks}
      goodsInTransit={data.transit}
      orderHistory={data.orders}
      distribution={data.distribution}
      localizationData={data.localization}
      recommendedPlans={data.recommendedPlans}
    />
  );
}

import React from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import * as echarts from "echarts";
import { StockItem, TransitItem, OrderHistoryItem, WarehouseDistribution, WarehouseTab, DeadStock, LocalizationItem, RecommendedPlan } from "@/core/types/warehouse.types";
import { WarehouseHealthView } from "../views/warehouse-health-view";
import { ProductEfficiencyView } from "../views/product-efficiency-view";
import { PlanningView } from "../views/planning-view";

interface WarehouseViewProps {
  activeTab: WarehouseTab;
  setActiveTab: (tab: WarehouseTab) => void;
  isMounted: boolean;
  deadStockOption: echarts.EChartsOption;
  bubbleOption: echarts.EChartsOption;
  gaugeOption: echarts.EChartsOption;
  logQualityOption: echarts.EChartsOption;
  spaceEfficiencyOption: echarts.EChartsOption;
  stockData: StockItem[];
  goodsInTransit: TransitItem[];
  orderHistory: OrderHistoryItem[];
  deadStockData: DeadStock[];
  distribution: WarehouseDistribution[];
  localizationData: LocalizationItem[];
  recommendedPlans: RecommendedPlan[];
}


export default function WarehouseView({
  activeTab,
  setActiveTab,
  isMounted,
  deadStockOption,
  bubbleOption,
  gaugeOption,
  logQualityOption,
  spaceEfficiencyOption,
  stockData,
  goodsInTransit,
  orderHistory,
  deadStockData,
  distribution,
  localizationData,
  recommendedPlans
}: WarehouseViewProps) {
  const tabs: WarehouseTab[] = ["Здоровье склада", "Эффективность товаров", "Планирование запасов"];
  
  const themeColors = {
    "Здоровье склада": "accent-purple",
    "Эффективность товаров": "accent-green",
    "Планирование запасов": "accent-orange"
  };
  
  const activeColor = themeColors[activeTab as keyof typeof themeColors];

  if (!isMounted) return <div className="w-full h-full bg-dark-900" />;

  return (
    <main className="w-full h-full bg-dark-900 overflow-y-auto p-6 md:p-10 custom-scrollbar transition-colors duration-700">
      {/* Dynamic Section Theme Background Glow */}
      <div className={`fixed top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 pointer-events-none -mr-48 -mt-48 transition-all duration-1000 bg-${activeColor}`}></div>

      {/* Navigation & Tab Switching */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
        <Link href="/data" className="flex items-center gap-3 text-dark-400 hover:text-white transition-all w-fit group">
           <div className="p-2 rounded-xl bg-dark-800 group-hover:bg-dark-700 transition-colors">
              <ChevronLeft className="w-4 h-4" />
           </div>
           <span className="text-sm font-bold tracking-tight uppercase tracking-widest text-[11px]">Назад на главную</span>
        </Link>
        <div className="bg-dark-800/60 p-1.5 rounded-[1.5rem] border border-card-border/50 flex items-center backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          {tabs.map(tab => {
            const tabColor = themeColors[tab as keyof typeof themeColors];
            return (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)} 
                className={`px-10 py-3 rounded-2xl text-[13px] font-black transition-all duration-500 tracking-tight ${activeTab === tab ? `bg-${tabColor} text-white shadow-[0_0_20_px_rgba(0,0,0,0.5)] scale-105` : "text-dark-400 hover:text-white"}`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative z-10">
        {activeTab === "Здоровье склада" && (
          <WarehouseHealthView 
            deadStockOption={deadStockOption} 
            stockData={stockData} 
            deadStockData={deadStockData}
            activeColor={activeColor} 
          />
        )}

        {activeTab === "Эффективность товаров" && (
          <ProductEfficiencyView 
            bubbleOption={bubbleOption}
            gaugeOption={gaugeOption}
            logQualityOption={logQualityOption}
            spaceEfficiencyOption={spaceEfficiencyOption}
            activeColor={activeColor}
            localizationData={localizationData}
          />
        )}

        {activeTab === "Планирование запасов" && (
          <PlanningView 
            goodsInTransit={goodsInTransit} 
            orderHistory={orderHistory} 
            distribution={distribution}
            recommendedPlans={recommendedPlans}
          />
        )}
      </div>


      <footer className="mt-16 text-center pb-12 opacity-50">
         <p className="text-[10px] text-dark-500 font-black uppercase tracking-[0.4em]">Analytics Platform • v2.8 High Intensity Architecture</p>
      </footer>
    </main>
  );
}

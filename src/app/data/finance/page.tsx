"use client";

import { useState } from "react";
import { Wallet, ChevronLeft, Calendar, BarChart3, PieChart, Lock } from "lucide-react";
import Link from "next/link";
import KPIPanel from "@/components/finance/KPIPanel";
import ExpensesDonut from "@/components/finance/ExpensesDonut";
import FinesTable from "@/components/finance/FinesTable";
import FinanceCashflowChart from "@/components/finance/FinanceCashflowChart";
import AdvancedKPI from "@/components/finance/AdvancedKPI";
import UnitEconomyWaterfall from "@/components/finance/UnitEconomyWaterfall";
import AIFinanceInsights from "@/components/finance/AIFinanceInsights";
import CashFlowAnalysis from "@/components/finance/CashFlowAnalysis";
import SKUProfitabilityMatrix from "@/components/finance/SKUProfitabilityMatrix";
import WorkingCapitalDynamics from "@/components/finance/WorkingCapitalDynamics";
import InteractivePNL from "@/components/finance/InteractivePNL";
import LostProfitCalculator from "@/components/finance/LostProfitCalculator";
import AdProfitabilityAnalysis from "@/components/finance/AdProfitabilityAnalysis";
import TaxReserveBasic from "@/components/finance/TaxReserveBasic";
import FinanceTimeline from "@/components/finance/FinanceTimeline";
import ErrorCostIndex from "@/components/finance/ErrorCostIndex";
import PeriodComparisonLFL from "@/components/finance/PeriodComparisonLFL";

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<"basic" | "advanced">("advanced");
  const [hasFinancialData, setHasFinancialData] = useState(false);

  const tabs = [
    { id: "basic", label: "Базовая аналитика", icon: BarChart3 },
    { id: "advanced", label: "Углубленная аналитика", icon: PieChart }
  ];

  return (
    <main className="flex-1 w-full min-h-screen bg-dark-900 overflow-y-auto overflow-x-hidden p-6 md:p-10 custom-scrollbar relative">
      
      {/* Background Glow */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 pointer-events-none -mr-48 -mt-48 transition-all duration-1000 bg-accent-purple"></div>

      <div className="relative z-10">
        
        {/* Navigation & Header Section */}
        <div className="flex flex-col gap-8 mb-12">
          
          {/* Top Row: Back & Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <Link href="/data" className="flex items-center gap-3 text-dark-400 hover:text-white transition-all w-fit group">
               <div className="p-2.5 rounded-xl bg-dark-800 group-hover:bg-dark-700 border border-card-border/50 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
               </div>
               <span className="text-[11px] font-black uppercase tracking-widest">Назад к данным</span>
            </Link>

            <div className="bg-dark-800/60 p-1.5 rounded-[1.5rem] border border-card-border/50 flex items-center backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              {tabs.map(tab => (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id as "basic" | "advanced")} 
                  className={`px-10 py-3 rounded-2xl text-[13px] font-black transition-all duration-500 tracking-tight flex items-center gap-2 
                    ${activeTab === tab.id 
                      ? "bg-accent-purple text-white shadow-[0_0_20px_rgba(108,92,231,0.3)] scale-105" 
                      : "text-dark-400 hover:text-white"}`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Row: Title & Period */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4 border-t border-card-border/30">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-accent-purple/20 rounded-2xl flex items-center justify-center border border-accent-purple/30 shadow-lg shadow-accent-purple/20 shadow-inner">
                <Wallet className="w-7 h-7 text-accent-purple" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight">Финансы</h1>
                <p className="text-[11px] text-dark-400 font-extrabold uppercase tracking-[0.2em]">
                   {activeTab === "basic" ? "Раздел 1: Базовая аналитика" : "Раздел 2: Углубленная аналитика"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
               <button className="flex items-center gap-3 bg-dark-800/80 border border-card-border px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white hover:bg-dark-700 transition-all border-l-4 border-l-accent-purple shadow-xl backdrop-blur-md">
                  <Calendar className="w-4 h-4 text-accent-purple" />
                  Текущий период (Февраль 2026)
               </button>
            </div>
          </div>
        </div>

        {/* Conditional Content */}
        {activeTab === "basic" ? (
          <div className="space-y-8 pb-12 animate-fade-up">
            {/* Block 0: Timeline */}
            <section>
              <FinanceTimeline />
            </section>

            {/* Block 0.5: Period Comparison (LFL) */}
            <section>
              <PeriodComparisonLFL />
            </section>

            {/* Block 1: KPI Panels */}
            <section>
              <KPIPanel />
            </section>

            {/* Row 2: Charts & Tables */}
            <section className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2 min-h-[400px]">
                <ExpensesDonut />
              </div>
              <div className="lg:col-span-3 min-h-[400px]">
                <FinesTable />
              </div>
            </section>

            {/* Block 4: Cashflow */}
            <section>
              <FinanceCashflowChart />
            </section>

            {/* Block 5: Error Cost Index */}
            <section>
              <ErrorCostIndex />
            </section>

            {/* Block 6: Tax Reserve */}
            <section>
              <TaxReserveBasic />
            </section>
          </div>
        ) : (
          !hasFinancialData ? (
            <div className="min-h-[500px] flex flex-col items-center justify-center glass-card rounded-3xl animate-fade-up border-dashed border-dark-600 relative overflow-hidden group">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-purple/5 blur-[100px] rounded-full pointer-events-none"></div>
                
                <div className="w-24 h-24 bg-dark-800/80 border border-card-border rounded-[2rem] flex items-center justify-center shadow-2xl mb-8 relative">
                  <div className="absolute inset-0 bg-accent-purple/20 blur-xl rounded-full pointer-events-none"></div>
                  <Lock className="w-10 h-10 text-accent-purple relative z-10" />
                </div>

                <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Разблокируйте чистую прибыль</h2>
                <p className="text-dark-400 text-sm max-w-lg text-center mb-10 leading-relaxed font-medium">
                  Для расчета реального P&L, Unit-экономики и ROI нам нужны ваши базовые финансовые показатели. Укажите себестоимость товаров, процент налогов и операционные расходы.
                </p>

                <div className="flex gap-4">
                  <Link href="/data" className="px-8 py-4 rounded-xl bg-accent-purple text-white font-bold tracking-wide hover:shadow-[0_0_40px_rgba(108,92,231,0.5)] transition-all flex items-center gap-2 transform hover:scale-[1.02]">
                      Внести данные
                  </Link>
                  <button onClick={() => setHasFinancialData(true)} className="px-8 py-4 rounded-xl bg-dark-800 text-dark-300 font-bold tracking-wide border border-card-border hover:bg-dark-700 hover:text-white transition-all flex items-center gap-2">
                      Демо-режим
                  </button>
                </div>
            </div>
          ) : (
            <div className="space-y-8 pb-12 animate-fade-up relative">
                <div className="flex justify-end pr-2 -mt-2">
                    <button onClick={() => setHasFinancialData(false)} className="text-[10px] text-dark-500 hover:text-white uppercase tracking-widest transition-colors font-black flex items-center gap-2">
                       <Lock className="w-3 h-3" />
                       Скрыть демо-режим
                    </button>
                </div>
              
              {/* Advanced Row 1: Main P&L Report */}
              <section>
                <InteractivePNL />
              </section>

              {/* Advanced Row 2: KPI Panels */}
              <section>
                <AdvancedKPI />
              </section>

               {/* Advanced Row 2: Waterfall & AI */}
               <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                 <div className="lg:col-span-8">
                   <UnitEconomyWaterfall />
                 </div>
                 <div className="lg:col-span-4">
                   <AIFinanceInsights />
                 </div>
               </section>
 
               {/* Advanced Row 3: SKU Profitability Matrix (Product Strategy) */}
               <section>
                 <SKUProfitabilityMatrix />
               </section>
 
               {/* Advanced Row 4: Working Capital Dynamics */}
               <section>
                 <WorkingCapitalDynamics />
               </section>
 
               {/* Advanced Row 5: Lost Profit Calculator */}
               <section>
                 <LostProfitCalculator />
               </section>
 
               {/* Advanced Row 6: Advertising Profitability (DRR vs Profit) */}
               <section>
                 <AdProfitabilityAnalysis />
               </section>
 
               {/* Advanced Row 7: Cash Flow Analysis (Main Forecast) */}
               <section>
                 <CashFlowAnalysis />
               </section>
            </div>
          )
        )}
      </div>
    </main>
  );
}

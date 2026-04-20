"use client";

import React, { useState } from "react";
import { Chart } from "@/shared/components/ui/chart";
import { 
  RotateCcw, 
  AlertCircle, 
  Zap, 
  TrendingDown, 
  ShoppingCart, 
  BarChart3 
} from "lucide-react";
import { AIRecommendation } from "../components/ai-recommendation";
import { StockTable } from "../components/stock-table";
import { Stock } from "@/core/types/warehouse.types";
import { Card } from "@/shared/components/ui/card";
import { EChartsOption } from "echarts";
import { TurnoverModal } from "../components/turnover-modal";
import { OOSRiskModal } from "../components/oos-risk-modal";
import { FastSalesModal } from "../components/fast-sales-modal";
import { LowVelocityModal } from "../components/low-velocity-modal";
import { OverstockModal } from "../components/overstock-modal";
import { LiquidationCenterModal } from "../components/liquidation-center-modal";

interface WarehouseHealthViewProps {
  deadStockOption: EChartsOption;
  stockData: Stock[];
  activeColor: string;
}

export function WarehouseHealthView({ 
  deadStockOption, 
  stockData, 
  activeColor 
}: WarehouseHealthViewProps) {
  const [isTurnoverModalOpen, setIsTurnoverModalOpen] = useState(false);
  const [isOOSModalOpen, setIsOOSModalOpen] = useState(false);
  const [isFastSalesModalOpen, setIsFastSalesModalOpen] = useState(false);
  const [isLowVelocityModalOpen, setIsLowVelocityModalOpen] = useState(false);
  const [isOverstockModalOpen, setIsOverstockModalOpen] = useState(false);
  const [isLiquidationModalOpen, setIsLiquidationModalOpen] = useState(false);

  return (
    <>
      <TurnoverModal 
        isOpen={isTurnoverModalOpen} 
        onClose={() => setIsTurnoverModalOpen(false)} 
      />
      <OOSRiskModal 
        isOpen={isOOSModalOpen} 
        onClose={() => setIsOOSModalOpen(false)} 
      />
      <FastSalesModal 
        isOpen={isFastSalesModalOpen} 
        onClose={() => setIsFastSalesModalOpen(false)} 
      />
      <LowVelocityModal 
        isOpen={isLowVelocityModalOpen} 
        onClose={() => setIsLowVelocityModalOpen(false)} 
      />
      <OverstockModal 
        isOpen={isOverstockModalOpen} 
        onClose={() => setIsOverstockModalOpen(false)} 
      />
      <LiquidationCenterModal 
        isOpen={isLiquidationModalOpen} 
        onClose={() => setIsLiquidationModalOpen(false)} 
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-8">
        {[
          { 
            icon: RotateCcw, 
            label: "Оборачиваемость", 
            val: "21 дн.", 
            trend: "-2.5%", 
            color: "text-accent-purple",
            onClick: () => setIsTurnoverModalOpen(true)
          },
          { 
            icon: AlertCircle, 
            label: "Риск остатков", 
            val: "35%", 
            trend: "+5.2%", 
            color: "text-accent-red",
            onClick: () => setIsOOSModalOpen(true)
          },
          { 
            icon: Zap, 
            label: "Быстрые продажи", 
            val: "35%", 
            trend: "+3.1%", 
            color: "text-accent-green",
            onClick: () => setIsFastSalesModalOpen(true)
          },
          { 
            icon: TrendingDown, 
            label: "Низкая скорость", 
            val: "20%", 
            trend: "-1.8%", 
            color: "text-accent-orange",
            onClick: () => setIsLowVelocityModalOpen(true)
          },
          { 
            icon: ShoppingCart, 
            label: "Перекуплено", 
            val: "30%", 
            trend: "-4%", 
            color: "text-accent-blue",
            onClick: () => setIsOverstockModalOpen(true)
          },
        ].map((item, i) => (
          <Card 
            key={i} 
            variant="glass" 
            className="p-6 rounded-[2rem] border-white/5 hover:bg-dark-800 transition-all group cursor-pointer"
            onClick={item.onClick}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className={`p-2 bg-dark-700/50 rounded-xl ${item.color}`}><item.icon className="w-4 h-4" /></div>
              <p className="text-[10px] text-dark-400 font-black uppercase tracking-widest">{item.label}</p>
            </div>
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-black text-white">{item.val}</h2>
              <span className={`text-[10px] font-bold ${item.trend.startsWith('+') ? 'text-accent-red' : 'text-accent-green'}`}>{item.trend}</span>
            </div>
          </Card>
        ))}
      </div>

      <AIRecommendation color={activeColor} text="Средняя оборачиваемость выросла на 2.5%. Рекомендуется оптимизация закупок медленно движущихся товаров." />

      {/* Charts Section */}
      <Card 
        variant="glass" 
        className="rounded-[2.5rem] p-10 mb-8 border-white/5 cursor-pointer hover:bg-dark-800/50 transition-all group"
        onClick={() => setIsLiquidationModalOpen(true)}
      >
        <div className="flex items-end justify-between mb-10">
          <div>
             <h2 className="text-2xl font-black text-white mb-1 tracking-tight group-hover:text-rose-400 transition-colors">Мёртвые товары</h2>
             <p className="text-sm text-dark-400 font-medium italic">Объем зависшего капитала и динамика сбыта</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-dark-900 rounded-xl border border-white/5 group-hover:border-rose-500/30 transition-colors">
             <BarChart3 className="w-4 h-4 text-accent-purple group-hover:text-rose-400 transition-colors" />
             <span className="text-[11px] text-white font-bold tracking-wider uppercase">Analytics v3</span>
          </div>
        </div>
        <div className="h-[400px] w-full">
           <Chart option={deadStockOption} style={{ height: '100%', width: '100%' }} />
        </div>
      </Card>

      <StockTable stockData={stockData} />
      
      <AIRecommendation color={activeColor} text="5 товаров требуют срочной подсортировки. Риск дефицита по Роутерам достиг критических 95%." />
    </>
  );
}


import React from "react";
import ReactECharts from "echarts-for-react";
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
import { StockItem } from "@/core/types/warehouse.types";

import { EChartsOption } from "echarts";

interface WarehouseHealthViewProps {
  deadStockOption: EChartsOption;
  stockData: StockItem[];
  activeColor: string;
}

export function WarehouseHealthView({ 
  deadStockOption, 
  stockData, 
  activeColor 
}: WarehouseHealthViewProps) {

  return (
    <>
      {/* Stats & Dead Stock Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-8">
        {[
          { icon: RotateCcw, label: "Оборачиваемость", val: "21 дн.", trend: "-2.5%", color: "text-accent-purple" },
          { icon: AlertCircle, label: "Риск остатков", val: "35%", trend: "+5.2%", color: "text-accent-red" },
          { icon: Zap, label: "Быстрые продажи", val: "35%", trend: "+3.1%", color: "text-accent-green" },
          { icon: TrendingDown, label: "Низкая скорость", val: "20%", trend: "-1.8%", color: "text-accent-orange" },
          { icon: ShoppingCart, label: "Перекуплено", val: "30%", trend: "-4%", color: "text-accent-blue" },
        ].map((item, i) => (
          <div key={i} className="bg-dark-800/40 border border-card-border p-6 rounded-[2rem] hover:bg-dark-800 transition-all group">
            <div className="flex items-center gap-3 mb-5">
              <div className={`p-2 bg-dark-700/50 rounded-xl ${item.color}`}><item.icon className="w-4 h-4" /></div>
              <p className="text-[10px] text-dark-400 font-black uppercase tracking-widest">{item.label}</p>
            </div>
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-black text-white">{item.val}</h2>
              <span className={`text-[10px] font-bold ${item.trend.startsWith('+') ? 'text-accent-red' : 'text-accent-green'}`}>{item.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <AIRecommendation color={activeColor} text="Средняя оборачиваемость выросла на 2.5%. Рекомендуется оптимизация закупок медленно движущихся товаров." />

      <div className="bg-dark-800/40 border border-card-border rounded-[2.5rem] p-10 mb-8">
        <div className="flex items-end justify-between mb-10">
          <div><h2 className="text-2xl font-black text-white mb-1 tracking-tight">Мёртвые товары</h2><p className="text-sm text-dark-400 font-medium italic">Объем зависшего капитала и динамика сбыта</p></div>
          <div className="flex items-center gap-2 px-4 py-2 bg-dark-900 rounded-xl border border-card-border"><BarChart3 className="w-4 h-4 text-accent-purple" /><span className="text-[11px] text-white font-bold tracking-wider uppercase">Analytics v3</span></div>
        </div>
        <div className="h-[400px] w-full"><ReactECharts option={deadStockOption} style={{ height: '100%', width: '100%' }} /></div>
      </div>

      <StockTable stockData={stockData} />
      
      <AIRecommendation color={activeColor} text="5 товаров требуют срочной подсортировки. Риск дефицита по Роутерам достиг критических 95%." />
    </>
  );
}

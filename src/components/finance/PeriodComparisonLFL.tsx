"use client";

import React from "react";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  ShoppingCart, 
  Truck, 
  BarChart, 
  Sparkles,
  Info,
  Layers,
  Search
} from "lucide-react";

interface LFLMetric {
  label: string;
  current: string;
  previous: string;
  delta: number;
  isPositiveGood: boolean;
  type: "revenue" | "expense";
  icon: React.ElementType;
}

const metrics: LFLMetric[] = [
  {
    label: "Выручка (Продажи)",
    current: "840 000 ₽",
    previous: "750 000 ₽",
    delta: 12,
    isPositiveGood: true,
    type: "revenue",
    icon: ShoppingCart
  },
  {
    label: "Логистика",
    current: "215 000 ₽",
    previous: "172 000 ₽",
    delta: 25,
    isPositiveGood: false,
    type: "expense",
    icon: Truck
  },
  {
    label: "Хранение",
    current: "42 000 ₽",
    previous: "45 000 ₽",
    delta: -6.6,
    isPositiveGood: false,
    type: "expense",
    icon: Layers
  }
];

export default function PeriodComparisonLFL() {
  return (
    <div className="glass-card p-10 rounded-[3rem] border border-card-border group relative overflow-hidden transition-all duration-500 hover:border-accent-purple/30 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-accent-purple/20 flex items-center justify-center border border-accent-purple/30 shadow-lg">
                 <BarChart className="w-6 h-6 text-accent-purple" />
              </div>
              <h3 className="text-3xl font-black text-white tracking-tight">Сравнение Периодов</h3>
           </div>
           <p className="text-[10px] font-black text-dark-400 uppercase tracking-widest leading-none">
             Like for Like (LFL): Текущая vs Прошлая неделя
           </p>
        </div>

        <div className="flex bg-dark-900 border border-white/5 rounded-2xl p-1 shadow-inner">
           <button className="px-5 py-2 rounded-xl bg-accent-purple text-[10px] font-black text-white uppercase tracking-widest transition-all">Неделя</button>
           <button className="px-5 py-2 rounded-xl text-[10px] font-black text-dark-500 uppercase tracking-widest hover:text-white transition-all">Месяц</button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-8">
        {metrics.map((metric, i) => {
          const isUp = metric.delta > 0;
          const isGrowthGood = metric.isPositiveGood ? isUp : !isUp;
          
          return (
            <div key={i} className="bg-dark-900/40 border border-white/5 p-8 rounded-[2.5rem] relative group/card hover:bg-white/5 transition-all duration-500">
               <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-dark-900 flex items-center justify-center border border-white/5 group-hover/card:scale-110 group-hover/card:border-accent-purple/40 transition-all duration-500">
                     <metric.icon className="w-6 h-6 text-accent-purple" />
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-black ${
                    isGrowthGood 
                      ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                      : 'bg-red-500/10 border-red-500/20 text-red-500'
                  }`}>
                    {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(metric.delta)}%
                  </div>
               </div>

               <h4 className="text-[10px] font-black text-dark-500 uppercase tracking-widest mb-1">{metric.label}</h4>
               <p className="text-3xl font-black text-white tracking-tighter mb-4">{metric.current}</p>
               
               <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                  <span className="text-[9px] font-bold text-dark-600 uppercase tracking-wider">Ранее:</span>
                  <span className="text-[11px] font-black text-dark-400">{metric.previous}</span>
               </div>
            </div>
          );
        })}
      </div>

      {/* AI Anomaly Detection */}
      <div className="bg-accent-purple/5 border border-accent-purple/20 rounded-[2.5rem] p-8 flex flex-col lg:flex-row items-start lg:items-center gap-8 relative overflow-hidden group/ai">
         <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none group-hover/ai:opacity-100 transition-opacity">
            <Sparkles className="w-12 h-12 text-accent-purple" />
         </div>

         <div className="w-14 h-14 rounded-2xl bg-accent-purple flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(108,92,231,0.4)]">
            <Search className="w-6 h-6 text-white" />
         </div>

         <div className="flex-1">
            <h5 className="text-xs font-black text-white uppercase tracking-widest mb-2 flex items-center gap-2">
              Обнаружена аномалия <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
            </h5>
            <p className="text-sm font-bold text-dark-400 leading-relaxed">
              Выручка выросла на <span className="text-green-400">12%</span>, однако расходы на логистику увеличились на <span className="text-red-400">25%</span>. 
              Основная причина: <span className="text-white">снижение Индекса Локализации до 68%</span> и рост штрафов за КИЗ. 
              Это «съело» <span className="text-red-400">43 000 ₽</span> вашей потенциальной чистой прибыли.
            </p>
         </div>

         <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest transition-all whitespace-nowrap active:scale-95">
            Устранить аномалию
         </button>
      </div>

      {/* Legend & Help */}
      <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500"></div>
               <span className="text-[9px] font-black text-dark-500 uppercase tracking-widest">Таргет: Рост</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-red-500"></div>
               <span className="text-[9px] font-black text-dark-500 uppercase tracking-widest">Аномалия</span>
            </div>
         </div>
         <p className="text-[9px] font-bold text-dark-600 flex items-center gap-1.5 italic">
            <Info className="w-3 h-3" /> Сравнение по методу начисления
         </p>
      </div>
    </div>
  );
}

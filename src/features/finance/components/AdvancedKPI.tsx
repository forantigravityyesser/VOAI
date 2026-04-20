"use strict";

import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, Percent, Target } from "lucide-react";

export default function AdvancedKPI() {
  const kpiData = [
    { 
      label: "Чистая прибыль", 
      val: "840,000 ₽", 
      trend: "+12.4%", 
      isPositive: true, 
      icon: DollarSign, 
      color: "text-accent-green", 
      bg: "bg-accent-green/20" 
    },
    { 
      label: "Маржинальность", 
      val: "32%", 
      trend: "+2.1%", 
      isPositive: true, 
      icon: Percent, 
      color: "text-accent-purple", 
      bg: "bg-accent-purple/20" 
    },
    { 
      label: "Окупаемость (ROI)", 
      val: "145%", 
      trend: "-5.3%", 
      isPositive: false, 
      icon: TrendingUp, 
      color: "text-accent-orange", 
      bg: "bg-accent-orange/20" 
    },
    { 
      label: "Доля рекламных расходов (ДРР)", 
      val: "8.5%", 
      trend: "-1.2%", // lower is better usually, depending on strategy, but lets say red is increase, green is decrease
      isPositive: true, // Let's treat decrease in ad spend ratio as positive here.
      icon: Target, 
      color: "text-accent-blue", 
      bg: "bg-accent-blue/20" 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
      {kpiData.map((item, i) => (
        <div key={i} className="glass-card p-6 rounded-[2rem] border border-card-border overflow-hidden relative group">
          
          <div className={`absolute top-0 right-0 w-32 h-32 ${item.bg} blur-[50px] pointer-events-none rounded-full -mr-10 -mt-10 transition-opacity opacity-50 group-hover:opacity-100`}></div>

          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className={`p-2.5 rounded-xl bg-dark-800 border border-card-border ${item.color}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <p className="text-[11px] text-dark-400 font-extrabold uppercase tracking-widest">{item.label}</p>
          </div>
          
          <div className="flex items-end justify-between relative z-10">
            <h2 className="text-3xl font-black text-white tracking-tight">{item.val}</h2>
            <div className={`flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-lg ${item.isPositive ? "text-accent-green bg-accent-green/10" : "text-accent-red bg-accent-red/10"}`}>
              {item.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {item.trend}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

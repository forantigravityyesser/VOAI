"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, Receipt } from "lucide-react";

const kpiData = [
  {
    id: "sales",
    label: "Сумма продаж",
    value: "3,142,500 ₽",
    change: "+12.4%",
    isUp: true,
    desc: "Выручка до всех вычетов",
    icon: TrendingUp,
    color: "text-accent-blue",
    bgColor: "bg-accent-blue/10"
  },
  {
    id: "payout",
    label: "К перечислению",
    value: "2,240,000 ₽",
    change: "+8.5%",
    isUp: true,
    desc: "Реальная сумма на р/счеть",
    icon: Wallet,
    color: "text-accent-green",
    bgColor: "bg-accent-green/10"
  },
  {
    id: "expenses",
    label: "Сумма удержаний",
    value: "902,500 ₽",
    change: "+14.2%",
    isUp: false,
    desc: "Все внутренние расходы WB",
    icon: Receipt,
    color: "text-accent-red",
    bgColor: "bg-accent-red/10"
  }
];

export default function KPIPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {kpiData.map((item) => (
        <div 
          key={item.id}
          className="glass-card p-6 rounded-2xl border border-card-border hover:border-white/10 transition-all group relative overflow-hidden"
        >
          {/* Subtle Background Accent */}
          <div className={`absolute top-0 right-0 w-32 h-32 ${item.bgColor} blur-[60px] opacity-20 -mr-10 -mt-10`} />
          
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className={`w-10 h-10 ${item.bgColor} rounded-xl flex items-center justify-center`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold ${item.isUp ? "text-accent-green" : "text-accent-red"}`}>
              {item.isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {item.change}
            </div>
          </div>

          <div className="relative z-10">
            <p className="text-[10px] text-dark-300 uppercase tracking-widest font-bold mb-1">{item.label}</p>
            <h2 className="text-2xl font-bold text-white mb-2">{item.value}</h2>
            <p className="text-xs text-dark-400 font-medium">{item.desc}</p>
          </div>

          {/* Interactive highlight bottom line */}
          <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500
            ${item.id === 'sales' ? 'bg-accent-blue' : item.id === 'payout' ? 'bg-accent-green' : 'bg-accent-red'}
          `} />
        </div>
      ))}
    </div>
  );
}

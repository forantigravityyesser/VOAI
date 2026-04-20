"use client";

import React from "react";
import { Target, ChevronLeft, Search, LucideIcon } from "lucide-react";
import Link from "next/link";

interface Metric {
  label: string;
  val: string;
  icon: LucideIcon;
  color: string;
}

interface Competitor {
  name: string;
  sales: string;
  items: number;
  trend: string;
}

interface CompetitorsViewProps {
  metrics: Metric[];
  competitors: Competitor[];
}

export default function CompetitorsView({
  metrics,
  competitors
}: CompetitorsViewProps) {
  return (
    <main className="w-full h-full bg-dark-900 overflow-y-auto p-8 custom-scrollbar">
      <Link href="/data" className="flex items-center gap-2 text-dark-300 hover:text-white mb-6 transition-colors w-fit">
        <ChevronLeft className="w-4 h-4" />
        Назад к данным
      </Link>

      <div className="flex items-center gap-4 mb-10">
        <div className="w-14 h-14 bg-pink-500/20 rounded-2xl flex items-center justify-center border border-pink-500/30 shadow-lg shadow-pink-500/20">
          <Target className="w-7 h-7 text-pink-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Аналитика конкурентов</h1>
          <p className="text-dark-300">Мониторинг цен, ассортимента и стратегий рынка</p>
        </div>
      </div>

      <div className="flex gap-4 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
          <input 
            type="text" 
            placeholder="Введите ссылку на товар или название магазина конкурента..."
            className="w-full bg-dark-800 border border-card-border rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-pink-500/50 transition-all shadow-inner"
          />
        </div>
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-pink-500/20">
          Анализировать
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Summary cards */}
        <div className="space-y-6">
          {metrics.map((item, i) => (
            <div key={i} className="bg-dark-800/40 border border-card-border p-6 rounded-3xl group hover:bg-dark-800/60 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 bg-dark-700 rounded-lg ${item.color}`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-dark-400 uppercase tracking-widest font-bold">{item.label}</span>
              </div>
              <h2 className="text-3xl font-bold text-white group-hover:scale-105 transition-transform origin-left">{item.val}</h2>
            </div>
          ))}
        </div>

        {/* Right: Competitor list */}
        <div className="lg:col-span-2 bg-dark-800/20 border border-card-border rounded-[40px] p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-white font-bold">Топ конкурентов (по объему продаж)</h3>
            <button className="text-xs text-pink-500 font-bold hover:underline">Весь список</button>
          </div>
          
          <div className="space-y-4">
            {competitors.map((comp, idx) => (
              <div key={idx} className="flex items-center justify-between p-5 bg-dark-800/50 rounded-2xl border border-card-border hover:border-pink-500/20 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-dark-700 rounded-full flex items-center justify-center text-xs font-bold text-dark-300 group-hover:bg-pink-500/10 group-hover:text-pink-500 transition-colors">
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{comp.name}</h4>
                    <p className="text-[10px] text-dark-400">{comp.items} товаров в активной продаже</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{comp.sales}</p>
                  <p className={`text-[10px] font-bold ${comp.trend.startsWith("+") ? "text-accent-green" : "text-red-400"}`}>{comp.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

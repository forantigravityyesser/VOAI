"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  Rocket, 
  ArrowUpRight,
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

interface FastSalesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FastSalesModal({ isOpen, onClose }: FastSalesModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-start justify-center pointer-events-none z-[101] p-4 pt-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl w-full max-w-5xl overflow-hidden pointer-events-auto relative flex flex-col max-h-[calc(100vh-140px)]"
            >
              {/* Emerald Growth Glows */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 blur-[100px] pointer-events-none" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 blur-[100px] pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400">
                    <Rocket className="w-6 h-6 animate-bounce" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Детализация: Взрывной рост продаж</h2>
                    <p className="text-slate-400 text-sm mt-1">Анализ аномального спроса и максимизация прибыли</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar relative z-10 text-white">
                
                {/* KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <KPICard 
                    label="Товары в тренде" 
                    value="5 SKU" 
                    subtext="Рост > 50% за 3 дня"
                    variant="emerald"
                  />
                  <KPICard 
                    label="Средний скачок продаж" 
                    value="+125%" 
                    subtext="К прошлой неделе"
                    variant="emerald"
                    trendIcon={<ArrowUpRight className="w-4 h-4 text-emerald-400" />}
                  />
                  <KPICard 
                    label="Скрытая прибыль" 
                    value="85 000 ₽" 
                    subtext="При оптимизации цены"
                    variant="amber"
                    trendIcon={<DollarSign className="w-4 h-4 text-amber-400" />}
                  />
                </div>

                {/* AI Action Banner */}
                <div className="relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 rounded-xl" />
                  <div className="relative border border-emerald-500/40 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400 shrink-0">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-emerald-400 font-bold text-sm mb-1 uppercase tracking-widest">AI Анализ</h4>
                        <p className="text-slate-200 leading-relaxed max-w-2xl">
                          &quot;Набор ножей&quot; показывает органический рост <span className="text-emerald-400 font-bold">+180%</span>. Рекомендуется отключить платную рекламу и поднять цену на 8% для максимизации маржи.
                        </p>
                      </div>
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-6 py-6 h-auto font-bold shrink-0 shadow-lg shadow-emerald-900/40 border-none transition-all hover:scale-105 active:scale-95">
                      Применить стратегию
                    </Button>
                  </div>
                </div>

                {/* Surge Chart Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Динамика взрывного спроса</h3>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                       <span className="text-[10px] text-emerald-400 font-bold uppercase">Обнаружен тренд (3дн)</span>
                    </div>
                  </div>
                  <div className="h-32 w-full bg-white/5 rounded-2xl border border-white/5 overflow-hidden relative">
                    <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="surgeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Grid lines */}
                      <line x1="0" y1="25" x2="1000" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="50" x2="1000" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="75" x2="1000" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      
                      {/* The Surge Path */}
                      <path 
                        d="M0,80 L100,81 L200,79 L300,82 L400,80 L500,81 L600,78 L700,75 L800,40 L900,10 L1000,5 L1000,100 L0,100 Z" 
                        fill="url(#surgeGradient)" 
                      />
                      <motion.path 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        d="M0,80 L100,81 L200,79 L300,82 L400,80 L500,81 L600,78 L700,75 L800,40 L900,10 L1000,5" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                        filter="drop-shadow(0 0 8px rgba(16,185,129,0.5))"
                      />
                    </svg>
                    <div className="absolute bottom-2 left-4 right-4 flex justify-between text-[8px] font-bold text-slate-500 tracking-widest uppercase pointer-events-none">
                       <span>14 дней назад</span>
                       <span>Прошлое</span>
                       <span className="text-emerald-400">Взлет сейчас</span>
                    </div>
                  </div>
                </div>

                {/* Data Table */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Анализ &quot;растущих&quot; позиций</h3>
                  <div className="border border-white/5 rounded-2xl overflow-hidden bg-white/5">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider">Товар</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider">Базовая v</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider">Текущая v</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Динамика</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Склад</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-right">Действие</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <FastProductRow 
                          name="Набор кухонных ножей" 
                          img="https://placehold.co/100x100/1e293b/white?text=K"
                          baseSpeed="10"
                          currentSpeed="45"
                          dynamics="+350%"
                          dynamicsType="viral"
                          stockStatus="Хватит на 12 дней"
                          stockStatusType="warning"
                          btnLabel="Поднять цену"
                        />
                        <FastProductRow 
                          name="Органайзер для ванной" 
                          img="https://placehold.co/100x100/1e293b/white?text=O"
                          baseSpeed="20"
                          currentSpeed="35"
                          dynamics="+75%"
                          dynamicsType="growing"
                          stockStatus="Хватит на 40 дней"
                          stockStatusType="safe"
                          btnLabel="Отключить рекламу"
                        />
                        <FastProductRow 
                          name="Коврик для йоги Pro" 
                          img="https://placehold.co/100x100/1e293b/white?text=Y"
                          baseSpeed="5"
                          currentSpeed="15"
                          dynamics="+200%"
                          dynamicsType="promo"
                          stockStatus="Акция WB"
                          stockStatusType="promo"
                          btnLabel="Следить за маржой"
                        />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Gradient Bottom Effect */}
              <div className="h-8 absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-20" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function KPICard({ label, value, subtext, variant = "default", trendIcon }: { label: string, value: string, subtext: string, variant?: string, trendIcon?: React.ReactNode }) {
  return (
    <div className={cn(
      "bg-white/5 border rounded-xl p-6 transition-all hover:bg-white/[0.08] relative overflow-hidden group",
      variant === "emerald" ? "border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)]" : "border-white/5"
    )}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] blur-2xl rounded-full translate-x-12 -translate-y-12" />
      <div className="flex justify-between items-start mb-4">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
        {trendIcon}
      </div>
      <h3 className={cn(
        "text-2xl font-bold tracking-tight mb-1",
        variant === "emerald" ? "text-emerald-400" : variant === "amber" ? "text-amber-400" : "text-white"
      )}>
        {value}
      </h3>
      <p className="text-[10px] text-slate-400 font-bold">{subtext}</p>
    </div>
  );
}

function FastProductRow({ name, img, baseSpeed, currentSpeed, dynamics, dynamicsType, stockStatus, stockStatusType, btnLabel }: { name: string, img: string, baseSpeed: string, currentSpeed: string, dynamics: string, dynamicsType: string, stockStatus: string, stockStatusType: string, btnLabel: string }) {
  return (
    <tr className="group hover:bg-white/[0.02] transition-colors">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
             <Image src={img} alt={name} width={32} height={32} className="w-full h-full object-cover" unoptimized />
          </div>
          <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{name}</span>
        </div>
      </td>
      <td className="p-4 text-sm font-bold text-slate-400">{baseSpeed} шт/д</td>
      <td className="p-4 text-sm font-bold text-white shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500">➔</span>
          <span className="text-emerald-400">{currentSpeed} шт/д</span>
        </div>
      </td>
      <td className="p-4 text-center">
        <span className={cn(
          "text-sm font-black px-2 py-0.5 rounded-full",
          dynamicsType === "viral" ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-slate-300"
        )}>
          {dynamics}
        </span>
      </td>
      <td className="p-4 text-center">
        {dynamicsType === "promo" ? (
          <Badge variant="info" className="bg-purple-500/10 text-purple-400 border-purple-500/20">{stockStatus}</Badge>
        ) : (
          <span className={cn(
            "text-[11px] font-bold",
            stockStatusType === "warning" ? "text-orange-400" : "text-slate-400"
          )}>
            {stockStatus}
          </span>
        )}
      </td>
      <td className="p-4 text-right">
        <button className={cn(
          "text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border transition-all",
          dynamicsType === "viral" 
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20" 
            : dynamicsType === "growing"
            ? "bg-teal-500/10 border-teal-500/20 text-teal-400 hover:bg-teal-500/20"
            : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
        )}>
          {btnLabel}
        </button>
      </td>
    </tr>
  );
}

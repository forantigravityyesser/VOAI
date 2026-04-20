"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  TrendingDown, 
  Snowflake,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

interface LowVelocityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LowVelocityModal({ isOpen, onClose }: LowVelocityModalProps) {
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
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-start justify-center pointer-events-none z-[101] p-4 pt-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl w-full max-w-5xl overflow-hidden pointer-events-auto relative flex flex-col max-h-[calc(100vh-140px)]"
            >
              {/* Amber & Blue Diagnostic Glows */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 blur-[100px] pointer-events-none" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Детализация: Падение спроса и Стагнация</h2>
                    <p className="text-slate-400 text-sm mt-1">Диагностика воронки продаж и реанимация карточек</p>
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
                    label="Проблемные SKU" 
                    value="12 SKU" 
                    subtext="Падение скорости > 50%"
                    variant="slate"
                  />
                  <KPICard 
                    label="Заморожено в стагнации" 
                    value="315 000 ₽" 
                    subtext="Капитал без движения"
                    variant="amber"
                  />
                  <KPICard 
                    label="Среднее время без продаж" 
                    value="8 дней" 
                    subtext="По категории 'Мертвый груз'"
                    variant="blue"
                  />
                </div>

                {/* AI Action Banner */}
                <div className="relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-slate-800/80 rounded-xl" />
                  <div className="relative border border-amber-500/30 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400 shrink-0">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-amber-400 font-bold text-sm mb-1 uppercase tracking-widest">AI Анализ</h4>
                        <p className="text-slate-200 leading-relaxed max-w-2xl">
                          У артикула «Сумка женская» <span className="text-amber-400 font-bold">CTR упал до 1.5%</span>. Основная причина стагнации — потеря визуальной конверсии. Рекомендуется A/B тест главного фото и запуск АРК на минимальной ставке.
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-500/10 rounded-xl px-6 py-6 h-auto font-bold shrink-0 transition-all">
                      SEO & Фото Аудит
                    </Button>
                  </div>
                </div>

                {/* Declining Trend Chart */}
                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                     <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                       <Snowflake className="w-4 h-4 text-blue-400" />
                       Тренд угасания (14 дней)
                     </h3>
                     <span className="text-[10px] text-slate-500 font-bold uppercase">Объем продаж на группу</span>
                   </div>
                   
                   <div className="h-40 w-full bg-white/[0.02] rounded-2xl border border-white/5 p-6 flex items-end justify-between gap-2 relative overflow-hidden">
                      {/* Diagnostic Grid Lines */}
                      <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none opacity-20">
                        <div className="border-t border-blue-500/20 w-full" />
                        <div className="border-t border-blue-500/20 w-full" />
                        <div className="border-t border-blue-500/20 w-full" />
                      </div>

                      {[16, 15, 14, 12, 11, 8, 9, 6, 4, 3, 2, 1, 0, 0].map((val, i) => (
                        <div key={i} className="flex-1 group relative h-full flex flex-col justify-end">
                           <motion.div 
                             initial={{ height: 0 }}
                             animate={{ height: `${Math.max((val / 16) * 100, 2)}%` }}
                             transition={{ duration: 1, ease: "easeOut", delay: i * 0.05 }}
                             className={cn(
                               "w-full rounded-t-md transition-all group-hover:brightness-150 relative",
                               i > 10 ? "bg-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]" : 
                               i > 6 ? "bg-blue-400/30" : "bg-blue-600/50"
                             )}
                           >
                              {/* Glow tip */}
                              <div className="absolute top-0 inset-x-0 h-1 bg-white/20 rounded-full blur-[2px]" />
                           </motion.div>
                           
                           {/* Labels */}
                           <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                             {i === 0 && <span className="text-[8px] font-black text-slate-600 uppercase tracking-tighter">14д</span>}
                             {i === 13 && <span className="text-[8px] font-black text-amber-500 uppercase tracking-tighter">Сегодня</span>}
                           </div>

                           {/* Tooltip on hover */}
                           <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-[8px] px-1.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                             {val} шт
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Data Table */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Список &quot;замороженных&quot; товаров</h3>
                  <div className="border border-white/5 rounded-2xl overflow-hidden bg-white/5 shadow-xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider">Товар</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Скорость</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Без продаж</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider">Диагностика</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-right">Действие</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <StagnationRow 
                          name="Женская сумка 'Grace' Black" 
                          img="https://placehold.co/100x100/1e293b/white?text=G"
                          oldSpeed="8"
                          newSpeed="0"
                          daysSilent="14 дней"
                          problem="Низкий CTR (1.2%)"
                          problemVariant="red"
                          btnLabel="Обновить фото"
                        />
                        <StagnationRow 
                          name="Мужской ремень Leather Pro" 
                          img="https://placehold.co/100x100/1e293b/white?text=L"
                          oldSpeed="15"
                          newSpeed="3"
                          daysSilent="2 дня"
                          problem="Упали показы"
                          problemVariant="amber"
                          btnLabel="Включить рекламу"
                        />
                        <StagnationRow 
                          name="Набор свечей Aroma Therapy" 
                          img="https://placehold.co/100x100/1e293b/white?text=A"
                          oldSpeed="5"
                          newSpeed="1"
                          daysSilent="4 дня"
                          problem="Не в рынке (Цена)"
                          problemVariant="blue"
                          btnLabel="Снизить цену"
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

function KPICard({ label, value, subtext, variant = "slate" }: {
  label: string;
  value: string;
  subtext: string;
  variant?: "amber" | "blue" | "slate";
}) {
  return (
    <div className={cn(
      "bg-white/5 border rounded-xl p-6 transition-all hover:bg-white/[0.08] relative overflow-hidden group",
      variant === "amber" ? "border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.05)]" : "border-white/5"
    )}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] blur-2xl rounded-full translate-x-12 -translate-y-12" />
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{label}</p>
      <h3 className={cn(
        "text-2xl font-bold tracking-tight mb-1",
        variant === "amber" ? "text-amber-400" : variant === "blue" ? "text-blue-400" : "text-white"
      )}>
        {value}
      </h3>
      <p className="text-[10px] text-slate-400 font-bold">{subtext}</p>
    </div>
  );
}

function StagnationRow({ name, img, oldSpeed, newSpeed, daysSilent, problem, problemVariant, btnLabel }: {
  name: string;
  img: string;
  oldSpeed: number | string;
  newSpeed: number | string;
  daysSilent: string;
  problem: string;
  problemVariant: string;
  btnLabel: string;
}) {
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
      <td className="p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-[11px] font-bold">
          <span className="text-slate-500">{oldSpeed}</span>
          <ArrowRight className="w-3 h-3 text-slate-600" />
          <span className="text-amber-500">{newSpeed}</span>
        </div>
      </td>
      <td className="p-4 text-center">
        <span className={cn(
          "text-sm font-black",
          daysSilent.includes("14") ? "text-red-500" : "text-slate-300"
        )}>
          {daysSilent}
        </span>
      </td>
      <td className="p-4">
        <Badge variant={problemVariant === "red" ? "destructive" : problemVariant === "amber" ? "warning" : "info"} className="text-[9px]">
           {problem}
        </Badge>
      </td>
      <td className="p-4 text-right">
        <button className={cn(
          "text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border transition-all shadow-sm",
          problemVariant === "red" 
            ? "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20" 
            : problemVariant === "amber"
            ? "bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20"
            : "bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20"
        )}>
          {btnLabel}
        </button>
      </td>
    </tr>
  );
}

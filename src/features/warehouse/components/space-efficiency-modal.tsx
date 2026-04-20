"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  Box, 
  Truck, 
  TrendingDown, 
  ArrowRight,
  Warehouse,
  Zap,
  Maximize2
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

interface SpaceEfficiencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  productData?: {
    id: string;
    name: string;
    volume?: string;
    image?: string;
  };
}

export function SpaceEfficiencyModal({ isOpen, onClose, productData }: SpaceEfficiencyModalProps) {
  const data = {
    name: productData?.name || "Коврик для йоги XL",
    sku: productData?.id || "WB-88229",
    volume: productData?.volume || "45 Литров",
    dims: "60x15x50 см",
    image: productData?.image || "https://images.unsplash.com/photo-1592432676556-28453d07bad6?q=80&w=200&h=200&auto=format&fit=crop"
  };

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
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[120]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-start justify-center pointer-events-none z-[121] p-4 pt-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-950 border border-white/10 rounded-[2.5rem] shadow-2xl w-full max-w-5xl overflow-hidden pointer-events-auto relative flex flex-col max-h-[calc(100vh-140px)]"
            >
              {/* Dynamic Red Glow for inefficiency */}
              <div className="absolute top-0 inset-x-0 h-64 bg-rose-500/10 blur-[120px] pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/5 relative z-10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-xl bg-slate-800 overflow-hidden relative shadow-inner shrink-0 scale-100 group-hover:scale-105 transition-transform">
                    <Image 
                      src={data.image} 
                      alt={data.name} 
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-white tracking-tight leading-none mb-2">{data.name}</h2>
                    <p className="text-slate-400 text-sm font-medium">Анализ габаритов и логистической рентабельности</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge className="bg-rose-500/10 text-rose-400 border border-rose-500/30 px-4 py-1.5 rounded-xl font-black uppercase text-[10px] tracking-widest">
                    Критически неэффективно
                  </Badge>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar relative z-10 text-white">
                
                {/* Physics & Tariffs Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                   <PhysicsCard 
                     icon={<Maximize2 className="w-4 h-4" />}
                     title="Габариты и Объем"
                     value={data.volume}
                     subtext={data.dims}
                   />
                   <PhysicsCard 
                     icon={<Truck className="w-4 h-4 text-rose-400" />}
                     title="Стоимость логистики"
                     value="651 ₽ / шт"
                     subtext="Повышенный тариф за объем"
                     highlight
                   />
                   <PhysicsCard 
                     icon={<Warehouse className="w-4 h-4 text-orange-400" />}
                     title="Занято места"
                     value="35% лимита"
                     subtext="На складе Коледино"
                   />
                   <PhysicsCard 
                     icon={<TrendingDown className="w-4 h-4" />}
                     title="Доля в заказах"
                     value="8%"
                     subtext="Несоразмерно объему"
                   />
                </div>

                {/* AI Space Optimizer Banner */}
                <div className="relative group overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-r from-rose-900/40 to-slate-900/20 rounded-3xl" />
                   <div className="relative border border-rose-500/30 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex gap-5 items-start max-w-2xl">
                         <div className="p-3 bg-rose-500/20 rounded-2xl text-rose-400 shrink-0 shadow-lg">
                            <Sparkles className="w-6 h-6" />
                         </div>
                         <div>
                            <div className="flex items-center gap-2 mb-2">
                               <h4 className="text-rose-400 font-black text-[10px] uppercase tracking-[0.25em]">AI Инсайт</h4>
                               <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-white/5 text-slate-400 border border-white/10 uppercase tracking-tighter">Hermes Optimized</span>
                            </div>
                            <p className="text-slate-200 leading-relaxed text-sm font-medium italic">
                               «Логистика и хранение съедают 45% розничной цены из-за объема (45 л). Этот товар блокирует ваши лимиты отгрузки. Рекомендуется перевести артикул на схему FBS (отгрузка со своего склада) или применить скидку для освобождения места под высокомаржинальные позиции.»
                            </p>
                         </div>
                      </div>
                      <div className="flex flex-col gap-3 shrink-0 min-w-[200px]">
                         <Button className="bg-rose-500 hover:bg-rose-600 text-white shadow-xl shadow-rose-900/40 rounded-xl h-11 font-black uppercase tracking-widest text-[10px]">
                            Перевести на FBS
                         </Button>
                         <Button variant="outline" className="border-slate-700 text-white hover:bg-white/5 rounded-xl h-11 font-black uppercase tracking-widest text-[10px]">
                            Запустить Ликвидацию
                         </Button>
                      </div>
                   </div>
                </div>

                {/* Margin X-Ray Visual Bar */}
                <div className="space-y-6">
                   <h3 className="text-sm font-black text-white uppercase tracking-[0.15em] flex items-center gap-3">
                      <Zap className="w-4 h-4 text-accent-purple" />
                      Влияние объема на юнит-экономику
                   </h3>
                   
                   <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                      <div className="space-y-6">
                         {/* Legend / Info Top */}
                         <div className="flex justify-between items-end">
                            <div className="flex flex-col">
                               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Розничная цена (100%)</span>
                               <span className="text-2xl font-black text-white">1 500 ₽</span>
                            </div>
                            <div className="text-right">
                               <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Затраты на &quot;Воздух&quot;</span>
                               <span className="text-2xl font-black text-rose-500">651 ₽</span>
                            </div>
                         </div>

                         {/* The Bar */}
                         <div className="relative h-10 w-full bg-slate-900 rounded-2xl overflow-hidden flex shadow-inner group/bar cursor-help">
                            {/* Commission (20%) */}
                            <div className="h-full bg-blue-500/40 relative group/sec" style={{ width: '20%' }}>
                               <div className="opacity-0 group-hover/sec:opacity-100 absolute inset-0 bg-white/10 transition-opacity" />
                            </div>
                            {/* Logistics for volume (45%) */}
                            <div className="h-full bg-rose-500/60 relative group/sec overflow-hidden" style={{ width: '45%' }}>
                               <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,.05)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.05)_50%,rgba(255,255,255,.05)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[slide_1s_linear_infinite]" />
                               <div className="opacity-0 group-hover/sec:opacity-100 absolute inset-0 bg-white/10 transition-opacity" />
                            </div>
                            {/* Clean Margin (35%) */}
                            <div className="h-full bg-emerald-500/40 relative group/sec" style={{ width: '35%' }}>
                               <div className="opacity-0 group-hover/sec:opacity-100 absolute inset-0 bg-white/10 transition-opacity" />
                            </div>
                         </div>

                         {/* Detailed Legend */}
                         <div className="grid grid-cols-3 gap-4">
                            <LegendItem color="bg-blue-500/40" label="Комиссия ВБ" value="300 ₽" percent="20%" />
                            <LegendItem color="bg-rose-500/60" label="Логистика (Габариты)" value="651 ₽" percent="45%" border />
                            <LegendItem color="bg-emerald-500/40" label="Грязная маржа" value="549 ₽" percent="35%" />
                         </div>
                      </div>
                   </div>
                </div>

                {/* Alternative Warehouses Table */}
                <div className="space-y-6">
                   <h3 className="text-sm font-black text-white uppercase tracking-[0.15em] flex items-center gap-3">
                      <Warehouse className="w-4 h-4 text-accent-blue" />
                      Тарифы на других складах (Оптимизация)
                   </h3>
                   <div className="border border-white/5 rounded-3xl overflow-hidden bg-white/[0.01] shadow-2xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/5 bg-white/[0.02]">
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Склад</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Коэфф. Склада</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Логистика (за 45л)</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Действие</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          <WarehouseRow warehouse="Коледино" coeff="120%" cost="651 ₽" color="text-rose-500" current />
                          <WarehouseRow warehouse="Электросталь" coeff="100%" cost="542 ₽" />
                          <WarehouseRow warehouse="Казань" coeff="85%" cost="460 ₽" color="text-emerald-500" actionable />
                        </tbody>
                      </table>
                   </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                   <div className="flex items-center gap-3 opacity-40">
                      <Box className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Тарификация Wildberries 2025/26 (Объемная)</span>
                   </div>
                   <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Обновлено: Сегодня, 12:45</div>
                </div>
              </div>
              
              {/* Bottom Glow Overlay */}
              <div className="h-12 absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-20" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function PhysicsCard({ icon, title, value, subtext, highlight }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtext: string;
  highlight?: boolean;
}) {
  return (
    <div className={cn(
      "bg-white/5 border border-slate-800 rounded-2xl p-6 transition-all hover:bg-white/[0.08] relative overflow-hidden group",
      highlight && "border-rose-500/20 bg-rose-500/[0.02]"
    )}>
       <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-white transition-colors">
             {icon}
          </div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{title}</span>
       </div>
       <div className={cn("text-2xl font-black tracking-tight mb-1", highlight ? "text-rose-500" : "text-white")}>
          {value}
       </div>
       <p className="text-[10px] text-slate-500 font-bold uppercase leading-none">{subtext}</p>
    </div>
  );
}

function LegendItem({ color, label, value, percent, border }: {
  color: string;
  label: string;
  value: string;
  percent: string;
  border?: boolean;
}) {
  return (
    <div className={cn("p-4 rounded-2xl bg-white/[0.01] border border-white/5", border && "border-rose-500/20")}>
       <div className="flex items-center gap-2 mb-2">
          <div className={cn("w-2 h-2 rounded-full", color)} />
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
       </div>
       <div className="flex items-baseline gap-2">
          <span className="text-lg font-black text-white">{value}</span>
          <span className="text-[10px] font-bold text-slate-500">{percent}</span>
       </div>
    </div>
  );
}

function WarehouseRow({ warehouse, coeff, cost, color, actionable, current }: {
  warehouse: string;
  coeff: string;
  cost: string;
  color?: string;
  actionable?: boolean;
  current?: boolean;
}) {
  return (
    <tr className="group hover:bg-white/[0.01] transition-colors">
       <td className="p-6">
          <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{warehouse}</span>
          {current && <span className="ml-2 text-[8px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded uppercase font-black">Текущий</span>}
       </td>
       <td className="p-6 text-center text-sm font-mono text-slate-400">{coeff}</td>
       <td className={cn("p-6 text-center text-sm font-black", color || "text-slate-200")}>{cost}</td>
       <td className="p-6 text-right">
          {actionable ? (
            <button className="text-[10px] font-black uppercase tracking-widest text-emerald-400 hover:text-emerald-300 flex items-center justify-end gap-2 ml-auto transition-colors">
               Отгрузить сюда <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">-</span>
          )}
       </td>
    </tr>
  );
}

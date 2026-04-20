"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, TrendingUp, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/shared/components/ui/badge";

interface TurnoverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TurnoverModal({ isOpen, onClose }: TurnoverModalProps) {
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
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-start justify-center pointer-events-none z-[101] p-4 pt-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl w-full max-w-5xl overflow-hidden pointer-events-auto relative flex flex-col max-h-[calc(100vh-140px)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/5">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight"> Детализация: Оборачиваемость склада </h2>
                  <p className="text-slate-400 text-sm mt-1">Детальный анализ эффективности товарных запасов</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
                
                {/* KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <KPICard 
                    label="Средняя оборачиваемость" 
                    value="34 дня" 
                    badge="-2 дня (Улучшение)" 
                    variant="success"
                  />
                  <KPICard 
                    label="Замороженный капитал" 
                    value="1 250 000 ₽" 
                    icon={<DollarSign className="w-4 h-4 text-slate-400" />}
                  />
                  <KPICard 
                    label="Скорость продаж" 
                    value="184 шт / день" 
                    icon={<TrendingUp className="w-4 h-4 text-accent-green" />}
                  />
                </div>

                {/* AI Insight Banner */}
                <div className="relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl" />
                  <div className="relative border border-indigo-500/30 rounded-xl p-6 flex gap-4 items-start">
                    <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-indigo-400 font-bold text-sm mb-1 uppercase tracking-widest">AI Анализ</h4>
                      <p className="text-slate-200 leading-relaxed">
                        15% капитала заморожено в неликвиде (&gt;60 дней). Рекомендуется применить <span className="text-indigo-400 font-bold underline decoration-indigo-500/30 underline-offset-4 cursor-pointer hover:text-indigo-300 transition-colors">скидку 10% к 3 позициям</span> для ускорения продаж и снижения платы за хранение.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Distribution Bar */}
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                     <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Здоровье запасов</h3>
                     <span className="text-xs text-slate-500">По количеству SKU</span>
                   </div>
                   <div className="h-5 w-full bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
                      <div className="h-full bg-accent-green w-[20%] relative group flex items-center justify-center">
                        <span className="text-[10px] font-black text-white drop-shadow-sm">20%</span>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">Дефицит (20%)</div>
                      </div>
                      <div className="h-full bg-accent-blue w-[65%] relative group border-x border-slate-900/20 flex items-center justify-center">
                        <span className="text-[10px] font-black text-white drop-shadow-sm">65%</span>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">Норма (65%)</div>
                      </div>
                      <div className="h-full bg-accent-red w-[15%] relative group flex items-center justify-center">
                        <span className="text-[10px] font-black text-white drop-shadow-sm">15%</span>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">Неликвид (15%)</div>
                      </div>
                   </div>
                   <div className="flex gap-6 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-accent-green" /> &lt;15 дн (Дефицит)</div>
                      <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-accent-blue" /> 15-45 дн (Норма)</div>
                      <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-accent-red" /> &gt;60 дн (Неликвид)</div>
                   </div>
                </div>

                {/* Data Table */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Топ позиций по оборачиваемости</h3>
                  <div className="border border-white/5 rounded-2xl overflow-hidden bg-white/5">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider">Товар</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider">Остаток</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Скорость</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Дни</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-right">Статус</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <ProductRow 
                          name="Умная колонка SmartHome G2" 
                          img="https://placehold.co/100x100/1e293b/white?text=S"
                          stock="450 шт"
                          speed="5.2"
                          turnover={85}
                          status="Неликвид"
                          variant="destructive"
                        />
                        <ProductRow 
                          name="USB-C Hub Premium Metal" 
                          img="https://placehold.co/100x100/1e293b/white?text=H"
                          stock="12 шт"
                          speed="1.5"
                          turnover={8}
                          status="Риск OOS"
                          variant="warning"
                        />
                        <ProductRow 
                          name="Пауэрбанк 20000mAh FastCharge" 
                          img="https://placehold.co/100x100/1e293b/white?text=P"
                          stock="120 шт"
                          speed="4.8"
                          turnover={25}
                          status="Норма"
                          variant="success"
                        />
                        <ProductRow 
                          name="Кабель Lightning MFI 1.2m" 
                          img="https://placehold.co/100x100/1e293b/white?text=C"
                          stock="840 шт"
                          speed="33.6"
                          turnover={25}
                          status="Норма"
                          variant="default"
                        />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Gradient Bottom Effect */}
              <div className="h-8 absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function KPICard({ label, value, badge, variant = "default", icon }: { 
  label: string; 
  value: string; 
  badge?: string; 
  variant?: "default" | "outline" | "success" | "warning" | "destructive" | "info"; 
  icon?: React.ReactNode; 
}) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-xl p-6 transition-all hover:bg-white/[0.08] hover:border-white/10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] blur-2xl rounded-full translate-x-12 -translate-y-12" />
      <div className="flex justify-between items-start mb-4">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
        {icon}
      </div>
      <div className="flex items-end justify-between gap-2">
        <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
        {badge && (
          <Badge variant={variant} className="text-[8px]">
            {badge}
          </Badge>
        )}
      </div>
    </div>
  );
}

function ProductRow({ name, img, stock, speed, turnover, status, variant }: {
  name: string;
  img: string;
  stock: string;
  speed: string;
  turnover: number;
  status: string;
  variant: "default" | "destructive" | "outline" | "success" | "warning" | "info";
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
      <td className="p-4 text-sm font-bold text-slate-300">{stock}</td>
      <td className="p-4 text-sm text-center text-slate-400">{speed} шт/д</td>
      <td className="p-4 text-center">
        <span className={cn(
          "text-sm font-black",
          turnover > 60 ? "text-accent-red" : turnover < 15 ? "text-accent-orange" : "text-white"
        )}>
          {turnover}
        </span>
      </td>
      <td className="p-4 text-right">
        <Badge variant={variant}>{status}</Badge>
      </td>
    </tr>
  );
}

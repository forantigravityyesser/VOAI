"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  Siren
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

interface OOSRiskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OOSRiskModal({ isOpen, onClose }: OOSRiskModalProps) {
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
              {/* Subtle Urgent Glows */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/5 blur-[100px] pointer-events-none" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 blur-[100px] pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/20 rounded-xl text-red-500">
                    <Siren className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Детализация: Риск Out-of-Stock</h2>
                    <p className="text-slate-400 text-sm mt-1">Анализ Zero-Day и дефицита товаров</p>
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
              <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar relative z-10">
                
                {/* KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <KPICard 
                    label="Критический риск" 
                    value="8 SKU" 
                    subtext="< 5 дней до обнуления"
                    variant="urgent"
                  />
                  <KPICard 
                    label="Прогноз упущенной выручки" 
                    value="640 000 ₽" 
                    subtext="При простое 7 дней"
                    variant="danger"
                  />
                  <KPICard 
                    label="Срочная потребность" 
                    value="2 150 шт" 
                    subtext="Для покрытия дефицита"
                  />
                </div>

                {/* AI Action Banner */}
                <div className="relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl" />
                  <div className="relative border border-orange-500/40 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-orange-500/20 rounded-xl text-orange-400 shrink-0">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-orange-400 font-bold text-sm mb-1 uppercase tracking-widest">AI Анализ</h4>
                        <p className="text-slate-200 leading-relaxed max-w-2xl">
                          Хит продаж закончится через <span className="text-red-400 font-bold">4 дня</span>. Ваша партия прибудет только через 12 дней. Рекомендуется немедленно <span className="font-bold underline decoration-orange-500/30">поднять цену на 15%</span>, чтобы замедлить продажи и удержать SEO-позиции.
                        </p>
                      </div>
                    </div>
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-6 py-6 h-auto font-bold shrink-0 shadow-lg shadow-orange-900/20">
                      Применить наценку
                    </Button>
                  </div>
                </div>

                {/* OOS Timeline */}
                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                     <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Таймлайн обнуления</h3>
                     <div className="flex gap-4 text-[10px] font-bold text-slate-500 uppercase">
                        <span>Сегодня</span>
                        <span>3 дня</span>
                        <span>7 дней</span>
                        <span>14 дней</span>
                     </div>
                   </div>
                   
                   <div className="space-y-4 relative">
                      {/* Vertical bars/markers */}
                      <div className="absolute inset-0 flex justify-between pointer-events-none px-1">
                        <div className="w-px h-full bg-white/5" />
                        <div className="w-px h-full bg-white/5" />
                        <div className="w-px h-full bg-white/5" />
                        <div className="w-px h-full bg-white/5" />
                      </div>

                      <TimelineBar name="Наушники Pro Space" color="bg-red-500" width="w-[20%]" days="3 дня" />
                      <TimelineBar name="Смарт-часы Active 4" color="bg-orange-500" width="w-[45%]" days="6 дней" />
                      <TimelineBar name="Зарядное устройство GaN" color="bg-yellow-500" width="w-[70%]" days="10 дней" />
                   </div>
                </div>

                {/* Data Table */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Критические позиции (Zero-Day)</h3>
                  <div className="border border-white/5 rounded-2xl overflow-hidden bg-white/5">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider">Товар</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider">Остаток</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Скорость</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Дней до 0</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-right">Упущенная выгода</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-right">Действие</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <OOSProductRow 
                          name="Беспроводные наушники Pro" 
                          img="https://placehold.co/100x100/1e293b/white?text=P"
                          stock="45 шт"
                          speed="15"
                          zeroDay="3 дня"
                          lostProfit="15 000 ₽"
                          status="Critical"
                          btnLabel="Поднять цену"
                        />
                        <OOSProductRow 
                          name="Умные часы Style X" 
                          img="https://placehold.co/100x100/1e293b/white?text=W"
                          stock="120 шт"
                          speed="15"
                          zeroDay="8 дней"
                          lostProfit="8 000 ₽"
                          status="Warning"
                          btnLabel="План отгрузки"
                        />
                        <OOSProductRow 
                          name="Зарядка 65W Turbo" 
                          img="https://placehold.co/100x100/1e293b/white?text=T"
                          stock="50 шт"
                          speed="-"
                          zeroDay="Безопасно"
                          lostProfit="-"
                          status="Safe"
                          isTransit={true}
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

function KPICard({ label, value, subtext, variant = "default" }: { label: string, value: string, subtext: string, variant?: string }) {
  return (
    <div className={cn(
      "bg-white/5 border rounded-xl p-6 transition-all hover:bg-white/[0.08] relative overflow-hidden group",
      variant === "urgent" ? "border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.05)]" : "border-white/5"
    )}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] blur-2xl rounded-full translate-x-12 -translate-y-12" />
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{label}</p>
      <h3 className={cn(
        "text-2xl font-bold tracking-tight mb-1",
        variant === "urgent" || variant === "danger" ? "text-red-400" : "text-white"
      )}>
        {value}
      </h3>
      <p className="text-[10px] text-slate-400 font-bold">{subtext}</p>
    </div>
  );
}

function TimelineBar({ name, color, width, days }: { name: string, color: string, width: string, days: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        <span>{name}</span>
        <span>{days}</span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: width === "w-[20%]" ? "20%" : width === "w-[45%]" ? "45%" : "70%" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full", color)} 
        />
      </div>
    </div>
  );
}

function OOSProductRow({ name, img, stock, speed, zeroDay, lostProfit, status, btnLabel, isTransit }: { name: string, img: string, stock: string, speed: string, zeroDay: string, lostProfit: string, status: string, btnLabel?: string, isTransit?: boolean }) {
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
      <td className="p-4">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-300">{stock}</span>
          {isTransit && <Badge variant="success" className="text-[7px] py-0 px-1 mt-1">В пути: 300 шт</Badge>}
        </div>
      </td>
      <td className="p-4 text-sm text-center text-slate-400">{speed === "-" ? "-" : `${speed} шт/д`}</td>
      <td className="p-4 text-center">
        <span className={cn(
          "text-sm font-black",
          status === "Critical" ? "text-red-500" : status === "Warning" ? "text-orange-400" : "text-accent-green"
        )}>
          {zeroDay}
        </span>
      </td>
      <td className="p-4 text-right text-sm font-medium text-slate-300">
        <span className={status === "Critical" ? "text-red-400" : ""}>{lostProfit}</span>
      </td>
      <td className="p-4 text-right">
        {btnLabel && (
          <button className={cn(
            "text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border transition-all",
            status === "Critical" 
              ? "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20" 
              : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
          )}>
            {btnLabel}
          </button>
        )}
      </td>
    </tr>
  );
}

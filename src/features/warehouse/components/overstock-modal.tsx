"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  ThermometerSnowflake, 
  ArrowRight,
  TrendingDown,
  Box,
  Timer
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

interface OverstockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OverstockModal({ isOpen, onClose }: OverstockModalProps) {
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
              className="bg-slate-950 border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(6,182,212,0.1)] w-full max-w-5xl overflow-hidden pointer-events-auto relative flex flex-col max-h-[calc(100vh-140px)]"
            >
              {/* Icy Cyan/Blue Glows */}
              <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-[130px] rounded-full pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/5 relative z-10 bg-slate-950/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20">
                    <ThermometerSnowflake className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Детализация: Избыточные запасы (Заморозка)</h2>
                    <p className="text-slate-400 text-sm mt-1">Оптимизация замороженного капитала и снижение затрат на хранение</p>
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
                    label="Переинвестировано" 
                    value="2 450 000 ₽" 
                    subtext="Капитал сверх нормы 45 дней"
                    variant="cyan"
                    icon={<Box className="w-4 h-4 text-cyan-400" />}
                  />
                  <KPICard 
                    label="Сжигается на хранении" 
                    value="-45 000 ₽ / мес" 
                    subtext="Чистый убыток маржи"
                    variant="red"
                    icon={<TrendingDown className="w-4 h-4 text-red-400" />}
                  />
                  <KPICard 
                    label="Средний профицит" 
                    value="6.5 месяцев" 
                    subtext="Срок распродачи излишков"
                    variant="slate"
                    icon={<Timer className="w-4 h-4 text-slate-400" />}
                  />
                </div>

                {/* AI Action Banner */}
                <div className="relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-blue-900/40 rounded-xl" />
                  <div className="relative border border-cyan-500/40 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-cyan-400 font-bold text-sm mb-1 uppercase tracking-widest flex items-center gap-2">
                           AI Аудит
                           <Badge className="bg-cyan-500/20 text-cyan-400 text-[8px] h-4 border-none">ВЫСОКИЙ ПРИОРИТЕТ</Badge>
                        </h4>
                        <p className="text-slate-200 leading-relaxed max-w-2xl">
                           Запас «Демисезонной куртки» превышает спрос на <span className="text-cyan-400 font-bold">180 дней</span>. Сезон заканчивается. Вы теряете 18 000 ₽/мес на хранении. Рекомендуется возврат партии (FBS) или агрессивная распродажа.
                        </p>
                      </div>
                    </div>
                    <Button className="bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl px-8 py-6 h-auto font-bold shrink-0 shadow-lg shadow-cyan-900/40 transition-all hover:scale-105 active:scale-95 group">
                      План ликвидации
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>

                {/* Overlapping Bar Chart (Visual Indicator) */}
                <div className="space-y-4">
                   <div className="flex items-center justify-between px-1">
                     <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                       Визуализация излишков
                     </h3>
                     <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-wider">
                        <div className="flex items-center gap-1.5"><div className="w-3 h-1.5 bg-cyan-400 rounded-px" /> <span>Оптимально (45д)</span></div>
                        <div className="flex items-center gap-1.5"><div className="w-3 h-1.5 bg-cyan-600/30 rounded-px" /> <span>Излишки (Заморожено)</span></div>
                     </div>
                   </div>
                   
                   <div className="space-y-3 bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                      <StockComparisonItem 
                        label="Куртка демисезонная" 
                        optimal={45} 
                        actual={180} 
                        unit="дней"
                        frozenAmount="1 500 000 ₽"
                      />
                      <StockComparisonItem 
                        label="Сумка кожаная" 
                        optimal={45} 
                        actual={90} 
                        unit="дней"
                        frozenAmount="450 000 ₽"
                      />
                      <StockComparisonItem 
                        label="Обувь спортивная Pro" 
                        optimal={45} 
                        actual={60} 
                        unit="дней"
                        frozenAmount="100 000 ₽"
                      />
                   </div>
                </div>

                {/* Data Table */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest px-1">Список перекупленных позиций</h3>
                  <div className="border border-white/5 rounded-2xl overflow-hidden bg-white/5 shadow-2xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider">Товар</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Остаток / Норма</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Запас (Дни)</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Заморожено (₽)</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Убыток (мес)</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-right">Действие</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <OverstockRow 
                          name="Куртка демисезонная XL" 
                          img="https://placehold.co/100x100/1e293b/06b6d4?text=K"
                          stock="1200 / 300 шт"
                          days="180 дней"
                          frozen="1 500 000 ₽"
                          loss="-18 000 ₽"
                          isCritical
                          btnLabel="Оформить возврат"
                        />
                        <OverstockRow 
                          name="Сумка кожаная 'Elegant'" 
                          img="https://placehold.co/100x100/1e293b/06b6d4?text=S"
                          stock="500 / 200 шт"
                          days="90 дней"
                          frozen="450 000 ₽"
                          loss="-5 000 ₽"
                          btnLabel="Создать сет/набор"
                        />
                        <OverstockRow 
                          name="Кроссовки Run Pro Gold" 
                          img="https://placehold.co/100x100/1e293b/06b6d4?text=X"
                          stock="150 / 100 шт"
                          days="60 дней"
                          frozen="100 000 ₽"
                          loss="-1 200 ₽"
                          btnLabel="Наблюдение"
                        />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Gradient Bottom Effect */}
              <div className="h-12 absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-20" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function KPICard({ label, value, subtext, variant = "slate", icon }: {
  label: string;
  value: string;
  subtext: string;
  variant?: "cyan" | "red" | "slate";
  icon?: React.ReactNode;
}) {
  return (
    <div className={cn(
      "bg-white/5 border rounded-2xl p-6 transition-all hover:bg-white/[0.08] relative overflow-hidden group",
      variant === "cyan" ? "border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.05)]" : "border-white/5"
    )}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] blur-3xl rounded-full translate-x-12 -translate-y-12" />
      <div className="flex justify-between items-start mb-4">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
        <div className={cn(
           "p-1.5 rounded-lg",
           variant === "cyan" ? "bg-cyan-500/10" : variant === "red" ? "bg-red-500/10" : "bg-white/5"
        )}>
          {icon}
        </div>
      </div>
      <h3 className={cn(
        "text-2xl font-bold tracking-tight mb-1",
        variant === "cyan" ? "text-cyan-400" : variant === "red" ? "text-red-400" : "text-white"
      )}>
        {value}
      </h3>
      <p className="text-[10px] text-slate-400 font-bold">{subtext}</p>
    </div>
  );
}

function StockComparisonItem({ label, optimal, actual, unit, frozenAmount }: {
  label: string;
  optimal: number;
  actual: number;
  unit: string;
  frozenAmount: string;
}) {
  const ratio = Math.min(optimal / actual, 1);
  return (
    <div className="space-y-2 group cursor-default">
       <div className="flex justify-between text-[11px] font-bold">
          <span className="text-slate-300 group-hover:text-white transition-colors">{label}</span>
          <span className="text-cyan-400/80 group-hover:text-cyan-400 transition-colors">Заморожено: {frozenAmount}</span>
       </div>
       <div className="h-6 w-full bg-cyan-600/10 rounded-full relative overflow-hidden border border-white/5 p-1 flex items-center">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-cyan-600/20 rounded-full relative"
          >
             {/* Optimal part */}
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${ratio * 100}%` }}
               transition={{ duration: 1, delay: 0.5 }}
               className="h-full bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)] relative pr-4 flex items-center justify-end"
             >
                <div className="text-[8px] text-cyan-950 font-black whitespace-nowrap leading-none transition-opacity group-hover:opacity-100 opacity-60">НОРМА ({optimal}д)</div>
             </motion.div>
          </motion.div>
          <div className="absolute right-4 text-[9px] font-bold text-slate-500 pointer-events-none uppercase">ФАКТ: {actual} {unit}</div>
       </div>
    </div>
  );
}

function OverstockRow({ name, img, stock, days, frozen, loss, isCritical, btnLabel }: {
  name: string;
  img: string;
  stock: string;
  days: string;
  frozen: string;
  loss: string;
  isCritical?: boolean;
  btnLabel: string;
}) {
  return (
    <tr className="group hover:bg-white/[0.02] transition-colors">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
             <Image src={img} alt={name} width={32} height={32} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" unoptimized />
          </div>
          <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors leading-tight">{name}</span>
        </div>
      </td>
      <td className="p-4 text-center text-xs font-bold text-slate-400">
        {stock}
      </td>
      <td className="p-4 text-center">
        <span className={cn(
          "text-sm font-black tracking-tight",
          isCritical ? "text-cyan-400" : "text-slate-300"
        )}>
          {days}
        </span>
      </td>
      <td className="p-4 text-center">
        <span className={cn(
          "text-sm font-bold",
          isCritical ? "text-cyan-400" : "text-slate-300"
        )}>
          {frozen}
        </span>
      </td>
      <td className="p-4 text-center text-xs font-bold text-red-400">
        {loss}
      </td>
      <td className="p-4 text-right">
        <button className={cn(
          "text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl border transition-all shadow-lg active:scale-95",
          isCritical 
            ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20" 
            : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
        )}>
          {btnLabel}
        </button>
      </td>
    </tr>
  );
}

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  Clock, 
  BarChart3,
  ArrowRight,
  ShieldAlert,
  ArrowUpRight,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

interface LossPreventionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LossPreventionModal({ isOpen, onClose }: LossPreventionModalProps) {
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
              className="bg-slate-950 border border-white/10 rounded-[2.5rem] shadow-[0_0_80px_rgba(225,29,72,0.15)] w-full max-w-5xl overflow-hidden pointer-events-auto relative flex flex-col max-h-[calc(100vh-140px)]"
            >
              {/* Emergency Red/Rose Glows */}
              <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-600/5 blur-[120px] rounded-full pointer-events-none" />

              {/* Header Section */}
              <div className="flex items-center justify-between p-8 border-b border-white/5 relative z-10 bg-slate-950/50 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-500/10 rounded-2xl text-red-500 border border-red-500/20 shadow-lg shadow-red-950/20">
                    <ShieldAlert className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-white tracking-tight leading-none mb-2">Предотвращение потерь: Риск Out-of-Stock</h2>
                    <p className="text-slate-400 text-sm font-medium tracking-tight">Анализ дефицита и стратегия удержания позиций</p>
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
                
                {/* Financial Impact KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <KPICard 
                    label="Прогноз упущенной выручки"
                    value="142 500 ₽"
                    subtext="За период ожидаемого простоя"
                    variant="critical"
                  />
                  <KPICard 
                    label="SKU в критической зоне"
                    value="5 товаров"
                    subtext="Остатки < 3 дней"
                    variant="warning"
                  />
                  <KPICard 
                    label="Риск потери SEO-позиций"
                    value="Высокий"
                    subtext="Для 2-х карточек из ТОП-10"
                    variant="danger"
                  />
                </div>

                {/* AI Rescue Strategy Banner */}
                <div className="relative group overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 to-slate-900/20 rounded-3xl" />
                   <div className="relative border border-red-500/40 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-8">
                      <div className="flex gap-5 items-start max-w-2xl">
                         <div className="p-3 bg-red-500/20 rounded-2xl text-red-400 shrink-0 shadow-lg shadow-red-900/20">
                            <Sparkles className="w-6 h-6 animate-pulse" />
                         </div>
                         <div>
                            <div className="flex items-center gap-2 mb-2">
                               <h4 className="text-red-400 font-black text-[10px] uppercase tracking-[0.25em]">AI Стратегия Hermes</h4>
                               <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-[8px] font-black tracking-widest uppercase px-2 h-4">Critical Priority</Badge>
                            </div>
                            <p className="text-slate-200 leading-relaxed text-sm font-medium italic">
                               «Внимание: 5 хитов продаж обнулятся через 3 дня. Ближайшая поставка запланирована только через 8 дней. Рекомендую немедленно применить стратегию &quot;Торможения&quot;: <span className="text-white font-bold">поднимите цену на эти 5 товаров на 15-20%</span>. Это снизит скорость выбытия и позволит дотянуть до поставки без обнуления SEO-позиций.»
                            </p>
                         </div>
                      </div>
                      <Button className="bg-red-600 hover:bg-red-700 text-white rounded-xl h-14 px-8 font-black uppercase tracking-widest text-[10px] shrink-0 gap-3 shadow-[0_0_30px_rgba(220,38,38,0.3)] transition-all hover:scale-105 active:scale-95 group">
                         Поднять цены (+15%)
                         <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                   </div>
                </div>

                {/* Stock vs. Loss Trajectory (Visual Chart) */}
                <div className="space-y-6">
                   <div className="flex items-center justify-between px-1">
                      <h3 className="text-sm font-black text-white uppercase tracking-[0.15em] flex items-center gap-3">
                         <BarChart3 className="w-4 h-4 text-red-400" />
                         График обнуления и роста убытков
                      </h3>
                      <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.15em]">
                         <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                            <span className="text-slate-400">Остатки (шт)</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                            <span className="text-slate-400">Упущенная выручка (₽)</span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="h-48 w-full bg-white/[0.02] border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
                      <svg viewBox="0 0 1000 200" className="w-full h-full preserve-3d overflow-visible">
                         {/* Grid Lines */}
                         {[0, 50, 100, 150, 200].map((y) => (
                            <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                         ))}
                         
                         {/* Stock Line (Green) */}
                         <motion.path 
                            d="M 0 50 L 300 190"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="4"
                            strokeLinecap="round"
                            className="drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                         />
                         
                         {/* Loss Area (Red) */}
                         <motion.path 
                            d="M 300 200 L 300 190 L 1000 50 L 1000 200 Z"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            fill="url(#redGradient)"
                            fillOpacity="0.3"
                            stroke="#ef4444"
                            strokeWidth="2"
                            strokeDasharray="8 4"
                         />

                         <defs>
                            <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                               <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                            </linearGradient>
                         </defs>

                         {/* Day 3 Marker */}
                         <g transform="translate(300, 190)">
                            <circle r="6" fill="#ef4444" className="animate-ping opacity-75" />
                            <circle r="4" fill="#ef4444" />
                            <text y="-25" textAnchor="middle" className="text-[10px] font-black fill-red-400 uppercase tracking-widest">Day 3: OOS</text>
                         </g>

                         {/* Days Labeling */}
                         <text x="0" y="220" className="text-[9px] font-bold fill-slate-500 uppercase">Сегодня</text>
                         <text x="300" y="220" className="text-[9px] font-bold fill-slate-500 uppercase">3 дня</text>
                         <text x="650" y="220" className="text-[9px] font-bold fill-slate-500 uppercase">7 дней</text>
                         <text x="1000" y="220" className="text-[9px] font-bold fill-slate-500 uppercase" textAnchor="end">Расчетная поставка (10 дн)</text>
                      </svg>
                   </div>
                </div>

                {/* Actionable SKU List */}
                <div className="space-y-6 pt-2">
                   <h3 className="text-sm font-black text-white uppercase tracking-[0.15em] flex items-center gap-3">
                      <Clock className="w-4 h-4 text-orange-400" />
                      Список товаров в зоне риска
                   </h3>
                   <div className="border border-white/5 rounded-3xl overflow-hidden bg-white/[0.01] shadow-2xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/5 bg-white/[0.02]">
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Товар</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Остаток</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Скорость</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Zero-Day</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Потенциальный убыток</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Статус</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          <ProductRow 
                            name="Свитер оверсайз (Beige)" 
                            img="https://placehold.co/100x100/1e293b/ef4444?text=S"
                            stock="45 шт"
                            speed="18 шт/день"
                            zeroDay="2.5 дня"
                            loss="- 45 000 ₽"
                            isCritical
                          />
                          <ProductRow 
                            name="Джинсы Wide Leg" 
                            img="https://placehold.co/100x100/1e293b/ef4444?text=D"
                            stock="12 шт"
                            speed="8 шт/день"
                            zeroDay="1.5 дня"
                            loss="- 32 000 ₽"
                            isCritical
                          />
                          <ProductRow 
                            name="Сумка кросс-боди" 
                            img="https://placehold.co/100x100/1e293b/f59e0b?text=C"
                            stock="80 шт"
                            speed="20 шт/день"
                            zeroDay="4 дня"
                            loss="- 21 500 ₽"
                            isWarning
                          />
                          <ProductRow 
                            name="Футболка Basic White" 
                            img="https://placehold.co/100x100/1e293b/f59e0b?text=T"
                            stock="120 шт"
                            speed="25 шт/день"
                            zeroDay="4.8 дня"
                            loss="- 18 000 ₽"
                            isWarning
                          />
                          <ProductRow 
                            name="Кеды CANVAS Low" 
                            img="https://placehold.co/100x100/1e293b/f59e0b?text=K"
                            stock="65 шт"
                            speed="12 шт/день"
                            zeroDay="5.4 дня"
                            loss="- 26 000 ₽"
                            isWarning
                          />
                        </tbody>
                      </table>
                   </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 opacity-50">
                   <div className="flex items-center gap-3">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Данные прогноза обновлены: Сегодня, 19:45 (WB API 2.5)</span>
                   </div>
                   <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 leading-none">Система мониторинга Hermes AI</div>
                </div>
              </div>
              
              <div className="h-12 absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-20" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function KPICard({ label, value, subtext, variant }: { label: string, value: string, subtext: string, variant: string }) {
  const styles = {
    critical: "border-red-500/20 bg-red-500/5",
    warning: "border-orange-500/20 bg-orange-500/5",
    danger: "border-rose-500/20 bg-rose-500/5"
  }[variant as 'critical' | 'warning' | 'danger'] || "border-white/5 bg-white/5";

  const valueColors = {
    critical: "text-red-400",
    warning: "text-orange-400",
    danger: "text-rose-400"
  }[variant as 'critical' | 'warning' | 'danger'] || "text-white";

  return (
    <div className={cn("border rounded-[2rem] p-6 flex flex-col justify-between transition-all hover:bg-white/[0.08] group", styles)}>
       <div className="flex justify-between items-start mb-6">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
          <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
       </div>
       <div>
          <div className={cn("text-3xl font-black mb-1 tracking-tighter", valueColors)}>{value}</div>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{subtext}</div>
       </div>
    </div>
  );
}

function ProductRow({ name, img, stock, speed, zeroDay, loss, isCritical, isWarning }: {
  name: string;
  img: string;
  stock: string;
  speed: string;
  zeroDay: string;
  loss: string;
  isCritical?: boolean;
  isWarning?: boolean;
}) {
  return (
    <tr className="group hover:bg-white/[0.03] transition-colors">
       <td className="p-6">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-110 transition-transform">
                <Image src={img} alt={name} width={40} height={40} className="w-full h-full object-cover" unoptimized />
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{name}</span>
                <Badge className="w-fit h-4 text-[8px] bg-slate-800 text-slate-400 border-none font-black tracking-widest uppercase px-1">FBO Stock</Badge>
             </div>
          </div>
       </td>
       <td className="p-6 text-center">
          <span className="text-xs font-bold text-slate-300">{stock}</span>
       </td>
       <td className="p-6 text-center">
          <span className="text-xs font-bold text-slate-400">{speed}</span>
       </td>
       <td className="p-6 text-center">
          <div className={cn(
             "text-sm font-black tracking-tight flex flex-col items-center",
             isCritical ? "text-red-400" : isWarning ? "text-orange-400" : "text-white"
          )}>
             {zeroDay}
             {isCritical && <span className="text-[8px] font-black uppercase text-red-500/60 leading-none mt-1">Sold Out imminent</span>}
          </div>
       </td>
       <td className="p-6 text-center">
          <span className={cn("text-sm font-black", isCritical ? "text-red-400" : isWarning ? "text-orange-400" : "text-white")}>
             {loss}
          </span>
       </td>
       <td className="p-6 text-right">
          <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white rounded-xl h-9 px-4 font-black uppercase tracking-widest text-[9px] hover:bg-white/10 gap-2 transition-all group">
             {isCritical ? "Изменить цену" : "Ускорить транзит"}
             <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </Button>
       </td>
    </tr>
  );
}

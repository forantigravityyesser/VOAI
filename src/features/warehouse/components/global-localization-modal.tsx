"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  Globe, 
  TrendingUp, 
  ArrowRight, 
  ShieldCheck, 
  ArrowUpRight,
  TrendingDown,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

interface GlobalLocalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalLocalizationModal({ isOpen, onClose }: GlobalLocalizationModalProps) {
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
              className="bg-slate-950 border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(16,185,129,0.1)] w-full max-w-5xl overflow-hidden pointer-events-auto relative flex flex-col max-h-[calc(100vh-140px)]"
            >
              {/* Emerald Glow Accents */}
              <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[130px] rounded-full pointer-events-none" />

              {/* Header Section */}
              <div className="flex items-center justify-between p-8 border-b border-white/5 relative z-10 bg-slate-950/50 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-950/20">
                    <Globe className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-white tracking-tight leading-none mb-2">Аналитика: Глобальный Индекс Локализации</h2>
                    <p className="text-slate-400 text-sm font-medium tracking-tight">Сводка по магазину и влияние на стоимость логистики</p>
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
                
                {/* Macro Financial KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <KPICard 
                    label="Текущий ИЛ (Магазин)" 
                    value="82%" 
                    subtext="Норма WB: > 70%" 
                    variant="emerald"
                    icon={<Globe className="w-4 h-4" />}
                  />
                  <KPICard 
                    label="Финансовый эффект" 
                    value="+ 45 000 ₽" 
                    subtext="Экономия на логистике (Скидка)" 
                    variant="emerald"
                    icon={<TrendingUp className="w-4 h-4" />}
                  />
                  <KPICard 
                    label="Локальные заказы" 
                    value="8 200 шт" 
                    subtext="Из 10 000 общих заказов" 
                  />
                </div>

                {/* AI Global Strategy Banner */}
                <div className="relative group overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 to-slate-900/20 rounded-3xl" />
                   <div className="relative border border-emerald-500/40 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-8">
                      <div className="flex gap-5 items-start max-w-2xl">
                         <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400 shrink-0 shadow-lg shadow-emerald-900/20">
                            <Sparkles className="w-6 h-6 animate-pulse" />
                         </div>
                         <div>
                            <div className="flex items-center gap-2 mb-2">
                               <h4 className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.25em]">AI Глобальный Стратег Hermes</h4>
                               <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[8px] font-black tracking-widest uppercase px-2 h-4">Optimal Level</Badge>
                            </div>
                            <p className="text-slate-200 leading-relaxed text-sm font-medium italic">
                               «Логистика магазина работает в профиците (82%), вы получаете скидку от WB. Главная точка роста — <span className="text-emerald-400 font-bold">макрорегион &quot;Урал&quot; (ИЛ всего 30%)</span>. Система выявила 4 товара-якоря, которые снижают общий показатель. Рекомендуется сборная отгрузка этих SKU в Екатеринбург для достижения ИЛ 89% и увеличения скидки.»
                            </p>
                         </div>
                      </div>
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-14 px-8 font-black uppercase tracking-widest text-[10px] shrink-0 gap-3 shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all hover:scale-105 active:scale-95 group">
                         План отгрузки на Урал
                         <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                   </div>
                </div>

                {/* Regional Store Coverage (Visual Bars) */}
                <div className="space-y-6">
                   <div className="flex items-center justify-between px-1">
                      <h3 className="text-sm font-black text-white uppercase tracking-[0.15em] flex items-center gap-3">
                         <Layers className="w-4 h-4 text-emerald-400" />
                         Покрытие по макрорегионам (Все товары)
                      </h3>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Анализ заказов WB 2025</div>
                   </div>
                   
                   <div className="grid grid-cols-1 gap-5 bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                      <RegionProgress label="Центральный (Москва)" value={96} variant="emerald" />
                      <RegionProgress label="Поволжье (Казань)" value={85} variant="emerald" />
                      <RegionProgress label="Урал (Екатеринбург)" value={30} variant="danger" />
                   </div>
                </div>

                {/* Table: "Top Offenders" (Антирейтинг товаров-якорей) */}
                <div className="space-y-6 pt-2">
                   <div className="flex items-center justify-between px-1">
                      <h3 className="text-sm font-black text-white uppercase tracking-[0.15em] flex items-center gap-3">
                         <TrendingDown className="w-4 h-4 text-rose-500" />
                         &quot;Расстрельный список&quot; товаров-якорей
                      </h3>
                      <Badge variant="outline" className="text-rose-400 border-rose-500/30 font-black text-[10px] uppercase tracking-widest px-3">Антирейтинг SKU</Badge>
                   </div>
                   <div className="border border-white/5 rounded-3xl overflow-hidden bg-white/[0.01] shadow-2xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/5 bg-white/[0.02]">
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Товар</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Индив. ИЛ</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Проблемный регион</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-wider">AI Решение</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Действие</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          <ProductRow 
                            name="Куртка зимняя (Dark Blue)" 
                            img="https://placehold.co/100x100/1e293b/10b981?text=K"
                            personalIL="42%"
                            region="Урал (Спрос 25%, Сток 0%)"
                            solution="Отгрузить 150 шт в ЕКБ"
                            isCritical
                          />
                          <ProductRow 
                            name="Шапка вязаная WOOL" 
                            img="https://placehold.co/100x100/1e293b/f59e0b?text=W"
                            personalIL="51%"
                            region="Сибирь (Новосибирск)"
                            solution="Отгрузить 300 шт в Новосибирск"
                            isWarning
                          />
                          <ProductRow 
                            name="Ботинки мужские Classic" 
                            img="https://placehold.co/100x100/1e293b/f59e0b?text=B"
                            personalIL="58%"
                            region="Юг (Краснодар)"
                            solution="Отгрузить 50 шт в Краснодар"
                            isWarning
                          />
                        </tbody>
                      </table>
                   </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 opacity-50">
                   <div className="flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Данные синхронизированы с финансовым кабинетом WB 2025</span>
                   </div>
                   <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 leading-none">Система управления логистикой VOAI</div>
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

function KPICard({ label, value, subtext, variant, icon }: { label: string, value: string, subtext: string, variant?: string, icon?: React.ReactNode }) {
  const styles = variant === "emerald" ? "border-emerald-500/20 bg-emerald-500/5" : "border-white/5 bg-white/5";
  const valueColor = variant === "emerald" ? "text-emerald-400" : "text-white";

  return (
    <div className={cn("border rounded-[2rem] p-6 flex flex-col justify-between transition-all hover:bg-white/[0.08] group", styles)}>
       <div className="flex justify-between items-start mb-6">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
          <div className={cn("p-2 rounded-xl bg-slate-900 border border-white/5 group-hover:scale-110 transition-transform", variant === "emerald" ? "text-emerald-400" : "text-slate-400")}>
            {icon || <ArrowUpRight className="w-4 h-4" />}
          </div>
       </div>
       <div>
          <div className={cn("text-3xl font-black mb-1 tracking-tighter", valueColor)}>{value}</div>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{subtext}</div>
       </div>
    </div>
  );
}

function RegionProgress({ label, value, variant }: { label: string, value: number, variant: string }) {
  const color = variant === "emerald" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]";
  
  return (
    <div className="space-y-3">
       <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-slate-300">
          <span>{label}</span>
          <span className={variant === "emerald" ? "text-emerald-400" : "text-rose-400"}>{value}%</span>
       </div>
       <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={cn("h-full rounded-full", color)}
          />
       </div>
    </div>
  );
}

function ProductRow({ name, img, personalIL, region, solution, isCritical, isWarning }: { name: string, img: string, personalIL: string, region: string, solution: string, isCritical?: boolean, isWarning?: boolean }) {
  const ilColor = isCritical ? "text-rose-500" : isWarning ? "text-orange-400" : "text-emerald-400";
  
  return (
    <tr className="group hover:bg-white/[0.03] transition-colors">
       <td className="p-6">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-110 transition-transform">
                <Image src={img} alt={name} width={40} height={40} className="w-full h-full object-cover" unoptimized />
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors leading-tight">{name}</span>
                <Badge className="w-fit h-4 text-[8px] bg-slate-800 text-slate-400 border-none font-black tracking-widest uppercase px-1">Active SKU</Badge>
             </div>
          </div>
       </td>
       <td className="p-6 text-center">
          <span className={cn("text-base font-black tracking-tighter", ilColor)}>{personalIL}</span>
       </td>
       <td className="p-6 text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">{region}</span>
       </td>
       <td className="p-6">
          <Badge variant="default" className="bg-white/5 text-[10px] font-bold border-none text-slate-300 px-3 py-1">
             {solution}
          </Badge>
       </td>
       <td className="p-6 text-right">
          <Button variant="outline" size="sm" className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400 rounded-xl h-9 px-6 font-black uppercase tracking-widest text-[9px] hover:bg-emerald-500/20 gap-2 transition-all group">
             В поставку
             <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
       </td>
    </tr>
  );
}

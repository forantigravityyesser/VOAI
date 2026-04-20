"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  AlertTriangle, 
  Target, 
  Zap, 
  TrendingUp,
  MapPin,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

interface LocalizationDrilldownModalProps {
  isOpen: boolean;
  onClose: () => void;
  productData?: {
    id: string;
    name: string;
    score: number;
    image?: string;
  };
}

export function LocalizationDrilldownModal({ isOpen, onClose, productData }: LocalizationDrilldownModalProps) {
  // Use provided data or defaults for the specific "Cream" scenario
  const data = {
    name: productData?.name || "Крем для лица (50мл)",
    sku: productData?.id || "WB-99283",
    il: productData?.score || 45,
    image: productData?.image || "https://images.unsplash.com/photo-1620916566398-39f114387c9b?q=80&w=200&h=200&auto=format&fit=crop"
  };

  // const isLowIl = data.il < 60;

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
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[110]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-start justify-center pointer-events-none z-[111] p-4 pt-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl w-full max-w-5xl overflow-hidden pointer-events-auto relative flex flex-col max-h-[calc(100vh-140px)]"
            >
              {/* Top Red Glow for low IL */}
              <div className="absolute top-0 inset-x-0 h-64 bg-red-500/5 blur-[100px] pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/5 relative z-10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-xl bg-slate-800 overflow-hidden relative shadow-inner shrink-0">
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
                    <p className="text-slate-400 text-sm font-medium">Анализ гео-распределения и логистических издержек</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                   <div className="flex flex-col items-end mr-4">
                      <div className="flex items-center gap-2 mb-1">
                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Индивидуальный ИЛ</span>
                         <Badge className="bg-red-500/10 text-red-400 font-bold border border-red-500/30 px-3">
                            ИЛ: {data.il}%
                         </Badge>
                      </div>
                      <span className="text-[11px] font-black text-red-500 uppercase tracking-tighter">ШТРАФ: Логистика x1.5</span>
                   </div>
                   <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar relative z-10 text-white">
                
                {/* Financial KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                   <KPICard 
                     title="Переплата за логистику"
                     value="-18 400 ₽"
                     subtext="Из-за низкого КТР в этом месяце"
                     color="text-red-400"
                   />
                   <KPICard 
                     title="Целевой ИЛ (AI Прогноз)"
                     value="82%"
                     subtext="При выполнении плана отгрузок"
                     color="text-emerald-400"
                   />
                   <KPICard 
                     title="Потеря SEO-трафика"
                     value="~25%"
                     subtext="В регионах: Сибирь, Юг"
                     color="text-orange-400"
                   />
                </div>

                {/* AI Logistics Banner */}
                <div className="relative group overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 to-slate-900/20 rounded-2xl" />
                   <div className="relative border border-red-500/30 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex gap-5 items-start max-w-3xl">
                         <div className="p-3 bg-red-500/20 rounded-xl text-red-400 shrink-0 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                            <Sparkles className="w-6 h-6" />
                         </div>
                         <div>
                            <div className="flex items-center gap-2 mb-2">
                               <h4 className="text-red-400 font-black text-[10px] uppercase tracking-[0.2em]">AI Логист</h4>
                               <span className="bg-red-500/20 text-red-300 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter">Острый дисбаланс</span>
                            </div>
                            <p className="text-slate-200 leading-relaxed text-sm font-medium italic">
                               «Индекс локализации критически низок (45%). 100% остатков находится в Москве (Коледино), но 35% всех заказов идет из Сибири и Урала. Каждая доставка в эти регионы тарифицируется по штрафному коэффициенту. Рекомендуется срочно распределить партию из 450 штук на региональные хабы.»
                            </p>
                         </div>
                      </div>
                      <Button className="bg-red-500 hover:bg-red-600 text-white shadow-[0_0_25px_rgba(225,29,72,0.4)] rounded-xl px-8 h-12 font-black uppercase tracking-widest text-[11px] shrink-0 transition-all active:scale-95">
                         Создать план транзита
                      </Button>
                   </div>
                </div>

                {/* Supply vs Demand Visual */}
                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-white uppercase tracking-[0.15em] flex items-center gap-3">
                         <Zap className="w-4 h-4 text-emerald-400" />
                         Спрос vs. Фактические остатки
                      </h3>
                      <div className="flex items-center gap-4">
                         <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-blue-500/50" />
                            <span className="text-[9px] text-slate-500 font-bold uppercase">Спрос (Заказы)</span>
                         </div>
                         <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-[9px] text-slate-500 font-bold uppercase">Сток (Наличие)</span>
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 bg-white/[0.02] border border-white/5 rounded-3xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl pointer-events-none" />
                      
                      {/* Moscow Row */}
                      <div className="space-y-5">
                         <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Москва (Центр)</span>
                            <span className="text-[10px] text-emerald-400 font-bold italic">Избыток: +40%</span>
                         </div>
                         <div className="space-y-3">
                            <div className="group/bar">
                               <div className="flex justify-between text-[10px] mb-1.5 font-bold text-slate-500">
                                  <span className="uppercase tracking-tighter">Спрос</span>
                                  <span>60%</span>
                               </div>
                               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: "60%" }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-blue-500/50" 
                                  />
                               </div>
                            </div>
                            <div className="group/bar">
                               <div className="flex justify-between text-[10px] mb-1.5 font-bold text-slate-500">
                                  <span className="uppercase tracking-tighter">Остаток</span>
                                  <span>100%</span>
                               </div>
                               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                    className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
                                  />
                               </div>
                            </div>
                         </div>
                      </div>

                      {/* Siberia Row */}
                      <div className="space-y-5">
                         <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Сибирь (Новосибирск)</span>
                            <div className="flex items-center gap-1.5">
                               <AlertTriangle className="w-3 h-3 text-red-500" />
                               <span className="text-[10px] text-red-500 font-bold italic uppercase">Штрафная логистика</span>
                            </div>
                         </div>
                         <div className="space-y-3">
                            <div className="group/bar">
                               <div className="flex justify-between text-[10px] mb-1.5 font-bold text-slate-500">
                                  <span className="uppercase tracking-tighter">Спрос</span>
                                  <span>30%</span>
                               </div>
                               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: "30%" }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-blue-500/50" 
                                  />
                               </div>
                            </div>
                            <div className="group/bar">
                               <div className="flex justify-between text-[10px] mb-1.5 font-bold text-slate-500">
                                  <span className="uppercase tracking-tighter">Остаток</span>
                                  <span className="text-red-500">0% (Out of Stock)</span>
                               </div>
                               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: "2%" }}
                                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                    className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]" 
                                  />
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* AI Recommended Shipping Plan Table */}
                <div className="space-y-6">
                   <h3 className="text-sm font-black text-white uppercase tracking-[0.15em] flex items-center gap-3">
                      <Target className="w-4 h-4 text-accent-purple" />
                      AI План региональной отгрузки
                   </h3>
                   <div className="border border-white/5 rounded-3xl overflow-hidden bg-white/[0.01] shadow-2xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/5 bg-white/[0.02]">
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-left">Макрорегион (Склад)</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Доля заказов</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Текущий остаток</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">AI План (шт)</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right whitespace-nowrap">Ожидаемый эффект</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          <TableRow 
                            region="Новосибирск (Сибирь)" 
                            demand="30%" 
                            stock="0 шт" 
                            stockStatus="critical"
                            plan="Отгрузить 300 шт" 
                            effect="+18% к ИЛ" 
                          />
                          <TableRow 
                            region="Екатеринбург (Урал)" 
                            demand="10%" 
                            stock="15 шт" 
                            stockStatus="low"
                            plan="Отгрузить 150 шт" 
                            effect="+8% к ИЛ" 
                          />
                          <TableRow 
                            region="Коледино (Москва)" 
                            demand="60%" 
                            stock="1200 шт" 
                            stockStatus="normal"
                            plan="Достаточно" 
                            effect="Без изменений" 
                          />
                        </tbody>
                      </table>
                   </div>
                </div>

                {/* Bottom Footer Info */}
                <div className="flex items-center justify-between pt-4 opacity-50 border-t border-white/5">
                   <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Аналитика по макрорегионам • Данные API v3</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">WBAi Optimized Strategy</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   </div>
                </div>
              </div>

              {/* Close Overlay */}
              <div className="h-12 absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-20" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function KPICard({ title, value, subtext, color }: { title: string, value: string, subtext: string, color: string }) {
  return (
    <div className="bg-white/5 border border-slate-800 rounded-2xl p-6 transition-all hover:bg-white/[0.08] group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/[0.01] blur-2xl rounded-full translate-x-10 -translate-y-10" />
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block">
        {title}
      </span>
      <div className={cn("text-2xl font-black tracking-tight mb-1", color)}>
        {value}
      </div>
      <p className="text-[10px] text-slate-400 font-bold">{subtext}</p>
    </div>
  );
}

function TableRow({ region, demand, stock, stockStatus, plan, effect }: {
  region: string;
  demand: string;
  stock: string;
  stockStatus: string;
  plan: string;
  effect: string;
}) {
  return (
    <tr className="group hover:bg-white/[0.01] transition-all">
      <td className="p-6">
        <div className="flex items-center gap-4">
           <div className="p-2 bg-white/5 rounded-xl text-slate-500 group-hover:text-white transition-colors">
              <Package className="w-4 h-4" />
           </div>
           <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{region}</span>
        </div>
      </td>
      <td className="p-6 text-center text-sm font-mono text-slate-400">{demand}</td>
      <td className={cn(
        "p-6 text-center text-sm font-mono",
        stockStatus === "critical" ? "text-red-500 font-black shadow-[0_0_10px_rgba(239,68,68,0.1)]" : 
        stockStatus === "low" ? "text-orange-400 font-bold" : "text-slate-300"
      )}>
        {stock}
      </td>
      <td className="p-6 text-center">
        <span className={cn(
           "text-xs font-black uppercase tracking-widest",
           plan.includes("Отгрузить") ? "text-emerald-400 underline underline-offset-4 decoration-emerald-500/30" : "text-slate-500"
        )}>
          {plan}
        </span>
      </td>
      <td className="p-6 text-right">
        <div className="flex items-center justify-end gap-2 text-xs font-black">
           {effect.includes("изменений") ? (
             <span className="text-slate-600 uppercase tracking-widest text-[9px]">{effect}</span>
           ) : (
             <>
               <TrendingUp className="w-4 h-4 text-emerald-400" />
               <span className="text-emerald-400">{effect}</span>
             </>
           )}
        </div>
      </td>
    </tr>
  );
}

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  Wallet, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Download, 
  Warehouse,
  Package,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

interface SupplyBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupplyBudgetModal({ isOpen, onClose }: SupplyBudgetModalProps) {
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
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[130]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-start justify-center pointer-events-none z-[131] p-4 pt-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-950 border border-white/10 rounded-[2.5rem] shadow-2xl w-full max-w-5xl overflow-hidden pointer-events-auto relative flex flex-col max-h-[calc(100vh-140px)]"
            >
              {/* Premium Emerald Glow */}
              <div className="absolute top-0 inset-x-0 h-64 bg-emerald-500/5 blur-[120px] pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/5 relative z-10">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold text-white tracking-tight leading-none mb-2">Детализация: План поставок и Бюджетирование</h2>
                  <p className="text-slate-400 text-sm font-medium">Оптимальное распределение капитала по складам WB на ближайшие 14 дней</p>
                </div>
                
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar relative z-10 text-white">
                
                {/* Financial KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                   <FinanceCard 
                     icon={<Wallet className="w-4 h-4" />}
                     title="Требуемый капитал"
                     value="4 250 000 ₽"
                     subtext="Закупка у поставщиков"
                   />
                   <FinanceCard 
                     icon={<TrendingUp className="w-4 h-4 text-emerald-400" />}
                     title="Прогноз прибыли (EBITDA)"
                     value="+ 1 041 250 ₽"
                     subtext="Рентабельность 24.5%"
                     trend="+4.2%"
                   />
                   <FinanceCard 
                     icon={<ShieldCheck className="w-4 h-4 text-blue-400" />}
                     title="Спасенная выручка"
                     value="~6.8 млн ₽"
                     subtext="Предотвращение OOS"
                   />
                   <FinanceCard 
                     icon={<Zap className="w-4 h-4 text-emerald-400" />}
                     title="Опт. коэфф. приемки"
                     value="x1.2"
                     subtext="AI выбрал дешевые хабы"
                   />
                </div>

                {/* AI Logistics Strategy Banner */}
                <div className="relative group overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 to-slate-900/20 rounded-3xl" />
                   <div className="relative border border-emerald-500/30 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex gap-5 items-start max-w-3xl">
                         <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400 shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                            <Sparkles className="w-6 h-6" />
                         </div>
                         <div>
                            <div className="flex items-center gap-2 mb-2">
                               <h4 className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.25em]">AI Стратегия</h4>
                               <Badge className="bg-emerald-500/10 text-emerald-400 text-[8px] font-bold border-none uppercase tracking-tighter">Hermes Engine v3</Badge>
                            </div>
                            <p className="text-slate-200 leading-relaxed text-sm font-medium italic">
                               «Оптимальный бюджет поставок на ближайшие 14 дней составляет 4.25 млн ₽. 65% бюджета направлено на восполнение запасов 3-х хитов продаж (риск Out-of-Stock через 8 дней). Для максимизации Индекса локализации (ИЛ) и снижения тарифов WB на логистику, система рекомендует раздробить поставку: 40% отгрузить в Казань, 35% в Электросталь и 25% в Новосибирск.»
                            </p>
                         </div>
                      </div>
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-6 h-12 font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shrink-0 shadow-[0_10px_30px_rgba(16,185,129,0.3)] transition-all active:scale-95">
                         <Download className="w-4 h-4" />
                         Скачать XLSX
                      </Button>
                   </div>
                </div>

                {/* Budget Distribution Visual */}
                <div className="space-y-6">
                   <div className="flex justify-between items-center">
                      <h3 className="text-sm font-black text-white uppercase tracking-[0.15em] flex items-center gap-3">
                         <Warehouse className="w-4 h-4 text-accent-orange" />
                         Аллокация бюджета по складам назначения
                      </h3>
                   </div>
                   
                   <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                      <div className="space-y-8">
                         {/* Stacked Bar */}
                         <div className="flex h-4 w-full rounded-full overflow-hidden shadow-inner">
                            <motion.div initial={{ width: 0 }} animate={{ width: "40%" }} transition={{ duration: 1.2, ease: "easeOut" }} className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
                            <motion.div initial={{ width: 0 }} animate={{ width: "35%" }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }} className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]" />
                            <motion.div initial={{ width: 0 }} animate={{ width: "25%" }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }} className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]" />
                         </div>

                         {/* Distribution Cards */}
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <AllocationCard 
                              label="Казань (Магистраль)"
                              percent="40%"
                              amount="1 700 000 ₽"
                              color="bg-emerald-500"
                            />
                            <AllocationCard 
                              label="Электросталь (Топ-хаб)"
                              percent="35%"
                              amount="1 487 500 ₽"
                              color="bg-blue-500"
                            />
                            <AllocationCard 
                              label="Новосибирск (Сибирь)"
                              percent="25%"
                              amount="1 062 500 ₽"
                              color="bg-purple-500"
                            />
                         </div>
                      </div>
                   </div>
                </div>

                {/* Procurement & Supply Table */}
                <div className="space-y-6">
                   <h3 className="text-sm font-black text-white uppercase tracking-[0.15em] flex items-center gap-3">
                      <Package className="w-4 h-4 text-emerald-400" />
                      Закупочная ведомость (План отгрузки FBO)
                   </h3>
                   <div className="border border-white/5 rounded-3xl overflow-hidden bg-white/[0.01] shadow-2xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/5 bg-white/[0.02]">
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Товар (SKU)</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Целевой Склад</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">К отгрузке</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Бюджет закупки</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Приоритет</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Действие</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          <TableRow 
                            name="Смартфон X200 Series"
                            sku="WB-99001"
                            warehouse="Казань"
                            qty="500 шт"
                            budget="1 500 000 ₽"
                            badge="Критично: OOS через 5 дн"
                            badgeColor="bg-red-500/10 text-red-400 border-red-500/20"
                          />
                          <TableRow 
                            name="Чехол Silicone Case"
                            sku="WB-11223"
                            warehouse="Электросталь"
                            qty="2000 шт"
                            budget="300 000 ₽"
                            badge="Поддержание ИЛ"
                            badgeColor="bg-blue-500/10 text-blue-400 border-blue-500/20"
                          />
                          <TableRow 
                            name="Наушники Air-Pro"
                            sku="WB-22810"
                            warehouse="Новосибирск"
                            qty="800 шт"
                            budget="960 000 ₽"
                            badge="Норма"
                            badgeColor="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          />
                        </tbody>
                      </table>
                   </div>
                </div>

                {/* Footer Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 opacity-50">
                   <div className="text-[10px] font-bold uppercase tracking-widest">WBAi Optimized Investment Plan • 2026 Season</div>
                   <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                      <span>Live Marketplace Rates</span>
                      <div className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                   </div>
                </div>
              </div>

              {/* Bottom Fade */}
              <div className="h-12 absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-20" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function FinanceCard({ icon, title, value, subtext, trend }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtext: string;
  trend?: string;
}) {
  return (
    <div className="bg-white/5 border border-slate-800 rounded-2xl p-6 transition-all hover:bg-white/[0.08] relative group">
       <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-slate-800 rounded-xl text-slate-400 group-hover:text-white transition-colors">
             {icon}
          </div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{title}</span>
       </div>
       <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xl font-black text-white">{value}</span>
          {trend && <span className="text-[10px] font-black text-emerald-400">{trend}</span>}
       </div>
       <p className="text-[10px] text-slate-500 font-bold uppercase leading-none">{subtext}</p>
    </div>
  );
}

function AllocationCard({ label, percent, amount, color }: {
  label: string;
  percent: string;
  amount: string;
  color: string;
}) {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white/[0.01] border border-white/5 rounded-2xl">
       <div className="flex items-center gap-2">
          <div className={cn("w-1.5 h-1.5 rounded-full", color)} />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
       </div>
       <div className="flex items-baseline justify-between">
          <span className="text-sm font-black text-white">{amount}</span>
          <span className="text-[10px] font-black text-slate-400">{percent}</span>
       </div>
    </div>
  );
}

function TableRow({ name, sku, warehouse, qty, budget, badge, badgeColor }: {
  name: string;
  sku: string;
  warehouse: string;
  qty: string;
  budget: string;
  badge: string;
  badgeColor: string;
}) {
  return (
    <tr className="group hover:bg-white/[0.01] transition-colors">
       <td className="p-6">
          <div className="flex flex-col">
             <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{name}</span>
             <span className="text-[10px] text-slate-500 font-mono">{sku}</span>
          </div>
       </td>
       <td className="p-6 text-center text-xs font-bold text-slate-400">{warehouse}</td>
       <td className="p-6 text-center text-xs font-black text-white">{qty}</td>
       <td className="p-6 text-center text-sm font-black text-white">{budget}</td>
       <td className="p-6 text-center">
          <Badge className={cn("text-[9px] font-black uppercase tracking-tighter border", badgeColor)}>
             {badge}
          </Badge>
       </td>
       <td className="p-6 text-right">
          <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 gap-2">
             <Plus className="w-3 h-3" />
             В поставку
          </Button>
       </td>
    </tr>
  );
}

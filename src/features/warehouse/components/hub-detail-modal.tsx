"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  TrendingUp, 
  Package,
  Flame,
  Snowflake,
  ShieldAlert,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { WarehouseDistribution } from "@/core/types/warehouse.types";

interface HubDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  hub: WarehouseDistribution | null;
}

export function HubDetailModal({ isOpen, onClose, hub }: HubDetailModalProps) {
  if (!hub) return null;

  // Mock data for the table and radar reflecting the requested content
  const deficitProducts = [
    { name: "Термос походный (2л)", stock: 12, daysLeft: 2, impact: "Критичное", speed: "6 шт/дн" },
    { name: "Кружка стальная", stock: 24, daysLeft: 4, impact: "Высокое", speed: "5 шт/дн" },
  ];

  const overstockProducts = [
    { name: "Крем от загара (SPF 50)", stock: 400, daysLeft: ">200", impact: "Снижает", speed: "0 шт/дн" },
    { name: "Ласты для плавания", stock: 150, daysLeft: ">150", impact: "Снижает", speed: "0.2 шт/дн" },
  ];

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
              className="bg-slate-950 border border-white/10 rounded-[2.5rem] shadow-2xl w-full max-w-5xl overflow-hidden pointer-events-auto relative flex flex-col max-h-[calc(100vh-140px)]"
            >
              {/* Subtle Regional Glows */}
              <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 blur-[120px] pointer-events-none opacity-50" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 blur-[120px] pointer-events-none opacity-50" />

              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/5 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tighter">Складской хаб: {hub.name}</h2>
                    <p className="text-slate-400 text-sm font-medium">Макрорегион: {hub.name === "Екатеринбург" ? "Урал" : "Центр/Регионы"} | Тип: {hub.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border",
                    hub.acceptanceCoeff === 1.0 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                      : "bg-accent-orange/10 text-accent-orange border-accent-orange/30"
                  )}>
                    Коэфф. приемки: x{hub.acceptanceCoeff.toFixed(1)} {hub.acceptanceCoeff === 1.0 && "(Бесплатно)"}
                  </div>
                  <div className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-black uppercase tracking-widest">
                    Загрузка: {hub.capacity}%
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white ml-4"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar relative z-10">
                
                {/* Financial & Economics KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <KPICard 
                    label="Замороженный капитал" 
                    value="1 240 000 ₽" 
                    subtext="В закупочных ценах"
                    icon={<Package className="w-4 h-4 text-slate-400" />}
                  />
                  <KPICard 
                    label="Счет за хранение" 
                    value="8 450 ₽ / мес" 
                    subtext="Тариф: 0.06 ₽ (шт/сут)"
                    variant="warning"
                    icon={<ShieldAlert className="w-4 h-4 text-orange-400" />}
                  />
                  <KPICard 
                    label="Индекс локализации (Регион)" 
                    value={`${hub.demandCoverage + 10}%`} 
                    subtext="Цель: >60% для скидки"
                    variant="danger"
                    icon={<TrendingUp className="w-4 h-4 text-rose-400" />}
                  />
                  <KPICard 
                    label="Доля в общих заказах" 
                    value={`${hub.demandCoverage}%`} 
                    subtext="Спрос этого региона"
                    variant="info"
                    icon={<Flame className="w-4 h-4 text-blue-400" />}
                  />
                </div>

                {/* AI Supply Chain Banner */}
                <div className="relative group overflow-hidden rounded-[2rem]">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 to-slate-900/40" />
                  <div className="relative border border-emerald-500/30 p-8 flex flex-col md:flex-row gap-8 items-center justify-between">
                    <div className="flex gap-6 items-start">
                      <div className="p-4 bg-emerald-500/20 rounded-2xl text-emerald-400 shrink-0">
                        <Sparkles className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-emerald-400 font-black text-[10px] mb-2 uppercase tracking-[0.2em]">WBAi Supply Chain Optimization</h4>
                        <p className="text-slate-200 text-lg leading-snug font-medium max-w-3xl">
                          <span className="text-emerald-400 font-bold">AI Логист:</span> Острый дисбаланс локализации. {hub.name === "Екатеринбург" ? "Урал" : "Регион"} генерирует {hub.demandCoverage}% продаж, но здесь лежит лишь 4% ваших остатков. Транзит из Москвы съедает маржу из-за штрафного КТР. Коэффициент приемки сейчас <span className="text-emerald-400 font-black underline">х1.0</span>. Рекомендуется срочно перераспределить <span className="text-white font-bold">800 единиц</span> дефицитных SKU на этот склад.
                        </p>
                      </div>
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl px-8 py-8 h-auto font-black text-sm uppercase tracking-widest shadow-2xl shadow-emerald-900/40 shrink-0 border border-emerald-400/20 group-hover:scale-105 transition-transform">
                      Создать поставку ({hub.name.slice(0, 3).toUpperCase()})
                    </Button>
                  </div>
                </div>

                {/* Imbalance Radar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: Deficiency */}
                  <div className="bg-dark-900/40 border border-red-500/20 rounded-3xl p-6 relative group overflow-hidden">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-red-500/20 rounded-lg text-red-500">
                        <Flame className="w-4 h-4" />
                      </div>
                      <h3 className="font-black text-white text-sm uppercase tracking-widest">🔥 Риск OOS (Дефицит)</h3>
                    </div>
                    <div className="space-y-3">
                      {deficitProducts.map((p, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-red-500/20 transition-all">
                          <div>
                            <p className="text-sm font-bold text-white">{p.name}</p>
                            <p className="text-[10px] text-red-400 font-bold uppercase mt-1">Остаток: {p.stock} шт / {p.speed}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xl font-black text-red-500">{p.daysLeft} дн.</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Right Column: Overstock */}
                  <div className="bg-dark-900/40 border border-purple-500/20 rounded-3xl p-6 relative group overflow-hidden">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-purple-500/20 rounded-lg text-purple-500">
                        <Snowflake className="w-4 h-4" />
                      </div>
                      <h3 className="font-black text-white text-sm uppercase tracking-widest">🧊 Заморозка (Неликвид)</h3>
                    </div>
                    <div className="space-y-3">
                      {overstockProducts.map((p, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-purple-500/20 transition-all">
                          <div>
                            <p className="text-sm font-bold text-white">{p.name}</p>
                            <p className="text-[10px] text-purple-400 font-bold uppercase mt-1">Остаток: {p.stock} шт / {p.speed}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xl font-black text-purple-500">{p.daysLeft}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Regional SKU Management Table */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Управление ассортиментом хаба</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live: Екатеринбург</span>
                    </div>
                  </div>
                  
                  <div className="border border-white/10 rounded-[2rem] overflow-hidden bg-white/5 backdrop-blur-sm shadow-2xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.04]">
                          <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.15em]">Товар</th>
                          <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.15em]">Остаток ({hub.name.slice(0, 3)})</th>
                          <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.15em] text-center">Скорость в регионе</th>
                          <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.15em] text-center">Дней до 0</th>
                          <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.15em] text-center">Влияние на ИЛ</th>
                          <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.15em] text-right">Действие</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <SKURow 
                          name="Термос походный (2л)" 
                          stock="12 шт"
                          stockColor="text-rose-500"
                          speed="6 шт/дн"
                          zeroDay="2 дня"
                          zeroDayColor="text-rose-500"
                          impact="Критичное"
                          impactColor="text-rose-400"
                          btnLabel="Пополнить сток"
                          primaryBtn
                        />
                        <SKURow 
                          name="Рюкзак 40л Expedition" 
                          stock="150 шт"
                          speed="3 шт/дн"
                          zeroDay="50 дней"
                          impact="Норма"
                          btnLabel="Аналитика"
                        />
                        <SKURow 
                          name="Крем от загара (SPF 50)" 
                          stock="400 шт"
                          stockColor="text-purple-400"
                          speed="0 шт/дн"
                          zeroDay=">200 дней"
                          zeroDayColor="text-purple-400"
                          impact="Снижает"
                          impactColor="text-purple-400"
                          btnLabel="Локальная скидка"
                        />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Footer / Gradient Bottom */}
              <div className="h-12 absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-20" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function KPICard({ label, value, subtext, variant = "default", icon }: { label: string, value: string, subtext: string, variant?: string, icon: React.ReactNode }) {
  const getColors = () => {
    switch (variant) {
      case "warning": return "border-orange-500/20 group-hover:border-orange-500/40 text-orange-400";
      case "danger": return "border-rose-500/20 group-hover:border-rose-500/40 text-rose-400";
      case "info": return "border-blue-500/20 group-hover:border-blue-500/40 text-blue-400";
      default: return "border-white/5 group-hover:border-white/20 text-white";
    }
  };

  return (
    <div className={cn(
      "bg-white/5 border rounded-2xl p-6 transition-all hover:bg-white/[0.08] relative overflow-hidden group",
      getColors()
    )}>
      <div className="flex justify-between items-start mb-4">
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
        <div className="p-1.5 bg-white/5 rounded-lg border border-white/5">{icon}</div>
      </div>
      <h3 className={cn("text-2xl font-black tracking-tighter mb-1", getColors().split(' ')[2])}>
        {value}
      </h3>
      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{subtext}</p>
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white/[0.02] blur-xl rounded-full" />
    </div>
  );
}

function SKURow({ 
  name, 
  stock, 
  stockColor, 
  speed, 
  zeroDay, 
  zeroDayColor, 
  impact, 
  impactColor, 
  btnLabel, 
  primaryBtn 
}: {
  name: string;
  stock: string;
  stockColor?: string;
  speed: string;
  zeroDay: string;
  zeroDayColor?: string;
  impact: string;
  impactColor?: string;
  btnLabel: string;
  primaryBtn?: boolean;
}) {
  return (
    <tr className="group hover:bg-white/[0.03] transition-all">
      <td className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
             <div className="text-[10px] font-bold text-slate-500">ID</div>
          </div>
          <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{name}</span>
        </div>
      </td>
      <td className="p-6">
        <span className={cn("text-sm font-black", stockColor || "text-slate-300")}>{stock}</span>
      </td>
      <td className="p-6 text-sm text-center font-bold text-slate-400">{speed}</td>
      <td className="p-6 text-center">
        <span className={cn("text-sm font-black", zeroDayColor || "text-white")}>
          {zeroDay}
        </span>
      </td>
      <td className="p-6 text-center">
        <div className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
          impactColor ? "bg-white/5 border-white/10 " + impactColor : "bg-white/5 border-white/10 text-slate-400"
        )}>
          {impact}
        </div>
      </td>
      <td className="p-6 text-right">
        <button className={cn(
          "text-[10px] font-black uppercase tracking-[0.15em] px-5 py-3 rounded-xl border transition-all active:scale-95",
          primaryBtn 
            ? "bg-emerald-600 text-white border-emerald-400/30 hover:bg-emerald-700 shadow-lg shadow-emerald-900/20" 
            : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
        )}>
          {btnLabel}
        </button>
      </td>
    </tr>
  );
}

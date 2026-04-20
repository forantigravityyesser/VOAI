"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  Truck,
  PackageSearch
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

export type LogisticsScenarioType = "defect" | "lost" | "ideal";

interface LogisticsAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: LogisticsScenarioType;
}

interface TableRow {
  warehouse: string;
  shipped: string;
  conversion: number;
  defect: string;
  lost: string;
  defectColor: string;
  lostColor?: string;
}

interface ScenarioData {
  title: string;
  sku: string;
  category: string;
  badge: string;
  image: string;
  color: string;
  accentColor: string;
  bgColor: string;
  borderColor: string;
  kpis: { label: string; value: string; color: string }[];
  aiInsight: string;
  actionLabel: string;
  table: TableRow[];
}

const SCENARIO_DATA: Record<LogisticsScenarioType, ScenarioData> = {
  defect: {
    title: "Чайник электрич. (Black)",
    sku: "WB-10293",
    category: "Бытовая техника",
    badge: "Критический уровень брака: 15%",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=200&h=200&auto=format&fit=crop",
    color: "rose",
    accentColor: "text-rose-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    kpis: [
      { label: "Убыток от брака", value: "-45 000 ₽", color: "text-rose-500" },
      { label: "Затраты на логистику", value: "-12 500 ₽", color: "text-orange-400" },
      { label: "Потери / Обезличка", value: "1 200 ₽", color: "text-slate-300" },
    ],
    aiInsight: "Внимание: Зафиксирован резкий всплеск брака (15%) за последние 7 дней. Анализ отзывов показывает жалобы на \"разбитое стекло\" и \"вмятины\". Вероятно, нарушена технология упаковки последней партии (штрихкод поставки #88392). Рекомендую срочно приостановить отгрузки этого артикула, усилить упаковку (добавить пупырчатую пленку + гофрокартон 5-слойный) и оформить возврат поврежденных единиц со склада Электросталь, где зафиксировано 80% всего боя.",
    actionLabel: "Оформить возврат брака",
    table: [
      { warehouse: "Электросталь", shipped: "500 шт", conversion: 60, defect: "22%", lost: "1%", defectColor: "text-rose-500" },
      { warehouse: "Коледино", shipped: "300 шт", conversion: 72, defect: "4%", lost: "5%", defectColor: "text-emerald-500" },
      { warehouse: "Казань", shipped: "200 шт", conversion: 68, defect: "5%", lost: "0%", defectColor: "text-slate-300" },
    ]
  },
  lost: {
    title: "Крем для лица (Gold)",
    sku: "WB-99283",
    category: "Косметика",
    badge: "Аномалия штрихкодирования",
    image: "https://images.unsplash.com/photo-1620916566398-39f114387c9b?q=80&w=200&h=200&auto=format&fit=crop",
    color: "orange",
    accentColor: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    kpis: [
      { label: "Заморожено в обезличке", value: "18 400 ₽", color: "text-orange-400" },
      { label: "Убыток от логистики", value: "-3 200 ₽", color: "text-rose-400" },
      { label: "Объем (40 шт)", value: "В пути", color: "text-slate-300" },
    ],
    aiInsight: "Аномалия штрихкодирования. 5% поставленного товара попадает в статус \"Обезличка\" на транзитном складе Коледино. Основная причина для косметики — выцветание термоэтикетки или повреждение штрихкода при трении. Рекомендую перенастроить термопринтер на более высокую контрастность и перейти на этикетки ТОП (с защитным слоем).",
    actionLabel: "Создать тикет (Поиск товара)",
    table: [
      { warehouse: "Коледино", shipped: "800 шт", conversion: 78, defect: "2%", lost: "5%", defectColor: "text-emerald-500", lostColor: "text-orange-400" },
      { warehouse: "Электросталь", shipped: "400 шт", conversion: 82, defect: "1%", lost: "1%", defectColor: "text-emerald-500" },
      { warehouse: "Тула", shipped: "300 шт", conversion: 75, defect: "3%", lost: "2%", defectColor: "text-emerald-500" },
    ]
  },
  ideal: {
    title: "Шампунь органик",
    sku: "WB-55201",
    category: "Уход за волосами",
    badge: "Логистическая эффективность: 96%",
    image: "https://images.unsplash.com/photo-1585232351009-aa87416fca90?q=80&w=200&h=200&auto=format&fit=crop",
    color: "emerald",
    accentColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    kpis: [
      { label: "Убыток от брака", value: "~0 ₽", color: "text-emerald-500" },
      { label: "Эффективность", value: "96%", color: "text-emerald-400" },
      { label: "Выкуп", value: "90%", color: "text-slate-300" },
    ],
    aiInsight: "Логистическая воронка работает идеально. Уровень выкупа (90%) превышает средний по категории на 12%. Однако товар сосредоточен только на 2-х складах. Для получения дополнительной скидки на комиссию ВБ и ускорения доставки клиентам, рекомендую отгрузить партию 500 шт на склады в Казань и Екатеринбург (Индекс локализации вырастет до 85%).",
    actionLabel: "Создать план отгрузки",
    table: [
      { warehouse: "Подольск", shipped: "1200 шт", conversion: 92, defect: "0.5%", lost: "0.2%", defectColor: "text-emerald-500" },
      { warehouse: "Коледино", shipped: "900 шт", conversion: 88, defect: "1%", lost: "0.5%", defectColor: "text-emerald-500" },
      { warehouse: "Казань", shipped: "50 шт", conversion: 95, defect: "0%", lost: "0%", defectColor: "text-emerald-500" },
    ]
  }
};

export function LogisticsAnalysisModal({ isOpen, onClose, scenario }: LogisticsAnalysisModalProps) {
  const data = SCENARIO_DATA[scenario];

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
              className="bg-slate-950 border border-white/10 rounded-[2.5rem] shadow-2xl w-full max-w-5xl overflow-hidden pointer-events-auto relative flex flex-col max-h-[calc(100vh-140px)]"
            >
              {/* Dynamic Theme Glows */}
              <div className={cn(
                "absolute top-0 inset-x-0 h-96 blur-[120px] pointer-events-none opacity-20",
                scenario === "defect" ? "bg-rose-500" : scenario === "lost" ? "bg-orange-500" : "bg-emerald-500"
              )} />

              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/5 relative z-10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-white/10 overflow-hidden shrink-0 relative shadow-inner">
                    <Image src={data.image} alt={data.title} width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-black text-white tracking-tight">{data.title}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-slate-400 text-xs font-mono">SKU: {data.sku}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-600" />
                      <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">{data.category}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={cn("px-4 py-1.5 rounded-xl border font-bold text-[11px] uppercase tracking-wider", 
                    data.color === "rose" ? "bg-rose-500/10 text-rose-400 border-rose-500/30" : 
                    data.color === "orange" ? "bg-orange-500/10 text-orange-400 border-orange-500/30" :
                    "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  )}>
                    {data.badge}
                  </Badge>
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
                   {data.kpis.map((kpi, idx) => (
                     <div key={idx} className="bg-white/[0.03] border border-white/5 hover:border-white/10 rounded-2xl p-5 transition-all group relative overflow-hidden backdrop-blur-sm">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] blur-2xl rounded-full translate-x-12 -translate-y-12" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] mb-3 block">{kpi.label}</span>
                        <div className={cn("text-2xl font-black tracking-tight", kpi.color)}>
                          {kpi.value}
                        </div>
                     </div>
                   ))}
                </div>

                {/* AI Actionable Insight Banner */}
                <div className="relative group overflow-hidden">
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-r rounded-3xl",
                    data.color === "rose" ? "from-rose-900/40 to-slate-900/20 border border-rose-500/30 shadow-[0_0_50px_rgba(225,29,72,0.1)]" : 
                    data.color === "orange" ? "from-orange-900/40 to-slate-900/20 border border-orange-500/30 shadow-[0_0_50px_rgba(249,115,22,0.1)]" :
                    "from-emerald-900/40 to-slate-900/20 border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.1)]"
                  )} />
                  <div className="relative p-6 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="flex gap-5 items-start">
                      <div className={cn(
                        "p-3 rounded-2xl shrink-0 shadow-lg",
                        data.color === "rose" ? "bg-rose-500/20 text-rose-400" : 
                        data.color === "orange" ? "bg-orange-500/20 text-orange-400" :
                        "bg-emerald-500/20 text-emerald-400"
                      )}>
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <h4 className={cn("font-black text-xs uppercase tracking-widest", 
                            data.color === "rose" ? "text-rose-400" : 
                            data.color === "orange" ? "text-orange-400" :
                            "text-emerald-400"
                          )}>AI Диагностика</h4>
                          <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-white/5 text-slate-400 border border-white/10 uppercase tracking-tighter">Hermes Engine</span>
                        </div>
                        <p className="text-[13px] text-slate-200 leading-relaxed max-w-2xl font-medium italic">
                          {data.aiInsight}
                        </p>
                      </div>
                    </div>
                    <Button 
                      className={cn(
                        "rounded-xl px-8 py-7 h-auto font-black uppercase tracking-widest text-[11px] shrink-0 transition-all shadow-xl active:scale-95",
                        data.color === "rose" ? "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-900/40" : 
                        data.color === "orange" ? "bg-orange-600 hover:bg-orange-700 text-white shadow-orange-900/40" :
                        "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/40"
                      )}
                    >
                      {data.actionLabel}
                    </Button>
                  </div>
                </div>

                {/* Warehouse Breakdown Table */}
                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <Truck className="w-5 h-5 text-slate-400" />
                       <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">География проблем (Склады)</h3>
                     </div>
                     <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Анализ в реальном времени</span>
                   </div>

                   <div className="border border-white/5 rounded-3xl overflow-hidden bg-white/[0.02] shadow-2xl">
                     <table className="w-full text-left border-collapse">
                       <thead>
                         <tr className="border-b border-white/5 bg-white/[0.01]">
                           <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Склад</th>
                           <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Отгружено</th>
                           <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] text-center">Выкуп (%)</th>
                           <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] text-center">Брак (%)</th>
                           <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] text-right">Обезличка</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5">
                         {data.table.map((row, i) => (
                           <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                              <td className="p-6">
                                <div className="flex items-center gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-accent-purple transition-colors" />
                                  <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{row.warehouse}</span>
                                </div>
                              </td>
                              <td className="p-6 text-sm font-mono text-slate-400">{row.shipped}</td>
                              <td className="p-6 text-center">
                                <span className={cn(
                                  "text-sm font-black",
                                  row.conversion > 80 ? "text-emerald-500" : row.conversion > 60 ? "text-orange-400" : "text-rose-500"
                                )}>
                                  {row.conversion}%
                                </span>
                              </td>
                              <td className="p-6 text-center">
                                <span className={cn("text-sm font-black", row.defectColor || "text-slate-300")}>{row.defect}</span>
                              </td>
                              <td className="p-6 text-right">
                                <span className={cn("text-xs font-bold", row.lostColor || "text-slate-500")}>{row.lost}</span>
                              </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                </div>
              </div>

              {/* Action Footer Progress Bar */}
              <div className="p-1 px-8 relative z-20">
                <div className="w-full h-[1px] bg-white/5" />
              </div>
              
              <div className="p-8 pt-4 flex items-center justify-between relative z-10">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-xl text-slate-500">
                       <PackageSearch className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Детализированный отчет за Апрель 2026</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={onClose} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 rounded-xl">
                      Закрыть
                    </Button>
                    <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest px-6">
                      Экспорт в PDF
                    </Button>
                 </div>
              </div>

              {/* Gradient Bottom Effect overlay */}
              <div className="h-12 absolute bottom-24 inset-x-0 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-15" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

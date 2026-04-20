"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, TrendingUp, MapPin, ExternalLink, Calendar, Package, DollarSign, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

interface SkuDrilldownModalProps {
  isOpen: boolean;
  onClose: () => void;
  skuData?: {
    id: string;
    name: string;
    category: string;
    status: string;
    quadrant: 'deficit' | 'leader' | 'stable' | 'slow';
  };
}

export function SkuDrilldownModal({ isOpen, onClose, skuData }: SkuDrilldownModalProps) {
  // Mock data if skuData is not provided
  const data = skuData || {
    id: "9948123",
    name: "Смартфон X200 Titanium",
    category: "Электроника",
    status: "Критический дефицит",
    quadrant: 'deficit'
  };

  const isDeficit = data.quadrant === 'deficit';

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
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xl z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-start justify-center pointer-events-none z-[101] p-4 pt-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="bg-slate-950 border border-white/10 rounded-[2.5rem] shadow-2xl w-full max-w-4xl overflow-hidden pointer-events-auto relative flex flex-col max-h-[80vh]"
            >
              {/* Subtle Accents */}
              <div className={cn(
                "absolute -top-24 -left-24 w-96 h-96 blur-[120px] rounded-full pointer-events-none opacity-20",
                isDeficit ? "bg-rose-500" : "bg-emerald-500"
              )} />

              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/5 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
                    <Image 
                      src={`https://picsum.photos/seed/${data.id}/100/100`} 
                      alt={data.name} 
                      width={64}
                      height={64}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h2 className="text-xl font-bold text-white tracking-tight">{data.name}</h2>
                      <a href="#" className="text-slate-500 hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <p className="text-slate-400 text-xs">Артикул: <span className="font-mono">{data.id}</span> | Категория: {data.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={isDeficit ? "destructive" : "success"} className="px-4 py-1.5 rounded-full text-xs">
                    {data.status}
                  </Badge>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-500 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar relative z-10">
                
                {/* KPI Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard 
                    label="Текущий остаток" 
                    value="450 шт" 
                    subtext="+ 10 шт в пути"
                    icon={<Package className="w-3.5 h-3.5 text-slate-500" />}
                  />
                  <MetricCard 
                    label="Скорость продаж" 
                    value="25.2 шт/дн" 
                    subtext="Тренд: +12% 🟢"
                    variant="success"
                    icon={<TrendingUp className="w-3.5 h-3.5 text-emerald-400" />}
                  />
                  <MetricCard 
                    label="Риск обнуления" 
                    value="18 дней" 
                    subtext="Закончится 28 Апр."
                    variant="danger"
                    icon={<Calendar className="w-3.5 h-3.5 text-rose-400" />}
                  />
                  <MetricCard 
                    label="Упущенная выгода" 
                    value="~ 125 000 ₽" 
                    subtext="При простое 5 дней"
                    icon={<DollarSign className="w-3.5 h-3.5 text-slate-500" />}
                  />
                </div>

                {/* AI Dynamic Recommendation Banner */}
                <div className="relative group overflow-hidden">
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-r rounded-2xl border transition-colors",
                    isDeficit 
                      ? "from-rose-500/10 to-transparent border-rose-500/20" 
                      : "from-emerald-500/10 to-transparent border-emerald-500/20"
                  )} />
                  <div className="relative p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex gap-4 items-start">
                      <div className={cn(
                        "p-3 rounded-xl shrink-0 animate-pulse",
                        isDeficit ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-400"
                      )}>
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className={cn(
                          "font-bold text-xs uppercase tracking-widest",
                          isDeficit ? "text-rose-400" : "text-emerald-400"
                        )}>
                          AI Совет от Hermes
                        </h4>
                        <p className="text-slate-200 text-sm leading-relaxed max-w-xl">
                          {isDeficit 
                            ? "Спрос превышает складские запасы. Чтобы карточка не выпала из ТОПа, рекомендуется поднять розничную цену на 8% (замедлит выбытие) и создать план поставки на 1000 шт."
                            : "Товар стабилен, но индекс локализации в Спб ниже нормы. Рекомендуется перераспределить часть стока из Казани для снижения логистических затрат."
                          }
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant={isDeficit ? "danger" : "success"}
                      className="h-12 px-8 rounded-xl font-bold shadow-lg shrink-0 w-full md:w-auto"
                    >
                      {isDeficit ? "Изменить цену" : "Оптимизировать"}
                    </Button>
                  </div>
                </div>

                {/* Stock Burn-down Section */}
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                     <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                       <LineChart className="w-4 h-4 text-accent-purple" />
                       Прогноз истощения стока
                     </h3>
                     <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-[9px] text-slate-400 font-bold">Факт</span>
                        </div>
                        <div className="flex items-center gap-1.5 ml-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-600 border border-dashed border-white" />
                          <span className="text-[9px] text-slate-400 font-bold">Прогноз</span>
                        </div>
                     </div>
                   </div>
                   
                   <div className="h-48 w-full bg-dark-900/50 rounded-3xl border border-white/5 overflow-hidden relative p-8">
                      {/* Grid Lines */}
                      <div className="absolute inset-x-8 inset-y-10 flex justify-between pointer-events-none">
                         {[0, 1, 2, 3].map(i => (
                           <div key={i} className="h-full w-[1px] bg-white/[0.03]" />
                         ))}
                      </div>

                      {/* SVG Chart */}
                      <div className="relative w-full h-full">
                        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                          <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={isDeficit ? "#f43f5e" : "#10b981"} stopOpacity="0.2" />
                              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                            </linearGradient>
                          </defs>

                          {/* Area under the line */}
                          <path 
                            d="M 0 10 Q 25 35 50 65 T 80 100 L 0 100 Z" 
                            fill="url(#chartGradient)"
                            className="opacity-50"
                          />

                          {/* The Line */}
                          <motion.path 
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            d="M 0 10 Q 25 35 50 65 T 80 100" 
                            fill="none" 
                            stroke={isDeficit ? "#fb7185" : "#34d399"} 
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            filter="drop-shadow(0 0 8px rgba(244,63,94,0.3))"
                          />

                          {/* Critical Point */}
                          <g>
                            <circle cx="80" cy="100" r="4" fill="#f43f5e" fillOpacity="0.3" />
                            <circle cx="80" cy="100" r="2" fill="#f43f5e" />
                          </g>
                        </svg>

                        {/* Labels for Chart */}
                        <div className="absolute -bottom-6 inset-x-0 flex justify-between text-[8px] font-black text-slate-500 uppercase tracking-widest px-2">
                           <span>Сегодня</span>
                           <span className="ml-4">+10д</span>
                           <span className="ml-4">+20д</span>
                           <div className="flex flex-col items-center">
                              <span className="text-rose-500 font-black">28 Апр</span>
                              <span className="text-[7px] text-rose-500/50">Out of Stock</span>
                           </div>
                        </div>

                        {/* Inventory Value Label */}
                        <div className="absolute top-0 left-0 -translate-y-2 translate-x-2 bg-slate-800/80 backdrop-blur px-2 py-1 rounded-lg border border-white/5 shadow-xl">
                           <span className="text-[10px] font-black text-white">450 шт</span>
                        </div>
                      </div>
                   </div>
                </div>

                {/* Warehouse Table */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <MapPin className="w-4 h-4 text-emerald-400" />
                       География остатков
                    </h3>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden shadow-inner">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider">Склад</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Остаток</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Продаж/дн</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Хватит на</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-right">Статус</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <WarehouseRow 
                          name="Коледино (Москва)" 
                          stock="50 шт"
                          speed="15 шт/дн"
                          days="3 дня"
                          status="Экстренно"
                          variant="destructive"
                        />
                        <WarehouseRow 
                          name="Казань" 
                          stock="350 шт"
                          speed="8.2 шт/дн"
                          days="43 дня"
                          status="Норма"
                          variant="success"
                        />
                        <WarehouseRow 
                          name="Шушары (СПБ)" 
                          stock="50 шт"
                          speed="2.2 шт/дн"
                          days="22 дня"
                          status="Внимание"
                          variant="warning"
                        />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Bottom Spacer */}
              <div className="h-10 bg-gradient-to-t from-slate-950 to-transparent absolute bottom-0 inset-x-0 pointer-events-none z-20" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function MetricCard({ label, value, subtext, variant = "default", icon }: {
  label: string;
  value: string;
  subtext: string;
  variant?: "default" | "success" | "danger";
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/[0.08] transition-all relative overflow-hidden group">
      <div className="flex justify-between items-start mb-3">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
        {icon}
      </div>
      <div>
        <h3 className={cn(
          "text-xl font-bold tracking-tight mb-1",
          variant === 'success' ? "text-emerald-400" : variant === 'danger' ? "text-rose-400" : "text-white"
        )}>
          {value}
        </h3>
        <p className="text-[10px] text-slate-400 font-medium">{subtext}</p>
      </div>
    </div>
  );
}

function WarehouseRow({ name, stock, speed, days, status, variant }: {
  name: string;
  stock: string;
  speed: string;
  days: string;
  status: string;
  variant: "default" | "destructive" | "warning" | "success";
}) {
  return (
    <tr className="group hover:bg-white/[0.03] transition-colors">
      <td className="p-4">
        <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{name}</span>
      </td>
      <td className="p-4 text-sm font-bold text-slate-300 text-center">{stock}</td>
      <td className="p-4 text-sm text-slate-400 text-center font-mono">{speed}</td>
      <td className="p-4 text-center">
        <span className={cn(
          "text-sm font-black",
          variant === 'destructive' ? "text-rose-500" : variant === 'warning' ? "text-orange-400" : "text-emerald-400"
        )}>
          {days}
        </span>
      </td>
      <td className="p-4 text-right">
        <Badge variant={variant === 'destructive' ? 'destructive' : variant === 'warning' ? 'warning' : 'success'} className="text-[9px]">
          {status}
        </Badge>
      </td>
    </tr>
  );
}

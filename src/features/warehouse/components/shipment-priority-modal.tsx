"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  AlertTriangle, 
  TrendingDown, 
  FileText,
  Clock,
  CheckCircle2,
  Package,
  Layers,
  ChevronRight,
  QrCode
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

interface ShipmentPriorityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShipmentPriorityModal({ isOpen, onClose }: ShipmentPriorityModalProps) {
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
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[140]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-start justify-center pointer-events-none z-[141] p-4 pt-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-950 border border-white/10 rounded-[2.5rem] shadow-2xl w-full max-w-5xl overflow-hidden pointer-events-auto relative flex flex-col max-h-[calc(100vh-140px)]"
            >
              {/* Emergency Glow Overlay */}
              <div className="absolute top-0 inset-x-0 h-64 bg-rose-500/5 blur-[120px] pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/5 relative z-10">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold text-white tracking-tight leading-none mb-2">Детализация: Маршрутный лист и План отгрузок</h2>
                  <p className="text-slate-400 text-sm font-medium tracking-tight">Контроль подготовки поставок FBO и предотвращение Out-of-Stock</p>
                </div>
                
                <div className="flex items-center gap-4">
                   <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-xl h-11 font-black uppercase tracking-widest text-[10px] gap-2 px-6">
                      <FileText className="w-4 h-4 text-slate-400" />
                      Скачать лист сборки (XLSX)
                   </Button>
                   <button
                     onClick={onClose}
                     className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"
                   >
                     <X className="w-6 h-6" />
                   </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar relative z-10 text-white">
                
                {/* Operational KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                   <OpCard 
                     icon={<Layers className="w-4 h-4" />}
                     title="Всего в плане"
                     value="124 SKU"
                     subtext="14 200 единиц товара"
                   />
                   <OpCard 
                     icon={<AlertTriangle className="w-4 h-4 text-rose-500" />}
                     title="Экстренная отгрузка"
                     value="15 SKU"
                     subtext="Дедлайн: 18 апреля"
                     highlight="rose"
                   />
                   <OpCard 
                     icon={<TrendingDown className="w-4 h-4 text-orange-400" />}
                     title="Угроза выручке"
                     value="~ 850 000 ₽"
                     subtext="Риск обнуления хитов"
                     highlight="orange"
                   />
                   <OpCard 
                     icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                     title="Готово к отправке"
                     value="34 SKU"
                     subtext="Ожидают штрихкодов"
                   />
                </div>

                {/* AI Dispatcher Banner */}
                <div className="relative group overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-r from-rose-900/40 to-slate-900/20 rounded-3xl" />
                   <div className="relative border border-rose-500/30 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex gap-5 items-start max-w-2xl">
                         <div className="p-3 bg-rose-500/20 rounded-2xl text-rose-400 shrink-0 shadow-lg pulse-rose">
                            <Sparkles className="w-6 h-6" />
                         </div>
                         <div>
                            <div className="flex items-center gap-2 mb-2">
                               <h4 className="text-rose-400 font-black text-[10px] uppercase tracking-[0.25em]">AI Логист</h4>
                               <Badge className="bg-white/5 text-rose-400 border-rose-500/30 px-2 py-0 h-4 text-[8px] font-black tracking-widest uppercase">Koledino Overload</Badge>
                            </div>
                            <p className="text-slate-200 leading-relaxed text-sm font-medium italic">
                               «15 артикулов находятся в критической зоне (закончатся 19 апреля). Склад Коледино перегружен (коэфф. х2.5). Для экономии 45 000 ₽ на платной приемке, система рекомендует перенаправить экстренную поставку на транзитный склад Тула (коэфф. х1.0).»
                            </p>
                         </div>
                      </div>
                      <Button className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl h-12 px-8 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-rose-900/20 shrink-0">
                         Создать транзитную поставку
                      </Button>
                   </div>
                </div>

                {/* Deadline Pipeline Visual */}
                <div className="space-y-6">
                   <h3 className="text-sm font-black text-white uppercase tracking-[0.15em] flex items-center gap-3">
                      <Clock className="w-4 h-4 text-orange-400" />
                      Распределение плана по срочности
                   </h3>
                   
                   <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                      <div className="space-y-6">
                         <div className="flex h-4 w-full rounded-full overflow-hidden shadow-inner bg-slate-900">
                            <div className="h-full bg-rose-500" style={{ width: '12%' }} />
                            <div className="h-full bg-orange-500" style={{ width: '34%' }} />
                            <div className="h-full bg-emerald-500" style={{ width: '54%' }} />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <DeadlineItem label="Экстренно (до 18 апр)" count="15 SKU" color="bg-rose-500" />
                            <DeadlineItem label="Ближайшая неделя" count="42 SKU" color="bg-orange-500" />
                            <DeadlineItem label="Плановое пополнение" count="67 SKU" color="bg-emerald-500" />
                         </div>
                      </div>
                   </div>
                </div>

                {/* Interactive Shipment Table */}
                <div className="space-y-6">
                   <h3 className="text-sm font-black text-white uppercase tracking-[0.15em] flex items-center gap-3">
                      <Package className="w-4 h-4 text-accent-orange" />
                      Ведомость отгрузки (Shipment Check-list)
                   </h3>
                   <div className="border border-white/5 rounded-3xl overflow-hidden bg-white/[0.01] shadow-2xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/5 bg-white/[0.02]">
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Товар</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">План (шт)</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Назначение</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Дедлайн</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Статус</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Действие</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          <ShipmentRow 
                            name="Футболка базовая (White)"
                            sku="WB-33881"
                            qty="500 шт"
                            wh="Тула"
                            deadline="18 апреля"
                            status="Горит"
                            urgent
                          />
                          <ShipmentRow 
                            name="Джинсы Wide Leg"
                            sku="WB-44552"
                            qty="350 шт"
                            wh="Казань"
                            deadline="18 апреля"
                            status="На сборке"
                            urgent
                          />
                          <ShipmentRow 
                            name="Крем увлажняющий"
                            sku="WB-11223"
                            qty="1200 шт"
                            wh="Екатеринбург"
                            deadline="25 апреля"
                            status="В очереди"
                          />
                        </tbody>
                      </table>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 opacity-50">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Уровень риска Out-of-Stock: Высокий</span>
                   </div>
                   <div className="text-[10px] font-bold uppercase tracking-widest">Операционные данные обновлены: 2 мин назад</div>
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

function OpCard({ icon, title, value, subtext, highlight }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtext: string;
  highlight?: "rose" | "orange";
}) {
  return (
    <div className={cn(
      "bg-white/5 border border-slate-800 rounded-2xl p-6 transition-all hover:bg-white/[0.08] group relative overflow-hidden",
      highlight === "rose" && "border-rose-500/20 bg-rose-500/[0.02]",
      highlight === "orange" && "border-orange-500/20 bg-orange-500/[0.02]"
    )}>
       <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-slate-800 rounded-xl text-slate-400 group-hover:text-white transition-colors shadow-inner">
             {icon}
          </div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{title}</span>
       </div>
       <div className={cn(
         "text-2xl font-black mb-1 tracking-tight",
         highlight === "rose" ? "text-rose-500" : highlight === "orange" ? "text-orange-500" : "text-white"
       )}>
          {value}
       </div>
       <p className="text-[10px] text-slate-500 font-bold uppercase leading-none tracking-tight">{subtext}</p>
    </div>
  );
}

function DeadlineItem({ label, count, color }: {
  label: string;
  count: string;
  color: string;
}) {
  return (
    <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col gap-1">
       <div className="flex items-center gap-2">
          <div className={cn("w-1.5 h-1.5 rounded-full", color)} />
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
       </div>
       <span className="text-sm font-black text-white">{count}</span>
    </div>
  );
}

function ShipmentRow({ name, sku, qty, wh, deadline, status, urgent }: {
  name: string;
  sku: string;
  qty: string;
  wh: string;
  deadline: string;
  status: string;
  urgent?: boolean;
}) {
  return (
    <tr className={cn("group hover:bg-white/[0.01] transition-colors relative", urgent && "bg-rose-500/[0.01]")}>
       <td className="p-6">
          <div className="flex flex-col">
             <span className={cn("text-sm font-bold transition-colors group-hover:text-white", urgent ? "text-rose-400" : "text-slate-200")}>{name}</span>
             <span className="text-[10px] text-slate-500 font-mono">{sku}</span>
          </div>
       </td>
       <td className="p-6 text-center">
          <span className="text-sm font-black text-white">{qty}</span>
       </td>
       <td className="p-6 text-center text-xs font-bold text-slate-400">{wh}</td>
       <td className={cn("p-6 text-center text-xs font-black", urgent ? "text-rose-400" : "text-slate-400")}>
          {deadline}
       </td>
       <td className="p-6 text-center">
          <Badge className={cn(
            "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 border",
            status === "Горит" ? "bg-rose-500/10 text-rose-500 border-rose-500/20" : 
            status === "На сборке" ? "bg-orange-500/10 text-orange-500 border-orange-500/20" : 
            "bg-slate-500/10 text-slate-500 border-white/5"
          )}>
             {status}
          </Badge>
       </td>
       <td className="p-6 text-right">
          {status === "Горит" ? (
             <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white rounded-lg h-8 text-[10px] font-black uppercase tracking-widest gap-2">
                <QrCode className="w-3.5 h-3.5" />
                ШК Коробов
             </Button>
          ) : (
             <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 gap-2">
                {status === "На сборке" ? "Детали" : "Начать сборку"}
                <ChevronRight className="w-3 h-3" />
             </Button>
          )}
       </td>
    </tr>
  );
}

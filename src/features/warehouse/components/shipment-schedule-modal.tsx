"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  Calendar, 
  Box, 
  Truck, 
  Clock, 
  ShieldCheck, 
  Download, 
  Plus,
  QrCode,
  UserCheck,
  CheckCircle2,
  Timer
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

interface ShipmentScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShipmentScheduleModal({ isOpen, onClose }: ShipmentScheduleModalProps) {
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
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[150]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-start justify-center pointer-events-none z-[151] p-4 pt-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-950 border border-white/10 rounded-[2.5rem] shadow-2xl w-full max-w-5xl overflow-hidden pointer-events-auto relative flex flex-col max-h-[calc(100vh-140px)]"
            >
              {/* Amber Glow Accent */}
              <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 blur-[120px] pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/5 relative z-10">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold text-white tracking-tight leading-none mb-2">Диспетчерская поставок (FBO)</h2>
                  <p className="text-slate-400 text-sm font-medium tracking-tight">Управление тайм-слотами, лимитами и статусами приемки</p>
                </div>
                
                <div className="flex items-center gap-4">
                   <Button className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl h-11 px-6 font-black uppercase tracking-widest text-[10px] gap-2 shadow-lg shadow-amber-900/20 active:scale-95 transition-all">
                      <Plus className="w-4 h-4" />
                      Создать поставку
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
                
                {/* Logistics KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                   <LogCard 
                     icon={<Calendar className="w-4 h-4 text-amber-400" />}
                     title="Ближайший тайм-слот"
                     value="16 Апреля"
                     subtext="14:00 - 15:00 (Коледино)"
                     accent="amber"
                   />
                   <LogCard 
                     icon={<Box className="w-4 h-4 text-slate-400" />}
                     title="Объем в подготовке"
                     value="2 450 шт"
                     subtext="14 коробов / 2 паллеты"
                   />
                   <LogCard 
                     icon={<ShieldCheck className="w-4 h-4 text-slate-400" />}
                     title="Прогноз стоимости приемки"
                     value="~ 12 500 ₽"
                     subtext="Средний коэфф. x1.2"
                   />
                </div>

                {/* AI Dispatch Banner */}
                <div className="relative group overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 to-slate-900/20 rounded-3xl" />
                   <div className="relative border border-amber-500/30 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex gap-5 items-start max-w-2xl">
                         <div className="p-3 bg-amber-500/20 rounded-2xl text-amber-400 shrink-0 shadow-lg">
                            <Sparkles className="w-6 h-6" />
                         </div>
                         <div>
                            <div className="flex items-center gap-2 mb-2">
                               <h4 className="text-amber-400 font-black text-[10px] uppercase tracking-[0.25em]">AI Контроль</h4>
                               <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-[8px] font-black tracking-widest uppercase">Barcodes Missing</Badge>
                            </div>
                            <p className="text-slate-200 leading-relaxed text-sm font-medium italic">
                               «Для поставки на 16 апреля отсутствуют ШК (штрихкоды) для 3 коробов. Груз не будет принят. На 18 апреля в Электростали открыты бесплатные лимиты (х1.0). Рекомендую забронировать слот сейчас.»
                            </p>
                         </div>
                      </div>
                      <Button variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-500/10 rounded-xl h-12 px-8 font-black uppercase tracking-widest text-[10px] shrink-0">
                         Сгенерировать ШК
                      </Button>
                   </div>
                </div>

                {/* Active Shipment Timeline */}
                <div className="space-y-6">
                   <h3 className="text-sm font-black text-white uppercase tracking-[0.15em] flex items-center gap-3">
                      <Truck className="w-4 h-4 text-emerald-400" />
                      Статус поставки #WB-88392 (16 Апреля)
                   </h3>
                   
                   <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10">
                      <div className="flex items-center justify-between relative">
                         {/* Connector Lines */}
                         <div className="absolute top-[1.125rem] left-[10%] right-[10%] h-[2px] bg-white/5 -z-0">
                            <div className="h-full bg-emerald-500" style={{ width: '66%' }} />
                         </div>

                         <TimelineStep status="completed" label="Планирование" icon={<Calendar className="w-4 h-4" />} />
                         <TimelineStep status="completed" label="Упаковка" icon={<Box className="w-4 h-4" />} />
                         <TimelineStep status="active" label="Ожидает отгрузки" timer="22:14:00" icon={<Timer className="w-4 h-4" />} />
                         <TimelineStep status="pending" label="Приемка на складе" icon={<WarehouseIcon className="w-4 h-4" />} />
                      </div>
                   </div>
                </div>

                {/* Schedule Table */}
                <div className="space-y-6">
                   <h3 className="text-sm font-black text-white uppercase tracking-[0.15em] flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      Календарь активных поставок (Timeline)
                   </h3>
                   <div className="border border-white/5 rounded-3xl overflow-hidden bg-white/[0.01] shadow-2xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/5 bg-white/[0.02]">
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">ID Поставки</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Склад</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Дата и Время</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Объем (шт)</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Коэфф.</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Статус</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Действие</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          <Row 
                            id="WB-88392"
                            wh="Коледино"
                            date="16 Апр. 14:00"
                            qty="1200 шт"
                            coeff="x1.5"
                            status="Горето к отправке"
                            statusType="success"
                            action="Пропуск авто"
                            icon={<UserCheck className="w-3.5 h-3.5" />}
                          />
                          <Row 
                            id="WB-88405"
                            wh="Электросталь"
                            date="18 Апр. 10:00"
                            qty="800 шт"
                            coeff="x1.0"
                            coeffColor="text-emerald-400 font-black"
                            status="Сборка"
                            statusType="warning"
                            action="ШК Коробов"
                            icon={<QrCode className="w-3.5 h-3.5" />}
                          />
                          <Row 
                            id="WB-88112"
                            wh="Казань"
                            date="12 Апр."
                            qty="450 шт"
                            coeff="x2.0"
                            status="Принято (Акт)"
                            statusType="neutral"
                            action="Скачать Акт"
                            icon={<Download className="w-3.5 h-3.5" />}
                          />
                        </tbody>
                      </table>
                   </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 opacity-50">
                   <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Тайм-слоты синхронизированы с API WB 2025</span>
                   </div>
                   <div className="text-[10px] font-bold uppercase tracking-widest leading-none">Обновление: Сегодня, 18:55</div>
                </div>
              </div>
              
              <div className="h-12 absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none z-20" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function LogCard({ icon, title, value, subtext, accent }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtext: string;
  accent?: string;
}) {
  return (
    <div className="bg-white/5 border border-slate-800 rounded-2xl p-6 transition-all hover:bg-white/[0.08] group relative overflow-hidden">
       <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-slate-800 rounded-xl transition-colors group-hover:bg-slate-700">
             {icon}
          </div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{title}</span>
       </div>
       <div className={cn("text-xl font-black mb-1 tracking-tight", accent === "amber" ? "text-amber-400" : "text-white")}>
          {value}
       </div>
       <p className="text-[10px] text-slate-500 font-bold uppercase leading-none">{subtext}</p>
    </div>
  );
}

function TimelineStep({ status, label, icon, timer }: {
  status: "completed" | "active" | "pending";
  label: string;
  icon: React.ReactNode;
  timer?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 relative z-10 group">
       <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg",
          status === "completed" ? "bg-emerald-500 text-white" : 
          status === "active" ? "bg-amber-500 text-slate-900 scale-125 shadow-amber-500/30" : 
          "bg-slate-800 text-slate-500"
       )}>
          {status === "completed" ? <CheckCircle2 className="w-5 h-5" /> : icon}
       </div>
       <div className="flex flex-col items-center">
          <span className={cn(
             "text-[10px] font-black uppercase tracking-widest mb-1 transition-colors",
             status === "active" ? "text-amber-400" : "text-slate-500 group-hover:text-slate-300"
          )}>
             {label}
          </span>
          {timer && (
             <span className="text-[9px] font-mono text-amber-500/80 font-bold tabular-nums">
                {timer}
             </span>
          )}
       </div>
    </div>
  );
}

function Row({ id, wh, date, qty, coeff, coeffColor, status, statusType, action, icon }: {
  id: string;
  wh: string;
  date: string;
  qty: string;
  coeff: string;
  coeffColor?: string;
  status: string;
  statusType: "success" | "warning" | "neutral";
  action: string;
  icon: React.ReactNode;
}) {
  return (
    <tr className="group hover:bg-white/[0.01] transition-colors">
       <td className="p-6">
          <span className="text-sm font-black text-slate-200 group-hover:text-white transition-colors">{id}</span>
       </td>
       <td className="p-6">
          <div className="flex flex-col">
             <span className="text-xs font-bold text-slate-300">{wh}</span>
             <span className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Склад FBO</span>
          </div>
       </td>
       <td className="p-6 text-center text-xs font-bold text-slate-200">{date}</td>
       <td className="p-6 text-center text-xs font-black text-white">{qty}</td>
       <td className={cn("p-6 text-center text-xs font-bold text-slate-400", coeffColor)}>{coeff}</td>
       <td className="p-6 text-center">
          <Badge className={cn(
             "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 border",
             statusType === "success" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
             statusType === "warning" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : 
             "bg-slate-500/10 text-slate-500 border-white/5"
          )}>
             {status}
          </Badge>
       </td>
       <td className="p-6 text-right">
          <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 gap-2 transition-all">
             {icon}
             {action}
          </Button>
       </td>
    </tr>
  );
}

function WarehouseIcon({ className }: { className?: string }) {
   return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
         <path d="M3 21h18" /><path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1" /><path d="M9 21V9" /><path d="M15 21V9" />
      </svg>
   );
}

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Flame, Skull, TrendingDown, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

interface LiquidationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LiquidationCenterModal({ isOpen, onClose }: LiquidationCenterModalProps) {
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
          <div className="fixed inset-0 flex items-start justify-center pointer-events-none z-[101] p-4 pt-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl w-full max-w-5xl overflow-hidden pointer-events-auto relative flex flex-col max-h-[calc(100vh-140px)]"
            >
              {/* Subtle Crimson Glow */}
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-500/5 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-rose-500/5 blur-[100px] rounded-full pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/5 relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Skull className="w-5 h-5 text-rose-500" />
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      Центр ликвидации: Мертвые товары 
                    </h2>
                  </div>
                  <p className="text-slate-400 text-sm">Объем зависшего капитала и расходы на хранение</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar relative z-10">
                
                {/* KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <KPICard 
                    label="Замороженный капитал" 
                    value="450 000 ₽" 
                    subtext="В закупке"
                    variant="default"
                  />
                  <KPICard 
                    label="Убыток на хранении" 
                    value="-18 500 ₽ / мес" 
                    subtext="Плата складам WB"
                    variant="danger"
                    icon={<Flame className="w-4 h-4 text-rose-500 animate-pulse" />}
                  />
                    <KPICard 
                      label="Товаров в коме" 
                      value="3 SKU" 
                      subtext="&gt; 10 дней без продаж"
                      variant="warning"
                      icon={<TrendingDown className="w-4 h-4 text-orange-400" />}
                    />
                </div>

                {/* AI Liquidation Banner */}
                <div className="relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-slate-900 border border-rose-500/30 rounded-xl" />
                  <div className="relative p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-rose-500/20 rounded-xl text-rose-400 shrink-0">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-rose-400 font-bold text-sm mb-1 uppercase tracking-widest flex items-center gap-2">
                          AI Диагностика Hermes
                        </h4>
                        <p className="text-slate-200 leading-relaxed text-sm">
                          Хранение &quot;Свечей зажигания&quot; обходится вам в <span className="text-rose-400 font-bold">6 500 ₽/мес</span>. Товар мертв уже 12 дней. Рекомендую немедленно применить скидку 40% для ликвидации партии и высвобождения капитала.
                        </p>
                      </div>
                    </div>
                    <Button 
                      className="bg-rose-500 hover:bg-rose-600 text-white border-none px-8 h-12 rounded-xl font-bold shadow-lg shadow-rose-500/20 shrink-0"
                    >
                      Запустить Ликвидацию
                    </Button>
                  </div>
                </div>

                {/* Aging Distribution */}
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                     <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Распределение по возрасту неликвида</h3>
                     <span className="text-[10px] text-slate-500 font-medium">Общее кол-во: 1 150 шт</span>
                   </div>
                   <div className="h-6 w-full bg-slate-900 rounded-full overflow-hidden flex p-1 border border-white/5 shadow-inner">
                      <div className="h-full bg-orange-500/80 w-[30%] rounded-l-full relative group flex items-center justify-center transition-all hover:brightness-110">
                        <span className="text-[9px] font-black text-white drop-shadow-sm">30%</span>
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-800 border border-white/10 rounded-lg text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                          10-20 дней (345 шт)
                        </div>
                      </div>
                      <div className="h-full bg-rose-600 w-[70%] rounded-r-full relative group border-l border-slate-900/50 flex items-center justify-center transition-all hover:brightness-110">
                        <span className="text-[9px] font-black text-white drop-shadow-sm">70%</span>
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-800 border border-white/10 rounded-lg text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                          &gt; 30 дней (805 шт)
                        </div>
                      </div>
                   </div>
                   <div className="flex gap-6 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-400" /> 
                        10-20 дней
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-rose-500" /> 
                        &gt; 30 дней
                      </div>
                   </div>
                </div>

                {/* Kill List Table */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                       <Trash2 className="w-4 h-4 text-rose-500" />
                       &quot;Расстрельный список&quot; товаров
                    </h3>
                    <Badge variant="outline" className="text-rose-400 border-rose-500/30">
                       Критический приоритет
                    </Badge>
                  </div>
                  <div className="border border-white/5 rounded-2xl overflow-hidden bg-white/5">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider">Товар</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Остаток</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Скорость</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Без продаж</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Убыток (мес)</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider">Диагноз</th>
                          <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-wider text-right">Действие</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <ProductRow 
                          name="Свечи зажигания NGK Platinum" 
                          img="https://placehold.co/100x100/1e293b/white?text=S"
                          stock="580 шт"
                          speed="0.2 шт/д"
                          daysCount="12 дней"
                          loss="-6 500 ₽"
                          diagnosis="Потеря SEO-позиций"
                          actionLabel="Ликвидация"
                          isCritical
                        />
                        <ProductRow 
                          name="Джинсы классика Slim Fit" 
                          img="https://placehold.co/100x100/1e293b/white?text=D"
                          stock="370 шт"
                          speed="1.8 шт/д"
                          daysCount="4 дня"
                          loss="-8 200 ₽"
                          diagnosis="Высокая цена"
                          actionLabel="Снизить цену"
                          actionIcon={<div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />}
                        />
                        <ProductRow 
                          name="Чайник электрический Polaris" 
                          img="https://placehold.co/100x100/1e293b/white?text=C"
                          stock="200 шт"
                          speed="0.8 шт/д"
                          daysCount="8 дней"
                          loss="-3 800 ₽"
                          diagnosis="Упал CTR"
                          actionLabel="Обновить фото"
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

function KPICard({ label, value, subtext, variant = "default", icon }: { label: string, value: string, subtext: string, variant?: 'default' | 'danger' | 'warning', icon?: React.ReactNode }) {
  const variantStyles = {
    default: "border-white/5",
    danger: "border-rose-500/20 space-y-1",
    warning: "border-orange-500/20 space-y-1"
  };

  return (
    <div className={cn(
      "bg-white/5 border rounded-2xl p-6 transition-all hover:bg-white/[0.08] relative overflow-hidden group",
      variantStyles[variant]
    )}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] blur-3xl rounded-full translate-x-12 -translate-y-12" />
      <div className="flex justify-between items-start mb-2">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className={cn(
          "text-2xl font-black tracking-tight",
          variant === 'danger' ? "text-rose-400" : variant === 'warning' ? "text-orange-400" : "text-white"
        )}>
          {value}
        </h3>
        <p className="text-[10px] text-slate-400 font-medium">{subtext}</p>
      </div>
    </div>
  );
}

function ProductRow({ name, img, stock, speed, daysCount, loss, diagnosis, actionLabel, actionIcon, isCritical }: { name: string, img: string, stock: string, speed: string, daysCount: string, loss: string, diagnosis: string, actionLabel: string, actionIcon?: React.ReactNode, isCritical?: boolean }) {
  return (
    <tr className="group hover:bg-white/[0.03] transition-colors">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-rose-500/30 transition-colors">
             <Image src={img} alt={name} width={40} height={40} className="w-full h-full object-cover" unoptimized />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{name}</span>
            <span className="text-[10px] text-slate-500">SKU: {name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)}</span>
          </div>
        </div>
      </td>
      <td className="p-4 text-sm font-bold text-slate-300 text-center">{stock}</td>
      <td className="p-4 text-sm font-medium text-slate-400 text-center">{speed}</td>
      <td className={cn(
        "p-4 text-sm font-bold text-center",
        isCritical ? "text-rose-400" : "text-slate-400"
      )}>{daysCount}</td>
      <td className={cn(
        "p-4 text-sm font-bold text-center",
        isCritical ? "text-rose-400" : "text-slate-300"
      )}>{loss}</td>
      <td className="p-4">
        <Badge variant="default" className={cn(
          "bg-white/5 text-[10px] font-bold border-none",
          isCritical ? "text-rose-400" : "text-slate-400"
        )}>
          {diagnosis}
        </Badge>
      </td>
      <td className="p-4 text-right">
        <Button 
          variant={isCritical ? "danger" : "outline"} 
          size="sm"
          className={cn(
            "rounded-lg text-[10px] font-bold h-8 px-4",
            !isCritical && "border-white/10 hover:border-white/20 bg-transparent text-slate-300"
          )}
        >
          {actionIcon && <span className="mr-2">{actionIcon}</span>}
          {actionLabel}
        </Button>
      </td>
    </tr>
  );
}

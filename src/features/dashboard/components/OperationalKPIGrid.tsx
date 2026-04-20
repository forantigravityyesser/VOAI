"use client";

import React, { useState } from "react";
import { 
  ArrowUpRight, 
  MapPin, 
  TrendingDown as TrendingDownIcon,
  Flame,
  Wallet,
  Activity
} from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/lib/utils";
import { GlobalLocalizationModal } from "@/features/warehouse/components/global-localization-modal";
import { OverstockModal } from "@/features/warehouse/components/overstock-modal";
import { LossPreventionModal } from "@/features/warehouse/components/loss-prevention-modal";
import { TurnoverModal } from "@/features/warehouse/components/turnover-modal";

interface KPICardProps {
  title: string;
  value: string;
  subtext: string;
  isPositive?: boolean;
  trend?: string;
  icon: React.ReactNode;
  accentColor: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

function KPICard({ title, value, subtext, trend, isPositive, icon, accentColor, onClick, children }: KPICardProps) {
  return (
    <Card 
      variant="glass" 
      className="group rounded-[2rem] border-white/5 hover:border-white/10 transition-all cursor-pointer relative overflow-hidden"
      onClick={onClick}
    >
      <CardContent className="p-6">
        {/* Door Trigger Icon */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:bg-white/10 transition-all">
          <ArrowUpRight className="w-4 h-4 text-white" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border shadow-inner", accentColor)}>
              {icon}
            </div>
            <h3 className="text-[10px] font-black text-dark-400 uppercase tracking-[0.2em]">{title}</h3>
          </div>

          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-black text-white tracking-tighter">{value}</span>
              {trend && (
                <span className={cn(
                  "text-[10px] font-black px-1.5 py-0.5 rounded-lg border flex items-center gap-0.5",
                  isPositive ? "text-accent-green bg-accent-green/10 border-accent-green/20" : "text-accent-red bg-accent-red/10 border-accent-red/20"
                )}>
                  {isPositive ? <ArrowUpRight className="w-2.5 h-2.5" /> : <TrendingDownIcon className="w-2.5 h-2.5" />}
                  {trend}
                </span>
              )}
            </div>
            <p className="text-[11px] text-dark-300 font-bold tracking-tight">{subtext}</p>
          </div>

          <div className="mt-2 min-h-[40px] flex items-center">
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function OperationalKPIGrid() {
  const [isGlobalLocalizationOpen, setIsGlobalLocalizationOpen] = useState(false);
  const [isTurnoverOpen, setIsTurnoverOpen] = useState(false);
  const [isOverstockOpen, setIsOverstockOpen] = useState(false);
  const [isLossPreventionOpen, setIsLossPreventionOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {/* Card 1: Financial Pulse */}
        <KPICard
          title="Финансовый пульс"
          value="48 200 ₽"
          subtext="Вчера: 24 заказа"
          trend="+12%"
          isPositive={true}
          icon={<Activity className="w-5 h-5 text-accent-green" />}
          accentColor="bg-accent-green/10 border-accent-green/20 shadow-accent-green/10"
        >
          <div className="w-full flex items-end gap-1 h-8">
            {[40, 65, 50, 75, 45, 90, 80].map((v, i) => (
              <div 
                key={i} 
                className="flex-1 bg-accent-green/20 rounded-sm relative transition-all"
                style={{ height: `${v}%` }}
              >
                {i === 6 && <div className="absolute inset-0 bg-accent-green rounded-sm animate-pulse" />}
              </div>
            ))}
          </div>
        </KPICard>

        {/* Card 2: Lost Revenue (OOS) */}
        <KPICard
          title="Упущенная выручка"
          value="142 500 ₽"
          subtext="Риск обнуления у 5 SKU"
          trend="+8%"
          isPositive={false}
          icon={<Flame className="w-5 h-5 text-accent-red" />}
          accentColor="bg-accent-red/10 border-accent-red/20 shadow-accent-red/10"
          onClick={() => setIsLossPreventionOpen(true)}
        >
          <div className="w-full h-2 bg-dark-700/50 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-accent-red to-accent-orange rounded-full shadow-[0_0_15px_rgba(255,71,87,0.4)]"
              style={{ width: '65%' }}
            />
          </div>
        </KPICard>

        <KPICard
          title="Индекс локализации"
          value="82%"
          subtext="Экономия: +15 000 ₽"
          trend="+5.4%"
          isPositive={true}
          icon={<MapPin className="w-5 h-5 text-accent-purple" />}
          accentColor="bg-accent-purple/10 border-accent-purple/20 shadow-accent-purple/10"
          onClick={() => setIsGlobalLocalizationOpen(true)}
        >
          <div className="flex flex-col gap-2.5 w-full">
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-black text-dark-400 uppercase w-7">Мск</span>
              <div className="flex-1 h-1 bg-dark-800/50 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-accent-green rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)]" style={{ width: '95%' }} />
              </div>
              <span className="text-[9px] font-bold text-accent-green w-6 text-right">95%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-black text-dark-400 uppercase w-7">Урал</span>
              <div className="flex-1 h-1 bg-dark-800/50 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-accent-orange rounded-full shadow-[0_0_8px_rgba(245,158,11,0.3)]" style={{ width: '40%' }} />
              </div>
              <span className="text-[9px] font-bold text-accent-orange w-6 text-right">40%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-black text-dark-400 uppercase w-7">Юг</span>
              <div className="flex-1 h-1 bg-dark-800/50 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-accent-red rounded-full shadow-[0_0_8px_rgba(239,68,68,0.3)]" style={{ width: '12%' }} />
              </div>
              <span className="text-[9px] font-bold text-accent-red w-6 text-right">12%</span>
            </div>
          </div>
        </KPICard>

        {/* Card 4: Frozen Capital */}
        <KPICard
          title="Замороженный капитал"
          value="340 000 ₽"
          subtext="Оборачиваемость: 24 дн."
          trend="-2 дн."
          isPositive={true} // Lower turnover is positive
          icon={<Wallet className="w-5 h-5 text-accent-blue" />}
          accentColor="bg-accent-blue/10 border-accent-blue/20 shadow-accent-blue/10"
          onClick={() => setIsOverstockOpen(true)}
        >
          <div className="w-full h-8 flex items-center justify-center">
            <svg viewBox="0 0 100 30" className="w-full h-full text-accent-blue overflow-visible">
               <path 
                 d="M0,10 Q25,5 50,15 T100,5" 
                 fill="none" 
                 stroke="currentColor" 
                 strokeWidth="3" 
                 strokeLinecap="round"
                 className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
               />
               <circle cx="100" cy="5" r="3" fill="currentColor" className="animate-ping" />
            </svg>
          </div>
        </KPICard>
      </div>

      {/* Modals */}
      <GlobalLocalizationModal isOpen={isGlobalLocalizationOpen} onClose={() => setIsGlobalLocalizationOpen(false)} />
      <TurnoverModal isOpen={isTurnoverOpen} onClose={() => setIsTurnoverOpen(false)} />
      <OverstockModal isOpen={isOverstockOpen} onClose={() => setIsOverstockOpen(false)} />
      <LossPreventionModal isOpen={isLossPreventionOpen} onClose={() => setIsLossPreventionOpen(false)} />
    </>
  );
}

"use client";

import { TrendingUp, TrendingDown, BarChart3, DollarSign, Percent, Wallet } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  subtitle?: string;
  icon: React.ReactNode;
  accentClass: string;
  barProgress?: number;
  large?: boolean;
}

function MetricCard({ title, value, trend, trendUp, subtitle, icon, accentClass, barProgress, large }: MetricCardProps) {
  return (
    <Card variant="glass" className={cn("rounded-3xl border-white/5", large ? 'col-span-2' : '')}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <span className="text-[10px] font-black text-dark-400 uppercase tracking-[0.2em]">
            {title}
          </span>
          <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center border shadow-inner", accentClass)}>
            {icon}
          </div>
        </div>

        <div className="flex items-end gap-3">
          <span className={cn("font-black tracking-tighter text-white", large ? 'text-4xl' : 'text-3xl')}>
            {value}
          </span>
          {trend && (
            <span className={cn(
              "flex items-center gap-1 text-[11px] font-black mb-1.5 uppercase tracking-wider px-2 py-0.5 rounded-lg border",
              trendUp ? "text-accent-green bg-accent-green/10 border-accent-green/20" : "text-accent-red bg-accent-red/10 border-accent-red/20"
            )}>
              {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trend}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="text-[11px] text-dark-400 mt-2 font-medium tracking-tight">{subtitle}</p>
        )}

        {barProgress !== undefined && (
          <div className="mt-5 h-1.5 bg-dark-700/50 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-blue shadow-[0_0_10px_rgba(168,85,247,0.3)]"
              style={{ width: `${barProgress}%` }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function MetricsGrid() {
  return (
    <div className="grid grid-cols-3 gap-5 mb-8">
      <MetricCard
        title="Общая прибыль"
        value="$217,113.07"
        trend="~+20.1%"
        trendUp={true}
        icon={<DollarSign className="w-5 h-5 text-accent-purple" />}
        accentClass="bg-accent-purple/10 border-accent-purple/20 shadow-accent-purple/10"
        barProgress={72}
        large={true}
      />
      <MetricCard
        title="ROI"
        value="1824.8%"
        trend="↑ 12.4%"
        trendUp={true}
        icon={<BarChart3 className="w-5 h-5 text-accent-green" />}
        accentClass="bg-accent-green/10 border-accent-green/20 shadow-accent-green/10"
      />
      <MetricCard
        title="Revenue"
        value="$45,231.89"
        icon={<Wallet className="w-5 h-5 text-accent-blue" />}
        accentClass="bg-accent-blue/10 border-accent-blue/20 shadow-accent-blue/10"
        barProgress={55}
      />
      <MetricCard
        title="Expenses"
        value="$2,350.00"
        subtitle="Стабильный тренд"
        icon={<DollarSign className="w-5 h-5 text-accent-orange" />}
        accentClass="bg-accent-orange/10 border-accent-orange/20 shadow-accent-orange/10"
      />
      <MetricCard
        title="Margin"
        value="94.8%"
        trend="~-2.1%"
        trendUp={false}
        icon={<Percent className="w-5 h-5 text-accent-cyan" />}
        accentClass="bg-accent-cyan/10 border-accent-cyan/20 shadow-accent-cyan/10"
      />
    </div>
  );
}

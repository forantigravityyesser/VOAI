"use client";

import { TrendingUp, TrendingDown, BarChart3, DollarSign, Percent, Wallet } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  subtitle?: string;
  icon: React.ReactNode;
  accentColor: string;
  barProgress?: number;
  large?: boolean;
}

function MetricCard({ title, value, trend, trendUp, subtitle, icon, accentColor, barProgress, large }: MetricCardProps) {
  return (
    <div className={`glass-card glass-card-hover rounded-2xl p-5 ${large ? 'col-span-2' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-dark-200 uppercase tracking-wider">
          {title}
        </span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${accentColor}`}>
          {icon}
        </div>
      </div>

      <div className="flex items-end gap-3">
        <span className={`font-bold tracking-tight text-white ${large ? 'text-3xl' : 'text-2xl'}`}>
          {value}
        </span>
        {trend && (
          <span className={`flex items-center gap-1 text-xs font-semibold mb-1 ${trendUp ? 'text-accent-green' : 'text-accent-red'}`}>
            {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-[11px] text-dark-300 mt-1">{subtitle}</p>
      )}

      {barProgress !== undefined && (
        <div className="mt-3 h-1.5 bg-dark-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full animate-progress"
            style={{
              width: `${barProgress}%`,
              background: `linear-gradient(90deg, #6c5ce7 0%, #4f9cf7 100%)`,
              // @ts-expect-error CSS custom property for animation
              '--progress-width': `${barProgress}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function MetricsGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <MetricCard
        title="Общая прибыль"
        value="$217,113.07"
        trend="~+20.1%"
        trendUp={true}
        icon={<DollarSign className="w-4 h-4 text-accent-purple-light" />}
        accentColor="bg-accent-purple/15"
        barProgress={72}
        large={true}
      />
      <MetricCard
        title="ROI"
        value="1824.8%"
        trend="↑ 12.4% vs last week"
        trendUp={true}
        icon={<BarChart3 className="w-4 h-4 text-accent-green" />}
        accentColor="bg-accent-green/15"
      />
      <MetricCard
        title="Revenue"
        value="$45,231.89"
        icon={<Wallet className="w-4 h-4 text-accent-blue" />}
        accentColor="bg-accent-blue/15"
        barProgress={55}
      />
      <MetricCard
        title="Expenses"
        value="$2,350.00"
        subtitle="Stable trend"
        icon={<DollarSign className="w-4 h-4 text-accent-orange" />}
        accentColor="bg-accent-orange/15"
      />
      <MetricCard
        title="Margin"
        value="94.8%"
        trend="~-2.1% decreased"
        trendUp={false}
        icon={<Percent className="w-4 h-4 text-accent-cyan" />}
        accentColor="bg-accent-cyan/15"
      />
    </div>
  );
}

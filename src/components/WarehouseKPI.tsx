"use client";

import { RefreshCw, Download } from "lucide-react";

interface KPIItem {
  label: string;
  value: string;
  color: string;
  dotColor: string;
}

const kpiItems: KPIItem[] = [
  { label: "Overbought", value: "30%", color: "text-accent-purple-light", dotColor: "bg-accent-purple" },
  { label: "Fast Moving", value: "35%", color: "text-accent-green", dotColor: "bg-accent-green" },
  { label: "Slow Moving", value: "20%", color: "text-accent-orange", dotColor: "bg-accent-orange" },
];

export default function WarehouseKPI() {
  return (
    <div className="glass-card rounded-2xl p-5 mt-4">
      <h3 className="text-sm font-bold text-white mb-4">KPI склада</h3>

      {/* Turnover */}
      <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-dark-700/40">
        <div className="w-9 h-9 rounded-lg bg-accent-blue/15 flex items-center justify-center">
          <RefreshCw className="w-4 h-4 text-accent-blue" />
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-dark-300 uppercase tracking-wider font-medium">Turnover</p>
          <p className="text-lg font-bold text-white">21 days</p>
        </div>
        <span className="text-xs font-semibold text-accent-green px-2 py-1 rounded-lg bg-accent-green/10">
          Optimal
        </span>
      </div>

      {/* Risk Level */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-dark-200 font-medium">Risk Level</span>
          <span className="text-xs font-bold text-accent-red">35%</span>
        </div>
        <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full animate-progress"
            style={{
              width: '35%',
              background: 'linear-gradient(90deg, #ff4757 0%, #ff6b81 100%)',
              // @ts-expect-error CSS custom property for animation
              '--progress-width': '35%',
            }}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-card-border my-3"></div>

      {/* KPI Items */}
      <div className="space-y-3">
        {kpiItems.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.dotColor}`}></div>
              <span className="text-xs text-dark-200">{item.label}</span>
            </div>
            <span className="text-xs font-bold text-white">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Download Button */}
      <button className="w-full mt-4 py-2.5 rounded-xl bg-dark-700/60 border border-card-border text-xs font-semibold text-dark-100
        hover:bg-dark-600 hover:border-accent-purple/30 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer">
        <Download className="w-3.5 h-3.5" />
        Download Inventory Report
      </button>
    </div>
  );
}

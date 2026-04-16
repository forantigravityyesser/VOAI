"use client";

import { AlertTriangle, TrendingUp, Tag, MoreHorizontal } from "lucide-react";

interface Insight {
  id: number;
  severity: "HIGH" | "MEDIUM" | "LOW";
  title: string;
  description: string;
  timeAgo: string;
}

const insights: Insight[] = [
  {
    id: 1,
    severity: "HIGH",
    title: "Risk of stockout: iPhone 15 Pro Max",
    description: "Inventory will be depleted in 3 days based on current velocity.",
    timeAgo: "2 hours ago",
  },
  {
    id: 2,
    severity: "MEDIUM",
    title: "New Trend Detected",
    description: 'Organic search for "Eco Cases" rose by 45% in your region.',
    timeAgo: "5 hours ago",
  },
  {
    id: 3,
    severity: "MEDIUM",
    title: "Supplier Discount Available",
    description: "Global-Tech offers ~15% for bulk orders this month.",
    timeAgo: "Yesterday",
  },
];

const severityConfig = {
  HIGH: {
    color: "bg-accent-red",
    textColor: "text-accent-red",
    icon: <AlertTriangle className="w-3 h-3" />,
  },
  MEDIUM: {
    color: "bg-accent-purple",
    textColor: "text-accent-purple-light",
    icon: <TrendingUp className="w-3 h-3" />,
  },
  LOW: {
    color: "bg-accent-green",
    textColor: "text-accent-green",
    icon: <Tag className="w-3 h-3" />,
  },
};

export default function InsightsPanel() {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">Главные инсайды</h3>
        <button className="w-7 h-7 rounded-lg hover:bg-dark-700 flex items-center justify-center transition-colors cursor-pointer">
          <MoreHorizontal className="w-4 h-4 text-dark-300" />
        </button>
      </div>

      <div className="space-y-3">
        {insights.map((insight, idx) => {
          const config = severityConfig[insight.severity];
          return (
            <div
              key={insight.id}
              className="group p-3 rounded-xl hover:bg-dark-700/40 transition-all cursor-pointer animate-fade-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${config.color} text-white`}>
                  {insight.severity}
                </span>
                <span className="text-[10px] text-dark-400">{insight.timeAgo}</span>
              </div>
              <h4 className="text-xs font-semibold text-white mb-1 group-hover:text-accent-purple-light transition-colors">
                {insight.title}
              </h4>
              <p className="text-[11px] text-dark-300 leading-relaxed">
                {insight.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { AlertTriangle, TrendingUp, Tag, ChevronRight, Zap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/lib/utils";

interface Notification {
  id: number;
  severity: "HIGH" | "MEDIUM" | "LOW";
  title: string;
  description: string;
  timeAgo: string;
  type: "risk" | "trend" | "offer";
}

const notifications: Notification[] = [
  {
    id: 1,
    severity: "HIGH",
    title: "Риск дефицита: iPhone 15 Pro Max",
    description: "Запасы будут исчерпаны через 3 дня. Нажмите, чтобы рассчитать план транзита.",
    timeAgo: "2 часа назад",
    type: "risk",
  },
  {
    id: 2,
    severity: "MEDIUM",
    title: "Обнаружен новый тренд",
    description: 'Органический поиск по запросу "Эко-чехлы" вырос на 45% в вашем регионе.',
    timeAgo: "5 часов назад",
    type: "trend",
  },
  {
    id: 3,
    severity: "MEDIUM",
    title: "Доступна скидка от поставщика",
    description: "Global-Tech предлагает ~15% на оптовые заказы до конца недели.",
    timeAgo: "Вчера",
    type: "offer",
  },
];

const severityConfig = {
  HIGH: "text-accent-red bg-accent-red/10 border-accent-red/20",
  MEDIUM: "text-accent-purple bg-accent-purple/10 border-accent-purple/20",
  LOW: "text-accent-green bg-accent-green/10 border-accent-green/20",
};

const iconMap = {
  risk: AlertTriangle,
  trend: TrendingUp,
  offer: Tag,
};

export default function ActionCenter() {
  return (
    <Card variant="glass" className="h-full flex flex-col rounded-[2rem] border-white/5 overflow-hidden">
      <CardHeader className="px-6 py-5 border-b border-white/5 flex flex-row items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-accent-purple/20 flex items-center justify-center border border-accent-purple/30">
            <Zap className="w-4 h-4 text-accent-purple" />
          </div>
          <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Action Center</h3>
        </div>
        <Badge variant="outline" className="px-2 py-0.5 bg-dark-800 text-[10px] text-dark-400">
          {notifications.length}
        </Badge>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-y-auto custom-scrollbar">
        <div className="divide-y divide-white/5">
          {notifications.map((item) => {
            const Icon = iconMap[item.type];
            return (
              <div 
                key={item.id} 
                className="p-5 hover:bg-white/[0.02] transition-colors cursor-pointer group relative"
              >
                <div className="flex gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl border flex items-center justify-center shrink-0",
                    severityConfig[item.severity]
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-dark-500 font-bold uppercase tracking-wider">{item.timeAgo}</span>
                      <ChevronRight className="w-3 h-3 text-dark-600 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                    </div>
                    <h4 className="text-[13px] font-bold text-white mb-1 leading-tight group-hover:text-accent-purple transition-colors truncate">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-dark-400 leading-relaxed line-clamp-2 font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>

      <div className="p-4 border-t border-white/5 bg-dark-900/40 shrink-0">
        <button className="w-full py-2.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">
          View All History
        </button>
      </div>
    </Card>
  );
}

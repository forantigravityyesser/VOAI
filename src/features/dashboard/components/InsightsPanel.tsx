"use client";

import { MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";

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
    title: "Риск дефицита: iPhone 15 Pro Max",
    description: "Запасы будут исчерпаны через 3 дня при текущей скорости продаж.",
    timeAgo: "2 часа назад",
  },
  {
    id: 2,
    severity: "MEDIUM",
    title: "Обнаружен новый тренд",
    description: 'Органический поиск по запросу "Эко-чехлы" вырос на 45% в вашем регионе.',
    timeAgo: "5 часов назад",
  },
  {
    id: 3,
    severity: "MEDIUM",
    title: "Доступна скидка от поставщика",
    description: "Global-Tech предлагает ~15% на оптовые заказы в этом месяце.",
    timeAgo: "Вчера",
  },
];

const severityConfig = {
  HIGH: "bg-accent-red/20 text-accent-red border-accent-red/30",
  MEDIUM: "bg-accent-purple/20 text-accent-purple border-accent-purple/30",
  LOW: "bg-accent-green/20 text-accent-green border-accent-green/30",
};

export default function InsightsPanel() {
  return (
    <Card variant="glass" className="mb-6 rounded-3xl border-white/5">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-black text-white uppercase tracking-widest">Главные инсайды</h3>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-xl hover:bg-dark-800">
            <MoreHorizontal className="w-4 h-4 text-dark-500" />
          </Button>
        </div>

        <div className="space-y-6">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="group cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className={cn("px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-lg", severityConfig[insight.severity])}>
                  {insight.severity}
                </Badge>
                <span className="text-[10px] text-dark-500 font-bold uppercase tracking-wider">{insight.timeAgo}</span>
              </div>
              <h4 className="text-[13px] font-bold text-white mb-2 leading-snug group-hover:text-accent-purple transition-colors tracking-tight">
                {insight.title}
              </h4>
              <p className="text-[11px] text-dark-400 leading-relaxed font-medium">
                {insight.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

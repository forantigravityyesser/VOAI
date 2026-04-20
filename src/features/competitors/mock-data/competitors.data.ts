import { Globe, BarChart3, TrendingUp } from "lucide-react";

export const competitorMetrics = [
  { label: "Ваша доля рынка", val: "4.2%", icon: Globe, color: "text-accent-blue" },
  { label: "Средняя цена в нише", val: "3,450 ₽", icon: BarChart3, color: "text-accent-purple" },
  { label: "Тренд ниши", val: "+12% Рост", icon: TrendingUp, color: "text-accent-green" },
];

export const competitorsList = [
  { name: "GlobalSports Store", sales: "12.4M ₽", items: 450, trend: "+5%" },
  { name: "TrendWalk WB", sales: "8.1M ₽", items: 120, trend: "-2%" },
  { name: "Nike Official Reseller", sales: "7.2M ₽", items: 25, trend: "+18%" },
  { name: "UrbanStep Moscow", sales: "4.5M ₽", items: 89, trend: "+1%" },
];

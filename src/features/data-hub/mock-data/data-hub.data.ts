import { Wallet, Package, Target } from "lucide-react";

export const dataCategories = [
  {
    id: "finance",
    title: "Финансы",
    desc: "Доходы, расходы и прибыль",
    icon: Wallet,
    color: "bg-accent-purple/20",
    iconColor: "text-accent-purple",
    borderColor: "hover:border-accent-purple/50",
    path: "/data/finance"
  },
  {
    id: "warehouse",
    title: "Мой склад",
    desc: "Товары и инвентарь",
    icon: Package,
    color: "bg-accent-blue/20",
    iconColor: "text-accent-blue",
    borderColor: "hover:border-accent-blue/50",
    path: "/data/warehouse"
  },
  {
    id: "competitors",
    title: "Аналитика конкурентов",
    desc: "Цены, тренды и доли рынка",
    icon: Target,
    color: "bg-pink-500/20",
    iconColor: "text-pink-500",
    borderColor: "hover:border-pink-500/50",
    path: "/data/competitors"
  }
];

export const dataInsights = [
  {
    id: 1,
    type: "warning",
    category: "Финансы",
    status: "Внимание",
    content: "Некоторые товары имеют себестоимость выше продажи. Исправив этот компонент, ваш доход может вырасти на <span class=\"text-orange-500 font-bold\">8%</span>."
  },
  {
    id: 2,
    type: "success",
    category: "Тренды",
    status: "Рекомендация",
    content: "Ваши прямые конкуренты увеличили бюджет на рекламу кроссовок. <span class=\"text-white font-medium\">Ниша прогрета</span>, стоит рассмотреть агрессивный вход."
  }
];

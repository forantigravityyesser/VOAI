"use client";

import { 
  Wallet, 
  Package, 
  Target, 
  ChevronDown, 
  TrendingUp, 
  Triangle, 
  Lightbulb, 
  AlertCircle,
  FileText,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function MyDataPage() {
  const categories = [
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

  return (
    <main className="w-full min-h-full bg-dark-900 overflow-y-auto custom-scrollbar">
      {/* Page Header */}
      <div className="px-8 pt-6">
        <h1 className="text-2xl font-bold text-white mb-8">Мои данные</h1>

        {/* Top Category Selectors - Now as Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={cat.path}
              className={`group relative bg-dark-800/40 border border-card-border p-6 rounded-2xl text-left ${cat.borderColor} transition-all cursor-pointer overflow-hidden block`}
            >
              <div className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <cat.icon className={`w-6 h-6 ${cat.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{cat.title}</h3>
              <p className="text-sm text-dark-300">{cat.desc}</p>
              
              {/* Hover highlight line */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent-purple to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                <ArrowRight className={`w-4 h-4 ${cat.iconColor}`} />
              </div>
            </Link>
          ))}
        </div>

        {/* Filter Section */}
        <div className="flex justify-end mb-8">
          <button className="flex items-center gap-2 bg-dark-800 border border-card-border px-4 py-2 rounded-xl text-sm text-white hover:bg-dark-700 transition-colors">
            Неделя
            <ChevronDown className="w-4 h-4 text-dark-400" />
          </button>
        </div>

        {/* Main Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 px-10">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-accent-green/10 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,184,148,0.1)]">
              <TrendingUp className="w-8 h-8 text-accent-green" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">+12.5%</h2>
            <p className="text-xs text-dark-300 uppercase tracking-widest font-medium">Рост/падение прибыли</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-accent-blue/10 rounded-2xl flex items-center justify-center mb-4 rotate-45 group hover:rotate-0 transition-transform">
              <Triangle className="w-8 h-8 text-accent-blue -rotate-45" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">23%</h2>
            <p className="text-xs text-dark-300 uppercase tracking-widest font-medium">Доля товаров без движения</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-pink-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">1,247</h2>
            <p className="text-xs text-dark-300 uppercase tracking-widest font-medium">Активность конкурентов</p>
          </div>
        </div>

        {/* Insights Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent-purple/20 rounded-lg">
              <Lightbulb className="w-5 h-5 text-accent-purple" />
            </div>
            <h2 className="text-xl font-bold text-white">Инсайты и рекомендации</h2>
          </div>

          <div className="space-y-4">
            {/* Warning Alert */}
            <div className="group flex items-start gap-4 bg-orange-500/5 border border-orange-500/20 p-5 rounded-2xl hover:bg-orange-500/10 transition-all border-l-4 border-l-orange-500 relative overflow-hidden">
              <div className="mt-1 p-1 bg-orange-500/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-orange-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Финансы</span>
                  <span className="w-1 h-1 bg-dark-500 rounded-full" />
                  <span className="text-[10px] text-dark-400">Внимание</span>
                </div>
                <p className="text-sm text-dark-100 leading-relaxed">
                  Некоторые товары имеют себестоимость выше продажи. Исправив этот компонент, ваш доход может вырасти на <span className="text-orange-500 font-bold">8%</span>.
                </p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-dark-400 hover:text-white">
                <FileText className="w-4 h-4" />
              </button>
            </div>

            {/* Success Alert */}
            <div className="group flex items-start gap-4 bg-accent-green/5 border border-accent-green/20 p-5 rounded-2xl hover:bg-accent-green/10 transition-all border-l-4 border-l-accent-green relative overflow-hidden">
              <div className="mt-1 p-1 bg-accent-green/20 rounded-lg">
                <Lightbulb className="w-4 h-4 text-accent-green" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-accent-green uppercase tracking-widest">Тренды</span>
                  <span className="w-1 h-1 bg-dark-500 rounded-full" />
                  <span className="text-[10px] text-dark-400">Рекомендация</span>
                </div>
                <p className="text-sm text-dark-100 leading-relaxed">
                  Ваши прямые конкуренты увеличили бюджет на рекламу кроссовок. <span className="text-white font-medium">Ниша прогрета</span>, стоит рассмотреть агрессивный вход.
                </p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-dark-400 hover:text-white">
                <TrendingUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

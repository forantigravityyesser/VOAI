"use client";

import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

export default function TopBottomPerformers() {

  const topItems = [
    { name: "Шампунь органик", id: "WB-29384", profit: "124,500 ₽", margin: "42%", metric: "100" },
    { name: "Сыворотка для лица", id: "WB-88123", profit: "98,200 ₽", margin: "45%", metric: "80" },
    { name: "Коврик для йоги", id: "WB-10294", profit: "85,400 ₽", margin: "38%", metric: "68" },
    { name: "Набор масок", id: "WB-55392", profit: "62,100 ₽", margin: "35%", metric: "45" },
    { name: "Масло для кутикулы", id: "WB-77291", profit: "41,000 ₽", margin: "58%", metric: "30" },
  ];

  const bottomItems = [
    { name: "Пуховик оверсайз", id: "WB-99231", profit: "-45,200 ₽", margin: "-12%", metric: "100" },
    { name: "Чайник электрический", id: "WB-44120", profit: "-28,500 ₽", margin: "-8%", metric: "70" },
    { name: "Сковорода чугунная", id: "WB-11928", profit: "-15,400 ₽", margin: "-5%", metric: "40" },
    { name: "Набор гантелей", id: "WB-33921", profit: "-8,200 ₽", margin: "-2%", metric: "25" },
    { name: "Корзина для белья", id: "WB-66382", profit: "-3,100 ₽", margin: "-1%", metric: "10" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Top Performers */}
      <div className="glass-card p-8 rounded-[2.5rem] border border-card-border overflow-hidden relative group">
         <div className="absolute top-0 right-0 w-32 h-32 bg-accent-green/10 blur-[50px] pointer-events-none rounded-full -mr-10 -mt-10"></div>
         
         <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-accent-green/20 border border-accent-green/30 text-accent-green">
               <TrendingUp className="w-5 h-5" />
            </div>
            <div>
               <h3 className="text-xl font-black text-white tracking-tight">Лидеры маржи</h3>
               <p className="text-[10px] text-dark-400 font-extrabold uppercase tracking-widest">Топ-5 по чистой прибыли</p>
            </div>
         </div>

         <div className="space-y-4">
            {topItems.map((item, i) => (
               <div key={i} className="flex flex-col gap-2 p-3 hover:bg-white/5 rounded-2xl transition-colors cursor-pointer group/item">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-dark-500 w-4">{i + 1}</span>
                        <div>
                           <p className="text-sm font-bold text-white group-hover/item:text-accent-green transition-colors">{item.name}</p>
                           <p className="text-[10px] text-dark-500 font-mono">{item.id}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-black text-accent-green">{item.profit}</p>
                        <p className="text-[10px] text-dark-400 font-bold uppercase">Маржа: {item.margin}</p>
                     </div>
                  </div>
                  {/* Visual Bar */}
                  <div className="w-full h-1.5 bg-dark-700 rounded-full overflow-hidden">
                     <div className="h-full bg-accent-green shadow-[0_0_10px_rgba(0,214,143,0.5)] rounded-full" style={{ width: `${item.metric}%` }}></div>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Bottom Performers */}
      <div className="glass-card p-8 rounded-[2.5rem] border border-card-border overflow-hidden relative group">
         <div className="absolute top-0 right-0 w-32 h-32 bg-accent-red/10 blur-[50px] pointer-events-none rounded-full -mr-10 -mt-10"></div>
         
         <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-accent-red/20 border border-accent-red/30 text-accent-red">
               <TrendingDown className="w-5 h-5" />
            </div>
            <div>
               <h3 className="text-xl font-black text-white tracking-tight">Аутсайдеры (Слив)</h3>
               <p className="text-[10px] text-dark-400 font-extrabold uppercase tracking-widest">Топ-5 по убыткам</p>
            </div>
         </div>

         <div className="space-y-4">
            {bottomItems.map((item, i) => (
               <div key={i} className="flex flex-col gap-2 p-3 hover:bg-white/5 rounded-2xl transition-colors cursor-pointer group/item">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-dark-500 w-4">{i + 1}</span>
                        <div>
                           <p className="text-sm font-bold text-white group-hover/item:text-accent-red transition-colors">{item.name}</p>
                           <p className="text-[10px] text-dark-500 font-mono">{item.id}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-black text-accent-red">{item.profit}</p>
                        <p className="text-[10px] text-dark-400 font-bold uppercase">Маржа: {item.margin}</p>
                     </div>
                  </div>
                  {/* Visual Bar */}
                  <div className="w-full h-1.5 bg-dark-700 rounded-full overflow-hidden flex justify-end">
                     <div className="h-full bg-accent-red shadow-[0_0_10px_rgba(255,71,87,0.5)] rounded-full" style={{ width: `${item.metric}%` }}></div>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}

"use strict";

import { Sparkles, ArrowRight, TrendingUp, AlertTriangle } from "lucide-react";

export default function AIFinanceInsights() {
  const insights = [
    {
      id: 1,
      type: "critical",
      title: "Ценовые аномалии",
      desc: "Себестоимость товара «Чайник электрический» плюс новая комиссия WB (23%) превышают розничную цену. Вы торгуете в минус.",
      action: "Поднять цену на 15%",
      color: "accent-red"
    },
    {
      id: 2,
      type: "warning",
      title: "Логистические потери",
      desc: "Индекс локализации по бренду упал до 40%. Вы переплачиваете за логистику в 2 раза. Чистая прибыль за неделю снизилась на 12%.",
      action: "Распределить поставку",
      color: "accent-orange"
    },
    {
      id: 3,
      type: "success",
      title: "Потенциал роста",
      desc: "Товар «Шампунь органик» имеет маржинальность 42% и высокий CVR. Увеличение ДРР на 2% может дать прирост чистой прибыли до 40,000 ₽.",
      action: "Настроить АРК",
      color: "accent-green"
    }
  ];

  return (
    <div className="glass-card p-8 rounded-[2.5rem] border border-card-border overflow-hidden relative flex flex-col h-full">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-accent-purple/5 blur-[60px] pointer-events-none rounded-full -mr-20 -mt-20"></div>

      <div className="flex items-center justify-between mb-8 relative z-10">
         <div>
            <div className="flex items-center gap-3 mb-1">
               <Sparkles className="w-5 h-5 text-accent-purple" />
               <h3 className="text-xl font-black text-white tracking-tight">AI-Аудит</h3>
            </div>
            <p className="text-[10px] text-dark-400 font-extrabold uppercase tracking-widest">Инсайты упущенной прибыли</p>
         </div>
         <button className="text-[10px] font-black uppercase text-accent-purple hover:text-white transition-colors tracking-widest">
            Все отчеты
         </button>
      </div>

      <div className="flex-1 flex flex-col gap-4 relative z-10">
         {insights.map((insight) => (
            <div key={insight.id} className={`p-5 rounded-2xl border bg-dark-900/50 hover:bg-dark-800 transition-all group flex flex-col gap-3
               ${insight.type === 'critical' ? 'border-accent-red/20 hover:border-accent-red/40' : 
                 insight.type === 'warning' ? 'border-accent-orange/20 hover:border-accent-orange/40' : 
                 'border-accent-green/20 hover:border-accent-green/40'}`}
            >
               <div className="flex items-center gap-2">
                  {insight.type === 'critical' ? <AlertTriangle className="w-4 h-4 text-accent-red" /> :
                   insight.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-accent-orange" /> :
                   <TrendingUp className="w-4 h-4 text-accent-green" />}
                  <h4 className="text-sm font-bold text-white">{insight.title}</h4>
               </div>
               
               <p className="text-xs text-dark-300 leading-relaxed font-medium">
                  {insight.desc}
               </p>

               <button className={`w-fit mt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors
                  ${insight.type === 'critical' ? 'text-accent-red hover:text-red-400' : 
                    insight.type === 'warning' ? 'text-accent-orange hover:text-orange-400' : 
                    'text-accent-green hover:text-green-400'}`}
               >
                  {insight.action}
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
         ))}
      </div>
    </div>
  );
}

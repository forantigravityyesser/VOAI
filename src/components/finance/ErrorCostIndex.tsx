"use client";

import React from "react";
import { AlertTriangle, Info, ShieldAlert, Target, TrendingDown, Scissors } from "lucide-react";

export default function ErrorCostIndex() {
  const netRevenue = 1200000;
  const fines = 145000;
  const errorIndex = (fines / netRevenue) * 100;
  
  // Danger levels
  const isRed = errorIndex > 5;
  const isYellow = errorIndex > 2 && errorIndex <= 5;
  
  // Gauge rotation calculation (-90 to 90 degrees for a semi-circle)
  // Max 20% in the gauge for visualization
  const maxScale = 20;
  const rotation = Math.min((errorIndex / maxScale) * 180 - 90, 90);

  return (
    <div className="glass-card p-10 rounded-[3rem] border border-card-border group relative overflow-hidden transition-all duration-500 hover:border-red-500/20 shadow-2xl">
      
      {/* Background Decor */}
      <div className={`absolute top-0 right-0 w-80 h-80 blur-[120px] rounded-full pointer-events-none transition-colors duration-700 ${
        isRed ? 'bg-red-500/10' : 'bg-green-500/10'
      }`}></div>

      <div className="flex flex-col lg:flex-row gap-12 relative z-10">
        
        {/* Left: Gauge */}
        <div className="flex flex-col items-center justify-center lg:w-1/3">
           <div className="relative w-64 h-32 overflow-hidden mb-6">
              {/* Semicircle Track */}
              <div className="absolute top-0 left-0 w-64 h-64 border-[24px] border-dark-900 rounded-full"></div>
              <div className="absolute top-0 left-0 w-64 h-64 border-[24px] border-transparent rounded-full border-t-green-500/50 border-r-yellow-500/50 border-l-red-500/50 rotate-45 opacity-30"></div>
              
              {/* Progress track (gradient) */}
              <svg className="absolute top-0 left-0 w-64 h-64 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray="125.6"
                  strokeDashoffset="125.6"
                  className="text-dark-800"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#errorGradient)"
                  strokeWidth="8"
                  strokeDasharray="125.6"
                  strokeDashoffset={125.6 - (Math.min(errorIndex, maxScale) / maxScale) * 125.6}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                   <linearGradient id="errorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="50%" stopColor="#eab308" />
                      <stop offset="100%" stopColor="#ef4444" />
                   </linearGradient>
                </defs>
              </svg>

              {/* Needle */}
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-28 bg-white rounded-full shadow-2xl transition-all duration-1000 ease-out origin-bottom"
                style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
              >
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full blur-[2px] opacity-50"></div>
              </div>
              <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-8 h-8 bg-dark-900 border-4 border-white/20 rounded-full z-20 shadow-xl"></div>
           </div>

           <div className="text-center">
              <span className={`text-5xl font-black tracking-tighter transition-colors duration-700 ${
                isRed ? 'text-red-500' : isYellow ? 'text-yellow-500' : 'text-green-500'
              }`}>
                {errorIndex.toFixed(1)}%
              </span>
              <p className="text-[10px] font-black text-dark-500 uppercase tracking-widest mt-2 px-6">
                Индекс разрушительности прибыли
              </p>
           </div>
        </div>

        {/* Right: Analysis */}
        <div className="flex-1 space-y-8">
           <div>
              <div className="flex items-center gap-3 mb-2">
                 <div className={`p-2 rounded-xl border ${
                   isRed ? 'bg-red-500/20 border-red-500/30' : 'bg-green-500/20 border-green-500/30'
                 }`}>
                    {isRed ? <ShieldAlert className="w-6 h-6 text-red-400" /> : <Target className="w-6 h-6 text-green-400" />}
                 </div>
                 <h3 className="text-3xl font-black text-white tracking-tight">Стоимость ошибки</h3>
              </div>
              <p className="text-[11px] font-bold text-dark-400 uppercase tracking-widest">
                Штрафы за габариты и КИЗ vs Чистая выручка
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-dark-900/60 border border-white/5 p-6 rounded-3xl group/item">
                 <div className="flex justify-between items-start mb-4">
                    <p className="text-[10px] font-black text-dark-500 uppercase tracking-widest">Потеря эффективности</p>
                    <TrendingDown className="w-4 h-4 text-red-500" />
                 </div>
                 <p className="text-xs font-bold text-white/80 leading-relaxed">
                   Ваша эффективность упала на <span className="text-red-400">{errorIndex.toFixed(0)}%</span> из-за ошибок в логистике и заполнении карточек. Каждые <span className="text-white">100₽</span> дохода приносят <span className="text-red-400">{errorIndex.toFixed(0)}₽</span> штрафов.
                 </p>
              </div>

              <div className="bg-dark-900/60 border border-white/5 p-6 rounded-3xl border-l-[6px] border-l-red-500/40">
                 <div className="flex justify-between items-start mb-4">
                    <p className="text-[10px] font-black text-dark-500 uppercase tracking-widest">Сумма штрафов</p>
                    <Scissors className="w-4 h-4 text-dark-400" />
                 </div>
                 <p className="text-2xl font-black text-white">{fines.toLocaleString()} ₽</p>
                 <p className="text-[9px] font-black text-dark-500 uppercase tracking-widest mt-1">Чистый убыток периода</p>
              </div>
           </div>

           <div className="bg-red-500/5 border border-red-500/20 rounded-[2rem] p-6 flex items-start gap-5">
              <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
              <div>
                 <p className="text-xs font-black text-white uppercase tracking-wider mb-2">ИИ-Рекомендация для менеджера</p>
                 <p className="text-xs font-bold text-dark-400 leading-relaxed">
                   Критический уровень! 80% штрафов вызвано неверным КИЗ и расхождением габаритов в карточках товаров "Кроссовки". Проверка упаковки вернет вам <span className="text-white font-black">{Math.round(fines * 0.8).toLocaleString()} ₽</span> в следующем месяце.
                 </p>
              </div>
           </div>
        </div>

      </div>

      {/* Legend */}
      <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
         <div className="flex gap-6">
            <span className="text-green-500/60">0-2% Безопасно</span>
            <span className="text-yellow-500/60">2-5% Внимание</span>
            <span className="text-red-500/60">5%+ Опасно</span>
         </div>
         <button className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors">
            Детализация по артикулам <Info className="w-3 h-3" />
         </button>
      </div>
    </div>
  );
}

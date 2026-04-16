"use client";

import React from "react";
import { ShieldAlert, Info, Wallet, Landmark, TrendingUp, Calendar } from "lucide-react";

export default function TaxReserveBasic() {
  const revenue = 3450000;
  const taxRate = 0.06; // 6% USN
  const estimatedTax = revenue * taxRate;
  const daysRemainingInQuarter = 44;
  
  // Progress calculation (just for visual representation of "Reserve filled")
  const progressPercent = 72; 

  return (
    <div className="glass-card p-10 rounded-[3rem] border border-card-border group relative overflow-hidden transition-all duration-500 hover:border-accent-purple/30 shadow-2xl">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent-purple/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10 relative z-10">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                 <ShieldAlert className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-3xl font-black text-white tracking-tight leading-none">Налоговый Резерв</h3>
           </div>
           <p className="text-[12px] font-extrabold text-dark-400 uppercase tracking-widest flex items-center gap-2">
             <Landmark className="w-4 h-4 text-orange-400/60" />
             Подготовка к выплатам: УСН 6% (Доходы)
           </p>
        </div>

        <div className="flex gap-4">
           <div className="bg-dark-900/40 border border-white/5 p-5 rounded-3xl min-w-[220px] shadow-inner group/stat">
              <div className="flex justify-between items-start mb-2">
                 <p className="text-[10px] font-black text-dark-500 uppercase tracking-widest">Продажи за квартал</p>
                 <TrendingUp className="w-3 h-3 text-green-400" />
              </div>
              <span className="text-2xl font-black text-white leading-none">
                {revenue.toLocaleString()} ₽
              </span>
           </div>
        </div>
      </div>

      {/* Main Tax Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        <div className="space-y-8">
           <div className="relative">
              <div className="flex justify-between items-end mb-4">
                 <div>
                    <h4 className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">Сумма к резервированию</h4>
                    <p className="text-5xl font-black text-white tracking-tighter">
                      {estimatedTax.toLocaleString()} <span className="text-2xl text-dark-500 tracking-normal">₽</span>
                    </p>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-dark-500 uppercase tracking-widest mb-1">До конца квартала</p>
                    <p className="text-lg font-black text-white flex items-center gap-2 justify-end">
                       <Calendar className="w-4 h-4 text-accent-purple" /> {daysRemainingInQuarter} дн.
                    </p>
                 </div>
              </div>

              {/* Advanced UI Progress Bar */}
              <div className="h-6 w-full bg-dark-900/60 rounded-full p-1.5 border border-white/5 shadow-inner overflow-hidden relative">
                 <div 
                   className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(249,115,22,0.4)] relative overflow-hidden"
                   style={{ 
                     width: `${progressPercent}%`,
                     background: 'linear-gradient(90deg, #F97316 0%, #FB923C 100%)'
                   }}
                 >
                    {/* Animated shine line */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full animate-shimmer"></div>
                 </div>
              </div>
              <div className="flex justify-between mt-3 px-1 text-[10px] font-extrabold tracking-widest uppercase">
                 <span className="text-orange-400">Накоплено {progressPercent}%</span>
                 <span className="text-dark-500">Цель: {estimatedTax.toLocaleString()} ₽</span>
              </div>
           </div>

           <div className="flex flex-col gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-5">
                 <div className="w-12 h-12 bg-dark-900 border border-white/5 rounded-xl flex items-center justify-center shrink-0">
                    <Wallet className="w-6 h-6 text-accent-purple" />
                 </div>
                 <div>
                    <p className="text-xs font-black text-white mb-1 uppercase tracking-wider">Это не ваша прибыль</p>
                    <p className="text-xs font-bold text-dark-400 leading-relaxed">
                      Указанная сумма автоматически вычитается алгоритмом из чистой прибыли. При поступлении выплат от WB рекомендуем переводить <span className="text-orange-400">6 450 ₽</span> в неделю на отдельный счет.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Tactical Tips (Right Side) */}
        <div className="bg-dark-900/60 rounded-[2.5rem] border border-white/5 p-8 space-y-6 shadow-2xl relative overflow-hidden group/tips">
           <div className="absolute top-0 right-0 p-4">
              <Info className="w-5 h-5 text-dark-600 group-hover/tips:text-accent-purple transition-colors" />
           </div>
           <h5 className="text-[11px] font-black text-dark-400 uppercase tracking-widest mb-4">Финансовая дисциплина</h5>
           
           <div className="space-y-6">
              {[
                { label: "Авансовые платежи", val: "Рекомендуется", desc: "Платите налоги ежемесячно, чтобы не нагружать кассовый разрыв.", icon: TrendingUp },
                { label: "Учет страховых взносов", val: "-15 000 ₽", desc: "Можно уменьшить налог на сумму взносов 'за себя' (сделаем в PRO).", icon: ShieldAlert }
              ].map((tip, i) => (
                <div key={i} className="flex gap-4">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover/tips:scale-110 transition-transform">
                      <tip.icon className="w-5 h-5 text-accent-purple" />
                   </div>
                   <div>
                      <div className="flex justify-between items-center mb-1">
                         <p className="text-[10px] font-black text-white uppercase tracking-wider">{tip.label}</p>
                         <span className="text-[10px] font-black text-accent-purple uppercase">{tip.val}</span>
                      </div>
                      <p className="text-[11px] font-bold text-dark-500 leading-snug">{tip.desc}</p>
                   </div>
                </div>
              ))}
           </div>

           <button className="w-full py-4 mt-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3 group/btn">
              Настроить ставку <Landmark className="w-4 h-4 text-dark-500 group-hover/btn:text-white transition-colors" />
           </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
import { AlertTriangle, Banknote, ShieldCheck, ArrowRight, Zap } from "lucide-react";

export default function LostProfitCalculator() {
  // Mock data for lost profit categories
  const lossCategories = [
    { name: "Штраф за Локализацию (ИЛ < 40%)", value: 45800, color: "#ff4757" },
    { name: "Переплата за габариты (неверные замеры)", value: 22400, color: "#ffa502" },
    { name: "Штрафы за отсутствие КИЗ/маркировки", value: 12500, color: "#ff7f50" },
    { name: "Утилизация и возвраты брака", value: 8900, color: "#ff6b81" },
    { name: "Прочие административные удержания", value: 5400, color: "#687092" },
  ];

  const totalLost = lossCategories.reduce((acc, curr) => acc + curr.value, 0);

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#161923',
      borderColor: '#2a2f45',
      textStyle: { color: '#fff', fontSize: 12, fontFamily: 'inherit' },
      formatter: (params: any) => {
        const p = params[0];
        return `
          <div style="padding: 10px;">
            <div style="font-weight: 800; color: #9099b7; margin-bottom: 5px; text-transform: uppercase; font-size: 10px;">${p.name}</div>
            <div style="font-weight: 900; color: #ff4757; font-size: 16px;">-${p.value.toLocaleString()} ₽</div>
          </div>
        `;
      }
    },
    grid: { left: '3%', right: '10%', bottom: '5%', top: '5%', containLabel: true },
    xAxis: {
      type: 'value',
      position: 'top',
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.02)', type: 'dashed' } },
      axisLabel: { color: '#687092', fontSize: 10, fontWeight: 'bold', formatter: (val: number) => `-${val/1000}k` }
    },
    yAxis: {
      type: 'category',
      data: lossCategories.map(c => c.name),
      inverse: true,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#fff', fontWeight: 'bold', fontSize: 11, width: 250, overflow: 'break' }
    },
    series: [
      {
        name: 'Упущенная выгода',
        type: 'bar',
        barWidth: '50%',
        showBackground: true,
        backgroundStyle: { color: 'rgba(255, 255, 255, 0.02)', borderRadius: 8 },
        itemStyle: {
          borderRadius: [0, 8, 8, 0],
          color: (params: any) => {
             return lossCategories[params.dataIndex].color;
          },
          shadowBlur: 15,
          shadowColor: 'rgba(255, 71, 87, 0.3)'
        },
        label: {
          show: true,
          position: 'right',
          color: '#fff',
          fontWeight: '900',
          fontSize: 12,
          formatter: (p: any) => `-${p.value.toLocaleString()} ₽`
        },
        data: lossCategories.map(c => c.value)
      }
    ]
  };

  return (
    <div className="glass-card p-10 rounded-[3rem] border border-red-500/20 group relative overflow-hidden transition-all duration-500 hover:border-red-500/40 shadow-2xl">
      
      {/* Background Alerts Pattern */}
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
         <AlertTriangle className="w-48 h-48 text-red-500 rotate-12" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-10 relative z-10">
        <div className="max-w-xl">
           <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 bg-red-500/20 rounded-full border border-red-500/30">
                 <span className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em]">Lost Opportunity</span>
              </div>
           </div>
           <h3 className="text-4xl font-black text-white tracking-tight mb-2 italic">Калькулятор «Упущенной выгоды»</h3>
           <p className="text-dark-400 text-sm font-medium leading-relaxed">
             Анализ штрафов и переплат из-за низкого Индекса Локализации. Это деньги, которые вы уже заработали, но Wildberries удержал их в качестве санкций.
           </p>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-dark-900/60 rounded-[2.5rem] border border-red-500/10 min-w-[280px] relative shadow-inner">
           <div className="absolute top-4 left-4">
              <Banknote className="w-5 h-5 text-red-500/40" />
           </div>
           <p className="text-[11px] font-black text-dark-500 uppercase tracking-widest mb-2">Итого упущено</p>
           <span className="text-5xl font-black text-red-500 tracking-tighter mb-4">
             {totalLost.toLocaleString()} <span className="text-2xl">₽</span>
           </span>
           <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-xl border border-red-500/20">
              <span className="text-[10px] font-black text-red-400 uppercase tracking-widest leading-none">Требует внимания</span>
           </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-[350px] w-full relative z-10 mb-10">
         <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>

      {/* Actionable AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
         <div className="bg-gradient-to-br from-dark-800 to-dark-950 p-6 rounded-3xl border border-white/5 relative overflow-hidden group/card shadow-xl">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent-blue/40"></div>
            <div className="flex items-start gap-5">
               <div className="w-12 h-12 bg-accent-blue/10 rounded-2xl flex items-center justify-center border border-accent-blue/20">
                  <Zap className="w-6 h-6 text-accent-blue" />
               </div>
               <div>
                  <h4 className="text-[11px] font-black text-accent-blue uppercase tracking-widest mb-2">AI-Инсайт: Локализация</h4>
                  <p className="text-xs text-white font-bold leading-relaxed mb-4">
                    Исправление логистики (поднятие ИЛ до 90%) вернет вам <span className="text-green-400">57 000 ₽</span> чистой прибыли в следующем месяце.
                  </p>
                  <button className="flex items-center gap-2 text-[10px] font-black text-white hover:text-accent-blue transition-colors group/btn">
                     ПЛАН РАСПРЕДЕЛЕНИЯ <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>
         </div>

         <div className="bg-gradient-to-br from-dark-800 to-dark-950 p-6 rounded-3xl border border-white/5 relative overflow-hidden group/card shadow-xl">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500/40"></div>
            <div className="flex items-start gap-5">
               <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20">
                  <ShieldCheck className="w-6 h-6 text-red-500" />
               </div>
               <div>
                  <h4 className="text-[11px] font-black text-red-500 uppercase tracking-widest mb-2">Защита от штрафов</h4>
                  <p className="text-xs text-white font-bold leading-relaxed mb-4">
                    У 4 SKU обнаружены ошибки в габаритах упаковки. Веб-камера на складе зафиксировала расхождение 15%.
                  </p>
                  <button className="flex items-center gap-2 text-[10px] font-black text-white hover:text-red-400 transition-colors group/btn">
                     ОТПРАВИТЬ НА ПЕРЕМЕР <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* Decorative Accents */}
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-red-500/5 blur-[120px] rounded-full pointer-events-none opacity-50"></div>
    </div>
  );
}

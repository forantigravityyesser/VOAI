"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
import { TrendingUp, AlertCircle, BarChart, HardHat, Info } from "lucide-react";

export default function WorkingCapitalDynamics() {
  const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
  
  // Mock data: Profit (Bars) and Frozen Capital (Line)
  const profitData = [240000, 310000, 280000, 450000, 520000, 480000, 610000, 750000, 680000, 590000, 820000, 950000];
  const capitalData = [1200000, 1450000, 1500000, 1900000, 2400000, 2600000, 3100000, 3800000, 4200000, 4500000, 5100000, 5800000];

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross', crossStyle: { color: '#999' } },
      backgroundColor: '#161923',
      borderColor: '#2a2f45',
      textStyle: { color: '#fff', fontSize: 12, fontFamily: 'inherit' },
      formatter: function(params: any) {
        let res = `<div style="padding:10px;"><div style="font-weight:900;margin-bottom:8px;color:#fff;text-transform:uppercase;letter-spacing:1px;font-size:10px;">ДИНАМИКА КАПИТАЛА - ${params[0].name}</div>`;
        params.forEach((item: any) => {
          const val = item.value.toLocaleString();
          res += `<div style="display:flex;justify-content:space-between;gap:20px;margin-bottom:4px;">
                    <span style="color:#9099b7;font-weight:bold;">${item.seriesName}:</span>
                    <span style="color:${item.color};font-weight:900;">${val} ₽</span>
                  </div>`;
        });
        res += `</div>`;
        return res;
      }
    },
    grid: { left: '3%', right: '3%', bottom: '8%', top: '15%', containLabel: true },
    legend: {
      data: ['Чистая прибыль', 'Замороженный капитал'],
      textStyle: { color: '#9099b7', fontWeight: 'bold', fontSize: 10 },
      bottom: 0,
      itemGap: 30
    },
    xAxis: {
      type: 'category',
      data: months,
      axisPointer: { type: 'shadow' },
      axisLine: { lineStyle: { color: '#2a2f45' } },
      axisLabel: { color: '#687092', fontSize: 10, fontWeight: 'bold' }
    },
    yAxis: [
      {
        type: 'value',
        name: 'ПРИБЫЛЬ',
        nameTextStyle: { color: '#687092', fontWeight: 'bold', fontSize: 9, padding: [0, 0, 10, 0] },
        min: 0,
        axisLine: { show: false },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.02)', type: 'dashed' } },
        axisLabel: { color: '#00d68f', fontSize: 10, fontWeight: 'bold', formatter: '{value} ₽' }
      },
      {
        type: 'value',
        name: 'КАПИТАЛ',
        nameTextStyle: { color: '#687092', fontWeight: 'bold', fontSize: 9, padding: [0, 0, 10, 0] },
        min: 0,
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: { color: '#4f9cf7', fontSize: 10, fontWeight: 'bold', formatter: '{value} ₽' }
      }
    ],
    series: [
      {
        name: 'Чистая прибыль',
        type: 'bar',
        barWidth: '40%',
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: '#00d68f' }, { offset: 1, color: 'rgba(0, 214, 143, 0.1)' }]
          }
        },
        data: profitData
      },
      {
        name: 'Замороженный капитал',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: { color: '#4f9cf7', borderWidth: 2, borderColor: '#fff' },
        lineStyle: { width: 4, shadowBlur: 10, shadowColor: 'rgba(79, 156, 247, 0.4)' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: 'rgba(79, 156, 247, 0.2)' }, { offset: 1, color: 'transparent' }]
          }
        },
        data: capitalData,
        markLine: {
          silent: true,
          lineStyle: { color: 'rgba(255,255,255,0.1)', type: 'dashed' },
          data: [{ type: 'average', name: 'Avg' }]
        }
      }
    ]
  };

  return (
    <div className="glass-card p-10 rounded-[3rem] border border-card-border group relative overflow-hidden transition-all duration-500 hover:border-accent-blue/30 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
        <div>
          <h3 className="text-3xl font-black text-white tracking-tight mb-2">Динамика оборотного капитала</h3>
          <p className="text-[12px] font-extrabold text-dark-400 uppercase tracking-widest flex items-center gap-2">
            <Info className="w-4 h-4 text-accent-blue" />
            Эффективность инвестиций в товарные запасы
          </p>
        </div>

        <div className="flex gap-4">
           {[
             { label: "Заморожено", val: "5.8M ₽", trend: "+12%", color: "text-accent-blue", bg: "bg-accent-blue/10" },
             { label: "Прибыль (YTD)", val: "6.3M ₽", trend: "+18%", color: "text-green-400", bg: "bg-green-400/10" },
             { label: "Оборачиваемость", val: "42 дня", trend: "-5дн", color: "text-accent-purple", bg: "bg-accent-purple/10" }
           ].map((kpi, idx) => (
             <div key={idx} className="bg-dark-900/40 border border-white/5 p-4 py-3 rounded-2xl min-w-[140px] shadow-inner">
                <p className="text-[9px] font-black text-dark-500 uppercase tracking-widest mb-1">{kpi.label}</p>
                <div className="flex items-end justify-between">
                   <span className={`text-lg font-black ${kpi.color}`}>{kpi.val}</span>
                   <span className="text-[10px] font-bold text-dark-400">{kpi.trend}</span>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-[400px] w-full relative z-10 bg-dark-900/60 rounded-[2.5rem] border border-white/5 p-6 shadow-inner mb-8">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
        
        {/* Quality Badges from Sketch */}
        <div className="absolute top-10 left-1/4 bg-dark-800/90 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md shadow-2xl pointer-events-none group-hover:scale-110 transition-transform flex items-center gap-2">
           <AlertCircle className="w-3 h-3 text-red-400" />
           <span className="text-[10px] font-black text-white uppercase tracking-tighter">Низкий остаток</span>
        </div>

        <div className="absolute top-1/2 right-[15%] bg-dark-800/90 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md shadow-2xl pointer-events-none group-hover:scale-110 transition-transform flex items-center gap-2">
           <TrendingUp className="w-3 h-3 text-accent-blue" />
           <span className="text-[10px] font-black text-white uppercase tracking-tighter">Избыток запасов</span>
        </div>
      </div>

      {/* AI Insight Section */}
      <div className="bg-gradient-to-r from-accent-blue/20 to-transparent p-6 rounded-[2rem] border border-accent-blue/20 relative z-10 flex items-center gap-6 group/insight">
         <div className="w-16 h-16 bg-accent-blue rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,184,217,0.4)] transform group-hover/insight:rotate-12 transition-transform">
            <TrendingUp className="w-8 h-8 text-white" />
         </div>
         <div className="flex-1">
            <h4 className="text-[11px] font-black text-accent-blue uppercase tracking-[0.2em] mb-1.5 flex items-center gap-2">
               AI-Инсайт Эффективности
               <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse"></span>
            </h4>
            <p className="text-white font-bold leading-relaxed pr-8">
              Ваш замороженный капитал растет на <span className="text-accent-blue underline decoration-2 underline-offset-4">15% быстрее</span>, чем чистая прибыль. Вы переинвестируете в неликвидные запасы — пора провести ротацию SKU.
            </p>
         </div>
         <button className="px-6 py-3 bg-dark-800 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-dark-700 transition-all">
            Анализ SKU
         </button>
      </div>

      {/* Decorative Accents */}
      <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-accent-blue/10 blur-[120px] rounded-full pointer-events-none opacity-50"></div>
      <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-green-400/5 blur-[80px] rounded-full pointer-events-none opacity-50"></div>
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { 
  Info, 
  TrendingUp, 
  Zap, 
  Target, 
  Trash2, 
  Filter,
  Maximize2
} from "lucide-react";

interface SKU {
  id: string;
  name: string;
  revenue: number;
  margin: number;
  profit: number;
  roi: number;
  recommendation: string;
  segment: "Scale" | "Optimize" | "Promote" | "Eliminate";
}

export default function SKUProfitabilityMatrix() {
  const [activeSegment, setActiveSegment] = useState<string>("All");

  const skus: SKU[] = useMemo(() => [
    { id: "SKU-184", name: "Футболка Oversize", revenue: 124000, margin: 42, profit: 52080, roi: 2.8, recommendation: "Увеличить рекламный бюджет на 15%", segment: "Scale" },
    { id: "SKU-202", name: "Худи Classic", revenue: 98500, margin: 38, profit: 37430, roi: 2.4, recommendation: "Включить внутреннюю рекламу", segment: "Scale" },
    { id: "SKU-311", name: "Штаны Cargo", revenue: 156000, margin: 12, profit: 18720, roi: 1.2, recommendation: "Повысить цену на 5%", segment: "Optimize" },
    { id: "SKU-405", name: "Кепка Basic", revenue: 210000, margin: 8, profit: 16800, roi: 0.9, recommendation: "Снизить логистические затраты", segment: "Optimize" },
    { id: "SKU-520", name: "Носки Wool", revenue: 15000, margin: 55, profit: 8250, roi: 4.5, recommendation: "Прокачать SEO и отзывы", segment: "Promote" },
    { id: "SKU-612", name: "Ремень Leather", revenue: 22000, margin: 48, profit: 10560, roi: 3.2, recommendation: "Запустить тест видео-обложки", segment: "Promote" },
    { id: "SKU-777", name: "Сумка Tote", revenue: 8000, margin: -5, profit: -400, roi: -0.2, recommendation: "Вывести из ассортимента", segment: "Eliminate" },
    { id: "SKU-888", name: "Чехол Phone", revenue: 12000, margin: 5, profit: 600, roi: 0.4, recommendation: "Ликвидировать остатки", segment: "Eliminate" },
    { id: "SKU-991", name: "Футболка Print", revenue: 110000, margin: 35, profit: 38500, roi: 2.2, recommendation: "Масштабировать рекламу", segment: "Scale" },
    { id: "SKU-992", name: "Свитшот Warm", revenue: 130000, margin: 45, profit: 58500, roi: 3.0, recommendation: "Масштабировать продажи", segment: "Scale" },
    { id: "SKU-993", name: "Брюки Slim", revenue: 180000, margin: 15, profit: 27000, roi: 1.5, recommendation: "Оптимизировать косты", segment: "Optimize" },
    { id: "SKU-994", name: "Шорты Sport", revenue: 35000, margin: 50, profit: 17500, roi: 3.5, recommendation: "Продвигать карточку", segment: "Promote" },
    { id: "SKU-995", name: "Майка Fit", revenue: 18000, margin: 2, profit: 360, roi: 0.2, recommendation: "Снять с продажи", segment: "Eliminate" },
  ], []);

  const filteredData = activeSegment === "All" ? skus : skus.filter(s => s.segment === activeSegment);

  const chartOption = {
    backgroundColor: 'transparent',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tooltip: {
      trigger: 'item',
      backgroundColor: '#161923',
      borderColor: '#2a2f45',
      textStyle: { color: '#fff', fontFamily: 'inherit' },
      formatter: (params: any) => {
        const item = params.data[3];
        const segName = item.segment === "Scale" ? "Масштабировать" : item.segment === "Promote" ? "Продвигать" : item.segment === "Optimize" ? "Оптимизировать" : "Ликвидировать";
        return `
          <div style="padding: 12px; min-width: 220px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
               <span style="font-weight: 800; font-size: 14px; color: #fff;">${item.id}</span>
               <span style="font-size: 10px; font-weight: 800; padding: 2px 6px; background: rgba(108,92,231,0.2); border-radius: 4px; color: #6c5ce7;">${segName}</span>
            </div>
            <div style="font-size: 12px; font-weight: bold; color: #9099b7; margin-bottom: 12px;">${item.name}</div>
            
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
               <span style="color: #687092; font-size: 11px;">Выручка:</span>
               <span style="font-weight: 800; color: #fff;">${item.revenue.toLocaleString()} ₽</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
               <span style="color: #687092; font-size: 11px;">Маржа:</span>
               <span style="font-weight: 800; color: ${item.margin > 20 ? '#00d68f' : '#ff4757'};">${item.margin}%</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
               <span style="color: #687092; font-size: 11px;">Чистая прибыль:</span>
               <span style="font-weight: 800; color: ${item.profit > 0 ? '#00d68f' : '#ff4757'};">${item.profit.toLocaleString()} ₽</span>
            </div>
            
            <div style="border-top: 1px solid #2a2f45; padding-top: 8px;">
               <div style="font-size: 9px; font-weight: 900; color: #6c5ce7; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Рекомендация AI:</div>
               <div style="font-size: 11px; font-style: italic; color: #d1d5db; line-height: 1.4;">${item.recommendation}</div>
            </div>
          </div>
        `;
      }
    },
    grid: {
      left: '5%',
      right: '10%',
      bottom: '15%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      name: 'Влияние на выручку (Revenue Impact) →',
      nameLocation: 'middle',
      nameGap: 45,
      nameTextStyle: { color: '#687092', fontWeight: 900, fontSize: 10, letterSpacing: 1 },
      splitLine: { lineStyle: { color: '#2a2f45', opacity: 0.5 } },
      axisLine: { lineStyle: { color: '#2a2f45' } },
      axisLabel: { color: '#687092', fontSize: 10, fontWeight: 'bold' }
    },
    yAxis: {
      name: 'Эффективность прибыли (Margin %) ↑',
      nameLocation: 'middle',
      nameGap: 55,
      nameTextStyle: { color: '#687092', fontWeight: 900, fontSize: 10, letterSpacing: 1 },
      splitLine: { lineStyle: { color: '#2a2f45', opacity: 0.5 } },
      axisLine: { lineStyle: { color: '#2a2f45' } },
      axisLabel: { color: '#687092', fontSize: 10, fontWeight: 'bold' }
    },
    series: [
      {
        type: 'scatter',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        symbolSize: (data: any) => {
          // Reduced size for better density
          return Math.sqrt(Math.abs(data[2])) / 2.2;
        },
        data: filteredData.map(s => [s.revenue, s.margin, s.profit, s]),
        itemStyle: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          color: (params: any) => {
            const seg = params.data[3].segment;
            if (seg === "Scale") return '#00d68f';
            if (seg === "Promote") return '#6c5ce7';
            if (seg === "Optimize") return '#ff9f43';
            if (seg === "Eliminate") return '#ff4757';
            return '#fff';
          },
          borderWidth: 2,
          borderColor: 'rgba(255,255,255,0.2)',
          shadowBlur: 15,
          shadowColor: 'rgba(0,0,0,0.8)',
          opacity: 1 // Solid density
        },
        markArea: {
          silent: true,
          itemStyle: {
            opacity: 0.05
          },
          data: [
            [
              { name: 'Продвигать', xAxis: 0, yAxis: 25, itemStyle: { color: '#6c5ce7' } },
              { xAxis: 100000, yAxis: 100 }
            ],
            [
              { name: 'Масштабировать', xAxis: 100000, yAxis: 25, itemStyle: { color: '#00d68f' } },
              { xAxis: 300000, yAxis: 100 }
            ],
            [
              { name: 'Ликвидировать', xAxis: 0, yAxis: -10, itemStyle: { color: '#ff4757' } },
              { xAxis: 100000, yAxis: 25 }
            ],
            [
              { name: 'Оптимизировать', xAxis: 100000, yAxis: -10, itemStyle: { color: '#ff9f43' } },
              { xAxis: 300000, yAxis: 25 }
            ]
          ]
        },
        markLine: {
          silent: true,
          symbol: 'none',
          lineStyle: { type: 'dashed', color: 'rgba(255,255,255,0.2)', width: 1 },
          data: [
            { xAxis: 100000 },
            { yAxis: 25 }
          ]
        }
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="glass-card p-8 rounded-[2.5rem] border border-card-border/50">
         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
               <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-black text-white tracking-tight">Матрица финансовой отдачи SKU</h3>
                  <div className="px-3 py-1 bg-accent-purple/10 border border-accent-purple/20 rounded-full">
                     <span className="text-[10px] font-black text-accent-purple uppercase tracking-widest">Юнит-Экономика</span>
                  </div>
               </div>
               <p className="text-sm text-dark-400 font-medium leading-relaxed max-w-2xl">
                 Анализ портфеля товаров по соотношению выручки и маржинальности для выбора стратегии продвижения.
               </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 bg-dark-900/50 p-1.5 rounded-2xl border border-card-border/50">
               {[
                 { id: "All", label: "Все" },
                 { id: "Scale", label: "Масштаб" },
                 { id: "Optimize", label: "Оптимизация" },
                 { id: "Promote", label: "Рост" },
                 { id: "Eliminate", label: "Ликвидация" }
               ].map((seg) => (
                  <button
                    key={seg.id}
                    onClick={() => setActiveSegment(seg.id)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeSegment === seg.id 
                      ? "bg-accent-purple text-white shadow-lg shadow-accent-purple/30 scale-105" 
                      : "text-dark-400 hover:text-white"
                    }`}
                  >
                    {seg.label}
                  </button>
               ))}
            </div>
         </div>

         {/* Chart Area */}
         <div className="relative h-[600px] w-full bg-dark-950/40 rounded-[2rem] border border-white/5 p-4 mb-4">
            <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} />
            
            {/* Quadrant Labels Overlays - Better placement */}
            <div className="absolute top-6 left-10 pointer-events-none">
               <div className="flex items-center gap-2 text-[#6c5ce7] bg-dark-900/40 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-[#6c5ce7]/20">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Продвигать (Рост)</span>
               </div>
            </div>
            <div className="absolute top-6 right-10 pointer-events-none">
               <div className="flex items-center gap-2 text-[#00d68f] bg-dark-900/40 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-[#00d68f]/20">
                  <Zap className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Масштабировать (Масштаб)</span>
               </div>
            </div>
            <div className="absolute bottom-16 left-10 pointer-events-none">
               <div className="flex items-center gap-2 text-[#ff4757] bg-dark-900/40 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-[#ff4757]/20">
                  <Trash2 className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Ликвидировать (Брак)</span>
               </div>
            </div>
            <div className="absolute bottom-16 right-10 pointer-events-none">
               <div className="flex items-center gap-2 text-[#ff9f43] bg-dark-900/40 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-[#ff9f43]/20">
                  <Target className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Оптимизировать (Логика)</span>
               </div>
            </div>
         </div>

         {/* Legend / Info with increased spacing */}
         <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Масштаб", color: "bg-green-400", desc: "Макс. прибыль. Вливать в рекламу." },
              { label: "Продвигать", color: "bg-accent-purple", desc: "Хорошая маржа, мало продаж. Растить охват." },
              { label: "Оптимизировать", color: "bg-orange-400", desc: "Много продаж, мало прибыли. Снижать косты." },
              { label: "Ликвидировать", color: "bg-red-400", desc: "Убыточные позиции. Выводить из оборота." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 bg-dark-800/20 rounded-2xl border border-white/5 transform hover:scale-[1.02] transition-all">
                 <div className={`w-1.5 h-full rounded-full ${item.color}`}></div>
                 <div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest block mb-1">{item.label}</span>
                    <span className="text-[11px] text-dark-500 font-medium leading-tight">{item.desc}</span>
                 </div>
              </div>
            ))}
         </div>
         
         <div className="mt-6 text-center">
            <p className="text-[9px] font-black text-dark-500 uppercase tracking-[0.3em]">
               Размер пузырька = Абсолютная чистая прибыль
            </p>
         </div>
      </div>

      {/* AI Insight Footer */}
      <div className="bg-accent-blue/10 border border-accent-blue/30 p-6 rounded-[2rem] flex items-center gap-6 group hover:bg-accent-blue/20 transition-all cursor-default relative overflow-hidden">
        <div className="w-14 h-14 bg-accent-blue rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent-blue/40">
           <Maximize2 className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1 relative z-10">
           <h4 className="text-sm font-black text-white uppercase tracking-wider mb-1">AI-Финансовый аудит</h4>
           <p className="text-[13px] text-dark-200 font-medium italic leading-relaxed">
             «63% вашей выручки генерируют товары из категории <span className="text-orange-400 font-black">Optimize</span>. 
             Увеличение маржинальности этих SKU всего на <span className="text-white font-bold">4%</span> (через оптимизацию упаковки) принесет дополнительные <span className="text-accent-blue font-black">+142,200 ₽</span> чистой прибыли в месяц».
           </p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-accent-blue"></div>
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent-blue/10 blur-[80px] rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
}

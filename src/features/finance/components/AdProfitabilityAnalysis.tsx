"use client";

import React, { useState, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { Zap, Target, AlertCircle, PlayCircle, ShoppingBag, ArrowUpRight, ArrowDownRight, Search } from "lucide-react";
import Image from "next/image";
import { AdCampaign } from "@/core/types/finance";
import { ChartParam } from "@/core/types/common";
import { mockAdCampaigns } from "../mock-data/finance.data";
import { Card } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

export default function AdProfitabilityAnalysis() {
  const [selectedCampaign, setSelectedCampaign] = useState<AdCampaign>(mockAdCampaigns[1]);
  const days = useMemo(() => Array.from({ length: 30 }, (_, i) => `${i + 1} апр`), []);
  
  const hasAds = selectedCampaign.spend > 0;
  
  const { adSpend, netProfit } = useMemo(() => {
    const seed = selectedCampaign.id.length; // use ID length or similar for stable pseudo-random
    const pBefore = days.map((_, i) => {
      const val = (Math.sin(seed * 1.5 + i) * 10000) + 30000;
      return Math.abs(val);
    });
    const aSpend = days.map((_, i) => {
      if (!hasAds) return 0;
      const val = (Math.cos(seed * 2.1 + i) * 5000) + 10000;
      return Math.abs(val);
    });
    const nProfit = pBefore.map((val, i) => val - aSpend[i]);
    return { profitBeforeAds: pBefore, adSpend: aSpend, netProfit: nProfit };
  }, [hasAds, days, selectedCampaign.id]);

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'line' },
      backgroundColor: '#161923',
      borderColor: '#2a2f45',
      textStyle: { color: '#fff', fontSize: 12, fontFamily: 'inherit' },
      formatter: (params: ChartParam[]) => {
        const profit = params[0]?.value || 0;
        const ads = params[1]?.value || 0;
        const total = profit + ads;
        const drr = total > 0 ? ((ads / total) * 100).toFixed(1) : "0";
        return `
          <div style="padding: 10px;">
            <div style="font-weight: 800; color: #9099b7; margin-bottom: 8px; text-transform: uppercase; font-size: 10px;">${params[0].name}</div>
            <div style="display:flex;justify-content:space-between;gap:20px;margin-bottom:4px;">
              <span style="color:#00d68f;font-weight:bold;">Прибыль (чистая):</span>
              <span style="color:#fff;font-weight:900;">${Math.round(profit).toLocaleString()} ₽</span>
            </div>
            <div style="display:flex;justify-content:space-between;gap:20px;margin-bottom:8px;">
              <span style="color:#ff4757;font-weight:bold;">Затраты АРК:</span>
              <span style="color:#fff;font-weight:900;">${Math.round(ads).toLocaleString()} ₽</span>
            </div>
            <div style="border-top:1px solid #2a2f45;padding-top:8px;display:flex;justify-content:space-between;">
              <span style="color:#ffa94d;font-weight:bold;">ДРР:</span>
              <span style="color:#ffa94d;font-weight:900;">${drr}%</span>
            </div>
          </div>
        `;
      }
    },
    legend: {
      data: ['Чистая прибыль', 'Расходы на АРК'],
      textStyle: { color: '#9099b7', fontWeight: 'bold', fontSize: 10 },
      bottom: 0,
      itemWidth: 8,
      itemHeight: 8
    },
    grid: { left: '3%', right: '3%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: days,
      axisLine: { lineStyle: { color: '#2a2f45' } },
      axisLabel: { color: '#687092', fontSize: 10, fontWeight: 'bold' }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.02)', type: 'dashed' } },
      axisLabel: { color: '#687092', fontSize: 10, fontWeight: 'bold', formatter: (v: number) => `${(v/1000).toFixed(0)}k` }
    },
    series: [
      {
        name: 'Чистая прибыль',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: { width: 0 },
        showSymbol: false,
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: '#00d68f' }, { offset: 1, color: 'rgba(0, 214, 143, 0.1)' }]
          }
        },
        emphasis: { focus: 'series' },
        data: netProfit
      },
      {
        name: 'Расходы на АРК',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: { width: 0 },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: '#ff4757' }, { offset: 1, color: 'rgba(255, 71, 87, 0.1)' }]
          }
        },
        emphasis: { focus: 'series' },
        data: adSpend
      }
    ]
  };

  return (
    <Card variant="glass" className="p-10">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/5 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10 relative z-10">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent-purple animate-pulse"></span>
              <h3 className="text-3xl font-black text-white tracking-tight leading-none">Окупаемость АРК (Тип 9)</h3>
           </div>
           <p className="text-[12px] font-extrabold text-dark-400 uppercase tracking-widest flex items-center gap-2">
             <Target className="w-4 h-4 text-accent-purple" />
             ДРР vs Чистая прибыль: Анализ каждого артикула
           </p>
        </div>

        <div className="flex gap-4">
           <div className="bg-dark-900/40 border border-white/5 p-4 rounded-3xl min-w-[200px] flex items-center justify-between group/h">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent-purple/20 flex items-center justify-center">
                   <ShoppingBag className="w-6 h-6 text-accent-purple" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-dark-500 uppercase tracking-widest mb-0.5">Всего в АРК</p>
                   <span className="text-xl font-black text-white">{mockAdCampaigns.length} товаров</span>
                </div>
              </div>
              <div className="ml-4 pl-4 border-l border-white/10">
                 <p className="text-[10px] font-black text-dark-500 uppercase tracking-widest mb-0.5">Активно</p>
                 <span className="text-xl font-black text-accent-green">
                   {mockAdCampaigns.filter(c => c.isActive).length}
                 </span>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
        
        {/* Left: Product Selection & Detailed Stats */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-dark-900/60 rounded-[2.5rem] border border-white/5 p-8 relative overflow-hidden group/card shadow-inner">
              <div className="flex items-start gap-6 mb-8">
                 <div className="relative">
                    {selectedCampaign.imageUrl && (
                      <Image 
                        src={selectedCampaign.imageUrl} 
                        alt={selectedCampaign.name}
                        width={96}
                        height={128}
                        className={`w-24 h-32 object-cover rounded-2xl shadow-xl group-hover/card:scale-105 transition-transform duration-500 ${!selectedCampaign.isActive ? 'grayscale opacity-60' : ''}`} 
                      />
                    )}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-dark-900 border border-white/10 flex items-center justify-center shadow-lg">
                       {selectedCampaign.status === 'profitable' ? (
                         <ArrowUpRight className="w-4 h-4 text-accent-green" />
                       ) : (
                         <ArrowDownRight className="w-4 h-4 text-accent-red" />
                       )}
                    </div>
                 </div>
                 <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                       <Badge variant={selectedCampaign.status === 'profitable' ? 'success' : selectedCampaign.status === 'warning' ? 'warning' : 'destructive'}>
                         {selectedCampaign.status === 'profitable' ? 'Зарабатывает' : 'В убытке'}
                       </Badge>
                       <Badge variant={selectedCampaign.isActive ? 'info' : 'default'}>
                         {selectedCampaign.isActive ? 'Активен' : 'Пауза'}
                       </Badge>
                    </div>
                    <h4 className="text-xl font-black text-white mb-1 leading-tight">{selectedCampaign.name}</h4>
                    <p className="text-xs font-bold text-dark-500 mb-4">{selectedCampaign.skuCode}</p>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <p className="text-[9px] font-black text-dark-500 uppercase mb-1">ДРР</p>
                          <p className={`text-sm font-black ${selectedCampaign.drr > 30 ? 'text-accent-red' : 'text-white'}`}>
                            {selectedCampaign.drr}%
                          </p>
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-dark-500 uppercase mb-1">Период</p>
                          <p className="text-sm font-black text-accent-purple">
                            {selectedCampaign.durationDays} дн.
                          </p>
                       </div>
                    </div>
                 </div>
              </div>

              {selectedCampaign.isActive && selectedCampaign.status === 'loss' && (
                <div className="bg-accent-red/10 border border-accent-red/20 rounded-2xl p-4 flex items-start gap-4 mb-0">
                   <AlertCircle className="w-5 h-5 text-accent-red shrink-0 mt-0.5" />
                   <p className="text-xs font-bold text-white/90 leading-snug">
                     Данный товар забирает <span className="text-accent-red">105%</span> прибыли. Рекомендуется снизить ставку или проверить настройки АРК.
                   </p>
                </div>
              )}
           </div>

           {/* Campaign List */}
           <div className="bg-dark-900/40 rounded-[2.5rem] border border-white/5 overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                 <h5 className="text-[10px] font-black text-dark-400 uppercase tracking-widest">Все товары АРК</h5>
                 <Search className="w-4 h-4 text-dark-500" />
              </div>
              <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
                 {mockAdCampaigns.map((campaign) => (
                   <button
                     key={campaign.id}
                     onClick={() => setSelectedCampaign(campaign)}
                     className={`w-full p-4 flex items-center gap-4 transition-all border-b border-white/5 last:border-0 hover:bg-white/5 text-left ${
                       selectedCampaign.id === campaign.id ? 'bg-white/5' : ''
                     }`}
                   >
                     <div className="relative">
                        {campaign.imageUrl && (
                          <Image 
                            src={campaign.imageUrl} 
                            alt={campaign.name} 
                            width={40}
                            height={40}
                            className={`w-10 h-10 object-cover rounded-lg transition-all ${!campaign.isActive ? 'grayscale opacity-40' : ''}`} 
                          />
                        )}
                        {!campaign.isActive && (
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-1.5 h-1.5 rounded-full bg-dark-600"></div>
                          </div>
                        )}
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                           <p className="text-xs font-black text-white truncate">{campaign.name}</p>
                           {!campaign.isActive && (
                             <Badge variant="outline" className="px-1 py-0 text-[7px] leading-none">OFF</Badge>
                           )}
                        </div>
                        <div className="flex items-center gap-2">
                           <span className={`text-[9px] font-black ${campaign.drr > 30 ? 'text-accent-red' : 'text-accent-green'}`}>ДРР: {campaign.drr}%</span>
                           <span className="text-[9px] font-bold text-dark-500">•</span>
                           <span className="text-[9px] font-black text-dark-400">
                             {campaign.durationDays}д.
                           </span>
                        </div>
                     </div>
                     <div className={`w-1.5 h-1.5 rounded-full ${campaign.isActive ? 'bg-accent-blue shadow-[0_0_8px_rgba(79,156,247,0.6)]' : 'bg-dark-600'}`}></div>
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Right: Detailed Area Chart */}
        <div className="lg:col-span-8 flex flex-col gap-6">
           <div className="h-[524px] w-full bg-dark-900/60 rounded-[3rem] border border-white/5 p-10 shadow-inner relative overflow-hidden group/chart">
              
              {/* Overlay for Empty State (No Ad Spend) */}
              {!hasAds && (
                <div className="absolute inset-0 z-30 bg-dark-900/60 backdrop-blur-sm flex flex-col items-center justify-center p-10 text-center">
                   <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                      <Zap className="w-10 h-10 text-dark-600" />
                   </div>
                   <h5 className="text-2xl font-black text-white mb-2">Рекламные данные отсутствуют</h5>
                   <p className="text-sm font-bold text-dark-500 max-w-xs leading-relaxed">
                     За выбранный период данный товар не участвовал в рекламных кампаниях АРК. Анализ окупаемости недоступен.
                   </p>
                   <Button variant="outline" className="mt-8">Запустить рекламу</Button>
                </div>
              )}

              {/* Chart Meta Details */}
              <div className="absolute top-8 left-10 z-20 flex items-center gap-6">
                 <div className="flex items-center gap-4 bg-dark-900/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/5">
                    <div className={`w-2 h-2 rounded-full ${selectedCampaign.isActive ? 'bg-accent-blue animate-pulse' : 'bg-dark-600'}`}></div>
                    <span className="text-[10px] font-black text-white uppercase tracking-wider">
                      {selectedCampaign.isActive ? 'В эфире' : 'Остановлено'}
                    </span>
                 </div>
                 
                 <div className="flex items-center gap-3 bg-accent-purple/10 px-4 py-2 rounded-2xl border border-accent-purple/20">
                    <PlayCircle className="w-4 h-4 text-accent-purple" />
                    <span className="text-[10px] font-black text-accent-purple uppercase tracking-wider">
                      Длительность: {selectedCampaign.durationDays} дней
                    </span>
                 </div>
              </div>

              <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
           </div>

           <div className="flex gap-6">
              <Button 
                variant={selectedCampaign.isActive ? "primary" : "secondary"} 
                className="flex-1 py-5"
              >
                 <Zap className="w-4 h-4" /> 
                 {selectedCampaign.isActive ? 'Оптимизировать Ставки' : 'Запустить Кампанию'}
              </Button>
              <Button variant="outline" className="px-8">
                 История затрат
              </Button>
           </div>
        </div>
      </div>
    </Card>
  );
}

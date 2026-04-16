import React, { useState, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { Zap, Target, AlertCircle, PlayCircle, ShoppingBag, ArrowUpRight, ArrowDownRight, Search } from "lucide-react";

// Define interface for chart params
interface ChartParam {
  name: string;
  value: number;
  data: number;
}

const campaignsData = [
  { id: 1, name: "Летнее Платье АРК", sku: "WB-DR-552", img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=100&q=80", spend: 540000, profit: 1200000, drr: 12.5, status: "profitable", isActive: true, durationDays: 14 },
  { id: 2, name: "Босоножки Кожа", sku: "WB-SH-912", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=100&q=80", spend: 820000, profit: -45000, drr: 105.0, status: "loss", isActive: true, durationDays: 28 },
  { id: 3, name: "Сумка Кросс-боди", sku: "WB-BG-112", img: "https://images.unsplash.com/photo-1584917033904-491a84e2ee93?w=100&q=80", spend: 120000, profit: 450000, drr: 18.2, status: "profitable", isActive: false, durationDays: 5 },
  { id: 4, name: "Кеды Urban", sku: "WB-SN-772", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=100&q=80", spend: 310000, profit: 150000, drr: 42.1, status: "warning", isActive: true, durationDays: 21 },
  { id: 5, name: "Шарф Кашемир", sku: "WB-AC-302", img: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=100&q=80", spend: 0, profit: 89000, drr: 0, status: "profitable", isActive: false, durationDays: 0 },
];

export default function AdProfitabilityAnalysis() {
  const [selectedCampaign, setSelectedCampaign] = useState(campaignsData[1]);
  const days = Array.from({ length: 30 }, (_, i) => `${i + 1} апр`);
  
  // Dynamic mock data based on selected campaign's scale and ad status
  const hasAds = selectedCampaign.spend > 0;
  
  const { profitBeforeAds, adSpend, netProfit } = useMemo(() => {
    const pBefore = days.map(() => (Math.random() * 20000 + 30000));
    const aSpend = days.map(() => hasAds ? (Math.random() * 10000 + 15000) : 0);
    const nProfit = pBefore.map((val, i) => val - aSpend[i]);
    return { profitBeforeAds: pBefore, adSpend: aSpend, netProfit: nProfit };
  }, [hasAds, days.length]); // dependencies are stable

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
    <div className="glass-card p-10 rounded-[3rem] border border-card-border group relative overflow-hidden transition-all duration-500 hover:border-accent-purple/30 shadow-2xl">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/5 blur-[100px] rounded-full pointer-events-none"></div>

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
                  <span className="text-xl font-black text-white">12 товаров</span>
                </div>
              </div>
              <div className="ml-4 pl-4 border-l border-white/10">
                 <p className="text-[10px] font-black text-dark-500 uppercase tracking-widest mb-0.5">Активно</p>
                 <span className="text-xl font-black text-green-400">8</span>
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
                    <img 
                      src={selectedCampaign.img} 
                      alt={selectedCampaign.name}
                      className={`w-24 h-32 object-cover rounded-2xl shadow-xl group-hover/card:scale-105 transition-transform duration-500 ${!selectedCampaign.isActive ? 'grayscale opacity-60' : ''}`} 
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-dark-900 border border-white/10 flex items-center justify-center shadow-lg">
                       {selectedCampaign.status === 'profitable' ? (
                         <ArrowUpRight className="w-4 h-4 text-green-400" />
                       ) : (
                         <ArrowDownRight className="w-4 h-4 text-red-500" />
                       )}
                    </div>
                 </div>
                 <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                       <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${
                         selectedCampaign.status === 'profitable' ? 'bg-green-500/10 text-green-400' :
                         selectedCampaign.status === 'warning' ? 'bg-orange-500/10 text-orange-400' : 'bg-red-500/10 text-red-400'
                       }`}>
                         {selectedCampaign.status === 'profitable' ? 'Зарабатывает' : 'В убытке'}
                       </span>
                       <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${
                         selectedCampaign.isActive ? 'bg-blue-500/10 text-blue-400' : 'bg-dark-700 text-dark-400'
                       }`}>
                         {selectedCampaign.isActive ? 'Активен' : 'Пауза'}
                       </span>
                    </div>
                    <h4 className="text-xl font-black text-white mb-1 leading-tight">{selectedCampaign.name}</h4>
                    <p className="text-xs font-bold text-dark-500 mb-4">{selectedCampaign.sku}</p>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <p className="text-[9px] font-black text-dark-500 uppercase mb-1">ДРР</p>
                          <p className={`text-sm font-black ${selectedCampaign.drr > 30 ? 'text-red-500' : 'text-white'}`}>
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
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start gap-4 mb-0">
                   <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                   <p className="text-xs font-bold text-white/90 leading-snug">
                     Данный товар забирает <span className="text-red-400">105%</span> прибыли. Рекомендуется снизить ставку или проверить настройки АРК.
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
                 {campaignsData.map((campaign) => (
                   <button
                     key={campaign.id}
                     onClick={() => setSelectedCampaign(campaign)}
                     className={`w-full p-4 flex items-center gap-4 transition-all border-b border-white/5 last:border-0 hover:bg-white/5 text-left ${
                       selectedCampaign.id === campaign.id ? 'bg-white/5' : ''
                     }`}
                   >
                     <div className="relative">
                        <img src={campaign.img} alt={campaign.name} className={`w-10 h-10 object-cover rounded-lg transition-all ${!campaign.isActive ? 'grayscale opacity-40' : ''}`} />
                        {!campaign.isActive && (
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-1.5 h-1.5 rounded-full bg-dark-600"></div>
                          </div>
                        )}
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                           <p className="text-xs font-black text-white truncate">{campaign.name}</p>
                           {!campaign.isActive && <span className="text-[8px] font-black bg-dark-700 text-dark-400 px-1 rounded tracking-tighter uppercase">OFF</span>}
                        </div>
                        <div className="flex items-center gap-2">
                           <span className={`text-[9px] font-black ${campaign.drr > 30 ? 'text-red-400' : 'text-green-400'}`}>ДРР: {campaign.drr}%</span>
                           <span className="text-[9px] font-bold text-dark-500">•</span>
                           <span className="text-[9px] font-black text-dark-400">
                             {campaign.durationDays}д.
                           </span>
                        </div>
                     </div>
                     <div className={`w-1.5 h-1.5 rounded-full ${campaign.isActive ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]' : 'bg-dark-600'}`}></div>
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Right: Detailed Area Chart */}
        <div className="lg:col-span-8 flex flex-col gap-6">
           <div className="h-[524px] w-full bg-dark-900/60 rounded-[3rem] border border-white/5 p-10 shadow-inner relative overflow-hidden group/chart">
              
              {/* Overlay for Empty State (No Ad Spend) */}
              {selectedCampaign.spend === 0 && (
                <div className="absolute inset-0 z-30 bg-dark-900/60 backdrop-blur-sm flex flex-col items-center justify-center p-10 text-center">
                   <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                      <Zap className="w-10 h-10 text-dark-600" />
                   </div>
                   <h5 className="text-2xl font-black text-white mb-2">Рекламные данные отсутствуют</h5>
                   <p className="text-sm font-bold text-dark-500 max-w-xs leading-relaxed">
                     За выбранный период данный товар не участвовал в рекламных кампаниях АРК. Анализ окупаемости недоступен.
                   </p>
                   <button className="mt-8 px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white hover:bg-white/10 transition-all uppercase tracking-widest">
                      Запустить рекламу
                   </button>
                </div>
              )}

              {/* Chart Meta Details */}
              <div className="absolute top-8 left-10 z-20 flex items-center gap-6">
                 <div className="flex items-center gap-4 bg-dark-900/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/5">
                    <div className={`w-2 h-2 rounded-full ${selectedCampaign.isActive ? 'bg-blue-400 animate-pulse' : 'bg-dark-600'}`}></div>
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
              <button className={`flex-1 ${selectedCampaign.isActive ? 'bg-accent-purple hover:bg-accent-purple/90' : 'bg-blue-500 hover:bg-blue-600'} text-[11px] font-black text-white uppercase tracking-widest py-5 rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3`}>
                 <Zap className="w-4 h-4" /> 
                 {selectedCampaign.isActive ? 'Оптимизировать Ставки' : 'Запустить Кампанию'}
              </button>
              <button className="px-8 bg-dark-900 text-[11px] font-black text-dark-400 uppercase tracking-widest rounded-2xl border border-white/5 hover:bg-white/5 transition-colors">
                 История затрат
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

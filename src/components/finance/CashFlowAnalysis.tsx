"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Wallet, 
  AlertTriangle, 
  ArrowRight,
  Info,
  Calendar,
  Layers,
  Search
} from "lucide-react";

export default function CashFlowAnalysis() {
  // Mock data for the Area Chart (Projected Cash Flow)
  const projectionData = {
    dates: ['Сегодня', '+10 дней', '+20 дней', '+30 дней', '+40 дней', '+50 дней', '+60 дней'],
    inflows: [85000, 78000, 70000, 65000, 58000, 50000, 45000],
    outflows: [85000, 65000, 50000, 35000, 20000, 5000, -15000],
    balance: [85000, 72000, 60000, 50000, 39000, 27500, 15000]
  };

  const areaChartOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#161923',
      borderColor: '#2a2f45',
      textStyle: { color: '#fff' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any) => {
        return `
          <div style="padding: 10px; font-family: inherit;">
            <div style="font-weight: 800; margin-bottom: 8px; color: #9099b7;">${params[0].axisValue}</div>
            ${params.map((p: any) => `
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 4px;">
                <span style="color: #fff; font-size: 11px;">${p.seriesName}</span>
                <span style="font-weight: 800; color: ${p.color};">${p.value.toLocaleString()} ₽</span>
              </div>
            `).join('')}
          </div>
        `;
      }
    },
    legend: {
      data: ['Поступления', 'Расходы', 'Прогноз баланса'],
      textStyle: { color: '#9099b7', fontWeight: 'bold', fontSize: 10 },
      top: 0,
      right: 0
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '5%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: projectionData.dates,
      axisLine: { lineStyle: { color: '#2a2f45' } },
      axisLabel: { color: '#687092', fontSize: 10, fontWeight: 'bold' }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.02)', type: 'dashed' } },
      axisLabel: { color: '#687092', fontSize: 10, fontWeight: 'bold' }
    },
    series: [
      {
        name: 'Поступления',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 3, color: '#00d68f', dashArray: [5, 5] },
        data: projectionData.inflows
      },
      {
        name: 'Расходы',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 3, color: '#ff4757', dashArray: [5, 5] },
        data: projectionData.outflows
      },
      {
        name: 'Прогноз баланса',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: { color: '#6c5ce7', borderWidth: 2, borderColor: '#fff' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(108,92,231,0.2)' },
              { offset: 1, color: 'transparent' }
            ]
          }
        },
        lineStyle: { width: 4, color: '#6c5ce7' },
        data: projectionData.balance
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* KPI Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            label: "Текущий баланс", 
            value: "3,142,500 ₽", 
            desc: "Живые деньги на счетах", 
            icon: Wallet, 
            color: "text-accent-purple",
            bg: "bg-accent-purple/10"
          },
          { 
            label: "Чистый Cash Flow", 
            value: "-450,300 ₽", 
            desc: "За последние 30 дней", 
            icon: TrendingDown, 
            color: "text-red-400",
            bg: "bg-red-400/10"
          },
          { 
            label: "Прогноз на 30 дней", 
            value: "1,840,600 ₽", 
            desc: "Ожидаемый остаток", 
            icon: Calendar, 
            color: "text-accent-blue",
            bg: "bg-accent-blue/10"
          },
          { 
            label: "Cash Runway", 
            value: "42 дня", 
            desc: "До кассового разрыва", 
            icon: Clock, 
            color: "text-orange-400",
            bg: "bg-orange-400/10",
            critical: true
          }
        ].map((kpi, i) => (
          <div key={i} className="glass-card p-6 rounded-3xl border border-card-border/50 group hover:border-accent-purple/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${kpi.bg} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg shadow-inner`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              {kpi.critical && (
                <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
                  <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Критично</span>
                </div>
              )}
            </div>
            <p className="text-[10px] font-black text-dark-400 uppercase tracking-[0.15em] mb-1">{kpi.label}</p>
            <h3 className="text-2xl font-black text-white tracking-tight mb-1">{kpi.value}</h3>
            <p className="text-[11px] text-dark-500 font-medium">{kpi.desc}</p>
            
            {kpi.label === "Cash Runway" && (
                <div className="mt-4 w-full h-1.5 bg-dark-800 rounded-full overflow-hidden flex">
                    <div className="h-full bg-red-400" style={{ width: '30%' }}></div>
                    <div className="h-full bg-orange-400" style={{ width: '40%' }}></div>
                    <div className="h-full bg-green-400" style={{ width: '30%' }}></div>
                    <div className="absolute top-0 h-full w-1 bg-white left-[42%] translate-y-[-4px] h-[10px] rounded-full shadow-glow"></div>
                </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 glass-card p-8 rounded-[2.5rem] border border-card-border relative overflow-hidden h-[450px] flex flex-col">
           <div className="flex items-center justify-between mb-8 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                   <h3 className="text-xl font-black text-white tracking-tight">Прогноз Cash Flow</h3>
                   <Info className="w-4 h-4 text-dark-500" />
                </div>
                <p className="text-[11px] font-extrabold text-dark-400 uppercase tracking-widest">Проекция движения средств на 60 дней</p>
              </div>
              <div className="flex items-center gap-2 bg-dark-900/50 p-1.5 rounded-xl border border-card-border/50">
                 <button className="px-3 py-1.5 bg-accent-purple text-[10px] font-black uppercase tracking-widest rounded-lg transition-all shadow-lg active:scale-95">Сценарий А</button>
                 <button className="px-3 py-1.5 text-dark-400 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all">Сценарий Б</button>
              </div>
           </div>
           
           <div className="flex-1 w-full relative z-10">
              <ReactECharts option={areaChartOption} style={{ height: '100%', width: '100%' }} />
           </div>
           
           <div className="absolute top-0 right-0 w-96 h-96 bg-accent-purple/5 blur-[120px] rounded-full"></div>
        </div>

        <div className="lg:col-span-4 glass-card p-8 rounded-[2.5rem] border border-card-border h-[450px] flex flex-col">
           <div className="mb-6">
              <h3 className="text-xl font-black text-white tracking-tight mb-1">Структура потока</h3>
              <p className="text-[11px] font-extrabold text-dark-400 uppercase tracking-widest">Источники и статьи затрат</p>
           </div>
           
           <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-3">
                 <p className="text-[10px] font-black text-dark-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 text-green-400" /> Основные притоки
                 </p>
                 {[
                   { name: "Выплаты маркетплейса", val: "2,420,000 ₽", pct: 75, color: "bg-green-400" },
                   { name: "Возвраты лог. сборов", val: "140,500 ₽", pct: 15, color: "bg-accent-blue" }
                 ].map((item, i) => (
                    <div key={i} className="bg-dark-800/50 p-4 rounded-2xl border border-card-border/30">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-white">{item.name}</span>
                          <span className="text-xs font-black text-green-400">{item.val}</span>
                       </div>
                       <div className="w-full h-1 bg-dark-900 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="space-y-3 pt-2">
                 <p className="text-[10px] font-black text-dark-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <TrendingDown className="w-3 h-3 text-red-400" /> Крупные оттоки
                 </p>
                 {[
                   { name: "Закупка товара (Поставка)", val: "1,200,000 ₽", pct: 60, color: "bg-red-400" },
                   { name: "Налоговые выплаты", val: "450,000 ₽", pct: 25, color: "bg-orange-400" }
                 ].map((item, i) => (
                    <div key={i} className="bg-dark-800/50 p-4 rounded-2xl border border-card-border/30">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-white">{item.name}</span>
                          <span className="text-xs font-black text-red-400">{item.val}</span>
                       </div>
                       <div className="w-full h-1 bg-dark-900 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-card rounded-[2rem] p-6 border border-card-border/50">
           <div className="flex items-center justify-between mb-6">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">Топ поступлений</h4>
              <Search className="w-4 h-4 text-dark-500" />
           </div>
           <div className="space-y-4">
              {[
                { source: "Organic Sales (WB)", amount: "+840k ₽", status: "confirm" },
                { source: "Internal Ad Refund", amount: "+12k ₽", status: "pending" },
                { source: "Partner Program", amount: "+45k ₽", status: "confirm" }
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-dark-800/30 rounded-xl border border-white/5">
                   <span className="text-xs font-medium text-dark-200">{row.source}</span>
                   <span className="text-xs font-black text-green-400">{row.amount}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="glass-card rounded-[2rem] p-6 border border-card-border/50">
           <div className="flex items-center justify-between mb-6">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">Крупные расходы</h4>
              <Layers className="w-4 h-4 text-dark-500" />
           </div>
           <div className="space-y-4">
              {[
                { source: "Google Ads (Traffic)", amount: "-160k ₽", cat: "Marketing" },
                { source: "Fullfillment Center", amount: "-45k ₽", cat: "Logistics" },
                { source: "Warehouse Rent", amount: "-120k ₽", cat: "OpEx" }
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-dark-800/30 rounded-xl border border-white/5">
                   <div className="flex flex-col">
                      <span className="text-xs font-medium text-dark-200">{row.source}</span>
                      <span className="text-[10px] text-dark-500 font-bold uppercase">{row.cat}</span>
                   </div>
                   <span className="text-xs font-black text-red-400">{row.amount}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="glass-card rounded-[2rem] p-6 border border-card-border/50 flex flex-col justify-center bg-accent-purple/5">
           <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent-purple/20 rounded-full flex items-center justify-center mx-auto mb-2 border border-accent-purple/30 shadow-glow">
                 <AlertTriangle className="w-8 h-8 text-accent-purple" />
              </div>
              <h4 className="text-lg font-black text-white tracking-tight">Внимание: Кассовый разрыв</h4>
              <p className="text-xs text-dark-400 font-medium leading-relaxed px-4">
                Через 42 дня ожидается отрицательный баланс. Система рекомендует сократить операционные расходы на 15% или привлечь внешнее финансирование.
              </p>
              <button className="text-[11px] font-black uppercase tracking-widest text-accent-purple hover:text-white transition-all flex items-center gap-2 mx-auto mt-4 group">
                 Подробный отчет <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </div>

      {/* AI Insight Footer */}
      <div className="bg-accent-purple/10 border border-accent-purple/30 p-6 rounded-[2rem] flex items-center gap-6 group hover:bg-accent-purple/20 transition-all cursor-default relative overflow-hidden">
        <div className="w-14 h-14 bg-accent-purple rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent-purple/40">
           <TrendingDown className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1 relative z-10">
           <h4 className="text-sm font-black text-white uppercase tracking-wider mb-1">AI-Инсайт (Кассовый Разрыв)</h4>
           <p className="text-[13px] text-dark-200 font-medium italic leading-relaxed">
             «Через 14 дней ожидается кассовый разрыв на <span className="text-red-400 font-black">450 000 ₽</span>. 
             Текущий тренд расходов на артикул <span className="text-white font-bold">&quot;Х&quot;</span> превышает выручку. Рекомендуем отложить закупку этой партии до конца месяца».
           </p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-accent-purple"></div>
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent-purple/10 blur-[80px] rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
}

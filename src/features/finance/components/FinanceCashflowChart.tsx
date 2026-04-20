"use client";

import React from "react";
import ReactECharts from "echarts-for-react";

export default function FinanceCashflowChart() {
  const weeks = ['Неделя 1', 'Неделя 2', 'Неделя 3', 'Неделя 4', 'Неделя 5', 'Неделя 6'];
  
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#161923',
      borderColor: '#2a2f45',
      textStyle: { color: '#fff' },
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Продажи', 'Комиссия', 'Логистика', 'Штрафы', 'К перечислению'],
      textStyle: { color: '#9099b7' },
      top: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '60px',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: weeks,
        axisLine: { lineStyle: { color: '#2a2f45' } },
        axisLabel: { color: '#687092' }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#1e2235' } },
        axisLabel: { 
          color: '#687092',
          formatter: (value: number) => `${value / 1000}k`
        }
      }
    ],
    series: [
      {
        name: 'Продажи',
        type: 'bar',
        stack: 'Total',
        emphasis: { focus: 'series' },
        itemStyle: { color: '#4f9cf7', borderRadius: [4, 4, 0, 0] },
        data: [420000, 480000, 390000, 550000, 510000, 680000]
      },
      {
        name: 'Комиссия',
        type: 'bar',
        stack: 'Total',
        emphasis: { focus: 'series' },
        itemStyle: { color: '#687092', opacity: 0.6 },
        data: [-85000, -96000, -78000, -110000, -102000, -136000]
      },
      {
        name: 'Логистика',
        type: 'bar',
        stack: 'Total',
        emphasis: { focus: 'series' },
        itemStyle: { color: '#6c5ce7', opacity: 0.8 },
        data: [-45000, -52000, -48000, -65000, -58000, -75000]
      },
      {
        name: 'Штрафы',
        type: 'bar',
        stack: 'Total',
        emphasis: { focus: 'series' },
        itemStyle: { color: '#ff4757', opacity: 0.9, borderRadius: [0, 0, 4, 4] },
        data: [-5000, -25000, -2000, -10000, -45000, -1000]
      },
      {
        name: 'К перечислению',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: { color: '#00d68f' },
        lineStyle: { width: 3, shadowBlur: 10, shadowColor: 'rgba(0, 214, 143, 0.4)' },
        data: [285000, 307000, 262000, 365000, 305000, 468000]
      }
    ]
  };

  return (
    <div className="glass-card p-8 rounded-3xl border border-card-border h-[450px] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Динамика начислений</h3>
          <p className="text-sm text-dark-400">Cashflow маркетплейса по неделям</p>
        </div>
      </div>
      
      <div className="flex-1 w-full">
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
        />
      </div>
    </div>
  );
}

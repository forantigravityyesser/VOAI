"use client";

import React from "react";
import ReactECharts from "echarts-for-react";

export default function ExpensesDonut() {
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: '#161923',
      borderColor: '#2a2f45',
      textStyle: { color: '#fff' },
      formatter: '{b}: <br/><b>{c} ₽</b> ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      itemGap: 20,
      textStyle: {
        color: '#9099b7',
        fontSize: 12,
        fontFamily: 'Inter'
      },
      icon: 'circle'
    },
    series: [
      {
        name: 'Расходы WB',
        type: 'pie',
        radius: ['55%', '75%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#0f1117',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
            formatter: '{d}%'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 450000, name: 'Комиссия', itemStyle: { color: '#687092' } },
          { value: 280000, name: 'Логистика', itemStyle: { color: '#6c5ce7' } },
          { value: 120000, name: 'Хранение/Приемка', itemStyle: { color: '#4f9cf7' } },
          { value: 52500, name: 'Штрафы', itemStyle: { color: '#ff4757' } }
        ]
      }
    ]
  };

  return (
    <div className="glass-card p-6 rounded-2xl border border-card-border h-full flex flex-col">
      <h3 className="text-lg font-bold text-white mb-1">Анатомия расходов</h3>
      <p className="text-xs text-dark-400 mb-6">Куда уходят деньги маркетплейса</p>
      
      <div className="flex-1 w-full min-h-[250px]">
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </div>
    </div>
  );
}

"use client";

import React, { useMemo, useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { 
  Package, 
  ChevronLeft, 
  RotateCcw, 
  Zap, 
  TrendingDown, 
  ShoppingCart, 
  AlertCircle,
  Sparkles,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  LayoutDashboard,
  BarChart3,
  Truck,
  ArrowUpDown,
  Filter,
  MoreHorizontal,
  Target,
  MousePointer2,
  MapPin,
  Box,
  Trash2,
  AlertTriangle,
  Activity,
  Layers,
  Scale,
  Wallet,
  Calendar,
  History,
  TrendingUp,
  Building2,
  Database
} from "lucide-react";
import Link from "next/link";

// --- Components ---

const AIRecommendation = ({ text, color = "accent-purple" }: { text: string, color?: string }) => (
  <div className={`w-full bg-${color}/10 border border-${color}/20 rounded-2xl p-4 flex items-start gap-4 mb-6 relative overflow-hidden group transition-all duration-500`}>
    <div className={`p-2 bg-${color}/20 rounded-xl shrink-0 group-hover:scale-110 transition-transform`}>
      <Sparkles className={`w-4 h-4 text-${color}`} />
    </div>
    <p className="text-sm text-dark-100/90 leading-relaxed italic relative z-10">
      <span className={`font-bold text-${color} not-italic uppercase tracking-wider text-[10px] mr-2`}>AI Резюме:</span> {text}
    </p>
    <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}/5 blur-[50px] rounded-full -mr-16 -mt-16`}></div>
  </div>
);

const Sparkline = () => {
  const option = {
    xAxis: { type: 'category', show: false },
    yAxis: { type: 'value', show: false },
    grid: { left: 0, right: 0, top: 2, bottom: 2 },
    series: [{
      data: [10, 22, 18, 25, 15, 20, 30],
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: { width: 1.5, color: '#6c5ce7' },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(108, 92, 231, 0.2)' },
          { offset: 1, color: 'rgba(108, 92, 231, 0)' }
        ])
      }
    }]
  };
  return <ReactECharts option={option} style={{ height: '20px', width: '40px' }} />;
};

const TableHeader = ({ label, sortable = true }: { label: string, sortable?: boolean }) => (
  <th className="py-4 px-4 text-left">
    <div className="flex items-center gap-1.5 group cursor-pointer">
      <span className="text-[10px] text-dark-400 font-black uppercase tracking-widest group-hover:text-dark-200 transition-colors">{label}</span>
      {sortable && <ArrowUpDown className="w-2.5 h-2.5 text-dark-500 group-hover:text-accent-purple transition-colors" />}
    </div>
  </th>
);

// --- Page Logic ---

export default function WarehousePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("Здоровье склада");

  useEffect(() => setIsMounted(true), []);

  const tabs = ["Здоровье склада", "Эффективность товаров", "Планирование запасов"];

  // --- ECharts Options ---

  const deadStockOption = useMemo(() => {
    if (!isMounted) return {};
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(30, 34, 53, 0.95)',
        borderColor: 'rgba(108, 92, 231, 0.3)',
        borderWidth: 1,
        textStyle: { color: '#fff' },
        padding: [10, 15],
        formatter: (params: any) => {
          const item = params[0];
          const data = item.data;
          return `
            <div style="font-family: Inter, sans-serif;">
              <div style="font-weight: 800; margin-bottom: 8px; color: #fff; font-size: 14px;">${item.name}</div>
              <div style="font-size: 11px; color: #9099b7;">Остаток: <b style="color:#fff">${data.value} шт</b></div>
              <div style="font-size: 11px; color: #9099b7;">Продаж/день: <b style="color:#fff">${data.speed}</b></div>
              <div style="font-size: 11px; color: #9099b7;">Без продаж: <b style="color:#ff4757">${data.daysWithout} дней</b></div>
            </div>
          `;
        }
      },
      grid: { left: '2%', right: '2%', bottom: '15%', top: '5%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['Свечи зажигания', 'Джинсы классика', 'Чайник электрич.', 'Наушники BT-500', 'Коврик для йоги', 'Ежедневник A5'],
        axisLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.05)' } },
        axisLabel: { 
          color: '#687092', fontSize: 10, interval: 0,
          formatter: (val: string, index: number) => {
            const speeds = ['0.2 ед/день', '0.5 ед/день', '0.3 ед/день', '0.8 ед/день', '1.2 ед/день', '2.5 ед/день'];
            return `{name|${val}}\n{speed|${speeds[index]}}`;
          },
          rich: {
            name: { color: '#9099b7', fontSize: 10, padding: [0, 0, 4, 0] },
            speed: { color: '#3d4567', fontSize: 9, fontWeight: 700 }
          }
        }
      },
      yAxis: { 
        type: 'value', 
        max: 1000, 
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.02)', type: 'dashed' } }, 
        axisLabel: { color: '#3d4567', fontSize: 10 },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(255,255,255,0.01)', 'transparent']
          }
        }
      },
      series: [{
        type: 'bar', barWidth: '35%', showBackground: true,
        backgroundStyle: { color: 'rgba(255, 255, 255, 0.01)', borderRadius: 8 },
        itemStyle: {
          borderRadius: [8, 8, 0, 0],
          color: (params: any) => {
            const colors = [['#ff4757', '#ff6b81'], ['#ffa94d', '#ffc078'], ['#ff4757', '#ff6b81'], ['#ffa94d', '#ffc078'], ['#00d68f', '#2ce69b'], ['#00d68f', '#2ce69b']];
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: colors[params.dataIndex][1] }, { offset: 1, color: colors[params.dataIndex][0] }]);
          }
        },
        data: [{ value: 580, speed: '0.2', daysWithout: 12 }, { value: 380, speed: '0.5', daysWithout: 8 }, { value: 200, speed: '0.3', daysWithout: 15 }, { value: 310, speed: '0.8', daysWithout: 5 }, { value: 330, speed: '1.2', daysWithout: 2 }, { value: 920, speed: '2.5', daysWithout: 1 }]
      }]
    };
  }, [isMounted]);

  const bubbleOption = useMemo(() => {
    if (!isMounted) return {};
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(30,34,53,0.98)',
        borderColor: 'rgba(108,92,231,0.4)',
        borderWidth: 1,
        textStyle: { color: '#fff' },
        padding: [15, 20],
        formatter: (params: any) => {
          const data = params.data;
          return `
            <div style="font-family: Inter, sans-serif; min-width: 180px;">
              <div style="font-weight: 800; margin-bottom: 12px; color: #fff; font-size: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">${data.name}</div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: #9099b7; font-size: 11px;">Остаток:</span>
                <b style="color: #fff; font-size: 11px;">${data.stock} шт</b>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: #9099b7; font-size: 11px;">В пути:</span>
                <b style="color: #ffa94d; font-size: 11px;">${data.transit} шт</b>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: #9099b7; font-size: 11px;">Продажи/день:</span>
                <b style="color: #fff; font-size: 11px;">${data.speed}</b>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: #9099b7; font-size: 11px;">Тренд:</span>
                <b style="${data.trend.includes('-') ? 'color: #ff4757' : 'color: #00d68f'}; font-size: 11px;">${data.trend}</b>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: #9099b7; font-size: 11px;">Выкуп:</span>
                <b style="color: #fff; font-size: 11px;">${data.buyout}%</b>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                <span style="color: #9099b7; font-size: 11px;">Закончится:</span>
                <b style="color: #ff4757; font-size: 11px;">через ${data.endDays} дн.</b>
              </div>
              <div style="color: #6c5ce7; font-size: 10px; font-weight: 800; text-transform: uppercase; cursor: pointer;">Клик — детали</div>
            </div>
          `;
        }
      },
      xAxis: {
        name: 'Риск дефицита (%)',
        nameLocation: 'center',
        nameGap: 35,
        nameTextStyle: { color: '#687092', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', tracking: '2px' },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
        splitLine: { show: false },
        axisLabel: { color: '#3d4567', fontWeight: 'bold' },
        min: 0,
        max: 100
      },
      yAxis: {
        name: 'Скорость продаж (шт/день)',
        nameLocation: 'center',
        nameGap: 45,
        nameTextStyle: { color: '#687092', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', tracking: '2px' },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
        splitLine: { show: false },
        axisLabel: { color: '#3d4567', fontWeight: 'bold' },
        min: 0,
        max: 30
      },
      series: [
        {
          name: 'Товары',
          type: 'scatter',
          data: [
            // [x: Risk (%), y: Speed (шт/день), size: Volume]
            { value: [5, 25, 25], name: 'Смартфон X200', stock: 450, transit: 10, speed: 25.2, trend: '+12%', buyout: 94, endDays: 18, itemStyle: { color: '#00d68f', shadowBlur: 20, shadowColor: 'rgba(0,214,143,0.3)' } },
            { value: [85, 22, 18], name: 'Роутер Wi-Fi 6', stock: 5, transit: 40, speed: 22.4, trend: '+35%', buyout: 96, endDays: 2, itemStyle: { color: '#ff4757', shadowBlur: 20, shadowColor: 'rgba(255,71,87,0.3)' } },
            { value: [15, 8, 12], name: 'Крем для лица', stock: 154, transit: 0, speed: 8.1, trend: '+2%', buyout: 88, endDays: 19, itemStyle: { color: '#00b8d9', shadowBlur: 20, shadowColor: 'rgba(0,184,217,0.3)' } },
            { value: [50, 4, 15], name: 'Шампунь органик', stock: 20, transit: 30, speed: 4.2, trend: '-4%', buyout: 91, endDays: 5, itemStyle: { color: '#00b8d9', shadowBlur: 20, shadowColor: 'rgba(0,184,217,0.3)' } },
            { value: [95, 1.2, 10], name: 'Чайник электрич.', stock: 2, transit: 0, speed: 1.2, trend: '-22%', buyout: 72, endDays: 1, itemStyle: { color: '#706fd3', shadowBlur: 20, shadowColor: 'rgba(112,111,211,0.3)' } },
            { value: [10, 18, 22], name: 'Набор посуды', stock: 210, transit: 20, speed: 18.6, trend: '-15%', buyout: 85, endDays: 11, itemStyle: { color: '#00d68f', shadowBlur: 20, shadowColor: 'rgba(0,214,143,0.3)' } },
            { value: [70, 14, 14], name: 'Куртка зимняя', stock: 18, transit: 5, speed: 14.5, trend: '+5%', buyout: 78, endDays: 3, itemStyle: { color: '#ff4757', shadowBlur: 20, shadowColor: 'rgba(255,71,87,0.3)' } }
          ],
          symbolSize: (data: any) => data[2] * 2,
          emphasis: {
            scale: 1.2,
            itemStyle: { shadowBlur: 30, shadowColor: 'rgba(108, 92, 231, 1)' }
          },
          markArea: {
            silent: true,
            itemStyle: { opacity: 0.05 },
            data: [
              [
                { name: 'ЛИДЕРЫ (ВЫСОКИЙ СТОК)', xAxis: 0, yAxis: 15, itemStyle: { color: '#00d68f' }, label: { show: true, position: 'insideTopLeft', distance: 20, color: 'rgba(0,214,143,0.5)', fontSize: 10, fontWeight: 900 } },
                { xAxis: 50, yAxis: 30 }
              ],
              [
                { name: 'НИЗКИЙ СПРОС / ПОДДЕРЖКА', xAxis: 0, yAxis: 0, itemStyle: { color: '#00b8d9' }, label: { show: true, position: 'insideBottomLeft', distance: 20, color: 'rgba(0,184,217,0.5)', fontSize: 10, fontWeight: 900 } },
                { xAxis: 50, yAxis: 15 }
              ],
              [
                { name: 'КРИТИЧЕСКИЙ ДЕФИЦИТ', xAxis: 50, yAxis: 15, itemStyle: { color: '#ff4757' }, label: { show: true, position: 'insideTopRight', distance: 20, color: 'rgba(255,71,87,0.5)', fontSize: 10, fontWeight: 900 } },
                { xAxis: 100, yAxis: 30 }
              ],
              [
                { name: 'НЕЛИКВИД ПРИ ДЕФИЦИТЕ', xAxis: 50, yAxis: 0, itemStyle: { color: '#706fd3' }, label: { show: true, position: 'insideBottomRight', distance: 20, color: 'rgba(112,111,211,0.5)', fontSize: 10, fontWeight: 900 } },
                { xAxis: 100, yAxis: 15 }
              ]
            ]
          }
        }
      ],
      graphic: [
        { type: 'line', shape: { x1: '50%', y1: '10%', x2: '50%', y2: '90%' }, style: { stroke: 'rgba(255,255,255,0.05)', lineWidth: 1, lineDash: [5, 5] } },
        { type: 'line', shape: { x1: '10%', y1: '50%', x2: '90%', y2: '50%' }, style: { stroke: 'rgba(255,255,255,0.05)', lineWidth: 1, lineDash: [5, 5] } }
      ]
    };
  }, [isMounted]);

  const gaugeOption = useMemo(() => {
    return {
      backgroundColor: 'transparent',
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 100,
          splitNumber: 5,
          radius: '100%',
          center: ['50%', '70%'],
          axisLine: {
            lineStyle: {
              width: 12,
              color: [
                [0.6, '#ff4757'],
                [0.7, '#ffa94d'],
                [1, '#00d68f']
              ]
            }
          },
          pointer: {
             icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
             length: '12%',
             width: 12,
             offsetCenter: [0, '-55%'],
             itemStyle: { color: 'auto' }
          },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: {
            show: true,
            distance: -40,
            color: '#687092',
            fontSize: 10,
            fontWeight: 'bold',
            formatter: (v: number) => (v === 0 || v === 100 ? v + '%' : '')
          },
          detail: {
            offsetCenter: [0, '-10%'],
            valueAnimation: true,
            formatter: (value: number) => `{value|${value}%}\n{label|Ваш индекс}`,
            rich: {
              value: { fontSize: 32, fontWeight: 900, color: '#fff', padding: [0, 0, 10, 0] },
              label: { fontSize: 10, fontWeight: 800, color: '#687092', textTransform: 'uppercase' }
            }
          },
          data: [{ value: 72 }]
        }
      ]
    };
  }, [isMounted]);
 
   const logQualityOption = useMemo(() => {
     if (!isMounted) return {};
     return {
       backgroundColor: 'transparent',
       tooltip: {
         trigger: 'axis',
         axisPointer: { type: 'shadow' },
         backgroundColor: 'rgba(30, 34, 53, 0.95)',
         borderColor: 'rgba(108, 92, 231, 0.3)',
         borderWidth: 1,
         textStyle: { color: '#fff' },
         formatter: (params: any) => {
           let res = `<div style="font-family: Inter, sans-serif; padding: 5px;">
             <div style="font-weight: 800; margin-bottom: 8px;">${params[0].name}</div>`;
           params.forEach((p: any) => {
             res += `<div style="display: flex; justify-content: space-between; gap: 20px; font-size: 11px; margin-bottom: 4px;">
               <span style="color: #9099b7;">${p.seriesName}:</span>
               <b style="color: ${p.color};">${p.value}%</b>
             </div>`;
           });
           res += `</div>`;
           return res;
         }
       },
       legend: {
         data: ['Процент выкупа', 'Процент брака', 'Потери/Обезличка'],
         bottom: 0,
         left: 'center',
         textStyle: { color: '#687092', fontWeight: 'bold', fontSize: 10, textTransform: 'uppercase' },
         itemWidth: 10,
         itemHeight: 10,
         padding: [20, 0, 0, 0]
       },
       grid: { left: '3%', right: '4%', top: '5%', bottom: '15%', containLabel: true },
       xAxis: {
         type: 'value',
         max: 100,
         axisLabel: { formatter: '{value}%', color: '#3d4567', fontSize: 10, fontWeight: 'bold' },
         splitLine: { lineStyle: { color: 'rgba(255,255,255,0.02)' } },
         axisLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
       },
       yAxis: {
         type: 'category',
         data: ['Смартфон X200', 'Роутер Wi-Fi 6', 'Крем для лица', 'Шампунь', 'Чайник'],
         axisLabel: { color: '#9099b7', fontSize: 11, fontWeight: 'bold' },
         axisLine: { show: false },
         splitLine: { show: false }
       },
       series: [
         {
           name: 'Процент выкупа',
           type: 'bar',
           stack: 'total',
           barWidth: '40%',
           itemStyle: { 
             color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
               { offset: 0, color: '#2ce69b' },
               { offset: 1, color: '#00d68f' }
             ]),
             borderRadius: [0, 0, 0, 0]
           },
           data: [85, 92, 78, 90, 65]
         },
         {
           name: 'Процент брака',
           type: 'bar',
           stack: 'total',
           itemStyle: { 
             color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
               { offset: 0, color: '#ff6b81' },
               { offset: 1, color: '#ff4757' }
             ]) 
           },
           data: [5, 2, 12, 4, 15]
         },
         {
           name: 'Потери/Обезличка',
           type: 'bar',
           stack: 'total',
           itemStyle: { 
             color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
               { offset: 0, color: '#ffc078' },
               { offset: 1, color: '#ffa94d' }
             ]),
             borderRadius: [0, 4, 4, 0]
           },
           data: [2, 1, 5, 3, 10]
         }
       ]
     };
   }, [isMounted]);

   const spaceEfficiencyOption = useMemo(() => {
     if (!isMounted) return {};
     return {
       backgroundColor: 'transparent',
       tooltip: {
         trigger: 'item',
         backgroundColor: 'rgba(30,34,53,0.98)',
         borderColor: 'rgba(108,92,231,0.4)',
         borderWidth: 1,
         textStyle: { color: '#fff' },
         formatter: (params: any) => {
           const data = params.data;
           return `
             <div style="font-family: Inter, sans-serif; padding: 10px;">
               <div style="font-weight: 800; margin-bottom: 8px; color: #fff; font-size: 14px;">${data.name}</div>
               <div style="display: flex; justify-content: space-between; gap: 20px; font-size: 11px; margin-bottom: 4px;">
                 <span style="color: #9099b7;">Занято места:</span>
                 <b style="color:#ffa94d">${data.value[0]}% лимита</b>
               </div>
               <div style="display: flex; justify-content: space-between; gap: 20px; font-size: 11px; margin-bottom: 4px;">
                 <span style="color: #9099b7;">Доля в заказах:</span>
                 <b style="color:#00d68f">${data.value[1]}%</b>
               </div>
               <div style="display: flex; justify-content: space-between; gap: 20px; font-size: 11px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 6px; margin-top: 4px;">
                 <span style="color: #9099b7;">Эффективность:</span>
                 <b style="color:#fff">${(data.value[1]/data.value[0]).toFixed(2)} x</b>
               </div>
             </div>
           `;
         }
       },
       xAxis: {
         name: '% ОБЪЕМА НА СКЛАДЕ',
         nameLocation: 'center',
         nameGap: 35,
         nameTextStyle: { color: '#687092', fontSize: 10, fontWeight: 900, letterSpacing: '1px' },
         axisLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
         splitLine: { show: false },
         axisLabel: { color: '#3d4567', fontSize: 10 }
       },
       yAxis: {
         name: '% ОТ ОБЩИХ ЗАКАЗОВ',
         nameLocation: 'center',
         nameGap: 45,
         nameTextStyle: { color: '#687092', fontSize: 10, fontWeight: 900, letterSpacing: '1px' },
         axisLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
         splitLine: { lineStyle: { color: 'rgba(255,255,255,0.02)' } },
         axisLabel: { color: '#3d4567', fontSize: 10 }
       },
       series: [{
         type: 'scatter',
         symbolSize: (val: any) => Math.sqrt(val[2]) * 8,
         itemStyle: {
           color: (params: any) => {
              const ratio = params.data.value[1] / params.data.value[0];
              if (ratio < 0.5) return new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{ offset: 0, color: '#ff6b81' }, { offset: 1, color: '#ff4757' }]);
              if (ratio < 1.5) return new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{ offset: 0, color: '#ffc078' }, { offset: 1, color: '#ffa94d' }]);
              return new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{ offset: 0, color: '#2ce69b' }, { offset: 1, color: '#00d68f' }]);
           },
           shadowBlur: 25,
           shadowColor: 'rgba(0,0,0,0.4)',
           borderColor: 'rgba(255,255,255,0.1)',
           borderWidth: 1
         },
         emphasis: {
           scale: 1.2,
           itemStyle: { shadowBlur: 35, shadowColor: 'rgba(108,92,231,0.6)' }
         },
         data: [
           { value: [40, 5, 200], name: 'Медведь Плюшевый 2м' },
           { value: [1, 12, 50], name: 'Кольцо Серебро 925' },
           { value: [10, 22, 150], name: 'Футболка хлопок' },
           { value: [25, 14, 100], name: 'Набор конструктора' },
           { value: [5, 18, 80], name: 'Чехол для iPhone' },
           { value: [35, 8, 120], name: 'Коврик для йоги XL' },
           { value: [8, 11, 60], name: 'Набор масок (10 шт)' }
         ],
         markArea: {
           silent: true,
           itemStyle: { opacity: 0.03 },
           data: [
             [
               { name: 'КРИТИЧЕСКИ НЕЭФФЕКТИВНО', xAxis: 20, yAxis: 0, itemStyle: { color: '#ff4757' }, label: { show: true, position: 'insideBottomRight', color: 'rgba(255,71,87,0.4)', fontSize: 9, fontWeight: 900 } },
               { xAxis: 50, yAxis: 10 }
             ]
           ]
         }
       }]
     };
   }, [isMounted]);



  const stockData = [
    { name: "Шампунь органик", stock: 78, stockMax: 100, reserved: 26, inTransit: 27, daysLeft: 26, daysTrend: "down", salesDay: 8.1, salesTrend: "+2%", risk: "18.0%", riskTrend: "down", warehouse: "СПб", color: "bg-accent-green" },
    { name: "Роутер Wi-Fi 6", stock: 12, stockMax: 50, reserved: 8, inTransit: 40, daysLeft: 3, daysTrend: "up", salesDay: 4, salesTrend: "+25%", risk: "95.0%", riskTrend: "up", warehouse: "Москва", color: "bg-accent-red" },
    { name: "Джинсы классика", stock: 370, stockMax: 500, reserved: 10, inTransit: 0, daysLeft: 231, daysTrend: "down", salesDay: 1.6, salesTrend: "-18%", risk: "5.0%", riskTrend: "down", warehouse: "Казань", color: "bg-accent-green" },
    { name: "Маска для волос", stock: 25, stockMax: 100, reserved: 10, inTransit: 45, daysLeft: 6, daysTrend: "up", salesDay: 4.2, salesTrend: "+14%", risk: "78.0%", riskTrend: "up", warehouse: "Москва", color: "bg-accent-orange" },
    { name: "Гантели 10кг", stock: 200, stockMax: 300, reserved: 12, inTransit: 0, daysLeft: 50, daysTrend: "down", salesDay: 4, salesTrend: "-5%", risk: "15.0%", riskTrend: "down", warehouse: "Казань", color: "bg-accent-green" },
  ];

  const goodsInTransit = [
    { item: "Смартфон X200", qty: "50 шт", ordered: "18.02.2026", arrival: "28.02.2026", wh: "Москва" },
    { item: "Куртка зимняя", qty: "80 шт", ordered: "15.02.2026", arrival: "05.03.2026", wh: "Москва" },
    { item: "Набор посуды", qty: "20 шт", ordered: "20.02.2026", arrival: "10.03.2026", wh: "Казань" },
    { item: "Тормозные колодки", qty: "36 шт", ordered: "19.02.2026", arrival: "01.03.2026", wh: "Москва" },
    { item: "Маска для волос", qty: "45 шт", ordered: "17.02.2026", arrival: "27.02.2026", wh: "Москва" },
    { item: "Масляный фильтр", qty: "30 шт", ordered: "21.02.2026", arrival: "03.03.2026", wh: "Москва" },
    { item: "Футболка базовая", qty: "100 шт", ordered: "16.02.2026", arrival: "26.02.2026", wh: "Москва" },
  ];

  const orderHistory = [
    { date: "10.02.2026", item: "Смартфон X200", qty: "100 шт", wh: "Москва", arrived: "20.02.2026" },
    { date: "05.02.2026", item: "Кофе Арабика", qty: "500 шт", wh: "Москва", arrived: "12.02.2026" },
    { date: "01.02.2026", item: "Футболка базовая", qty: "200 шт", wh: "Москва", arrived: "08.02.2026" },
    { date: "28.01.2026", item: "Крем для лица", qty: "150 шт", wh: "СПб", arrived: "05.02.2026" },
    { date: "25.01.2026", item: "Масляный фильтр", qty: "300 шт", wh: "Москва", arrived: "01.02.2026" },
    { date: "20.01.2026", item: "Куртка зимняя", qty: "100 шт", wh: "Москва", arrived: "28.01.2026" },
    { date: "15.01.2026", item: "Набор посуды", qty: "50 шт", wh: "Казань", arrived: "25.01.2026" },
  ];

  if (!isMounted) return <div className="w-full h-full bg-dark-900" />;

    const themeColors = {
      "Здоровье склада": "accent-purple",
      "Эффективность товаров": "accent-green",
      "Планирование запасов": "accent-orange"
    };
    const activeColor = themeColors[activeTab as keyof typeof themeColors];

    return (
      <main className={`w-full h-full bg-dark-900 overflow-y-auto p-6 md:p-10 custom-scrollbar transition-colors duration-700`}>
        
        {/* Dynamic Section Theme Background Glow */}
        <div className={`fixed top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 pointer-events-none -mr-48 -mt-48 transition-all duration-1000 bg-${activeColor}`}></div>

        {/* Navigation & Tab Switching */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
          <Link href="/data" className="flex items-center gap-3 text-dark-400 hover:text-white transition-all w-fit group">
             <div className="p-2 rounded-xl bg-dark-800 group-hover:bg-dark-700 transition-colors">
                <ChevronLeft className="w-4 h-4" />
             </div>
             <span className="text-sm font-bold tracking-tight uppercase tracking-widest text-[11px]">Назад на главную</span>
          </Link>
          <div className="bg-dark-800/60 p-1.5 rounded-[1.5rem] border border-card-border/50 flex items-center backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            {tabs.map(tab => {
              const tabColor = themeColors[tab as keyof typeof themeColors];
              return (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)} 
                  className={`px-10 py-3 rounded-2xl text-[13px] font-black transition-all duration-500 tracking-tight ${activeTab === tab ? `bg-${tabColor} text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] scale-105` : "text-dark-400 hover:text-white"}`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

      {activeTab === "Здоровье склада" && (
        <>
          {/* Stats & Dead Stock Visualization (Existing) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-8">
            {[
              { icon: RotateCcw, label: "Оборачиваемость", val: "21 дн.", trend: "-2.5%", color: "text-accent-purple" },
              { icon: AlertCircle, label: "Риск остатков", val: "35%", trend: "+5.2%", color: "text-accent-red" },
              { icon: Zap, label: "Быстрые продажи", val: "35%", trend: "+3.1%", color: "text-accent-green" },
              { icon: TrendingDown, label: "Низкая скорость", val: "20%", trend: "-1.8%", color: "text-accent-orange" },
              { icon: ShoppingCart, label: "Перекуплено", val: "30%", trend: "-4%", color: "text-accent-blue" },
            ].map((item, i) => (
              <div key={i} className="bg-dark-800/40 border border-card-border p-6 rounded-[2rem] hover:bg-dark-800 transition-all group">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2 bg-dark-700/50 rounded-xl ${item.color}`}><item.icon className="w-4 h-4" /></div>
                  <p className="text-[10px] text-dark-400 font-black uppercase tracking-widest">{item.label}</p>
                </div>
                <div className="flex items-end justify-between">
                  <h2 className="text-2xl font-black text-white">{item.val}</h2>
                  <span className={`text-[10px] font-bold ${item.trend.startsWith('+') ? 'text-accent-red' : 'text-accent-green'}`}>{item.trend}</span>
                </div>
              </div>
            ))}
          </div>

          <AIRecommendation color={activeColor} text="Средняя оборачиваемость выросла на 2.5%. Рекомендуется оптимизация закупок медленно движущихся товаров." />

          <div className="bg-dark-800/40 border border-card-border rounded-[2.5rem] p-10 mb-8">
            <div className="flex items-end justify-between mb-10">
              <div><h2 className="text-2xl font-black text-white mb-1 tracking-tight">Мёртвые товары</h2><p className="text-sm text-dark-400 font-medium italic">Объем зависшего капитала и динамика сбыта</p></div>
              <div className="flex items-center gap-2 px-4 py-2 bg-dark-900 rounded-xl border border-card-border"><BarChart3 className="w-4 h-4 text-accent-purple" /><span className="text-[11px] text-white font-bold tracking-wider uppercase">Analytics v3</span></div>
            </div>
            <div className="h-[400px] w-full"><ReactECharts option={deadStockOption} style={{ height: '100%', width: '100%' }} /></div>
          </div>

          {/* Detailed Table Card */}
          <div className="bg-dark-800/40 border border-card-border rounded-[2.5rem] p-10 mb-8 relative group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div><h2 className="text-2xl font-black text-white mb-1 tracking-tight">Состояние запасов</h2><p className="text-sm text-dark-400 font-medium italic">Детальная информация по каждому артикулу</p></div>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-3 px-5 py-2.5 bg-accent-green/10 border border-accent-green/20 rounded-2xl"><div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse"></div><span className="text-[11px] font-bold text-accent-green uppercase tracking-widest">4 083 шт.</span></div>
                 <div className="flex items-center gap-3 px-5 py-2.5 bg-accent-blue/10 border border-accent-blue/20 rounded-2xl"><div className="w-1.5 h-1.5 rounded-full bg-accent-blue"></div><span className="text-[11px] font-bold text-accent-blue uppercase tracking-widest">451 шт.</span></div>
                 <div className="flex items-center gap-3 px-5 py-2.5 bg-accent-orange/10 border border-accent-orange/20 rounded-2xl text-accent-orange font-bold text-[11px]"><Truck className="w-4 h-4" /><span>764 шт.</span></div>
                 <button className="p-3 bg-dark-800 rounded-xl border border-card-border hover:bg-dark-700 transition-colors"><Filter className="w-4 h-4 text-dark-300" /></button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-card-border/50"><TableHeader label="SKU" /><TableHeader label="Остаток" /><TableHeader label="Резерв" /><TableHeader label="В пути" /><TableHeader label="Дней до конца" /><TableHeader label="Продажи/день" /><TableHeader label="Риск" /><TableHeader label="Склад" sortable={false} /></tr>
                </thead>
               <tbody>
                  {stockData.map((row, i) => (
                    <tr key={i} className="group/row border-b border-card-border/30 hover:bg-white/5 transition-all">
                      <td className="py-5 px-4 font-bold text-sm text-white group-hover/row:text-accent-purple transition-colors">{row.name}</td>
                      <td className="py-5 px-4"><div className="flex flex-col gap-1.5"><span className={`text-sm font-black ${row.stock < 20 ? 'text-accent-red' : 'text-white'}`}>{row.stock}</span><div className="w-16 h-1 bg-dark-700 rounded-full overflow-hidden"><div className={`h-full ${row.color}`} style={{ width: `${(row.stock/row.stockMax)*100}%` }}></div></div></div></td>
                      <td className="py-5 px-4 text-sm text-dark-300">{row.reserved}</td>
                      <td className="py-5 px-4 text-sm text-dark-300">{row.inTransit > 0 ? <div className="flex items-center gap-1.5">{row.inTransit}<Truck className="w-3.5 h-3.5 text-accent-orange/60" /></div> : "—"}</td>
                      <td className="py-5 px-4 font-bold text-sm text-accent-green">{row.daysLeft} дн.</td>
                      <td className="py-5 px-4"><div className="flex items-center gap-2 font-bold text-white"><Sparkline /> {row.salesDay}</div></td>
                      <td className="py-5 px-4 font-black text-sm text-accent-red">{row.risk}</td>
                      <td className="py-5 px-4 text-[10px] font-black text-dark-400 uppercase tracking-widest">{row.warehouse}</td>
                    </tr>
                  ))}
               </tbody>
              </table>
            </div>
          </div>
          <AIRecommendation color={activeColor} text="5 товаров требуют срочной подсортировки. Риск дефицита по Роутерам достиг критических 95%." />
        </>
      )}

      {activeTab === "Эффективность товаров" && (
        <div className="space-y-8">
           {/* Matrix Block (The "Heavy" Bubble Chart) */}
           <div className="bg-dark-800/40 border border-card-border rounded-[2.5rem] p-10 relative overflow-hidden group">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-10">
                 <div>
                    <div className="flex items-center gap-3 mb-2">
                       <Target className="w-6 h-6 text-accent-green" />
                       <h2 className="text-2xl font-black text-white tracking-tight">Матрица оборачиваемости</h2>
                    </div>
                    <p className="text-sm text-dark-400 font-medium italic">Y — Продаж в день, X — Риск обнуления остатков</p>
                 </div>
                 {/* Internal sub-tabs */}
                 <div className="flex items-center gap-2 p-1 bg-dark-900 rounded-xl border border-card-border">
                    {["Все", "Лидеры", "Дефицит", "Неликвид", "Поддержка"].map((t, idx) => (
                       <button key={idx} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${idx === 0 ? "bg-accent-green text-white shadow-lg" : "text-dark-400 hover:text-white"}`}>{t}</button>
                    ))}
                 </div>
              </div>

              {/* Chart Area */}
              <div className="h-[600px] w-full relative z-10 p-4">
                 <ReactECharts option={bubbleOption} style={{ height: '100%', width: '100%' }} />
                 {/* Visual quadrant dividers overlay */}
                 <div className="absolute inset-0 pointer-events-none border-dashed border-dark-600 border-[1px] m-10 opacity-10">
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-dark-500"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-dark-500"></div>
                 </div>
                 {/* Cursor hint */}
                 <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 bg-dark-900/80 rounded-full border border-card-border/50 backdrop-blur">
                    <MousePointer2 className="w-3 h-3 text-accent-green" />
                    <span className="text-[9px] text-dark-400 font-bold uppercase tracking-widest leading-none">Наведите для анализа SKU</span>
                 </div>
              </div>

              {/* Background gradient deco */}
              <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-accent-purple/5 to-transparent pointer-events-none"></div>
           </div>

           <AIRecommendation color={activeColor} text="5% товаров попали в зону «Принять меры». Снижение риска дефицита для этих позиций позволит увеличить выручку на ~115 000 ₽ в месяц." />

           {/* Localization Index (ИЛ) Block */}
           <div className="bg-dark-800/40 border border-card-border rounded-[2.5rem] p-10 relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-8 relative z-10">
                 <MapPin className="w-6 h-6 text-accent-green" />
                 <h2 className="text-2xl font-black text-white tracking-tight">Индекс локализации (ИЛ)</h2>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 relative z-10">
                 {/* Left: Global Gauge */}
                 <div className="xl:col-span-4 flex flex-col items-center justify-center p-6 bg-dark-900/50 rounded-3xl border border-card-border/50">
                    <div className="w-full h-48">
                       <ReactECharts option={gaugeOption} style={{ height: '100%', width: '100%' }} />
                    </div>
                    <div className="mt-4 text-center">
                       <div className="flex items-center gap-4 justify-center mb-1">
                          <span className="text-xs font-bold text-dark-400 uppercase tracking-widest">Текущая скидка:</span>
                          <span className="text-xl font-black text-accent-green">-15%</span>
                       </div>
                       <p className="text-[10px] text-dark-500 font-medium">Ваш уровень: <span className="text-white font-bold italic">Deep Green Zone</span></p>
                    </div>
                 </div>

                 {/* Right: Product Breakdown */}
                 <div className="xl:col-span-8">
                    <div className="overflow-x-auto">
                       <table className="w-full border-separate border-spacing-y-2">
                          <thead>
                             <tr className="text-[10px] font-black text-dark-400 uppercase tracking-widest text-left">
                                <th className="px-4 pb-2">Товар</th>
                                <th className="px-4 pb-2 text-center">ИЛ (%)</th>
                                <th className="px-4 pb-2">Анализ покрытия</th>
                                <th className="px-4 pb-2 text-right">Статус</th>
                             </tr>
                          </thead>
                          <tbody className="space-y-4">
                             {[
                                { name: "Смартфон X200-Ultra", id: "WB-10293", score: 92, zones: "Мск (100%), Юг (85%)", color: "text-accent-green", bar: "bg-accent-green", status: "Цель" },
                                { name: "Чехол силиконовый Grey", id: "WB-55201", score: 68, zones: "Мск (70%), Сибирь (10%)", color: "text-accent-orange", bar: "bg-accent-orange", status: "Риск" },
                                { name: "Крем для лица (50мл)", id: "WB-99283", score: 45, zones: "Мск (40%), Юг (5%)", color: "text-accent-red", bar: "bg-accent-red", status: "Штраф" },
                             ].map((row, i) => (
                                <tr key={i} className="group/row bg-white/5 hover:bg-white/10 transition-all rounded-xl cursor-help">
                                   <td className="py-4 px-4 rounded-l-2xl">
                                      <div className="flex items-center gap-3">
                                         <div className="w-10 h-10 rounded-lg bg-dark-700 overflow-hidden flex-shrink-0">
                                            <img src={`https://picsum.photos/seed/${row.id}/40/40`} alt="" className="w-full h-full object-cover" />
                                         </div>
                                         <div className="flex flex-col">
                                            <span className="text-sm font-bold text-white group-hover/row:text-accent-green transition-colors">{row.name}</span>
                                            <span className="text-[10px] text-dark-500 font-mono">{row.id}</span>
                                         </div>
                                      </div>
                                   </td>
                                   <td className="py-4 px-4 text-center">
                                      <span className={`text-lg font-black ${row.color}`}>{row.score}%</span>
                                   </td>
                                   <td className="py-4 px-4">
                                      <div className="flex flex-col gap-1.5 max-w-[200px]">
                                         <div className="flex justify-between text-[9px] font-bold text-dark-400">
                                            <span>{row.zones}</span>
                                         </div>
                                         <div className="w-full h-1.5 bg-dark-700 rounded-full overflow-hidden">
                                            <div className={`h-full ${row.bar} shadow-[0_0_10px_rgba(0,0,0,0.5)]`} style={{ width: `${row.score}%` }}></div>
                                         </div>
                                      </div>
                                   </td>
                                   <td className="py-4 px-4 text-right rounded-r-2xl">
                                      <button className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border transition-all ${row.status === "Цель" ? "border-accent-green/30 text-accent-green bg-accent-green/5" : "border-white/5 text-dark-300 hover:border-white/20"}`}>
                                         {row.status}
                                      </button>
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>
               </div>
            </div>

            {/* Logistic Quality Funnel (New Block) */}
            <div className="bg-dark-800/40 border border-card-border rounded-[2.5rem] p-10 relative overflow-hidden group">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
                  <div>
                     <div className="flex items-center gap-3 mb-2">
                        <Activity className="w-6 h-6 text-accent-red" />
                        <h2 className="text-2xl font-black text-white tracking-tight">Воронка логистического качества</h2>
                     </div>
                     <p className="text-sm text-dark-400 font-medium italic">Анализ возвратов, брака и потерь на складах ВБ</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex flex-col items-end">
                        <span className="text-[10px] text-dark-500 font-black uppercase tracking-widest mb-1">Средний выкуп</span>
                        <span className="text-xl font-black text-accent-green">82.4%</span>
                     </div>
                     <div className="w-[1px] h-8 bg-card-border/50 mx-2"></div>
                     <div className="flex flex-col items-end">
                        <span className="text-[10px] text-dark-500 font-black uppercase tracking-widest mb-1">Уровень брака</span>
                        <span className="text-xl font-black text-accent-red">7.6%</span>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 relative z-10">
                  {/* Visual: Stacked Bar Chart */}
                  <div className="bg-dark-900/40 p-8 rounded-3xl border border-card-border/50">
                     <div className="flex items-center justify-between mb-8">
                        <span className="text-[11px] font-black text-white uppercase tracking-widest">Профили эффективности SKU</span>
                        <div className="p-2 bg-dark-800 rounded-lg border border-card-border cursor-pointer hover:bg-dark-700 transition-colors">
                           <MoreHorizontal className="w-3.5 h-3.5 text-dark-400" />
                        </div>
                     </div>
                     <div className="h-[350px] w-full">
                        <ReactECharts option={logQualityOption} style={{ height: '100%', width: '100%' }} />
                     </div>
                  </div>

                  {/* Alerts & Table with AI logic */}
                  <div className="flex flex-col gap-6">
                     <div className="space-y-4">
                        {[
                           { name: "Чайник электрич. (Black)", id: "WB-10293", buyout: "65%", defect: "15%", alert: "Выкуп упал на 15% за неделю. Проверьте отзывы, возможно, пошла бракованная партия." },
                           { name: "Крем для лица (Gold)", id: "WB-99283", buyout: "78%", defect: "12%", alert: "Высокий процент потерь (5%). Товар часто попадает в обезличку на складе Коледино." },
                           { name: "Шампунь органик", id: "WB-55201", buyout: "90%", defect: "4%", alert: "Стабильный показатель. Рекомендуется расширение линейки." },
                        ].map((row, i) => (
                           <div key={i} className={`p-6 rounded-2xl border transition-all duration-300 ${row.defect > "10%" ? "bg-accent-red/5 border-accent-red/20 hover:bg-accent-red/10" : "bg-dark-900/50 border-card-border/50 hover:bg-dark-900"}`}>
                              <div className="flex items-start justify-between mb-4">
                                 <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${row.defect > "10%" ? 'bg-accent-red/20' : 'bg-accent-green/20'}`}>
                                       {row.defect > "10%" ? <AlertTriangle className="w-4 h-4 text-accent-red" /> : <Activity className="w-4 h-4 text-accent-green" />}
                                    </div>
                                    <div>
                                       <h4 className="text-sm font-bold text-white mb-0.5">{row.name}</h4>
                                       <span className="text-[10px] text-dark-500 font-mono tracking-wider">{row.id}</span>
                                    </div>
                                 </div>
                                 <div className="text-right">
                                    <div className="text-xs font-black text-white">Выкуп: {row.buyout}</div>
                                    <div className={`text-[10px] font-bold ${row.defect > "10%" ? 'text-accent-red' : 'text-dark-400'}`}>Брак: {row.defect}</div>
                                 </div>
                              </div>
                              <div className="flex items-start gap-4 p-3 bg-dark-800/80 rounded-xl border border-card-border/30">
                                 <Sparkles className="w-3.5 h-3.5 text-accent-purple shrink-0 mt-0.5" />
                                 <p className="text-[11px] text-dark-300 leading-relaxed italic">{row.alert}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-red/5 blur-[150px] rounded-full pointer-events-none -z-10"></div>
            </div>

            {/* Space Efficiency (New Block) */}
            <div className="bg-dark-800/40 border border-card-border rounded-[2.5rem] p-10 relative overflow-hidden group">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
                  <div>
                     <div className="flex items-center gap-3 mb-2">
                        <Layers className="w-6 h-6 text-accent-blue" />
                        <h2 className="text-2xl font-black text-white tracking-tight">Литражная эффективность (Space Efficiency)</h2>
                     </div>
                     <p className="text-sm text-dark-400 font-medium italic">Отношение доли в заказах к занимаемому объему (литры)</p>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-dark-900/50 rounded-2xl border border-card-border/50">
                     <div className="flex flex-col">
                        <span className="text-[10px] text-dark-500 font-black uppercase tracking-widest leading-none mb-1">Загрузка лимита</span>
                        <span className="text-xl font-black text-white">74%</span>
                     </div>
                     <div className="w-[1px] h-8 bg-card-border mx-2"></div>
                     <Scale className="w-5 h-5 text-accent-blue" />
                  </div>
               </div>

               <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 relative z-10">
                  {/* Left: Chart */}
                  <div className="xl:col-span-8 bg-dark-900/30 rounded-3xl p-8 border border-card-border/30">
                     <div className="h-[450px] w-full">
                        <ReactECharts option={spaceEfficiencyOption} style={{ height: '100%', width: '100%' }} />
                     </div>
                  </div>

                  {/* Right: Insights & Optimization */}
                  <div className="xl:col-span-4 space-y-6">
                     <div className="p-6 bg-accent-blue/10 border border-accent-blue/20 rounded-3xl relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-4">
                           <Sparkles className="w-5 h-5 text-accent-blue" />
                           <h3 className="text-sm font-black text-white uppercase tracking-wider">AI Оптимизация места</h3>
                        </div>
                        <p className="text-xs text-dark-200 leading-relaxed italic mb-6">
                           "Артикул <span className="text-white font-bold">Медведь Плюшевый 2м</span> имеет низкую литражную эффективность. Он занимает <span className="text-accent-red font-bold">40%</span> вашего лимита на складе Коледино, но дает только <span className="text-accent-red font-bold">5%</span> от общего числа заказов. Не везите его туда большими партиями."
                        </p>
                        <button className="w-full py-3 bg-accent-blue text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-[0_10px_20px_rgba(59,130,246,0.3)]">
                           Пересмотреть поставку
                        </button>
                     </div>

                     <div className="space-y-3">
                        <h4 className="text-[10px] font-black text-dark-500 uppercase tracking-[0.2em] mb-4">Топ неэффективных SKU</h4>
                        {[
                           { name: "Коврик для йоги XL", space: "35%", orders: "8%", loss: "-27%" },
                           { name: "Набор конструктора", space: "25%", orders: "14%", loss: "-11%" },
                        ].map((item, i) => (
                           <div key={i} className="flex items-center justify-between p-4 bg-dark-800/40 rounded-2xl border border-card-border/50 group/item hover:border-accent-red/30 transition-colors">
                              <div className="flex flex-col">
                                 <span className="text-xs font-bold text-white group-hover/item:text-accent-red transition-colors">{item.name}</span>
                                 <span className="text-[9px] text-dark-500 font-medium italic">Занимает много места</span>
                              </div>
                              <div className="text-right">
                                 <div className="text-[10px] font-black text-accent-red">{item.loss}</div>
                                 <div className="text-[9px] text-dark-400 font-bold">{item.space} места</div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-blue/5 blur-[100px] rounded-full pointer-events-none -mr-20 -mt-20"></div>
            </div>
         </div>
      )}

      {activeTab === "Планирование запасов" && (
        <div className="space-y-8">
           {/* Section 1: AI Summary & Fast Stats */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Quick Summary Cards */}
                 <div className="bg-dark-800/40 border border-card-border p-8 rounded-[2rem] relative group hover:bg-dark-800 transition-all">
                    <div className="flex items-center gap-4 mb-6">
                       <div className="p-3 bg-accent-orange/10 rounded-2xl">
                          <Wallet className="w-5 h-5 text-accent-orange" />
                       </div>
                       <div>
                          <p className="text-[10px] text-dark-400 font-black uppercase tracking-widest">Бюджет поставки</p>
                          <h3 className="text-2xl font-black text-white">4 250 000 ₽</h3>
                       </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-dark-900/50 rounded-xl border border-card-border/50">
                       <span className="text-[10px] text-dark-400 font-bold">Окупаемость (EBITDA)</span>
                       <span className="text-xs font-black text-accent-green">+24.5%</span>
                    </div>
                 </div>

                 <div className="bg-dark-800/40 border border-card-border p-8 rounded-[2rem] relative group hover:bg-dark-800 transition-all flex flex-col justify-between">
                    <div className="flex items-center gap-4 mb-6">
                       <div className="p-3 bg-accent-green/10 rounded-2xl">
                          <Package className="w-5 h-5 text-accent-green" />
                       </div>
                       <div>
                          <p className="text-[10px] text-dark-400 font-black uppercase tracking-widest">Артикулов в плане</p>
                          <h3 className="text-2xl font-black text-white">124 SKU</h3>
                       </div>
                    </div>
                    <p className="text-[11px] text-dark-300 leading-relaxed mt-auto">
                       <span className="text-accent-red font-bold">15 товаров</span> требуют немедленной отгрузки до <span className="text-white font-bold">18 апреля</span>.
                    </p>
                 </div>

                 <div className="bg-accent-orange/10 border border-accent-orange/20 p-8 rounded-[2rem] relative overflow-hidden flex flex-col justify-between">
                    <div className="relative z-10">
                       <div className="flex items-center gap-3 mb-4">
                          <Calendar className="w-5 h-5 text-accent-orange" />
                          <h3 className="text-sm font-black text-white uppercase tracking-wider">Дата ближайшей отгрузки</h3>
                       </div>
                       <h2 className="text-3xl font-black text-white mb-2">16 Апреля</h2>
                       <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent-orange animate-pulse"></div>
                          <span className="text-[10px] font-black text-dark-200 uppercase tracking-widest">Склад: Коледино / Электросталь</span>
                       </div>
                    </div>
                    <div className="absolute top-0 right-0 p-8 text-accent-orange/20"><Truck className="w-20 h-20" /></div>
                 </div>
           </div>

           <AIRecommendation color="accent-orange" text="Для минимизации логистических затрат рекомендуется разделить поставку: 70% на Коледино (высокий спрос) и 30% на Казань (региональное покрытие)." />

           {/* Detailed Planning Table */}
           <div className="bg-dark-800/40 border border-card-border rounded-[2.5rem] p-10 relative group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                 <div>
                    <h2 className="text-2xl font-black text-white mb-1 tracking-tight">Рекомендованный план поставок</h2>
                    <p className="text-sm text-dark-400 italic">Сгенерировано AI на основе трендов за последние 90 дней</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <button className="flex items-center gap-3 px-6 py-3 bg-accent-orange text-white rounded-2xl font-black text-[12px] uppercase tracking-widest hover:scale-105 transition-all shadow-[0_15px_30px_rgba(255,169,77,0.3)]">
                       <TrendingUp className="w-4 h-4" />
                       Оформить в ЛК WB
                    </button>
                 </div>
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full">
                    <thead>
                       <tr className="border-b border-card-border/50">
                          <TableHeader label="Товар" />
                          <TableHeader label="Текущий сток" />
                          <TableHeader label="Рекомендовано" />
                          <TableHeader label="Прогноз продаж" />
                          <TableHeader label="Склад" sortable={false} />
                          <TableHeader label="Инвестиции" />
                          <th className="py-4 px-4 text-right">Статус</th>
                       </tr>
                    </thead>
                    <tbody>
                       {[
                          { name: "Смартфон X200", current: 450, recommended: 200, forecast: 18.2, budget: "1.2M ₽", warehouse: "Коледино", status: "Критично", color: "text-accent-red" },
                          { name: "Роутер Wi-Fi 6", current: 5, recommended: 150, forecast: 12.5, budget: "640k ₽", warehouse: "Электросталь", status: "Критично", color: "text-accent-red" },
                          { name: "Крем для лица", current: 154, recommended: 300, forecast: 5.4, budget: "120k ₽", warehouse: "Казань", status: "В норме", color: "text-accent-green" },
                          { name: "Шампунь органик", current: 20, recommended: 100, forecast: 8.1, budget: "45k ₽", warehouse: "СПб", status: "Риск дефицита", color: "text-accent-orange" },
                       ].map((row, i) => (
                          <tr key={i} className="group/row border-b border-card-border/30 hover:bg-white/5 transition-all">
                             <td className="py-6 px-4">
                                <span className="font-bold text-sm text-white group-hover/row:text-accent-orange transition-colors">{row.name}</span>
                             </td>
                             <td className="py-6 px-4 text-sm text-dark-300 font-bold">{row.current} шт.</td>
                             <td className="py-6 px-4">
                                <div className="px-3 py-1 bg-accent-orange/10 border border-accent-orange/20 rounded-lg w-fit">
                                   <span className="text-sm font-black text-accent-orange">+{row.recommended} шт.</span>
                                </div>
                             </td>
                             <td className="py-6 px-4 text-sm text-white font-black">{row.forecast} ед/дн</td>
                             <td className="py-6 px-4 text-[10px] font-black text-dark-500 uppercase tracking-widest">{row.warehouse}</td>
                             <td className="py-6 px-4 text-sm text-dark-200 font-bold">{row.budget}</td>
                             <td className="py-6 px-4 text-right">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${row.color}`}>{row.status}</span>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>

           {/* Warehouse Distribution Block */}
           <div className="bg-dark-800/40 border border-card-border rounded-[2.5rem] p-10 relative group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                 <div>
                    <div className="flex items-center gap-3 mb-2">
                       <Building2 className="w-6 h-6 text-accent-orange" />
                       <h2 className="text-2xl font-black text-white tracking-tight">Распределение по складам</h2>
                    </div>
                    <p className="text-sm text-dark-400 italic">Сводка по загруженности, остаткам и стоимости логистики</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-dark-900 border border-card-border rounded-xl text-[10px] font-black text-white hover:bg-dark-800 transition-all">
                       <Database className="w-3.5 h-3.5 text-accent-orange" />
                       <span>Управление лимитами</span>
                    </button>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                    { name: "Коледино", type: "Центральный", items: 45, stock: 12450, capacity: 85, logCost: "55 ₽", storeCost: "0.15 ₽", status: "Высокая нагрузка", color: "text-accent-red", bar: "bg-accent-red" },
                    { name: "Электросталь", type: "Центральный", items: 32, stock: 8300, capacity: 45, logCost: "50 ₽", storeCost: "0.12 ₽", status: "Оптимально", color: "text-accent-green", bar: "bg-accent-green" },
                    { name: "Казань", type: "Региональный", items: 120, stock: 25000, capacity: 92, logCost: "40 ₽", storeCost: "0.10 ₽", status: "Перегруз", color: "text-accent-orange", bar: "bg-accent-orange" },
                    { name: "Краснодар", type: "Региональный", items: 18, stock: 3200, capacity: 25, logCost: "65 ₽", storeCost: "0.18 ₽", status: "Доступен", color: "text-accent-blue", bar: "bg-accent-blue" },
                 ].map((wh, idx) => (
                    <div key={idx} className="p-6 bg-dark-900/50 rounded-3xl border border-card-border/50 hover:bg-dark-800/80 transition-all group/card">
                       <div className="flex justify-between items-start mb-6">
                          <div>
                             <h4 className="text-lg font-black text-white mb-1 group-hover/card:text-accent-orange transition-colors">{wh.name}</h4>
                             <span className="text-[10px] font-bold text-dark-400 uppercase tracking-widest">{wh.type}</span>
                          </div>
                          <span className={`px-2 py-1 flex-shrink-0 text-center rounded-md text-[9px] font-black uppercase tracking-wider bg-dark-800 border border-card-border/50 ${wh.color}`}>
                             {wh.status}
                          </span>
                       </div>

                       <div className="flex justify-between items-center mb-6 p-4 bg-dark-800/50 rounded-2xl border border-card-border/30">
                          <div className="text-center w-1/2">
                             <div className="text-[10px] text-dark-500 font-bold uppercase tracking-widest mb-1">Артикулов</div>
                             <div className="text-sm font-black text-white">{wh.items}</div>
                          </div>
                          <div className="w-[1px] h-8 bg-card-border/50"></div>
                          <div className="text-center w-1/2">
                             <div className="text-[10px] text-dark-500 font-bold uppercase tracking-widest mb-1">Остаток</div>
                             <div className="text-sm font-black text-white">{wh.stock.toLocaleString('ru-RU')}</div>
                          </div>
                       </div>

                       <div className="space-y-4">
                          <div>
                             <div className="flex justify-between text-[10px] font-bold mb-1.5">
                                <span className="text-dark-400 uppercase tracking-widest">Загрузка лимитов</span>
                                <span className="text-white">{wh.capacity}%</span>
                             </div>
                             <div className="w-full h-1.5 bg-dark-700/50 rounded-full overflow-hidden">
                                <div className={`h-full ${wh.bar}`} style={{ width: `${wh.capacity}%` }}></div>
                             </div>
                          </div>
                          <div className="flex justify-between items-center pt-3 border-t border-card-border/20">
                             <span className="text-[10px] text-dark-400 font-medium">Базовая логистика</span>
                             <span className="text-xs font-bold text-white">{wh.logCost}</span>
                          </div>
                          <div className="flex justify-between items-center">
                             <span className="text-[10px] text-dark-400 font-medium">Хранение (шт/сут)</span>
                             <span className="text-xs font-bold text-white">{wh.storeCost}</span>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Section 4: Movement and History Tables */}
           <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Goods in Transit */}
              <div className="bg-dark-800/40 border border-card-border p-8 rounded-[2.5rem] relative overflow-hidden flex flex-col">
                 <div className="flex justify-between items-center mb-8">
                    <div>
                       <h2 className="text-xl font-black text-white tracking-tight">Товары в пути</h2>
                       <p className="text-[10px] text-dark-400 font-bold tracking-widest mt-1 uppercase">10 активных заказов</p>
                    </div>
                 </div>
                 
                 <div className="overflow-x-auto custom-scrollbar flex-1 -mx-2 px-2">
                    <table className="w-full text-left whitespace-nowrap border-collapse">
                       <thead>
                          <tr className="border-b border-card-border/50 text-dark-400 text-[10px] font-black uppercase tracking-widest">
                             <th className="pb-4 font-bold"><div className="flex items-center gap-1">Товар <ArrowUpDown className="w-3 h-3 opacity-50" /></div></th>
                             <th className="pb-4 font-bold"><div className="flex items-center gap-1">Кол-во <ArrowUpDown className="w-3 h-3 opacity-50" /></div></th>
                             <th className="pb-4 font-bold"><div className="flex items-center gap-1">Заказан <ArrowUpDown className="w-3 h-3 opacity-50" /></div></th>
                             <th className="pb-4 font-bold"><div className="flex items-center gap-1">Прибытие <ArrowUpDown className="w-3 h-3 opacity-50" /></div></th>
                             <th className="pb-4 font-bold text-right pt-0">Склад</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-card-border/10 text-xs text-white/90">
                          {goodsInTransit.map((row, idx) => (
                             <tr key={idx} className="hover:bg-dark-800/50 transition-colors group">
                                <td className="py-4 font-bold text-white group-hover:text-accent-orange transition-colors pr-6">{row.item}</td>
                                <td className="py-4 font-medium text-dark-200 pr-6">{row.qty}</td>
                                <td className="py-4 font-medium text-dark-300 pr-6">{row.ordered}</td>
                                <td className="py-4 font-medium text-dark-200 pr-6">{row.arrival}</td>
                                <td className="py-4 font-bold text-dark-400 text-right">{row.wh}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>

              {/* Order History */}
              <div className="bg-dark-800/40 border border-card-border p-8 rounded-[2.5rem] relative overflow-hidden flex flex-col">
                 <div className="flex justify-between items-center mb-8">
                    <div>
                       <h2 className="text-xl font-black text-white tracking-tight">История заказов</h2>
                       <p className="text-[10px] text-dark-400 font-bold tracking-widest mt-1 uppercase">Выполненные поставки</p>
                    </div>
                 </div>

                 <div className="overflow-x-auto custom-scrollbar flex-1 -mx-2 px-2">
                    <table className="w-full text-left whitespace-nowrap border-collapse">
                       <thead>
                          <tr className="border-b border-card-border/50 text-dark-400 text-[10px] font-black uppercase tracking-widest">
                             <th className="pb-4 font-bold"><div className="flex items-center gap-1">Дата <ArrowUpDown className="w-3 h-3 opacity-50" /></div></th>
                             <th className="pb-4 font-bold"><div className="flex items-center gap-1">Товар <ArrowUpDown className="w-3 h-3 opacity-50" /></div></th>
                             <th className="pb-4 font-bold"><div className="flex items-center gap-1">Кол-во <ArrowUpDown className="w-3 h-3 opacity-50" /></div></th>
                             <th className="pb-4 font-bold"><div className="flex items-center gap-1">Склад <ArrowUpDown className="w-3 h-3 opacity-50" /></div></th>
                             <th className="pb-4 font-bold text-right pt-0">Прибыл</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-card-border/10 text-xs text-white/90">
                          {orderHistory.map((row, idx) => (
                             <tr key={idx} className="hover:bg-dark-800/50 transition-colors group">
                                <td className="py-4 font-medium text-dark-300 pr-6">{row.date}</td>
                                <td className="py-4 font-bold text-white group-hover:text-accent-orange transition-colors pr-6">{row.item}</td>
                                <td className="py-4 font-medium text-dark-200 pr-6">{row.qty}</td>
                                <td className="py-4 font-medium text-dark-400 pr-6">{row.wh}</td>
                                <td className="py-4 font-black text-accent-green text-right">{row.arrived}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
        </div>
      )}

      <footer className="mt-16 text-center pb-12 opacity-50">
         <p className="text-[10px] text-dark-500 font-black uppercase tracking-[0.4em]">Analytics Platform • v2.8 High Intensity Architecture</p>
      </footer>
    </main>
  );
}

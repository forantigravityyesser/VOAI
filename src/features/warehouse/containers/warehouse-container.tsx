"use client";

import React, { useMemo, useState, useEffect } from "react";
import * as echarts from "echarts";
import WarehouseView from "../components/warehouse-view";
import { warehouseService } from "../services/warehouse.service";
import { WarehouseTab } from "@/core/types/warehouse.types";

export default function WarehouseContainer() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<WarehouseTab>("Здоровье склада");

interface ChartDataPoint {
  value: number | number[];
  name?: string;
  speed?: string | number;
  daysWithout?: number;
  stock?: number;
  cost?: number;
  status?: string;
  x?: number;
  y?: number;
}

interface ChartFormatterParam {
  name: string;
  data: ChartDataPoint;
  dataIndex: number;
  seriesName: string;
  color: string;
  value: number | number[];
}


  const data = useMemo(() => warehouseService.getInitialData(), []);


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

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
        formatter: (params: unknown) => {
          const item = (Array.isArray(params) ? params[0] : params) as ChartFormatterParam;
          const pointData = item.data;
          return `
            <div style="font-family: Inter, sans-serif;">
              <div style="font-weight: 800; margin-bottom: 8px; color: #fff; font-size: 14px;">${item.name}</div>
              <div style="font-size: 11px; color: #9099b7;">Остаток: <b style="color:#fff">${pointData.value} шт</b></div>
              <div style="font-size: 11px; color: #9099b7;">Продаж/день: <b style="color:#fff">${pointData.speed}</b></div>
              <div style="font-size: 11px; color: #9099b7;">Без продаж: <b style="color:#ff4757">${pointData.daysWithout} дней</b></div>
            </div>
          `;
        }
      },
      grid: { left: '2%', right: '2%', bottom: '15%', top: '5%', containLabel: true },
      xAxis: {
        type: 'category',
        data: data.deadStock.map(d => d.name),
        axisLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.05)' } },
        axisLabel: { 
          color: '#687092', fontSize: 10, interval: 0,
          formatter: (val: string, index: number) => {
            const item = data.deadStock[index];
            return `{name|${val}}\n{speed|${item.speed}}`;
          },
          rich: {
            name: { color: '#9099b7', fontSize: 10, padding: [0, 0, 4, 0] },
            speed: { color: '#3d4567', fontSize: 9, fontWeight: 700 }
          }
        }
      },
      yAxis: { 
        type: 'value', 
        max: Math.max(...data.deadStock.map(d => d.value)) + 200, 
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
          color: (params: { dataIndex: number }) => {
            const colors = [['#ff4757', '#ff6b81'], ['#ffa94d', '#ffc078'], ['#ff4757', '#ff6b81'], ['#ffa94d', '#ffc078'], ['#00d68f', '#2ce69b'], ['#00d68f', '#2ce69b']];
            const idx = params.dataIndex % colors.length;
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: colors[idx][1] }, { offset: 1, color: colors[idx][0] }]);
          }
        },
        data: data.deadStock.map(d => ({
          value: d.value,
          speed: d.speed,
          daysWithout: d.daysWithout
        }))
      }]
    };
  }, [isMounted, data.deadStock]);

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
        formatter: (params: unknown) => {
          const item = (Array.isArray(params) ? params[0] : params) as ChartFormatterParam;
          const itemData = item.data;
          return `
            <div style="font-family: Inter, sans-serif; min-width: 180px;">
              <div style="font-weight: 800; margin-bottom: 12px; color: #fff; font-size: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">${itemData.name}</div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: #9099b7; font-size: 11px;">Остаток:</span>
                <b style="color: #fff; font-size: 11px;">${itemData.stock} шт</b>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: #9099b7; font-size: 11px;">В пути:</span>
                <b style="color: #ffa94d; font-size: 11px;">${itemData.transit} шт</b>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: #9099b7; font-size: 11px;">Продажи/день:</span>
                <b style="color: #fff; font-size: 11px;">${itemData.speed}</b>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: #9099b7; font-size: 11px;">Тренд:</span>
                <b style="${itemData.trend.includes('-') ? 'color: #ff4757' : 'color: #00d68f'}; font-size: 11px;">${itemData.trend}</b>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: #9099b7; font-size: 11px;">Выкуп:</span>
                <b style="color: #fff; font-size: 11px;">${itemData.buyout}%</b>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                <span style="color: #9099b7; font-size: 11px;">Закончится:</span>
                <b style="color: #ff4757; font-size: 11px;">через ${itemData.endDays} дн.</b>
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
            { value: [5, 25, 25], name: 'Смартфон X200', stock: 450, transit: 10, speed: 25.2, trend: '+12%', buyout: 94, endDays: 18, itemStyle: { color: '#00d68f', shadowBlur: 20, shadowColor: 'rgba(0,214,143,0.3)' } },
            { value: [85, 22, 18], name: 'Роутер Wi-Fi 6', stock: 5, transit: 40, speed: 22.4, trend: '+35%', buyout: 96, endDays: 2, itemStyle: { color: '#ff4757', shadowBlur: 20, shadowColor: 'rgba(255,71,87,0.3)' } },
            { value: [15, 8, 12], name: 'Крем для лица', stock: 154, transit: 0, speed: 8.1, trend: '+2%', buyout: 88, endDays: 19, itemStyle: { color: '#00b8d9', shadowBlur: 20, shadowColor: 'rgba(0,184,217,0.3)' } },
            { value: [50, 4, 15], name: 'Шампунь органик', stock: 20, transit: 30, speed: 4.2, trend: '-4%', buyout: 91, endDays: 5, itemStyle: { color: '#00b8d9', shadowBlur: 20, shadowColor: 'rgba(0,184,217,0.3)' } },
            { value: [95, 1.2, 10], name: 'Чайник электрич.', stock: 2, transit: 0, speed: 1.2, trend: '-22%', buyout: 72, endDays: 1, itemStyle: { color: '#706fd3', shadowBlur: 20, shadowColor: 'rgba(112,111,211,0.3)' } },
            { value: [10, 18, 22], name: 'Набор посуды', stock: 210, transit: 20, speed: 18.6, trend: '-15%', buyout: 85, endDays: 11, itemStyle: { color: '#00d68f', shadowBlur: 20, shadowColor: 'rgba(0,214,143,0.3)' } },
            { value: [70, 14, 14], name: 'Куртка зимняя', stock: 18, transit: 5, speed: 14.5, trend: '+5%', buyout: 78, endDays: 3, itemStyle: { color: '#ff4757', shadowBlur: 20, shadowColor: 'rgba(255,71,87,0.3)' } }
          ],
          symbolSize: (dataVal: number[]) => dataVal[2] * 2,
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
    if (!isMounted) return {};
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
        formatter: (params: unknown) => {
          const paramsArray = (Array.isArray(params) ? params : [params]) as ChartFormatterParam[];
          let res = `<div style="font-family: Inter, sans-serif; padding: 5px;">
            <div style="font-weight: 800; margin-bottom: 8px;">${paramsArray[0].name}</div>`;
          paramsArray.forEach((p: ChartFormatterParam) => {
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
        formatter: (params: unknown) => {
          const item = (Array.isArray(params) ? params[0] : params) as ChartFormatterParam;
          const itemData = item.data;
          const val = itemData.value as number[];
          return `
            <div style="font-family: Inter, sans-serif; padding: 10px;">
              <div style="font-weight: 800; margin-bottom: 8px; color: #fff; font-size: 14px;">${itemData.name}</div>
              <div style="display: flex; justify-content: space-between; gap: 20px; font-size: 11px; margin-bottom: 4px;">
                <span style="color: #9099b7;">Занято места:</span>
                <b style="color:#ffa94d">${val[0]}% лимита</b>
              </div>
              <div style="display: flex; justify-content: space-between; gap: 20px; font-size: 11px; margin-bottom: 4px;">
                <span style="color: #9099b7;">Доля в заказах:</span>
                <b style="color:#00d68f">${val[1]}%</b>
              </div>
              <div style="display: flex; justify-content: space-between; gap: 20px; font-size: 11px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 6px; margin-top: 4px;">
                <span style="color: #9099b7;">Эффективность:</span>
                <b style="color:#fff">${(val[1] / val[0]).toFixed(2)} x</b>
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
        symbolSize: (val: number[]) => Math.sqrt(val[2]) * 8,
        itemStyle: {
          color: (params: { data: ChartDataPoint }) => {
             const val = params.data.value as number[];
             const ratio = val[1] / val[0];
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

  return (
    <WarehouseView
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isMounted={isMounted}
      deadStockOption={deadStockOption}
      bubbleOption={bubbleOption}
      gaugeOption={gaugeOption}
      logQualityOption={logQualityOption}
      spaceEfficiencyOption={spaceEfficiencyOption}
      stockData={data.stocks}
      goodsInTransit={data.transit}
      orderHistory={data.orders}
      deadStockData={data.deadStock}
      distribution={data.distribution}
      localizationData={data.localization}
      recommendedPlans={data.recommendedPlans}
    />

  );
}

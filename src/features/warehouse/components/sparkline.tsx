import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

export const Sparkline = () => {
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

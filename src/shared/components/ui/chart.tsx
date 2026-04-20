"use client";

import dynamic from "next/dynamic";
import type { EChartsReactProps } from "echarts-for-react";

const ReactECharts = dynamic(() => import("echarts-for-react"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-dark-800/10 animate-pulse rounded-2xl" />,
});

export const Chart = (props: EChartsReactProps) => {
  return <ReactECharts {...props} />;
};

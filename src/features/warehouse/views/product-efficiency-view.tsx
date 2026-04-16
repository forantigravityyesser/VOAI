import React from "react";
import ReactECharts from "echarts-for-react";
import { 
  Target, 
  MousePointer2, 
  MapPin, 
  Activity, 
  MoreHorizontal, 
  AlertTriangle, 
  Layers, 
  Scale,
  Sparkles
} from "lucide-react";
import { AIRecommendation } from "../components/ai-recommendation";

import { LocalizationItem } from "@/core/types/warehouse.types";

import { EChartsOption } from "echarts";
import Image from "next/image";

interface ProductEfficiencyViewProps {
  bubbleOption: EChartsOption;
  gaugeOption: EChartsOption;
  logQualityOption: EChartsOption;
  spaceEfficiencyOption: EChartsOption;
  activeColor: string;
  localizationData: LocalizationItem[];
}

export function ProductEfficiencyView({
  bubbleOption,
  gaugeOption,
  logQualityOption,
  spaceEfficiencyOption,
  activeColor,
  localizationData
}: ProductEfficiencyViewProps) {

  return (
    <div className="space-y-8">
      {/* Matrix Block */}
      <div className="bg-dark-800/40 border border-card-border rounded-[2.5rem] p-10 relative overflow-hidden group">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-6 h-6 text-accent-green" />
              <h2 className="text-2xl font-black text-white tracking-tight">Матрица оборачиваемости</h2>
            </div>
            <p className="text-sm text-dark-400 font-medium italic">Y — Продаж в день, X — Риск обнуления остатков</p>
          </div>
          <div className="flex items-center gap-2 p-1 bg-dark-900 rounded-xl border border-card-border">
            {["Все", "Лидеры", "Дефицит", "Неликвид", "Поддержка"].map((t, idx) => (
              <button key={idx} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${idx === 0 ? "bg-accent-green text-white shadow-lg" : "text-dark-400 hover:text-white"}`}>{t}</button>
            ))}
          </div>
        </div>

        <div className="h-[600px] w-full relative z-10 p-4">
          <ReactECharts option={bubbleOption} style={{ height: '100%', width: '100%' }} />
          <div className="absolute inset-0 pointer-events-none border-dashed border-dark-600 border-[1px] m-10 opacity-10">
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-dark-500"></div>
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-dark-500"></div>
          </div>
          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 bg-dark-900/80 rounded-full border border-card-border/50 backdrop-blur">
            <MousePointer2 className="w-3 h-3 text-accent-green" />
            <span className="text-[9px] text-dark-400 font-bold uppercase tracking-widest leading-none">Наведите для анализа SKU</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-accent-purple/5 to-transparent pointer-events-none"></div>
      </div>

      <AIRecommendation color={activeColor} text="5% товаров попали в зону «Принять меры». Снижение риска дефицита для этих позиций позволит увеличить выручку на ~115 000 ₽ в месяц." />

      {/* Index Localization (ИЛ) Block */}
      <div className="bg-dark-800/40 border border-card-border rounded-[2.5rem] p-10 relative overflow-hidden group">
        <div className="flex items-center gap-3 mb-8 relative z-10">
          <MapPin className="w-6 h-6 text-accent-green" />
          <h2 className="text-2xl font-black text-white tracking-tight">Индекс локализации (ИЛ)</h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 relative z-10">
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
                  {localizationData.map((row, i) => (
                    <tr key={i} className="group/row bg-white/5 hover:bg-white/10 transition-all rounded-xl cursor-help">
                      <td className="py-4 px-4 rounded-l-2xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-dark-700 overflow-hidden flex-shrink-0 relative">
                            <Image 
                              src={`https://picsum.photos/seed/${row.id}/40/40`} 
                              alt={row.name} 
                              fill
                              className="object-cover" 
                            />
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
                        <button className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border transition-all ${row.status === "Локализовано" ? "border-accent-green/30 text-accent-green bg-accent-green/5" : "border-white/5 text-dark-300 hover:border-white/20"}`}>
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

      {/* Logistic Quality Funnel */}
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

      {/* Space Efficiency */}
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
          <div className="xl:col-span-8 bg-dark-900/30 rounded-3xl p-8 border border-card-border/30">
            <div className="h-[450px] w-full">
              <ReactECharts option={spaceEfficiencyOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>

          <div className="xl:col-span-4 space-y-6">
            <div className="p-6 bg-accent-blue/10 border border-accent-blue/20 rounded-3xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-accent-blue" />
                <h3 className="text-sm font-black text-white uppercase tracking-wider">AI Оптимизация места</h3>
              </div>
              <p className="text-xs text-dark-200 leading-relaxed italic mb-6">
                &quot;Артикул <span className="text-white font-bold">Медведь Плюшевый 2м</span> имеет низкую литражную эффективность. Он занимает <span className="text-accent-red font-bold">40%</span> вашего лимита на складе Коледино, но дает только <span className="text-accent-red font-bold">5%</span> от общего числа заказов. Не везите его туда большими партиями.&quot;
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
  );
}

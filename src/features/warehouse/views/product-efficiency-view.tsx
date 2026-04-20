import React from "react";
import { Chart } from "@/shared/components/ui/chart";
import { 
  Target, 
  MousePointer2, 
  MapPin, 
  Activity, 
  AlertTriangle, 
  Layers, 
  Scale,
  Sparkles
} from "lucide-react";
import { AIRecommendation } from "../components/ai-recommendation";
import { SkuDrilldownModal } from "../components/sku-drilldown-modal";
import { LogisticsAnalysisModal, LogisticsScenarioType } from "../components/logistics-analysis-modal";
import { LocalizationDrilldownModal } from "../components/localization-drilldown-modal";
import { SpaceEfficiencyModal } from "../components/space-efficiency-modal";
import { useState } from "react";

import { LocalizationItem } from "@/core/types/warehouse.types";

import { EChartsOption } from "echarts";
import Image from "next/image";

interface ProductEfficiencyViewProps {
  bubbleOption: EChartsOption;
  gaugeOption: EChartsOption;
  spaceEfficiencyOption: EChartsOption;
  activeColor: string;
  localizationData: LocalizationItem[];
}

export function ProductEfficiencyView({
  bubbleOption,
  gaugeOption,
  spaceEfficiencyOption,
  activeColor,
  localizationData
}: ProductEfficiencyViewProps) {
  const [isSkuModalOpen, setIsSkuModalOpen] = useState(false);
  const [selectedSku, setSelectedSku] = useState<{ id: string, name: string, category: string, status: string, quadrant: 'deficit' | 'leader' | 'stable' | 'slow' } | undefined>(undefined);

  const [isLogisticsModalOpen, setIsLogisticsModalOpen] = useState(false);
  const [logisticsScenario, setLogisticsScenario] = useState<LogisticsScenarioType>("defect");

  const [isLocalizationModalOpen, setIsLocalizationModalOpen] = useState(false);
  const [selectedLocalizationProduct, setSelectedLocalizationProduct] = useState<{ id: string, name: string, score: number, image?: string } | undefined>(undefined);

  const [isSpaceModalOpen, setIsSpaceModalOpen] = useState(false);
  const [selectedSpaceProduct, setSelectedSpaceProduct] = useState<{ id: string, name: string, volume: string } | undefined>(undefined);

  const onChartClick = (params: { componentType: string, data: (string | number)[], value: number[] }) => {
    if (params.componentType === 'series') {
      // Mocking SKU identification from bubble click
      setSelectedSku({
        id: "WB-" + Math.floor(Math.random() * 900000 + 100000),
        name: (params.data[2] as string) || "Товар из матрицы",
        category: "Базовая категория",
        status: params.value[1] > 70 ? "Критический дефицит" : "Лидер продаж",
        quadrant: params.value[1] > 70 ? 'deficit' : 'leader'
      });
      setIsSkuModalOpen(true);
    }
  };

  const onSpaceChartClick = (params: { componentType: string, data: (string | number)[], value: number[] }) => {
    if (params.componentType === 'series') {
      setSelectedSpaceProduct({
        id: "WB-" + Math.floor(Math.random() * 900000 + 100000),
        name: (params.data[2] as string) || "Крупногабаритный товар",
        volume: params.value[0] + " Литров"
      });
      setIsSpaceModalOpen(true);
    }
  };

  const openLogisticsModal = (scenario: LogisticsScenarioType) => {
    setLogisticsScenario(scenario);
    setIsLogisticsModalOpen(true);
  };

  const openLocalizationModal = (product: { id: string, name: string, score: number, image?: string }) => {
    setSelectedLocalizationProduct(product);
    setIsLocalizationModalOpen(true);
  };

  const openSpaceModal = (product: { id: string, name: string, volume: string }) => {
    setSelectedSpaceProduct(product);
    setIsSpaceModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <SkuDrilldownModal 
        isOpen={isSkuModalOpen} 
        onClose={() => setIsSkuModalOpen(false)} 
        skuData={selectedSku}
      />
      
      <LogisticsAnalysisModal 
        isOpen={isLogisticsModalOpen}
        onClose={() => setIsLogisticsModalOpen(false)}
        scenario={logisticsScenario}
      />

      <LocalizationDrilldownModal 
        isOpen={isLocalizationModalOpen}
        onClose={() => setIsLocalizationModalOpen(false)}
        productData={selectedLocalizationProduct}
      />

      <SpaceEfficiencyModal 
        isOpen={isSpaceModalOpen}
        onClose={() => setIsSpaceModalOpen(false)}
        productData={selectedSpaceProduct}
      />

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
          <Chart 
            option={bubbleOption} 
            style={{ height: '100%', width: '100%' }} 
            onEvents={{ 'click': onChartClick }}
          />
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
              <Chart option={gaugeOption} style={{ height: '100%', width: '100%' }} />
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
                    <tr 
                      key={i} 
                      onClick={() => openLocalizationModal(row)}
                      className="group/row bg-white/5 hover:bg-white/10 transition-all rounded-xl cursor-pointer"
                    >
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
          <div className="xl:col-span-1 bg-dark-900/40 rounded-3xl border border-card-border/50 flex flex-col overflow-hidden">
            <div className="p-8 border-b border-card-border/30 bg-dark-900/60 sticky top-0 z-20">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-black text-white uppercase tracking-widest">Профили эффективности SKU</span>
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-1.5">
                     <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                     <span className="text-[9px] text-dark-500 font-bold uppercase tracking-wider">Выкуп</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                     <div className="w-1.5 h-1.5 rounded-full bg-accent-red" />
                     <span className="text-[9px] text-dark-500 font-bold uppercase tracking-wider">Брак</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                     <div className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                     <span className="text-[9px] text-dark-500 font-bold uppercase tracking-wider">Потери</span>
                   </div>
                </div>
              </div>
              {/* Static Scale / Axis */}
              <div className="relative h-6 flex items-end">
                {[0, 20, 40, 60, 80, 100].map(val => (
                  <div key={val} className="absolute flex flex-col items-center" style={{ left: `${val}%`, transform: 'translateX(-50%)' }}>
                    <span className="text-[9px] font-bold text-dark-600 mb-1">{val}%</span>
                    <div className="w-[1px] h-1.5 bg-card-border/50" />
                  </div>
                ))}
                <div className="w-full h-[1px] bg-card-border/30" />
              </div>
            </div>

            <div className="h-[500px] overflow-y-auto custom-scrollbar p-8 pt-4 space-y-14">
               {[
                 { name: "Смартфон X200", id: "WB-29381", buyout: 85, defect: 5, loss: 10 },
                 { name: "Роутер Wi-Fi 6", id: "WB-11203", buyout: 92, defect: 2, loss: 6 },
                 { name: "Крем для лица", id: "WB-55443", buyout: 78, defect: 12, loss: 10 },
                 { name: "Шампунь", id: "WB-88771", buyout: 90, defect: 4, loss: 6 },
                 { name: "Чайник", id: "WB-10293", buyout: 65, defect: 15, loss: 20 },
                 { name: "Наушники Air-Pro", id: "WB-22810", buyout: 82, defect: 10, loss: 8 },
                 { name: "Увлажнитель воздуха", id: "WB-33441", buyout: 74, defect: 16, loss: 10 },
                 { name: "Чехол Silicone", id: "WB-11223", buyout: 95, defect: 2, loss: 3 },
                 { name: "Лампа LED", id: "WB-44556", buyout: 68, defect: 20, loss: 12 },
                 { name: "Набор кистей", id: "WB-77889", buyout: 88, defect: 5, loss: 7 }
               ].map((item, idx) => (
                 <div key={idx} className="group flex flex-col gap-2.5">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs font-bold text-dark-300 group-hover:text-white transition-colors">{item.name}</span>
                      <span className="text-[10px] font-mono text-dark-600">{item.id}</span>
                    </div>
                    <div className="h-4 w-full bg-dark-800 rounded-full overflow-hidden flex relative shadow-inner">
                       {/* Background grid indicators */}
                       <div className="absolute inset-0 flex justify-between px-[20%] pointer-events-none opacity-20">
                          <div className="w-[1px] h-full bg-dark-500" />
                          <div className="w-[1px] h-full bg-dark-500" />
                          <div className="w-[1px] h-full bg-dark-500" />
                          <div className="w-[1px] h-full bg-dark-500" />
                       </div>
                       
                       <div 
                         className="h-full bg-gradient-to-r from-accent-green/80 to-accent-green transition-all duration-500 ease-out" 
                         style={{ width: `${item.buyout}%` }} 
                       />
                       <div 
                         className="h-full bg-gradient-to-r from-accent-red/80 to-accent-red border-l border-dark-950/20 transition-all duration-500 ease-out" 
                         style={{ width: `${item.defect}%` }} 
                       />
                       <div 
                         className="h-full bg-gradient-to-r from-accent-orange/80 to-accent-orange border-l border-dark-950/20 transition-all duration-500 ease-out" 
                         style={{ width: `${item.loss}%` }} 
                       />
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="xl:col-span-1">
            <div className="h-[500px] overflow-y-auto pr-4 custom-scrollbar space-y-4">
              {[
                { name: "Чайник электрич. (Black)", id: "WB-10293", buyout: "65%", defect: "15%", scenario: "defect" as const, alert: "Выкуп упал на 15% за неделю. Проверьте отзывы, возможно, пошла бракованная партия." },
                { name: "Крем для лица (Gold)", id: "WB-99283", buyout: "78%", defect: "12%", scenario: "lost" as const, alert: "Высокий процент потерь (5%). Товар часто попадает в обезличку на складе Коледино." },
                { name: "Шампунь органик", id: "WB-55201", buyout: "90%", defect: "4%", scenario: "ideal" as const, alert: "Стабильный показатель. Рекомендуется расширение линейки." },
                { name: "Наушники Air-Pro", id: "WB-22810", buyout: "82%", defect: "18%", scenario: "defect" as const, alert: "Критический уровень брака. 18% возвратов из-за проблем с аккумулятором." },
                { name: "Увлажнитель воздуха", id: "WB-33441", buyout: "74%", defect: "9%", scenario: "lost" as const, alert: "Выкуп стабилен, но участились жалобы на шум. Мониторим отзывы." },
                { name: "Чехол Silicone Case", id: "WB-11223", buyout: "95%", defect: "2%", scenario: "ideal" as const, alert: "Лидер по выкупу. Товар идеально соответствует ожиданиям клиентов." },
                { name: "Лампа настольная LED", id: "WB-44556", buyout: "68%", defect: "14%", scenario: "defect" as const, alert: "Риск выбытия из топа. Покупатели отмечают хрупкость крепления." },
                { name: "Набор кистей (12 шт)", id: "WB-77889", buyout: "88%", defect: "5%", scenario: "ideal" as const, alert: "Хорошая оборачиваемость. Рекомендуется участие в ближайшей акции." },
              ].map((row, i) => (
                <div 
                  key={i} 
                  onClick={() => openLogisticsModal(row.scenario)}
                  className={`p-5 cursor-pointer h-[155px] flex flex-col justify-between rounded-2xl border transition-all duration-300 ${parseInt(row.defect) > 10 ? "bg-accent-red/5 border-accent-red/20 hover:bg-accent-red/10" : "bg-dark-900/50 border-card-border/50 hover:bg-dark-900"}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${parseInt(row.defect) > 10 ? 'bg-accent-red/20' : 'bg-accent-green/20'}`}>
                        {parseInt(row.defect) > 10 ? <AlertTriangle className="w-4 h-4 text-accent-red" /> : <Activity className="w-4 h-4 text-accent-green" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-0.5">{row.name}</h4>
                        <span className="text-[10px] text-dark-500 font-mono tracking-wider">{row.id}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-black text-white">Выкуп: {row.buyout}</div>
                      <div className={`text-[10px] font-bold ${parseInt(row.defect) > 10 ? 'text-accent-red' : 'text-dark-400'}`}>Брак: {row.defect}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 bg-dark-800/80 rounded-xl border border-card-border/30">
                    <Sparkles className="w-3.5 h-3.5 text-accent-purple shrink-0 mt-0.5" />
                    <p className="text-[11px] text-dark-300 leading-relaxed italic line-clamp-2">{row.alert}</p>
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
              <Chart 
                option={spaceEfficiencyOption} 
                style={{ height: '100%', width: '100%' }} 
                onEvents={{ 'click': onSpaceChartClick }}
              />
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
                { name: "Коврик для йоги XL", space: "35%", orders: "8%", loss: "-27%", id: "WB-88229", volume: "45 л" },
                { name: "Набор конструктора", space: "25%", orders: "14%", loss: "-11%", id: "WB-66554", volume: "28 л" },
              ].map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => openSpaceModal({ name: item.name, id: item.id, volume: item.volume })}
                  className="flex items-center justify-between p-4 bg-dark-800/40 rounded-2xl border border-card-border/50 group/item hover:border-accent-red/30 transition-colors cursor-pointer"
                >
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

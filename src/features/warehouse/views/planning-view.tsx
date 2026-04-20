import React from "react";
import { 
  Wallet, 
  Package, 
  Calendar, 
  Truck, 
  TrendingUp, 
  Building2, 
  Database 
} from "lucide-react";
import { AIRecommendation } from "../components/ai-recommendation";
import { TableHeader } from "../components/table-header";
import { SupplyBudgetModal } from "../components/supply-budget-modal";
import { ShipmentPriorityModal } from "../components/shipment-priority-modal";
import { ShipmentScheduleModal } from "../components/shipment-schedule-modal";
import { useState } from "react";
import { HubDetailModal } from "../components/hub-detail-modal";
import { TransitItem, OrderHistoryItem, WarehouseDistribution, RecommendedPlan } from "@/core/types/warehouse.types";

interface PlanningViewProps {
  goodsInTransit: TransitItem[];
  orderHistory: OrderHistoryItem[];
  distribution: WarehouseDistribution[];
  recommendedPlans: RecommendedPlan[];
}

export function PlanningView({ 
  goodsInTransit, 
  orderHistory,
  distribution,
  recommendedPlans
}: PlanningViewProps) {
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isHubModalOpen, setIsHubModalOpen] = useState(false);
  const [selectedHub, setSelectedHub] = useState<WarehouseDistribution | null>(null);

  return (
    <div className="space-y-8">
      <SupplyBudgetModal 
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
      />
      
      <ShipmentPriorityModal 
        isOpen={isPriorityModalOpen}
        onClose={() => setIsPriorityModalOpen(false)}
      />

      <ShipmentScheduleModal 
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />

      <HubDetailModal 
        isOpen={isHubModalOpen}
        onClose={() => setIsHubModalOpen(false)}
        hub={selectedHub}
      />

      {/* AI Summary & Fast Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => setIsBudgetModalOpen(true)}
          className="bg-dark-800/40 border border-card-border p-8 rounded-[2rem] relative group hover:bg-dark-800 transition-all cursor-pointer overflow-hidden shadow-xl hover:shadow-emerald-500/5"
        >
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="p-3 bg-accent-orange/10 rounded-2xl group-hover:bg-accent-green/20 transition-colors">
              <Wallet className="w-5 h-5 text-accent-orange group-hover:text-accent-green transition-colors" />
            </div>
            <div>
              <p className="text-[10px] text-dark-400 font-black uppercase tracking-widest">Бюджет поставки</p>
              <h3 className="text-2xl font-black text-white">4 250 000 ₽</h3>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-dark-900/50 rounded-xl border border-card-border/50 relative z-10 transition-colors group-hover:border-accent-green/30">
            <span className="text-[10px] text-dark-400 font-bold">Окупаемость (EBITDA)</span>
            <span className="text-xs font-black text-accent-green">+24.5%</span>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-green/5 blur-[50px] pointer-events-none -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <div 
          onClick={() => setIsPriorityModalOpen(true)}
          className="bg-dark-800/40 border border-card-border p-8 rounded-[2rem] relative group hover:bg-dark-800 transition-all cursor-pointer overflow-hidden shadow-xl hover:shadow-rose-500/5 flex flex-col justify-between"
        >
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="p-3 bg-accent-green/10 rounded-2xl group-hover:bg-rose-500/20 transition-colors">
              <Package className="w-5 h-5 text-accent-green group-hover:text-rose-500 transition-colors" />
            </div>
            <div>
              <p className="text-[10px] text-dark-400 font-black uppercase tracking-widest">Артикулов в плане</p>
              <h3 className="text-2xl font-black text-white">124 SKU</h3>
            </div>
          </div>
          <p className="text-[11px] text-dark-300 leading-relaxed mt-auto relative z-10">
            <span className="text-accent-red font-bold">15 товаров</span> требуют немедленной отгрузки до <span className="text-white font-bold group-hover:text-rose-400">18 апреля</span>.
          </p>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-rose-500/5 blur-[50px] pointer-events-none -mr-10 -mb-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <div 
          onClick={() => setIsScheduleModalOpen(true)}
          className="bg-accent-orange/10 border border-accent-orange/20 p-8 rounded-[2rem] relative overflow-hidden flex flex-col justify-between group cursor-pointer hover:bg-accent-orange/20 transition-all active:scale-[0.98]"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-accent-orange group-hover:animate-bounce" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">Дата ближайшей отгрузки</h3>
            </div>
            <h2 className="text-3xl font-black text-white mb-2">16 Апреля</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-orange animate-pulse"></div>
              <span className="text-[10px] font-black text-dark-200 uppercase tracking-widest">Склад: Коледино / Электросталь</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8 text-accent-orange/20 group-hover:text-accent-orange/40 transition-colors"><Truck className="w-20 h-20" /></div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent-orange/0 to-accent-orange/10 pointer-events-none"></div>
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
                <TableHeader label="Дни до 0" />
                <TableHeader label="Склад" sortable={false} />
                <TableHeader label="Инвестиции" />
                <th className="py-4 px-4 text-right">Статус</th>
              </tr>
            </thead>
            <tbody>
              {recommendedPlans.map((row, i) => (
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
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-2">
                       <span className={`text-sm font-black ${row.daysToZero <= 3 ? 'text-accent-red' : 'text-white'}`}>
                        {row.daysToZero} дн
                       </span>
                       <div className="w-12 h-1 bg-dark-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${row.daysToZero <= 3 ? 'bg-accent-red' : 'bg-accent-orange'}`} 
                            style={{ width: `${Math.min((row.daysToZero / 15) * 100, 100)}%` }}
                          ></div>
                       </div>
                    </div>
                  </td>
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

      {/* Warehouse Distribution */}
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
          {distribution.map((wh, idx) => (
            <div 
              key={idx} 
              onClick={() => {
                setSelectedHub(wh);
                setIsHubModalOpen(true);
              }}
              className="p-6 bg-dark-900/50 rounded-3xl border border-card-border/50 hover:bg-dark-800/80 transition-all group/card cursor-pointer relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-lg font-black text-white mb-1 group-hover/card:text-accent-orange transition-colors">{wh.name}</h4>
                  <span className="text-[10px] font-bold text-dark-400 uppercase tracking-widest">{wh.type}</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-1 flex-shrink-0 text-center rounded-md text-[9px] font-black uppercase tracking-wider bg-dark-800 border border-card-border/50 ${wh.color}`}>
                    {wh.status}
                  </span>
                  <div className={`px-2 py-0.5 rounded-full text-[8px] font-black tracking-tighter border ${
                    wh.acceptanceCoeff === 1.0 
                      ? 'bg-accent-green/10 text-accent-green border-accent-green/30' 
                      : 'bg-accent-orange/10 text-accent-orange border-accent-orange/30'
                  }`}>
                    Коэфф: x{wh.acceptanceCoeff.toFixed(1)}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4 p-4 bg-dark-800/50 rounded-2xl border border-card-border/30">
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

              <div className="mb-6 px-4">
                <p className="text-[10px] text-dark-400 font-bold italic text-center">
                  Покрытие спроса: <span className="text-accent-blue">{wh.demandCoverage}% регионов</span>
                </p>
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

              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-orange/5 blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Movement and History Tables */}
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
                  <th className="pb-4 font-bold">Товар</th>
                  <th className="pb-4 font-bold">Кол-во</th>
                  <th className="pb-4 font-bold">Заказан</th>
                  <th className="pb-4 font-bold">Прибытие</th>
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
                  <th className="pb-4 font-bold">Дата</th>
                  <th className="pb-4 font-bold">Товар</th>
                  <th className="pb-4 font-bold">Кол-во</th>
                  <th className="pb-4 font-bold">Склад</th>
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
  );
}

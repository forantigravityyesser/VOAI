import React from "react";
import { Truck } from "lucide-react";
import { TableHeader } from "./table-header";
import { Sparkline } from "./sparkline";
import { StockItem } from "@/core/types/warehouse.types";

interface StockTableProps {
  stockData: StockItem[];
}

export function StockTable({ stockData }: StockTableProps) {
  return (
    <div className="bg-dark-800/40 border border-card-border rounded-[2.5rem] p-10 mb-8 relative group">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-2xl font-black text-white mb-1 tracking-tight">Состояние запасов</h2>
          <p className="text-sm text-dark-400 font-medium italic">Детальная информация по каждому артикулу</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-5 py-2.5 bg-accent-green/10 border border-accent-green/20 rounded-2xl">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse"></div>
            <span className="text-[11px] font-bold text-accent-green uppercase tracking-widest">4 083 шт.</span>
          </div>
          <div className="flex items-center gap-3 px-5 py-2.5 bg-accent-blue/10 border border-accent-blue/20 rounded-2xl">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-blue"></div>
            <span className="text-[11px] font-bold text-accent-blue uppercase tracking-widest">451 шт.</span>
          </div>
          <div className="flex items-center gap-3 px-5 py-2.5 bg-accent-orange/10 border border-accent-orange/20 rounded-2xl text-accent-orange font-bold text-[11px]">
            <Truck className="w-4 h-4" />
            <span>764 шт.</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-card-border/50">
              <TableHeader label="SKU" />
              <TableHeader label="Остаток" />
              <TableHeader label="Резерв" />
              <TableHeader label="В пути" />
              <TableHeader label="Дней до конца" />
              <TableHeader label="Продажи/день" />
              <TableHeader label="Риск" />
              <TableHeader label="Склад" sortable={false} />
            </tr>
          </thead>
          <tbody>
            {stockData.map((row, i) => (
              <tr key={i} className="group/row border-b border-card-border/30 hover:bg-white/5 transition-all">
                <td className="py-5 px-4 font-bold text-sm text-white group-hover/row:text-accent-purple transition-colors">
                  {row.name}
                </td>
                <td className="py-5 px-4">
                  <div className="flex flex-col gap-1.5">
                    <span className={`text-sm font-black ${row.stock < 20 ? 'text-accent-red' : 'text-white'}`}>
                      {row.stock}
                    </span>
                    <div className="w-16 h-1 bg-dark-700 rounded-full overflow-hidden">
                      <div className={`h-full ${row.color}`} style={{ width: `${(row.stock / row.stockMax) * 100}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-5 px-4 text-sm text-dark-300">{row.reserved}</td>
                <td className="py-5 px-4 text-sm text-dark-300">
                  {row.inTransit > 0 ? (
                    <div className="flex items-center gap-1.5">
                      {row.inTransit}
                      <Truck className="w-3.5 h-3.5 text-accent-orange/60" />
                    </div>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="py-5 px-4 font-bold text-sm text-accent-green">{row.daysLeft} дн.</td>
                <td className="py-5 px-4">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <Sparkline /> {row.salesDay}
                  </div>
                </td>
                <td className="py-5 px-4 font-black text-sm text-accent-red">{row.risk}</td>
                <td className="py-5 px-4 text-[10px] font-black text-dark-400 uppercase tracking-widest">
                  {row.warehouse}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

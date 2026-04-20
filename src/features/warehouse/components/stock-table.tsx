"use client";

import React from "react";
import { Truck, ArrowUpDown } from "lucide-react";
import { Stock } from "@/core/types/warehouse.types";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { cn } from "@/lib/utils";

interface StockTableProps {
  stockData: Stock[];
}

export function StockTable({ stockData }: StockTableProps) {
  return (
    <Card variant="glass" className="p-10 mb-8 rounded-[2.5rem] border-white/5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-2xl font-black text-white mb-1 tracking-tight">Состояние запасов</h2>
          <p className="text-sm text-dark-400 font-medium italic">Детальная информация по каждому артикулу</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-accent-green/10 border-accent-green/20 text-accent-green px-5 py-2.5 rounded-2xl">
             <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse mr-2" />
             4 083 шт.
          </Badge>
          <Badge variant="outline" className="bg-accent-blue/10 border-accent-blue/20 text-accent-blue px-5 py-2.5 rounded-2xl">
             <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mr-2" />
             451 шт.
          </Badge>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
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
              <tr key={i} className="group/row border-b border-white/5 hover:bg-white/5 transition-all">
                <td className="py-5 px-4 font-bold text-sm text-white group-hover/row:text-accent-purple transition-colors">
                  {row.name}
                </td>
                <td className="py-5 px-4">
                  <div className="flex flex-col gap-1.5">
                    <span className={cn("text-sm font-black", row.stock < 20 ? "text-accent-red" : "text-white")}>
                      {row.stock}
                    </span>
                    <div className="w-16 h-1 bg-dark-700 rounded-full overflow-hidden">
                      <div className={cn("h-full", row.color)} style={{ width: `${(row.stock / row.stockMax) * 100}%` }}></div>
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
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    {row.salesDay}
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
    </Card>
  );
}

function TableHeader({ label, sortable = true }: { label: string, sortable?: boolean }) {
  return (
    <th className="py-4 px-4 text-left">
      <div className="flex items-center gap-1.5 group cursor-pointer">
        <span className="text-[10px] text-dark-400 font-black uppercase tracking-widest group-hover:text-dark-200 transition-colors">{label}</span>
        {sortable && <ArrowUpDown className="w-2.5 h-2.5 text-dark-500 group-hover:text-accent-purple transition-colors" />}
      </div>
    </th>
  )
}

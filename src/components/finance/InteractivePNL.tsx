"use client";

import React, { useState } from "react";
import { 
  ChevronDown, 
  ChevronRight, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  HelpCircle,
  Download
} from "lucide-react";

interface PNLRow {
  id: string;
  label: string;
  value: number;
  isMain?: boolean;
  type: "income" | "expense" | "result";
  children?: PNLRow[];
}

export default function InteractivePNL() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set(["market_costs", "fixed_costs"]));

  const toggleRow = (id: string) => {
    const next = new Set(expandedRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedRows(next);
  };

  const pnlData: PNLRow[] = [
    {
      id: "revenue",
      label: "Выручка (Gross Sales)",
      value: 5840000,
      type: "income",
      isMain: true
    },
    {
      id: "market_costs",
      label: "Расходы маркетплейса",
      value: -1850000,
      type: "expense",
      isMain: false,
      children: [
        { id: "comission", label: "Комиссия WB", value: -840000, type: "expense" },
        { id: "logistics", label: "Логистика", value: -620000, type: "expense" },
        { id: "storage", label: "Хранение", value: -120000, type: "expense" },
        { id: "fines", label: "Штрафы и удержания", value: -85000, type: "expense" },
        { id: "ads_wb", label: "Реклама (Внутренняя)", value: -185000, type: "expense" },
      ]
    },
    {
      id: "cogs",
      label: "Себестоимость товара (COGS)",
      value: -2100000,
      type: "expense",
      isMain: false
    },
    {
      id: "gross_profit",
      label: "Валовая прибыль",
      value: 1890000,
      type: "result",
      isMain: true
    },
    {
      id: "fixed_costs",
      label: "Постоянные расходы (OPEX)",
      value: -420000,
      type: "expense",
      isMain: false,
      children: [
        { id: "salary", label: "ФОТ (Сотрудники)", value: -250000, type: "expense" },
        { id: "rent", label: "Аренда склада/офиса", value: -80000, type: "expense" },
        { id: "services", label: "Сервисы и софт", value: -45000, type: "expense" },
        { id: "marketing_ext", label: "Внешний маркетинг", value: -45000, type: "expense" },
      ]
    },
    {
      id: "tax",
      label: "Налоги (УСН 6%)",
      value: -350400,
      type: "expense",
      isMain: false
    },
    {
      id: "net_profit",
      label: "Чистая прибыль (Net Income)",
      value: 1119600,
      type: "result",
      isMain: true
    }
  ];

  const formatValue = (val: number) => {
    return new Intl.NumberFormat('ru-RU').format(val) + " ₽";
  };

  const getRowStyles = (type: string, isMain?: boolean) => {
    if (isMain) return "bg-dark-800/80 border-l-4 border-accent-purple font-black text-white py-5";
    if (type === "result") return "bg-accent-blue/5 border-l-4 border-accent-blue font-black text-white py-4";
    return "hover:bg-white/5 transition-colors py-3.5 border-l-4 border-transparent";
  };

  const renderRow = (row: PNLRow, depth: number = 0) => {
    const isExpanded = expandedRows.has(row.id);
    const hasChildren = row.children && row.children.length > 0;

    return (
      <React.Fragment key={row.id}>
        <div 
          onClick={() => hasChildren && toggleRow(row.id)}
          className={`group flex items-center justify-between px-6 border-b border-white/5 cursor-pointer ${getRowStyles(row.type, row.isMain)}`}
          style={{ paddingLeft: `${depth * 24 + 24}px` }}
        >
          <div className="flex items-center gap-4">
            {hasChildren ? (
              isExpanded ? <ChevronDown className="w-4 h-4 text-dark-400" /> : <ChevronRight className="w-4 h-4 text-dark-400" />
            ) : (
              <div className="w-4 h-4" />
            )}
            <span className={`${row.isMain ? "text-[13px]" : "text-[12px]"} uppercase tracking-wider font-extrabold ${depth > 0 ? "text-dark-300" : ""}`}>
              {row.label}
            </span>
          </div>
          <div className="flex items-center gap-8">
            <span className={`text-sm font-black transition-all ${
              row.type === "income" ? "text-green-400" : 
              row.type === "result" ? "text-accent-blue" : "text-white group-hover:text-red-400"
            }`}>
              {formatValue(row.value)}
            </span>
            <div className="w-20 text-right">
               <span className="text-[10px] font-black text-dark-500 uppercase">
                 {row.id === "revenue" ? "100%" : `${Math.abs((row.value / 5840000) * 100).toFixed(1)}%`}
               </span>
            </div>
          </div>
        </div>
        
        {hasChildren && isExpanded && row.children?.map(child => renderRow(child, depth + 1))}
      </React.Fragment>
    );
  };

  return (
    <div className="glass-card rounded-[3rem] border border-card-border group relative overflow-hidden flex flex-col shadow-2xl">
      
      {/* Header Section */}
      <div className="p-10 pb-6 border-b border-white/5 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-accent-purple/20 rounded-2xl flex items-center justify-center border border-accent-purple/30 shadow-inner">
               <DollarSign className="w-8 h-8 text-accent-purple" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-white tracking-tight leading-none mb-2">Интерактивный P&L</h3>
              <p className="text-[11px] font-black text-dark-400 uppercase tracking-[0.2em] flex items-center gap-2">
                 Отчет о прибылях и убытках за текущий период
                 <Download className="w-3 h-3 text-accent-blue cursor-pointer hover:scale-110 transition-transform" />
              </p>
            </div>
          </div>

          <div className="flex gap-4">
             <div className="px-8 py-5 bg-dark-900/60 rounded-3xl border border-white/5 flex flex-col items-center">
                <p className="text-[10px] font-black text-dark-500 uppercase tracking-widest mb-1.5">Маржинальность</p>
                <div className="flex items-center gap-2 text-green-400">
                    <span className="text-2xl font-black">42.8%</span>
                    <TrendingUp className="w-4 h-4" />
                </div>
             </div>
             <div className="px-8 py-5 bg-dark-900/60 rounded-3xl border border-accent-blue/20 flex flex-col items-center shadow-[0_0_30px_rgba(0,184,217,0.1)]">
                <p className="text-[10px] font-black text-dark-500 uppercase tracking-widest mb-1.5">ROI (Окупаемость)</p>
                <div className="flex items-center gap-2 text-accent-blue">
                    <span className="text-2xl font-black">184%</span>
                    <ArrowUpRight className="w-4 h-4" />
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Strategy Labels Header */}
      <div className="px-6 py-3 bg-dark-800/40 border-b border-white/5 flex items-center justify-between relative z-10">
         <span className="text-[10px] font-black text-dark-500 uppercase tracking-widest px-11">Статьи расходов / доходов</span>
         <div className="flex items-center gap-28 pr-6">
            <span className="text-[10px] font-black text-dark-500 uppercase tracking-widest text-right">Сумма (₽)</span>
            <span className="text-[10px] font-black text-dark-500 uppercase tracking-widest text-right">% от выр.</span>
         </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-y-auto relative z-10 custom-scrollbar max-h-[600px]">
        {pnlData.map(row => renderRow(row))}
      </div>

      {/* Footer / Value Add Section */}
      <div className="p-8 bg-dark-950/40 border-t border-white/5 flex items-center justify-between relative z-10">
         <div className="flex items-center gap-4 text-dark-500">
            <HelpCircle className="w-4 h-4" />
            <p className="text-[10px] font-bold uppercase tracking-widest italic">Данные обновляются автоматически на базе API Wildberries и ваших настроек COGS</p>
         </div>
         <div className="flex gap-4">
            <button className="text-[10px] font-black text-accent-purple uppercase tracking-widest hover:underline transition-all">Настроить расходы</button>
         </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-accent-purple/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-accent-blue/10 blur-[100px] rounded-full pointer-events-none"></div>
    </div>
  );
}

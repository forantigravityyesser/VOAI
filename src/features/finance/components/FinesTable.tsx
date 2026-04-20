"use client";

import React from "react";
import { AlertTriangle, Info, ShieldAlert } from "lucide-react";

const fines = [
  {
    id: 1,
    type: "Контент",
    reason: "Неверная категория товара",
    amount: "25,000 ₽",
    status: "Критично",
    date: "12.04.2025"
  },
  {
    id: 2,
    type: "Маркировка",
    reason: "Отсутствие КИЗ (Честный ЗНАК)",
    amount: "10,500 ₽",
    status: "Внимание",
    date: "14.04.2025"
  },
  {
    id: 3,
    type: "Самовыкупы",
    reason: "Подозрение в накрутке рейтинга",
    amount: "100,000 ₽",
    status: "Штраф",
    date: "15.04.2025"
  }
];

export default function FinesTable() {
  return (
    <div className="glass-card p-6 rounded-2xl border border-card-border h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Лента штрафов</h3>
          <p className="text-xs text-dark-400">Критический контроль санкций</p>
        </div>
        <div className="px-3 py-1 bg-accent-red/10 border border-accent-red/20 rounded-full flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-accent-red rounded-full animate-pulse" />
          <span className="text-[10px] text-accent-red font-bold uppercase tracking-wider">3 Активных</span>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
        {fines.map((fine) => (
          <div 
            key={fine.id}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all
              ${fine.amount.replace(/[^0-9]/g, '') > '50000' 
                ? "bg-accent-red/5 border-accent-red/20 hover:bg-accent-red/10" 
                : "bg-dark-800/40 border-card-border hover:border-dark-500"}
            `}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0
              ${fine.type === 'Самовыкупы' ? 'bg-accent-red/20' : 'bg-dark-700'}
            `}>
              {fine.type === 'Самовыкупы' ? (
                <ShieldAlert className="w-5 h-5 text-accent-red" />
              ) : fine.type === 'Контент' ? (
                <AlertTriangle className="w-5 h-5 text-accent-orange" />
              ) : (
                <Info className="w-5 h-5 text-dark-300" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xs font-bold text-white truncate">{fine.reason}</h4>
                <span className="text-sm font-black text-accent-red">{fine.amount}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-dark-300 bg-dark-700 px-1.5 py-0.5 rounded leading-none uppercase tracking-tighter">
                  {fine.type}
                </span>
                <span className="text-[10px] text-dark-400">{fine.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

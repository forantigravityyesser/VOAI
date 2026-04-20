"use client";

import React from "react";
import FinanceTimeline from "@/features/finance/components/FinanceTimeline";
import AIChatAssistant from "@/features/dashboard/components/AIChatAssistant";
import ActionCenter from "@/features/dashboard/components/ActionCenter";
import OperationalKPIGrid from "@/features/dashboard/components/OperationalKPIGrid";

export default function DashboardContainer() {

  return (
    <div className="flex gap-6 min-h-screen">
      {/* ⬅️ Левая колонка (65% ширины) — Стратегия и Данные */}
      <main className="w-[65%] space-y-6">

        {/* Верхний блок: Компактный Timeline Событий */}
        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <FinanceTimeline compact />
        </div>

        {/* Нижний блок: Сетка операционных KPI */}
        <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <OperationalKPIGrid />
        </div>
      </main>

      {/* ➡️ Правая колонка (35% ширины) — AI-Ассистент и Алерты (Sticky) */}
      <aside className="w-[35%] space-y-6 sticky top-6 h-[calc(100vh-48px)] flex flex-col overflow-hidden">
        {/* Верхняя половина: Чат с ИИ (Менеджер Hermes) */}
        <div className="flex-1 min-h-0 flex flex-col">
          <AIChatAssistant variant="sidebar" />
        </div>

        {/* Нижняя половина: Лента Умных Уведомлений (Action Center) */}
        <div className="h-[40%] min-h-[300px]">
          <ActionCenter />
        </div>
      </aside>
    </div>
  );
}

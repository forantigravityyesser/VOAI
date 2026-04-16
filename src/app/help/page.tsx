"use client";

import React from "react";
import Image from "next/image";
import { 
  Search, 
  MessageSquare, 
  Grid, 
  List, 
  Paperclip, 
  Tag as TagIcon,
  HelpCircle,
  Code,
  PieChart,
  Warehouse,
  Lightbulb,
  AlertTriangle,
  MoreHorizontal,
  Plus,
  ArrowRight
} from "lucide-react";

// Mock data for tickets
const tickets = [
  {
    id: "#2041",
    type: "Вопрос",
    timestamp: "11:52 AM",
    title: "Почему не сходятся данные с отчетом о реализации WB?",
    description: "Заметил расхождение в 5-7% между данными в кабинете и выгруженным отчетом за прошлую неделю. Это баг или особенность расчета?",
    user: {
      name: "Алексей С.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexey"
    },
    tags: ["Финансы", "Баг"],
    attachments: 1,
    comments: 4
  },
  {
    id: "#2038",
    type: "Предложение",
    timestamp: "10:15 AM",
    title: "Добавить интеграцию с ТК Деловые Линии",
    description: "Было бы отлично видеть статусы отгрузок напрямую в дашборде планирования склада. Сейчас приходится проверять вручную.",
    user: {
      name: "Мария К.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
    },
    tags: ["Логистика", "Идея"],
    attachments: 0,
    comments: 12
  },
  {
    id: "#2035",
    type: "Ошибка",
    timestamp: "Вчера",
    title: "Не загружаются фотографии товаров через API",
    description: "При попытке обновления карточек через массовое редактирование API возвращает 500 ошибку. Проверьте, пожалуйста.",
    user: {
      name: "Иван П.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan"
    },
    tags: ["API", "Критично"],
    attachments: 2,
    comments: 2
  }
];

const helpCategories = [
  { label: "Начало работы", id: "getting-started", active: true, icon: HelpCircle },
  { label: "API и Интеграция WB", id: "api", icon: Code },
  { label: "Финансы и Отчеты", id: "finance", icon: PieChart },
  { label: "Склад и Планирование", id: "warehouse", icon: Warehouse },
  { label: "Предложить идею (Feature)", id: "feature", icon: Lightbulb },
  { label: "Баги и Ошибки", id: "bugs", icon: AlertTriangle },
];

export default function HelpCenterPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] animate-fade-up relative overflow-hidden">
      
      {/* Background Decorative Ethereal Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-accent-purple/10 blur-[100px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-[20%] right-[5%] w-[25%] h-[25%] bg-accent-blue/10 blur-[80px] rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      {/* --- Left Sidebar (Help Navigation) --- */}
      <div className="w-full lg:w-[320px] bg-dark-900/50 border-r border-card-border p-6 flex flex-col gap-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Центр поддержки</h2>
          <p className="text-xs text-dark-300">Найдите ответы на свои вопросы или создайте новый тикет</p>
        </div>

        {/* Search Input */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-300 group-focus-within:text-accent-purple transition-colors" />
          <input
            type="text"
            placeholder="Поиск по базе знаний..."
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-dark-800 border border-card-border text-sm text-white placeholder-dark-300
              focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/20 transition-all"
          />
        </div>

        {/* Categories navigation */}
        <nav className="flex-1 space-y-1">
          {helpCategories.map((cat) => (
            <button
              key={cat.id}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group
                ${cat.active 
                  ? "bg-accent-purple/10 text-accent-purple-light border border-accent-purple/20" 
                  : "text-dark-200 hover:text-white hover:bg-dark-800"
                }`}
            >
              <div className="flex items-center gap-3">
                <cat.icon className={`w-4 h-4 ${cat.active ? "text-accent-purple" : "text-dark-300 group-hover:text-white"}`} />
                <span className="font-medium">{cat.label}</span>
              </div>
              {cat.active && <div className="w-1 h-4 bg-accent-purple rounded-full shadow-[0_0_8px_rgba(108,92,231,0.5)]" />}
            </button>
          ))}
        </nav>

        {/* CTA Card */}
        <div className="mt-auto relative group overflow-hidden bg-gradient-to-br from-accent-purple to-accent-blue rounded-2xl p-5 shadow-lg shadow-accent-purple/10 cursor-pointer">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          
          <p className="relative z-10 text-sm font-bold text-white mb-4 leading-snug">
            Нужна помощь специалиста?
          </p>
          <button className="relative z-10 w-full bg-white/10 backdrop-blur-md border border-white/20 text-white py-2 rounded-xl text-xs font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2">
            Написать нам
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* --- Right Content Area --- */}
      <div className="flex-1 bg-dark-900/40 p-8 flex flex-col gap-6">
        
        {/* Header Tabs & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex gap-6 border-b border-card-border pb-1 overflow-x-auto no-scrollbar">
            {["Все тикеты", "Популярные", "Мои запросы", "Решенные"].map((tab, idx) => (
              <button
                key={tab}
                className={`pb-3 text-sm font-bold whitespace-nowrap relative transition-all
                  ${idx === 0 
                    ? "text-white" 
                    : "text-dark-300 hover:text-white"
                  }`}
              >
                {tab}
                {idx === 0 && (
                  <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-accent-purple shadow-[0_0_8px_rgba(108,92,231,0.5)]" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-accent-purple rounded-xl text-white text-xs font-bold hover:shadow-lg hover:shadow-accent-purple/20 active:scale-95 transition-all">
                <Plus className="w-4 h-4" />
                Создать тикет
             </button>
             <div className="w-px h-6 bg-card-border" />
             <div className="flex bg-dark-800 p-1 rounded-lg border border-card-border">
                <button className="p-1.5 rounded-md text-dark-300 hover:text-white transition-all">
                  <Grid className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-md bg-dark-600 text-white shadow-sm">
                  <List className="w-4 h-4" />
                </button>
             </div>
          </div>
        </div>

        {/* Ticket Feed List */}
        <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
          {tickets.map((ticket, index) => (
            <div 
              key={ticket.id}
              className="glass-card glass-card-hover p-6 rounded-2xl animate-fade-up border border-card-border"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col gap-4">
                {/* Row 1: Badge & Timestamp */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider
                      ${ticket.type === "Ошибка" ? "bg-accent-red/10 text-accent-red border border-accent-red/20" : 
                        ticket.type === "Предложение" ? "bg-accent-orange/10 text-accent-orange border border-accent-orange/20" : 
                        "bg-accent-blue/10 text-accent-blue border border-accent-blue/20"}`}>
                      {ticket.type} {ticket.id}
                    </span>
                    <span className="text-[10px] text-dark-300 font-medium">{ticket.timestamp}</span>
                  </div>
                  <button className="p-1 rounded-lg hover:bg-dark-700 text-dark-300 hover:text-white transition-all">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Row 2: Title & Desc */}
                <div>
                  <h3 className="text-base font-bold text-white mb-2 leading-tight group-hover:text-accent-purple-light transition-colors">
                    {ticket.title}
                  </h3>
                  <p className="text-sm text-dark-200 line-clamp-2 leading-relaxed">
                    {ticket.description}
                  </p>
                </div>

                {/* Row 3: Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-card-border/50">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image 
                        src={ticket.user.avatar} 
                        alt={ticket.user.name}
                        width={28}
                        height={28}
                        className="w-7 h-7 rounded-full bg-dark-700 ring-2 ring-dark-800"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-accent-green rounded-full border border-dark-900" />
                    </div>
                    <span className="text-xs font-semibold text-dark-100">{ticket.user.name}</span>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="hidden sm:flex items-center gap-2">
                      <TagIcon className="w-3 h-3 text-dark-300" />
                      <div className="flex gap-1.5">
                        {ticket.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-bold text-dark-300 hover:text-accent-purple transition-colors cursor-pointer capitalize">
                            #{tag.toLowerCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {ticket.attachments > 0 && (
                        <div className="flex items-center gap-1.5 text-dark-300">
                          <Paperclip className="w-3 h-3" />
                          <span className="text-xs font-bold">{ticket.attachments}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-dark-300 px-2 py-1 rounded-lg hover:bg-dark-700 hover:text-white cursor-pointer transition-all">
                        <MessageSquare className="w-3 h-3" />
                        <span className="text-xs font-bold">{ticket.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

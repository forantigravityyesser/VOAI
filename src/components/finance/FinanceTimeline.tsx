"use client";

import React, { useRef } from "react";
import { 
  CircleDot, 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  CreditCard, 
  TrendingUp, 
  ShieldAlert,
  Clock,
  ArrowUpRight
} from "lucide-react";

type EventType = "report" | "payment" | "tariff" | "tax";

interface FinanceEvent {
  id: string;
  date: string;
  day: string;
  title: string;
  description: string;
  type: EventType;
  status: "past" | "current" | "future";
  value?: string;
}

const events: FinanceEvent[] = [
  {
    id: "1",
    date: "13 Апр",
    day: "Понедельник",
    title: "Отчет №452",
    description: "Сформирован еженедельный финансовый отчет",
    type: "report",
    status: "past",
    value: "1.2M ₽"
  },
  {
    id: "2",
    date: "15 Апр",
    day: "Среда",
    title: "Выплата",
    description: "Деньги отправлены на ваш расчетный счет",
    type: "payment",
    status: "past",
    value: "+840k ₽"
  },
  {
    id: "3",
    date: "16 Апр",
    day: "Сегодня",
    title: "Сверка остатков",
    description: "Плановая проверка складских лимитов",
    type: "report",
    status: "current"
  },
  {
    id: "4",
    date: "18 Апр",
    day: "Пятница",
    title: "Логистика",
    description: "Изменение тарифа в категории 'Обувь'",
    type: "tariff",
    status: "future",
    value: "+15%"
  },
  {
    id: "5",
    date: "20 Апр",
    day: "Понедельник",
    title: "Налоги",
    description: "Крайний срок уплаты аванса по УСН",
    type: "tax",
    status: "future"
  },
  {
    id: "6",
    date: "22 Апр",
    day: "Среда",
    title: "Выплата",
    description: "Ожидаемое поступление средств",
    type: "payment",
    status: "future",
    value: "~900k ₽"
  }
];

export default function FinanceTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const getIcon = (type: EventType) => {
    switch (type) {
      case "report": return <FileText className="w-4 h-4" />;
      case "payment": return <CreditCard className="w-4 h-4" />;
      case "tariff": return <TrendingUp className="w-4 h-4" />;
      case "tax": return <ShieldAlert className="w-4 h-4" />;
    }
  };

  const getColor = (type: EventType) => {
    switch (type) {
      case "report": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "payment": return "text-green-400 bg-green-400/10 border-green-400/20";
      case "tariff": return "text-orange-400 bg-orange-400/10 border-orange-400/20";
      case "tax": return "text-red-400 bg-red-400/10 border-red-400/20";
    }
  };

  return (
    <div className="glass-card p-10 rounded-[3rem] border border-card-border group relative overflow-hidden transition-all duration-500 hover:border-accent-purple/30 shadow-2xl">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-accent-purple/20 flex items-center justify-center border border-accent-purple/30">
                 <Clock className="w-6 h-6 text-accent-purple" />
              </div>
              <h3 className="text-3xl font-black text-white tracking-tight">Timeline Событий</h3>
           </div>
           <p className="text-[10px] font-black text-dark-400 uppercase tracking-widest leading-none">
             Ритм вашего бизнеса: Предстоящие вехи и изменения
           </p>
        </div>

        <div className="flex gap-3">
           <button onClick={() => scroll("left")} className="p-3 rounded-xl bg-dark-800 border border-white/5 hover:bg-dark-700 transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
           </button>
           <button onClick={() => scroll("right")} className="p-3 rounded-xl bg-dark-800 border border-white/5 hover:bg-dark-700 transition-colors">
              <ChevronRight className="w-5 h-5 text-white" />
           </button>
        </div>
      </div>

      {/* Timeline Track */}
      <div className="relative z-10">
        {/* The horizontal line */}
        <div className="absolute top-[45px] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-dark-700 to-transparent"></div>
        
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-6 pt-4 scroll-smooth no-scrollbar"
        >
          {events.map((event, idx) => (
            <div key={event.id} className="min-w-[280px] relative group/event">
               {/* Dot on the line */}
               <div className="absolute top-[34px] left-1/2 -translate-x-1/2 z-20">
                  <div className={`w-6 h-6 rounded-full bg-dark-900 border-2 flex items-center justify-center transition-all duration-500 shadow-lg ${
                    event.status === 'current' 
                      ? 'border-accent-purple scale-125 shadow-[0_0_15px_rgba(108,92,231,0.5)]' 
                      : event.status === 'past' ? 'border-dark-600' : 'border-dark-700'
                  }`}>
                     <CircleDot className={`w-2.5 h-2.5 ${event.status === 'current' ? 'text-accent-purple' : 'text-dark-700'}`} />
                  </div>
                  {event.status === 'current' && (
                    <div className="absolute -top-1 -left-1 w-8 h-8 rounded-full border border-accent-purple animate-ping opacity-20"></div>
                  )}
               </div>

               {/* Content - Top (Date/Day) */}
               <div className="text-center mb-16">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${event.status === 'current' ? 'text-accent-purple' : 'text-dark-500'}`}>
                    {event.day}
                  </p>
                  <p className="text-sm font-black text-white">{event.date}</p>
               </div>

               {/* Content - Bottom (Info Card) */}
               <div className={`p-6 rounded-[2rem] border transition-all duration-500 ${
                 event.status === 'current' 
                   ? 'bg-accent-purple/10 border-accent-purple/30 shadow-[0_10px_30px_rgba(0,0,0,0.3)]' 
                   : 'bg-dark-900/60 border-white/5 group-hover/event:border-white/10'
               }`}>
                  <div className="flex justify-between items-start mb-4">
                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shadow-inner ${getColor(event.type)}`}>
                        {getIcon(event.type)}
                     </div>
                     {event.value && (
                       <span className="text-[10px] font-black text-dark-300 bg-white/5 py-1 px-3 rounded-full border border-white/5">
                          {event.value}
                       </span>
                     )}
                  </div>
                  
                  <h4 className="text-sm font-black text-white mb-2 line-clamp-1">{event.title}</h4>
                  <p className="text-xs font-bold text-dark-500 leading-snug group-hover/event:text-dark-400 transition-colors">
                    {event.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                     <span className={`text-[9px] font-black uppercase tracking-widest ${
                       event.status === 'past' ? 'text-dark-600' : event.status === 'current' ? 'text-accent-purple' : 'text-dark-500'
                     }`}>
                       {event.status === 'past' ? 'Завершено' : event.status === 'current' ? 'В процессе' : 'Ожидается'}
                     </span>
                     <ArrowUpRight className="w-3 h-3 text-dark-700 group-hover/event:text-accent-purple transition-colors" />
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend / Info */}
      <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/5 relative z-10">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span className="text-[9px] font-black text-dark-500 uppercase tracking-widest">Отчеты</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-[9px] font-black text-dark-500 uppercase tracking-widest">Выплаты</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
            <span className="text-[9px] font-black text-dark-500 uppercase tracking-widest">Тарифы</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400"></div>
            <span className="text-[9px] font-black text-dark-500 uppercase tracking-widest">Налоги</span>
         </div>
      </div>
    </div>
  );
}

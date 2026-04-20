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
import { mockTimelineEvents } from "../mock-data/finance.data";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/lib/utils";

interface FinanceTimelineProps {
  compact?: boolean;
}

export default function FinanceTimeline({ compact }: FinanceTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "report": return <FileText className="w-4 h-4" />;
      case "payment": return <CreditCard className="w-4 h-4" />;
      case "tariff": return <TrendingUp className="w-4 h-4" />;
      case "tax": return <ShieldAlert className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "report": return "text-accent-blue bg-accent-blue/10 border-accent-blue/20";
      case "payment": return "text-accent-green bg-accent-green/10 border-accent-green/20";
      case "tariff": return "text-accent-orange bg-accent-orange/10 border-accent-orange/20";
      case "tax": return "text-accent-red bg-accent-red/10 border-accent-red/20";
      default: return "";
    }
  };

  return (
    <Card variant="glass" className={cn(
      "transition-all duration-500 hover:border-accent-purple/30 shadow-2xl rounded-[2rem]",
      compact ? "p-8" : "p-10"
    )}>
      {/* Header */}
      <CardHeader className={cn(
        "flex flex-row items-center justify-between p-0 relative z-10",
        compact ? "mb-6" : "mb-10"
      )}>
        <div>
           <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-accent-purple/20 flex items-center justify-center border border-accent-purple/30">
                 <Clock className="w-5 h-5 text-accent-purple" />
              </div>
              <h3 className={cn(
                "font-black text-white tracking-tight",
                compact ? "text-xl" : "text-3xl"
              )}>Timeline Событий</h3>
           </div>
           <p className="text-[9px] font-black text-dark-400 uppercase tracking-widest leading-none">
             Предстоящие вехи и изменения вашего бизнеса
           </p>
        </div>

        <div className="flex gap-2">
           <button onClick={() => scroll("left")} className="p-2.5 rounded-xl bg-dark-800 border border-white/5 hover:bg-dark-700 transition-colors">
              <ChevronLeft className="w-4 h-4 text-white" />
           </button>
           <button onClick={() => scroll("right")} className="p-2.5 rounded-xl bg-dark-800 border border-white/5 hover:bg-dark-700 transition-colors">
              <ChevronRight className="w-4 h-4 text-white" />
           </button>
        </div>
      </CardHeader>

      {/* Timeline Track */}
      <CardContent className="p-0 relative z-10 mt-4">
        {/* The horizontal line */}
        <div className="absolute top-[35px] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-dark-700 to-transparent"></div>
        
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-4 scroll-smooth no-scrollbar"
        >
          {mockTimelineEvents.map((event) => (
            <div key={event.id} className={cn(
              "relative group/event shrink-0",
              compact ? "min-w-[220px]" : "min-w-[280px]"
            )}>
               {/* Dot on the line */}
               <div className="absolute top-[24px] left-1/2 -translate-x-1/2 z-20">
                  <div className={cn(
                    "w-5 h-5 rounded-full bg-dark-900 border-2 flex items-center justify-center transition-all duration-500 shadow-lg",
                    event.status === 'current' 
                      ? 'border-accent-purple scale-125 shadow-[0_0_15px_rgba(108,92,231,0.5)]' 
                      : event.status === 'past' ? 'border-dark-600' : 'border-dark-700'
                  )}>
                     <CircleDot className={cn(
                       "w-2 h-2",
                       event.status === 'current' ? 'text-accent-purple' : 'text-dark-700'
                     )} />
                  </div>
               </div>

               {/* Content - Top (Date/Day) */}
               <div className="text-center mb-12">
                  <p className={cn(
                    "text-[9px] font-black uppercase tracking-widest",
                    event.status === 'current' ? 'text-accent-purple' : 'text-dark-500'
                  )}>
                    {event.day}
                  </p>
                  <p className="text-xs font-black text-white">{event.date}</p>
               </div>

               {/* Content - Bottom (Info Card) */}
               <div className={cn(
                 "p-5 rounded-[1.5rem] border transition-all duration-500",
                 event.status === 'current' 
                   ? 'bg-accent-purple/10 border-accent-purple/30 shadow-[0_10px_30px_rgba(0,0,0,0.3)]' 
                   : 'bg-dark-900/60 border-white/5 group-hover/event:border-white/10'
               )}>
                  <div className="flex justify-between items-start mb-3">
                     <div className={cn(
                       "w-7 h-7 rounded-lg flex items-center justify-center border shadow-inner",
                       getColor(event.type)
                     )}>
                        {getIcon(event.type)}
                     </div>
                     {event.value && (
                       <Badge variant="outline" className="px-2 py-0.5 text-[9px]">
                          {event.value}
                       </Badge>
                     )}
                  </div>
                  
                  <h4 className="text-xs font-black text-white mb-1.5 line-clamp-1 tracking-tight">{event.title}</h4>
                  <p className="text-[10px] font-bold text-dark-500 leading-snug group-hover/event:text-dark-400 transition-colors line-clamp-2">
                    {event.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                     <span className={cn(
                       "text-[8px] font-black uppercase tracking-widest",
                       event.status === 'past' ? 'text-dark-600' : event.status === 'current' ? 'text-accent-purple' : 'text-dark-500'
                     )}>
                       {event.status === 'past' ? 'Завершено' : event.status === 'current' ? 'В процессе' : 'Ожидается'}
                     </span>
                     <ArrowUpRight className="w-2.5 h-2.5 text-dark-700 group-hover/event:text-accent-purple transition-colors" />
                  </div>
               </div>
            </div>
          ))}
        </div>
      </CardContent>

      {!compact && (
        <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/5 relative z-10">
           {[
             { color: "bg-accent-blue", label: "Отчеты" },
             { color: "bg-accent-green", label: "Выплаты" },
             { color: "bg-accent-orange", label: "Тарифы" },
             { color: "bg-accent-red", label: "Налоги" },
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                <span className="text-[9px] font-black text-dark-500 uppercase tracking-widest">{item.label}</span>
             </div>
           ))}
        </div>
      )}
    </Card>
  );
}


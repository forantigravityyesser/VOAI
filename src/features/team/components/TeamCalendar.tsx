"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Clock
} from "lucide-react";
import { teamService } from "../services/team.service";
import { CalendarEvent } from "@/core/types/collaboration";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/lib/utils";

export default function TeamCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDay, setSelectedDay] = useState(8);
  const [currentMonthIndex] = useState(8); // September
  const [currentYear] = useState(2025);

  useEffect(() => {
    teamService.getCalendarEvents().then(setEvents);
  }, []);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
  
  const days = [30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2];

  const getDayEvents = (day: number) => {
    return events.filter(e => {
        const d = new Date(e.start);
        return d.getDate() === day;
    });
  };

  return (
    <div className="flex w-full h-full bg-[#1b202d] overflow-hidden text-white font-sans relative">
      {/* Left: Main Calendar */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-6">
             <h2 className="text-3xl font-black tracking-tight">{months[currentMonthIndex]}</h2>
             <h2 className="text-3xl font-black text-dark-500 tracking-tight">{currentYear}</h2>
          </div>

          <div className="flex gap-4">
             <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl bg-dark-800/40 border border-white/5">
                <ChevronLeft className="w-5 h-5" />
             </Button>
             <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl bg-dark-800/40 border border-white/5">
                <ChevronRight className="w-5 h-5" />
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4 mb-4">
           {weekDays.map(day => (
             <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-dark-400">
                {day}
             </div>
           ))}
        </div>

        <div className="grid grid-cols-7 gap-4 flex-1">
           {days.map((day, idx) => {
             const isToday = day === 8;
             const isOutsideMonth = idx < 1 || idx > 30;
             const isSelected = day === selectedDay && !isOutsideMonth;
             const dayEvents = getDayEvents(day);

             return (
               <div 
                 key={idx}
                 onClick={() => !isOutsideMonth && setSelectedDay(day)}
                 className={cn(
                   "relative h-[160px] rounded-[2rem] p-6 cursor-pointer transition-all duration-500 group border",
                   isToday ? "bg-accent-blue/10 border-accent-blue/30 shadow-2xl" : "bg-dark-800/20 border-white/5 hover:bg-dark-800/40",
                   isSelected && !isToday ? "border-accent-purple/50 ring-1 ring-accent-purple/20" : "",
                   isOutsideMonth ? "opacity-10 grayscale pointer-events-none" : "opacity-100"
                 )}
               >
                 <div className="flex justify-between items-start">
                    <span className="text-2xl font-black text-white">{day}</span>
                    {!isOutsideMonth && (
                      <Button size="icon" className="w-8 h-8 rounded-xl bg-accent-blue opacity-0 group-hover:opacity-100 transition-all">
                         <Plus className="w-4 h-4" />
                      </Button>
                    )}
                 </div>

                 <div className="mt-4 space-y-2">
                    {dayEvents.map((e, ei) => (
                      <div key={ei} className="flex items-center gap-2">
                         <div className={cn("w-1 h-3 rounded-full", e.type === "meeting" ? "bg-accent-green" : "bg-accent-red")} />
                         <span className="text-[9px] font-black text-white/50 truncate uppercase tracking-wider">{e.title}</span>
                      </div>
                    ))}
                 </div>
               </div>
             );
           })}
        </div>
      </div>

      {/* Right Sidebar: Scheduled */}
      <div className="w-[380px] bg-dark-900 border-l border-white/5 p-10 overflow-y-auto no-scrollbar relative z-20">
         <h3 className="text-2xl font-black text-white mb-1">Scheduled</h3>
         <p className="text-[11px] font-black text-dark-500 uppercase tracking-widest mb-10">
           {selectedDay} {months[currentMonthIndex]}, {currentYear}
         </p>

         <div className="space-y-10">
            {getDayEvents(selectedDay).length > 0 ? getDayEvents(selectedDay).map(event => (
              <div key={event.id} className="group/event cursor-pointer">
                 <p className="text-xs font-black text-dark-500 mb-6 flex items-center gap-3">
                   {new Date(event.start).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} 
                   <span className="w-full h-px bg-white/5" />
                 </p>
                 
                 <Card variant="glass" className="rounded-[2rem] overflow-hidden border-white/5 hover:bg-dark-800 transition-all">
                    <div className={cn("h-1.5 w-full", event.type === "meeting" ? "bg-accent-green" : "bg-accent-red")} />
                    <CardContent className="p-8">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-xl font-black text-white mb-1">{event.title}</h4>
                            <Badge variant="outline" className="text-[9px] uppercase font-black">{event.type}</Badge>
                          </div>
                       </div>
                       <div className="flex items-center gap-2 text-dark-400 mt-4">
                          <Clock className="w-4 h-4" />
                          <span className="text-[11px] font-black tracking-widest uppercase">
                            {new Date(event.start).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} - 
                            {new Date(event.end).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                       </div>
                    </CardContent>
                 </Card>
              </div>
            )) : (
              <div className="text-center py-20">
                <p className="text-sm font-black text-dark-500 uppercase tracking-[0.2em]">No events</p>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}

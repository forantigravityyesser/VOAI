"use client";

import React, { useState, useMemo } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Bell, 
  MoreVertical,
  Video,
  LayoutGrid,
  Zap,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WEEK_DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const D_NAMES = ["System Architecture", "Security Audit", "API Integration", "Marketing Sync", "Client Call"];
const BASE_SCHEDULE = [
  {
    time: "8:00 - 10:00 am",
    type: "Meeting",
    details: "9:30 - 10:00 • Motion Design",
    color: "bg-accent-purple",
    icon: Video
  },
  {
    time: "",
    type: "Component library",
    details: "11:00 - 11:30 • UI/UX Design",
    color: "bg-accent-green",
    icon: LayoutGrid
  },
  {
    time: "10:30",
    isHighlight: true
  },
  {
    time: "11:00 am - 14:00 pm",
    type: "Payment module audit",
    details: "11:00 - 11:30 • Research",
    color: "bg-accent-orange",
    icon: Clock
  },
  {
    time: "",
    type: "Meeting",
    details: "12:00 - 12:30 • Testing",
    color: "bg-accent-blue",
    icon: Video
  }
];

export default function TeamRightSidebar({ onCalendarClick }: { onCalendarClick?: () => void }) {
  const [selectedDay, setSelectedDay] = useState(10);

  const currentSchedule = useMemo(() => {
    if (selectedDay % 3 === 0) return BASE_SCHEDULE.slice(0, 3);
    if (selectedDay % 2 === 0) return BASE_SCHEDULE;
    return BASE_SCHEDULE.filter(i => !i.isHighlight).map(i => ({...i, type: D_NAMES[selectedDay % D_NAMES.length] || i.type }));
  }, [selectedDay]);

  return (
    <aside className="w-[380px] bg-dark-900 border-l border-white/5 flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-500">
      <div className="p-8 pb-4 flex items-center justify-between">
        <div onClick={onCalendarClick} className="cursor-pointer group">
          <h2 className="text-xl font-bold text-white mb-1 group-hover:text-accent-red transition-colors flex items-center gap-2">
            Calendar <Zap className="w-4 h-4 text-accent-red opacity-0 group-hover:opacity-100 transition-all scale-0 group-hover:scale-100" />
          </h2>
          <p className="text-xs text-dark-400 font-medium">Tuesday, {selectedDay} March 2022</p>
        </div>
        <button className="relative w-12 h-12 rounded-2xl bg-dark-800 border border-white/10 flex items-center justify-center hover:bg-dark-700 transition-all group">
          <Bell className="w-5 h-5 text-dark-200 group-hover:text-white transition-colors" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent-red text-[10px] font-black flex items-center justify-center shadow-lg shadow-accent-red/30">
            6
          </span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-4 space-y-10">
        <div 
          onClick={onCalendarClick}
          className="bg-dark-800/80 rounded-[2.5rem] p-6 border border-white/5 shadow-2xl cursor-pointer hover:border-accent-red/30 hover:bg-dark-700/50 transition-all group/cal relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
          
          <div className="flex items-center justify-between mb-6 relative">
            <h3 className="text-sm font-black text-white px-2 group-hover/cal:text-accent-red transition-colors">March 2022</h3>
            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
              <button className="p-1.5 hover:text-white text-dark-400 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
              <button className="p-1.5 hover:text-white text-dark-400 transition-colors"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center relative">
            {WEEK_DAYS.map(wd => (
              <div key={wd} className="text-[10px] font-bold text-dark-400 py-2">{wd}</div>
            ))}
            {Array.from({ length: 3 }, (_, i) => (
              <div key={`empty-${i}`} className="p-2 text-[11px] text-dark-500 opacity-20">2{8+i}</div>
            ))}
            {DAYS.map(d => (
              <div 
                key={d} 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDay(d);
                }}
                className={`p-2 text-[11px] font-bold transition-all rounded-xl relative group/day
                  ${d === selectedDay 
                    ? 'text-white bg-accent-red/90 shadow-[0_0_20px_rgba(255,107,107,0.4)]' 
                    : 'text-dark-200 hover:text-white hover:bg-white/5'}
                `}
              >
                {d}
                {d === 10 && d !== selectedDay && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-red rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-dark-400">Schedule • {selectedDay} Mar</h3>
                <div className="w-8 h-px bg-white/5" />
              </div>

              {currentSchedule.map((item, idx) => (
                <div key={idx} className="relative">
                  {item.isHighlight ? (
                    <div className="flex items-center gap-4 py-2">
                      <div className="px-3 py-1 bg-dark-600 rounded-lg text-[10px] font-black text-white shadow-lg border border-white/5">
                        {item.time}
                      </div>
                      <div className="flex-1 h-px bg-white/5 border-t border-dashed border-white/10" />
                    </div>
                  ) : (
                    <div className="group flex flex-col gap-2">
                      {item.time && (
                        <p className="text-[10px] font-black text-dark-400 uppercase tracking-widest">{item.time}</p>
                      )}
                      <div className="flex items-start gap-4">
                        <div className={`w-11 h-11 rounded-2xl ${item.color}/20 flex items-center justify-center border border-white/5 shadow-lg group-hover:scale-110 transition-transform`}>
                           {item.icon && <item.icon className="w-4 h-4 text-white" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[14px] font-bold text-white group-hover:text-accent-red transition-colors tracking-tight leading-none">{item.type}</h4>
                            <button className="text-dark-400 hover:text-white transition-all"><MoreVertical className="w-4 h-4" /></button>
                          </div>
                          <p className="text-[11px] text-dark-400 mt-1.5 font-medium leading-tight">{item.details}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </aside>
  );
}

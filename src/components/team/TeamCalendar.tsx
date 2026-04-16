"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Trash2, 
  Edit, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Calendar as CalendarIcon, 
  Users, 
  Play, 
  CheckCircle2, 
  X,
  Video,
  ExternalLink,
  MessageSquare
} from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  endTime: string;
  duration: string;
  type: "important" | "meeting" | "standup" | "deadline";
  members: string[];
  color: string;
  link?: string;
  date: number; // Day of the month
}

const scheduleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "English Lesson",
    subtitle: "Online class with tutor",
    time: "09:00",
    endTime: "10:15",
    duration: "45 min",
    type: "important",
    members: ["AP", "KD"],
    color: "#ff5e3a",
    date: 8
  },
  {
    id: "2",
    title: "Job Interview",
    subtitle: "Frontend Developer position",
    time: "10:00",
    endTime: "11:00",
    duration: "1 hour",
    type: "meeting",
    members: ["VL"],
    color: "#c0ff33",
    link: "Meet Link",
    date: 8
  },
  {
    id: "3",
    title: "Team Sync Call",
    subtitle: "Weekly updates",
    time: "13:00",
    endTime: "15:00",
    duration: "2 hours",
    type: "standup",
    members: ["JK", "AP", "IM", "KD", "AI"],
    color: "#3498db",
    date: 8
  }
];

export default function TeamCalendar() {
  const [selectedDay, setSelectedDay] = useState(8);
  const [showModal, setShowModal] = useState(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(8); // September
  const [currentYear, setCurrentYear] = useState(2025);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
  
  // Mock today is Sep 8
  const todayDay = 8;
  const todayMonth = 8;

  const nextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonthIndex(prev => prev + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonthIndex(prev => prev - 1);
    }
  };

  const days = [30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2];

  const getDayEvents = (day: number) => {
    return scheduleEvents.filter(e => e.date === day);
  };

  const handleDayClick = (day: number, isOutside: boolean) => {
    if (isOutside) return;
    setSelectedDay(day);
  };

  return (
    <div className="flex w-full h-full bg-[#1b202d] overflow-hidden text-white font-sans relative">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[150px] rounded-full"></div>

      {/* Left: Main Calendar */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto no-scrollbar">
        
        {/* Calendar Header (No chevrons as requested) */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
               <h2 className="text-3xl font-black tracking-tight">{months[currentMonthIndex]}</h2>
             </div>
             <div className="flex items-center gap-2">
               <h2 className="text-3xl font-black text-dark-500 tracking-tight">{currentYear}</h2>
             </div>
          </div>

          <div className="flex gap-4">
             <button 
               onClick={prevMonth}
               className="w-12 h-12 rounded-2xl bg-dark-800/40 border border-white/5 flex items-center justify-center hover:bg-dark-700 transition-all active:scale-95"
             >
                <ChevronLeft className="w-5 h-5" />
             </button>
             <button 
               onClick={nextMonth}
               className="w-12 h-12 rounded-2xl bg-dark-800/40 border border-white/5 flex items-center justify-center hover:bg-dark-700 transition-all active:scale-95"
             >
                <ChevronRight className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-4 mb-4">
           {weekDays.map(day => (
             <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-dark-400">
                {day}
             </div>
           ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-4 flex-1">
           {days.map((day, idx) => {
             const isToday = day === todayDay && currentMonthIndex === todayMonth;
             const isOutsideMonth = idx < 1 || idx > 30;
             const isSelected = day === selectedDay && !isOutsideMonth;
             const isPast = day < todayDay && !isOutsideMonth;
             const isFuture = day > todayDay && !isOutsideMonth;
             const dayEvents = getDayEvents(day);

             return (
               <div 
                 key={idx}
                 onClick={() => handleDayClick(day, isOutsideMonth)}
                 className={`relative h-[160px] rounded-[2rem] p-6 cursor-pointer transition-all duration-500 group
                   ${isToday ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 shadow-[0_20px_40px_rgba(59,130,246,0.1)] border border-blue-500/30' : 'bg-[#242938]/40 border border-white/5 hover:bg-[#2d3345]/60 hover:border-white/10'}
                   ${isSelected && !isToday ? 'ring-2 ring-blue-500/40 border-blue-500/40' : ''}
                   ${isPast ? 'opacity-40 grayscale-[0.5]' : ''}
                   ${isFuture ? 'hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]' : ''}
                   ${isOutsideMonth ? 'opacity-10 grayscale' : 'opacity-100'}
                 `}
               >
                 {/* Day Number */}
                 <div className="flex justify-between items-start">
                    <span className={`text-2xl font-black ${isToday ? 'text-white' : isPast ? 'text-dark-400' : 'text-white'}`}>
                        {day}
                    </span>
                    
                    {/* Add Task Button on Hover for available days */}
                    {!isOutsideMonth && day >= todayDay && (
                      <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           setSelectedDay(day);
                           setShowModal(true);
                         }}
                         className="p-2 bg-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95 shadow-lg shadow-blue-500/20"
                         title="Create task"
                      >
                         <Plus className="w-3 h-3 text-white" />
                      </button>
                    )}
                 </div>

                 {/* Indicators */}
                 <div className="mt-4 space-y-2">
                    {dayEvents.map((e, ei) => (
                      <div key={ei} className="flex items-center gap-2">
                         <div className="w-1 h-3 rounded-full" style={{ backgroundColor: e.color }} />
                         <span className="text-[9px] font-black text-white/50 truncate uppercase tracking-wider">{e.title}</span>
                      </div>
                    ))}
                 </div>

                 {/* Selection Highlight for Today */}
                 {isToday && (
                   <div className="absolute bottom-6 right-6">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,1)]"></div>
                   </div>
                 )}
               </div>
             );
           })}
        </div>
      </div>

      {/* Right Sidebar: Scheduled */}
      <div className="w-[380px] bg-[#1e2330] border-l border-white/5 p-10 overflow-y-auto no-scrollbar relative z-20">
         <div className="flex items-center justify-between mb-10">
            <div>
               <h3 className="text-2xl font-black text-white mb-1">Scheduled</h3>
               <p className="text-[11px] font-black text-dark-500 uppercase tracking-widest">{selectedDay} {months[currentMonthIndex]}, {currentYear}</p>
            </div>
            <div className="flex gap-2">
               <button onClick={prevMonth} className="p-2 text-dark-400 hover:text-white transition-colors"><ChevronLeft className="w-5 h-5" /></button>
               <button onClick={nextMonth} className="p-2 text-dark-400 hover:text-white transition-colors"><ChevronRight className="w-5 h-5" /></button>
            </div>
         </div>

         {/* Events List */}
         <div className="space-y-10">
            {getDayEvents(selectedDay).length > 0 ? getDayEvents(selectedDay).map(event => (
              <div key={event.id} className="group/event cursor-pointer">
                 <p className="text-xs font-black text-dark-500 mb-6 flex items-center gap-3">
                   {event.time} <span className="w-full h-px bg-white/5" />
                 </p>
                 
                 <div className="bg-[#242938]/60 border border-white/5 rounded-[2rem] overflow-hidden hover:bg-[#2d3345]/80 transition-all duration-300 relative group-hover/event:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover/event:scale-[1.02]">
                    <div className="h-1.5 w-full" style={{ backgroundColor: event.color }} />
                    <div className="p-8">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-xl font-black text-white mb-1">{event.title}</h4>
                            <p className="text-xs font-bold text-dark-400 uppercase tracking-wider">{event.subtitle}</p>
                          </div>
                          {event.type === 'standup' && <div className="p-2 bg-blue-500/10 rounded-xl"><Video className="w-4 h-4 text-blue-400" /></div>}
                       </div>
                       <div className="flex items-center justify-between mb-8 text-dark-400">
                          <div className="flex items-center gap-2">
                             <Clock className="w-4 h-4" />
                             <span className="text-[11px] font-black tracking-widest">{event.time} — {event.endTime}</span>
                          </div>
                       </div>
                       <div className="flex items-center justify-between">
                          <div className="flex -space-x-3">
                             {event.members.slice(0, 3).map((m, mi) => (
                               <div key={mi} className="w-10 h-10 rounded-2xl bg-dark-700 border-4 border-[#242938] flex items-center justify-center text-[10px] font-black text-white shadow-xl">{m}</div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            )) : (
              <div className="text-center py-20">
                <p className="text-sm font-black text-dark-500 uppercase tracking-[0.2em]">No events scheduled</p>
              </div>
            )}
         </div>
      </div>

      {/* Modal - Add Task */}
      {showModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowModal(false)} />
           <div className="relative w-full max-w-[500px] bg-[#1b202d] border border-white/10 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-300">
              <div className="flex justify-between items-start mb-10">
                 <div>
                   <h3 className="text-3xl font-black text-white tracking-tight">Add New Task</h3>
                   <p className="text-xs font-bold text-dark-400 mt-2 uppercase tracking-widest">{selectedDay} {months[currentMonthIndex]} {currentYear}</p>
                 </div>
                 <button onClick={() => setShowModal(false)} className="p-2 text-dark-500 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                 </button>
              </div>

              <div className="space-y-8">
                 <div>
                    <span className="text-[10px] font-black text-dark-500 uppercase tracking-widest block mb-4">Task Name</span>
                    <input 
                      type="text"
                      placeholder="Enter task name"
                      className="w-full bg-dark-800/60 border border-white/5 rounded-2xl p-6 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-dark-500"
                    />
                 </div>

                 <div>
                    <span className="text-[10px] font-black text-dark-500 uppercase tracking-widest block mb-4">Due Time (Deadline)</span>
                    <input 
                      type="time" 
                      className="w-full bg-dark-800/60 border border-white/5 rounded-2xl p-6 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all" 
                      defaultValue="18:00" 
                    />
                 </div>

                 <div>
                    <span className="text-[10px] font-black text-dark-500 uppercase tracking-widest block mb-4">Description</span>
                    <textarea 
                      placeholder="Details about task..."
                      className="w-full h-32 bg-dark-800/60 border border-white/5 rounded-2xl p-6 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all resize-none placeholder:text-dark-500"
                    />
                 </div>

                 <button className="w-full bg-blue-500 hover:bg-blue-600 text-[11px] font-black text-white uppercase tracking-widest py-5 rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-95">
                    Create Task
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

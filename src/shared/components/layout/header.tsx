"use client";

import { Bell, Calendar, FileDown, FilePlus2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setDate(now.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }));
      setTime(now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }));
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-20 flex items-center justify-between px-8 border-b border-card-border bg-dark-900/80 backdrop-blur-md sticky top-0 z-40">
      {/* Left side: Greeting */}
      <div className="animate-fade-up">
        <h2 className="text-xl font-bold text-white tracking-tight leading-none mb-1">
          Добрый день, Чем займёмся сегодня?
        </h2>
        <div className="flex items-center gap-1.5 text-[11px] text-dark-400 font-medium">
          <Calendar className="w-3 h-3" />
          <span>{date} | {time}</span>
        </div>
      </div>

      {/* Right side: Actions + Profile */}
      <div className="flex items-center gap-6">
        {/* Quick Actions */}
        <div className="flex items-center gap-2 pr-6 border-r border-card-border">
          <button className="px-4 py-2 rounded-xl border border-card-border text-[11px] font-black uppercase tracking-widest text-dark-200
            hover:border-accent-purple/40 hover:text-white transition-all flex items-center gap-2 cursor-pointer bg-dark-800/40">
            <FileDown className="w-3.5 h-3.5" />
            Export
          </button>
          <button className="px-4 py-2 rounded-xl bg-accent-purple text-[11px] font-black uppercase tracking-widest text-white
            hover:bg-accent-purple/80 hover:shadow-lg hover:shadow-accent-purple/25 transition-all flex items-center gap-2 cursor-pointer">
            <FilePlus2 className="w-3.5 h-3.5" />
            + Report
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative w-10 h-10 rounded-xl bg-dark-800 border border-card-border flex items-center justify-center
            hover:border-accent-purple/30 transition-all group cursor-pointer" title="Уведомления">
            <Bell className="w-[18px] h-[18px] text-dark-200 group-hover:text-white transition-colors" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-red text-[10px] font-bold flex items-center justify-center animate-pulse-glow border-2 border-dark-900">
              3
            </span>
          </button>

          {/* User */}
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white">Alexander V.</p>
              <p className="text-[11px] text-dark-300">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center text-sm font-bold shadow-lg shadow-accent-purple/20 ring-1 ring-white/10">
              AV
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

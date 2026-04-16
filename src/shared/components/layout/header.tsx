"use client";

import { Search, Bell, MessageSquare } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-card-border bg-dark-900/80 backdrop-blur-md sticky top-0 z-40">
      {/* Search */}
      <div className="relative w-[360px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-300" />
        <input
          type="text"
          placeholder="AI Assistant focus..."
          className="w-full h-10 pl-10 pr-4 rounded-xl bg-dark-800 border border-card-border text-sm text-white placeholder-dark-300
            focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/20 transition-all"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative w-10 h-10 rounded-xl bg-dark-800 border border-card-border flex items-center justify-center
          hover:border-accent-purple/30 transition-all group cursor-pointer" title="Уведомления">
          <Bell className="w-[18px] h-[18px] text-dark-200 group-hover:text-white transition-colors" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-red text-[10px] font-bold flex items-center justify-center animate-pulse-glow">
            3
          </span>
        </button>

        {/* Messages */}
        <button className="w-10 h-10 rounded-xl bg-dark-800 border border-card-border flex items-center justify-center
          hover:border-accent-purple/30 transition-all group cursor-pointer" title="Сообщения">
          <MessageSquare className="w-[18px] h-[18px] text-dark-200 group-hover:text-white transition-colors" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3 pl-4 border-l border-card-border">
          <div className="text-right">
            <p className="text-sm font-semibold text-white">Alexander V.</p>
            <p className="text-[11px] text-dark-300">Administrator</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center text-sm font-bold shadow-lg shadow-accent-purple/20">
            AV
          </div>
        </div>
      </div>
    </header>
  );
}

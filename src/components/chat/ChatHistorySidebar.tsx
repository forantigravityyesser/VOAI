"use client";

import { History, Search, MessageSquare, Clock, MoreVertical, Star, ShieldCheck } from "lucide-react";

const historyItems = [
  {
    id: 1,
    title: "iPhone Stock Optimization",
    date: "Today, 10:45",
    preview: "Inventory Manager: Buying 50 units...",
    active: true,
  },
  {
    id: 2,
    title: "Logistics Analysis Oct",
    date: "Today, 09:12",
    preview: "15% cost reduction achieved...",
    active: false,
  },
  {
    id: 3,
    title: "Supplier Verification: TechGlobal",
    date: "Yesterday, 18:30",
    preview: "Status: Under legal review",
    field: "Team",
    active: false,
  },
  {
    id: 4,
    title: "Q4 Strategy Planning",
    date: "12 Oct, 14:20",
    preview: "Scaling strategy for peak season...",
    active: false,
  },
];

export default function ChatHistorySidebar() {
  return (
    <aside className="w-[320px] h-[calc(100vh-64px)] shrink-0 border-l border-white/5 bg-dark-900/50 backdrop-blur-3xl flex flex-col z-20">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[13px] font-black text-white uppercase tracking-widest flex items-center gap-3">
             <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-lg">
                <History className="w-4 h-4 text-indigo-400" />
             </div>
             Query History
          </h2>
          <button className="w-8 h-8 flex items-center justify-center text-dark-400 hover:text-white transition-all bg-dark-800 rounded-lg border border-white/5 shadow-xl">
             <Star className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 group-focus-within:text-indigo-400 transition-colors" />
          <input
            type="text"
            placeholder="Search history..."
            className="w-full h-11 bg-dark-800 border border-white/5 rounded-xl pl-11 pr-4 text-[13px] text-white placeholder-dark-400 focus:outline-none focus:border-indigo-500/30 focus:bg-dark-800/80 transition-all shadow-xl"
          />
        </div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        {historyItems.map((item) => (
          <div
            key={item.id}
            className={`group p-4 rounded-3xl transition-all cursor-pointer border relative overflow-hidden
              ${item.active 
                ? "bg-indigo-600/10 border-indigo-500/30" 
                : "border-transparent hover:bg-dark-800 hover:border-white/5"}
            `}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shadow-xl shrink-0 transition-transform group-hover:scale-110
                  ${item.active ? "bg-indigo-600 border-indigo-400 text-white" : "bg-dark-700 border-white/5 text-dark-300"}`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <h3 className={`text-[13px] font-bold truncate tracking-tight ${item.active ? "text-white" : "text-dark-100"}`}>
                  {item.title}
                </h3>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity text-dark-400 hover:text-white">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-[11px] text-dark-400 line-clamp-1 mb-3 px-1 font-medium">
              {item.preview}
            </p>
            
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-[10px] font-black text-dark-500 uppercase tracking-widest">
                <Clock className="w-3 h-3" />
                {item.date}
              </div>
              {item.field && (
                <span className="text-[9px] font-black uppercase bg-dark-700 text-dark-300 px-2.5 py-1 rounded-full border border-white/5 shadow-inner">
                  {item.field}
                </span>
              )}
            </div>

            {item.active && (
              <div className="absolute left-0 top-[20%] bottom-[20%] w-1 bg-indigo-500 rounded-r-full shadow-[0_0_15px_rgba(99,102,241,0.6)]" />
            )}
          </div>
        ))}
      </div>

      {/* Storage Footer */}
      <div className="p-6 bg-dark-900/80 border-t border-white/5 backdrop-blur-2xl">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)] border border-white/10 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[11px] font-black text-white uppercase tracking-widest">Encrypted Storage</p>
            <p className="text-[10px] text-indigo-400 font-bold">Cloud Sync Active</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

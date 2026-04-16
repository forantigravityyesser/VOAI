"use client";

import React, { useState } from "react";
import { 
  Search,
  Filter,
  Users,
  Plus,
  Zap
} from "lucide-react";
import KanbanBoard from "@/components/team/KanbanBoard";
import TeamCalendar from "@/components/team/TeamCalendar";
import TeamRightSidebar from "@/components/team/TeamRightSidebar";

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<"kanban" | "calendar" | "history">("kanban");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="w-full h-screen bg-dark-900 flex overflow-hidden">
      {/* Left side: Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Global Top Bar (matches sketch) */}
        <div className="px-8 mt-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative w-[400px] group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400 group-hover:text-dark-200 transition-colors" />
              <input 
                type="text" 
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-12 rounded-2xl bg-dark-800 border border-white/5 text-sm text-white placeholder-dark-400 focus:outline-none focus:bg-dark-800 transition-all shadow-xl"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>

            {activeTab === "calendar" && (
              <button 
                onClick={() => setActiveTab("kanban")}
                className="bg-accent-red/10 border border-accent-red/20 px-6 py-3 rounded-2xl flex items-center gap-3 text-xs font-black uppercase tracking-widest text-accent-red hover:bg-accent-red/20 transition-all shadow-xl animate-in fade-in slide-in-from-left-4 duration-500"
              >
                <Zap className="w-4 h-4 fill-accent-red" /> Back to Board
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
             <div className="flex bg-dark-800/80 p-1.5 rounded-2xl border border-white/5 gap-2 shadow-2xl">
                <button className="px-6 py-2.5 text-[11px] font-bold text-dark-300 hover:text-white transition-all relative">
                  My tasks 
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-accent-red rounded-full text-[9px] text-white shadow-lg shadow-accent-red/20">2</span>
                </button>
                <button className="px-6 py-2.5 text-[11px] font-bold bg-dark-600 text-white rounded-xl shadow-xl flex items-center gap-2 hover:bg-dark-500 transition-all border border-white/5">
                  <Plus className="w-4 h-4" /> New project
                </button>
             </div>
          </div>
        </div>

        {/* Dynamic View Content */}
        <div className="flex-1 overflow-hidden mt-2 relative">
          {activeTab === "kanban" && <KanbanBoard />}
          {activeTab === "calendar" && <TeamCalendar />}
          {activeTab === "history" && <HistoryView />}
        </div>
      </div>

      {/* Right side: Calendar & Schedule Sidebar (matches sketch) */}
      {activeTab === "kanban" && (
        <TeamRightSidebar onCalendarClick={() => setActiveTab("calendar")} />
      )}
    </main>
  );
}

function HistoryView() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-dark-400 space-y-4">
      <Users className="w-16 h-16 opacity-10" />
      <p className="text-sm font-bold uppercase tracking-widest opacity-20">Project History is empty</p>
    </div>
  );
}

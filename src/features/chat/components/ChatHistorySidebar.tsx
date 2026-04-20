"use client";

import React, { useState, useEffect } from "react";
import { History, Search, MessageSquare, Clock, MoreVertical, Star, ShieldCheck } from "lucide-react";
import { chatService } from "../services/chat.service";
import { ChatSession } from "@/core/types/chat";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ChatHistorySidebar() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>("s-1");

  useEffect(() => {
    chatService.getSessions().then(setSessions);
  }, []);

  return (
    <aside className="w-[320px] h-[calc(100vh-64px)] shrink-0 border-l border-white/5 bg-dark-900/50 backdrop-blur-3xl flex flex-col z-20">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[13px] font-black text-white uppercase tracking-widest flex items-center gap-3">
             <div className="w-8 h-8 rounded-xl bg-accent-purple/10 flex items-center justify-center border border-accent-purple/20 shadow-lg">
                <History className="w-4 h-4 text-accent-purple" />
             </div>
             Query History
          </h2>
          <Button variant="ghost" size="icon" className="w-8 h-8 bg-dark-800 border border-white/5 shadow-xl">
             <Star className="w-3.5 h-3.5 text-dark-400" />
          </Button>
        </div>

        {/* Search Input */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 group-focus-within:text-accent-purple transition-colors" />
          <input
            type="text"
            placeholder="Search history..."
            className="w-full h-11 bg-dark-800 border border-white/5 rounded-xl pl-11 pr-4 text-[13px] text-white placeholder-dark-400 focus:outline-none focus:border-accent-purple/30 transition-all"
          />
        </div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        {sessions.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveSessionId(item.id)}
            className={cn(
              "group p-4 rounded-3xl transition-all cursor-pointer border relative overflow-hidden",
              item.id === activeSessionId 
                ? "bg-accent-purple/10 border-accent-purple/30" 
                : "border-transparent hover:bg-dark-800 hover:border-white/5"
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center border shadow-xl shrink-0 transition-transform group-hover:scale-110",
                  item.id === activeSessionId ? "bg-accent-purple border-accent-purple/50 text-white" : "bg-dark-700 border-white/5 text-dark-300"
                )}>
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <h3 className={cn(
                  "text-[13px] font-bold truncate tracking-tight",
                  item.id === activeSessionId ? "text-white" : "text-dark-100"
                )}>
                  {item.title}
                </h3>
              </div>
              <MoreVertical className="w-4 h-4 text-dark-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <p className="text-[11px] text-dark-400 line-clamp-1 mb-3 px-1 font-medium">
              {item.lastMessage?.content}
            </p>
            
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-[10px] font-black text-dark-500 uppercase tracking-widest">
                <Clock className="w-3 h-3" />
                {item.lastMessage ? new Date(item.lastMessage.timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : 'No msgs'}
              </div>
              {item.unreadCount > 0 && (
                <Badge variant="outline" className="bg-accent-purple/20 text-accent-purple border-accent-purple/30">
                  {item.unreadCount} New
                </Badge>
              )}
            </div>

            {item.id === activeSessionId && (
              <div className="absolute left-0 top-[20%] bottom-[20%] w-1 bg-accent-purple rounded-r-full shadow-[0_0_15px_rgba(168,85,247,0.6)]" />
            )}
          </div>
        ))}
      </div>

      {/* Storage Footer */}
      <div className="p-6 bg-dark-900/80 border-t border-white/5 backdrop-blur-2xl">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg border border-white/10 transition-transform group-hover:scale-110">
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

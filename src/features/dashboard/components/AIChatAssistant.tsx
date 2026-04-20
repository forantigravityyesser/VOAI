"use client";

import { useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const suggestedActions = [
  "Show Logistics Breakdown",
  "Optimize Expenses",
];

interface ChatMessage {
  id: number;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
}

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Привет! Я проанализировал ваши KPI за прошлую неделю. Ваша маржинальность немного снизилась из-за роста логистических расходов. Хотите подробный отчёт?",
    timestamp: "14:28",
  },
  {
    id: 2,
    role: "user",
    content: "Да, давай посмотрим на топ инсайды и риски по складу.",
    timestamp: "14:30",
  },
];

interface AIChatAssistantProps {
  variant?: "inline" | "sidebar";
}

export default function AIChatAssistant({ variant = "inline" }: AIChatAssistantProps) {
  const [messages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");

  const isSidebar = variant === "sidebar";

  return (
    <div className={cn(
      "glass-card rounded-[2rem] border-white/5 overflow-hidden flex flex-col",
      isSidebar ? "h-full shadow-2xl" : "mt-4"
    )}>
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shadow-lg shadow-accent-purple/20 relative">
            <Sparkles className="w-5 h-5 text-white" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-accent-green rounded-full border-2 border-dark-900" />
          </div>
          <div>
            <h3 className="text-[13px] font-black text-white tracking-tight leading-tight">Менеджер Hermes</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
              <p className="text-[10px] text-dark-400 font-bold uppercase tracking-widest leading-none">Online & Analyzing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className={cn(
        "flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar",
        isSidebar ? "" : "max-h-[240px]"
      )}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-4 animate-fade-up",
              msg.role === "user" ? "flex-row-reverse" : ""
            )}
          >
            {msg.role === "assistant" && (
              <div className="w-9 h-9 rounded-xl bg-dark-800 border border-white/5 flex items-center justify-center shrink-0 mt-1 shadow-inner">
                <span className="text-sm">🇬🇷</span>
              </div>
            )}
            <div
              className={cn(
                "max-w-[85%] rounded-[1.5rem] px-5 py-3.5 text-[13px] leading-relaxed font-medium shadow-sm",
                msg.role === "user"
                  ? "bg-accent-purple text-white rounded-tr-none shadow-accent-purple/10"
                  : "bg-dark-800/80 text-dark-100 rounded-tl-none border border-white/5"
              )}
            >
              {msg.content}
              <div className={cn(
                "text-[9px] mt-2 font-bold uppercase tracking-widest",
                msg.role === "user" ? "text-white/60" : "text-dark-500"
              )}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Actions */}
      <div className="px-6 pb-4 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        {suggestedActions.map((action) => (
          <button
            key={action}
            className="px-4 py-2.5 rounded-xl border border-white/5 bg-dark-800/40 text-[10px] font-black text-dark-300 uppercase tracking-widest
              hover:border-accent-purple/30 hover:text-white hover:bg-accent-purple/5 transition-all cursor-pointer flex items-center gap-2 shrink-0"
          >
            {action}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-6 pt-0">
        <div className="bg-dark-800/80 rounded-[1.5rem] border border-white/5 p-2 focus-within:border-accent-purple/30 transition-all shadow-inner backdrop-blur-md">
          <textarea
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Спроси Гермеса..."
            className="w-full bg-transparent text-[13px] text-white placeholder-dark-500 px-4 py-3 focus:outline-none resize-none custom-scrollbar min-h-[46px]"
          />
          <div className="flex items-center justify-between px-2 pb-1">
             <div className="flex gap-2">
                <button className="w-8 h-8 rounded-lg hover:bg-dark-700 flex items-center justify-center transition-colors">
                  <span className="text-xs">📎</span>
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-dark-700 flex items-center justify-center transition-colors">
                   <span className="text-xs">🎙️</span>
                </button>
             </div>
             <button className="h-9 px-4 rounded-xl bg-accent-purple text-white hover:hover:shadow-[0_0_20px_rgba(108,92,231,0.3)] transition-all flex items-center gap-2 group">
              <span className="text-[10px] font-black uppercase tracking-widest">Отправить</span>
              <Send className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

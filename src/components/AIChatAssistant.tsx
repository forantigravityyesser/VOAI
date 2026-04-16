"use client";

import { useState } from "react";
import { Sparkles, Send, ArrowRight } from "lucide-react";

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

export default function AIChatAssistant() {
  const [messages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="glass-card rounded-2xl overflow-hidden mt-4">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-card-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shadow-lg shadow-accent-purple/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Менеджер Улетс</h3>
            <p className="text-[11px] text-dark-300">Your AI-powered business companion</p>
          </div>
        </div>
        <button className="text-xs font-medium text-accent-purple-light hover:text-accent-purple transition-colors cursor-pointer">
          Full History
        </button>
      </div>

      {/* Chat Messages */}
      <div className="p-5 space-y-4 max-h-[240px] overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 animate-fade-up ${
              msg.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-dark-600 to-dark-700 flex items-center justify-center shrink-0 mt-1">
                <span className="text-xs">🧠</span>
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-accent-purple to-accent-purple/80 text-white rounded-br-md"
                  : "bg-dark-700/60 text-dark-100 rounded-bl-md"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center shrink-0 text-[10px] font-bold mt-1">
                AV
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Suggested Actions */}
      <div className="px-5 pb-3 flex gap-2 flex-wrap">
        {suggestedActions.map((action) => (
          <button
            key={action}
            className="px-4 py-2 rounded-xl border border-card-border text-xs font-medium text-dark-200
              hover:border-accent-purple/40 hover:text-white hover:bg-dark-700/50 transition-all cursor-pointer flex items-center gap-1.5"
          >
            {action}
            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-5 pb-5">
        <div className="flex items-center gap-2 bg-dark-800 rounded-xl border border-card-border p-1.5 focus-within:border-accent-purple/40 transition-all">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask your AI assistant..."
            className="flex-1 bg-transparent text-sm text-white placeholder-dark-300 px-3 py-1.5 focus:outline-none"
          />
          <button className="w-8 h-8 rounded-lg bg-accent-purple flex items-center justify-center hover:bg-accent-purple/80 transition-colors cursor-pointer shrink-0">
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

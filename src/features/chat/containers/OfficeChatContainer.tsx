"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Settings, 
  Share, 
  ChevronDown, 
  BrainCircuit,
} from "lucide-react";
import { chatService } from "../services/chat.service";
import { Message } from "@/core/types/chat";
import UserInteractionContainer from "./UserInteractionContainer";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { cn } from "@/lib/utils";

export default function OfficeChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatService.getMessages("s-1").then(setMessages);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (content: string) => {
    // Add user message
    const userMsg: Message = {
        id: Date.now().toString(),
        sender: { id: 'u-current', name: 'You', role: 'Owner', status: 'online' },
        content,
        timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsGenerating(true);

    // Simulate AI response
    setTimeout(async () => {
        const response = await chatService.sendMessage("Я проанализировал ваши данные. Все показатели в норме.");
        setMessages(prev => [...prev, response]);
        setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-dark-900">
      {/* Header */}
      <header className="h-[72px] shrink-0 border-b border-white/5 flex items-center justify-between px-8 bg-dark-900/50 backdrop-blur-2xl relative z-10">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
               AI Ассистент Wildberries
               <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            </h1>
            <p className="text-[10px] font-black text-dark-500 uppercase tracking-widest mt-1">
               Project: Financial Analysis 2026
            </p>
          </div>
          <Button variant="ghost" className="h-10 bg-dark-800 border border-white/5 rounded-xl px-4 text-[11px] font-black uppercase tracking-widest">
            Switch Focus <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="w-11 h-11 bg-dark-800 border border-white/5 rounded-xl">
             <Share className="w-5 h-5 text-dark-300" />
          </Button>
          <Button variant="ghost" size="icon" className="w-11 h-11 bg-accent-purple text-white rounded-xl shadow-lg shadow-accent-purple/20">
             <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-8 py-10 space-y-12 custom-scrollbar relative z-0"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={cn(
              "flex items-start gap-6 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500",
              msg.sender === "assistant" ? "" : "ml-auto flex-row-reverse"
            )}
          >
            {/* Avatar */}
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-2xl transition-transform hover:scale-110",
              msg.sender === "assistant" 
                ? "bg-accent-purple border-accent-purple/30 text-white" 
                : "bg-dark-800 border-white/10 text-dark-400"
            )}>
              {msg.sender === "assistant" ? <BrainCircuit className="w-6 h-6" /> : <div className="font-black text-sm">U</div>}
            </div>

            {/* Content */}
            <div className={cn("space-y-2", msg.sender === "assistant" ? "" : "items-end text-right")}>
               <div className="flex items-center gap-3">
                 <span className="text-[11px] font-black text-white uppercase tracking-widest">
                    {msg.sender === "assistant" ? "AI Intelligence" : msg.sender.name}
                 </span>
                 <span className="text-[10px] font-bold text-dark-500">
                    {new Date(msg.timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                 </span>
               </div>
               
               <Card className={cn(
                 "p-6 rounded-[2rem] border transition-all",
                 msg.sender === "assistant" 
                   ? "bg-dark-800/80 border-white/5 hover:border-accent-purple/30" 
                   : "bg-accent-purple/10 border-accent-purple/30"
               )}>
                  <p className="text-[15px] leading-relaxed text-white/90 font-medium whitespace-pre-wrap">
                    {msg.content}
                  </p>
               </Card>
            </div>
          </div>
        ))}
        {isGenerating && (
          <div className="flex items-center gap-4 text-dark-500 p-4 bg-dark-800/40 rounded-3xl border border-white/5 w-fit">
            <div className="flex gap-1">
               <div className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-bounce" style={{ animationDelay: '0ms' }} />
               <div className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-bounce" style={{ animationDelay: '150ms' }} />
               <div className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest">AI думает...</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-8 pb-10 bg-gradient-to-t from-dark-900 via-dark-900 to-transparent relative z-10">
        <UserInteractionContainer onSend={handleSend} isGenerating={isGenerating} />
      </div>
    </div>
  );
}

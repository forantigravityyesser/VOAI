"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Settings, 
  Share, 
  ChevronDown, 
  Image as ImageIcon,
  FileText,
  Code2,
  BrainCircuit,
  ClipboardList
} from "lucide-react";

import UserInteractionContainer from "./UserInteractionContainer";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function OfficeChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isStarting = messages.length === 0;

  const handleSend = (text: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    
    setIsGenerating(true);
    setTimeout(() => {
      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: "assistant", 
        content: `I'm processing your request regarding "${text}". \n\nOur team is analyzing the logistics and financial data to provide the best possible solution.`
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsGenerating(false);
    }, 1500);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="relative flex flex-col w-full h-[calc(100vh-64px)] overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(88,40,168,0.15),transparent_50%)]">
      
      {/* Top Navigation Bar */}
      <div className="px-8 py-4 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-dark-800/80 border border-white/5 rounded-2xl text-[13px] font-bold text-dark-100 hover:text-white transition-all shadow-xl group">
            ChatGPT v4.0 <ChevronDown className="w-4 h-4 text-dark-400 group-hover:text-white transition-all" />
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-dark-800/80 border border-white/5 rounded-2xl text-[13px] font-bold text-dark-100 hover:text-white transition-all shadow-xl">
            Configuration <Settings className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-dark-800/80 border border-white/5 rounded-2xl text-[13px] font-bold text-dark-100 hover:text-white transition-all shadow-xl">
            Export <Share className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden flex flex-col">
        {isStarting ? (
          <div className="flex-1 flex flex-col items-center justify-center -mt-10 p-8">
            {/* Pulsing Orb Element */}
            <div className="relative mb-12 animate-in zoom-in-50 duration-1000">
               <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 blur-2xl opacity-40 absolute inset-0 animate-pulse" />
               <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 relative border border-white/20 shadow-[0_0_40px_rgba(139,92,246,0.4)] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_60%)]" />
                  <div className="w-full h-full bg-gradient-to-t from-black/20 to-transparent" />
               </div>
            </div>

            <h2 className="text-4xl font-black text-white mb-16 tracking-tight animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
              Ready to Create Something New?
            </h2>

            {/* Quick Suggestions Chips */}
            <div className="flex gap-4 mb-8 z-20 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
              <button className="px-6 py-2.5 bg-dark-800/80 border border-white/10 rounded-2xl text-[13px] font-bold text-dark-100 flex items-center gap-2 hover:bg-dark-700 hover:border-white/20 transition-all shadow-xl">
                <ImageIcon className="w-4 h-4 text-purple-400" /> Create Image
              </button>
              <button className="px-6 py-2.5 bg-dark-800/80 border border-white/10 rounded-2xl text-[13px] font-bold text-dark-100 flex items-center gap-2 hover:bg-dark-700 hover:border-white/20 transition-all shadow-xl">
                <BrainCircuit className="w-4 h-4 text-amber-400" /> Brainstorm
              </button>
              <button className="px-6 py-2.5 bg-dark-800/80 border border-white/10 rounded-2xl text-[13px] font-bold text-dark-100 flex items-center gap-2 hover:bg-dark-700 hover:border-white/20 transition-all shadow-xl">
                <ClipboardList className="w-4 h-4 text-blue-400" /> Make a plan
              </button>
            </div>

            {/* Interaction Container */}
            <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
              <UserInteractionContainer 
                onSend={handleSend} 
                isGenerating={isGenerating} 
              />
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-3 gap-6 w-full max-w-5xl mt-16 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-700">
              {[
                { title: "Image Generator", desc: "Create high-quality images from text.", icon: ImageIcon, tag: "Create Image" },
                { title: "AI Presentation", desc: "Turn ideas into engaging presentations.", icon: FileText, tag: "Make Slides" },
                { title: "Dev Assistant", desc: "Generate clean, production ready code.", icon: Code2, tag: "Generate Code" }
              ].map((card, i) => (
                <div key={i} className="bg-dark-800/40 p-6 rounded-[2rem] border border-white/5 backdrop-blur-Xl hover:border-white/10 transition-all group cursor-pointer shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-dark-700 flex items-center justify-center">
                      <card.icon className="w-5 h-5 text-dark-200" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-dark-400 bg-dark-700 px-3 py-1.5 rounded-full group-hover:bg-dark-600 transition-colors">
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-[12px] text-dark-400 font-medium leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto pt-6 pb-40 space-y-8 px-8 custom-scrollbar"
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-6 max-w-4xl mx-auto animate-fade-up ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center font-bold text-xs shadow-lg
                    ${msg.role === "user" 
                      ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white" 
                      : "bg-dark-800 border border-white/5 text-dark-100"}
                  `}>
                    {msg.role === "user" ? "AV" : "AI"}
                  </div>

                  <div className={`flex flex-col gap-2 max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div 
                      className={`px-5 py-3.5 rounded-2xl text-[14px] leading-relaxed whitespace-pre-wrap shadow-2xl
                        ${msg.role === "user" 
                          ? "bg-indigo-600/90 text-white rounded-tr-sm" 
                          : "bg-dark-800/80 border border-white/5 text-dark-100 rounded-tl-sm"}
                      `}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {isGenerating && (
                <div className="flex gap-6 max-w-4xl mx-auto animate-pulse">
                    <div className="w-10 h-10 rounded-xl bg-dark-800 border border-white/5 flex items-center justify-center text-xs">AI</div>
                    <div className="bg-dark-800/50 border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-dark-400 shadow-xl">
                      Thinking...
                    </div>
                </div>
              )}
            </div>

            {/* Sticky Input */}
            <div className="absolute bottom-0 left-0 right-0 p-8 pt-10 bg-gradient-to-t from-dark-900 via-dark-900/90 to-transparent">
              <div className="max-w-4xl mx-auto">
                <UserInteractionContainer 
                  onSend={handleSend} 
                  isGenerating={isGenerating} 
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

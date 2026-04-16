"use client";

import React, { useState } from "react";
import { 
  Paperclip, 
  Settings2, 
  LayoutGrid, 
  Mic, 
  ArrowUp,
  Sparkles
} from "lucide-react";

interface UserInteractionContainerProps {
  onSend: (text: string) => void;
  isGenerating: boolean;
  isStarting: boolean;
}

export default function UserInteractionContainer({ onSend, isGenerating, isStarting }: UserInteractionContainerProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() && !isGenerating) {
      onSend(text.trim());
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full relative group">
      {/* Input Outer Container */}
      <div className="bg-dark-800/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all group-focus-within:border-indigo-500/50 group-focus-within:shadow-[0_0_50px_rgba(99,102,241,0.15)] ring-1 ring-white/5">
        
        {/* Main Input Area */}
        <div className="flex items-start px-2 py-2">
          <Sparkles className="w-5 h-5 text-indigo-400 mt-1 shrink-0" />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Anything..."
            rows={1}
            className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none focus-visible:outline-none shadow-none focus:shadow-none text-white placeholder-dark-400 text-[16px] px-4 py-1 resize-none min-h-[44px] custom-scrollbar"
            style={{ height: 'auto' }}
            spellCheck={false}
          />
        </div>

        {/* Action Controls Footer */}
        <div className="flex items-center justify-between mt-2 pt-2 px-2 border-t border-white/5">
          <div className="flex items-center gap-1">
            <button className="flex items-center gap-2 px-3 py-2 text-dark-400 hover:text-white hover:bg-white/5 rounded-xl transition-all text-xs font-bold uppercase tracking-widest">
              <Paperclip className="w-4 h-4" /> Attach
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-dark-400 hover:text-white hover:bg-white/5 rounded-xl transition-all text-xs font-bold uppercase tracking-widest">
              <Settings2 className="w-4 h-4" /> Settings
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-dark-400 hover:text-white hover:bg-white/5 rounded-xl transition-all text-xs font-bold uppercase tracking-widest">
              <LayoutGrid className="w-4 h-4" /> Options
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center text-dark-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all">
              <Mic className="w-5 h-5" />
            </button>
            <button 
              onClick={handleSend}
              disabled={!text.trim() || isGenerating}
              className={`w-10 h-10 flex items-center justify-center rounded-2xl transition-all shadow-xl
                ${text.trim() && !isGenerating 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-105 active:scale-95 shadow-indigo-600/30' 
                  : 'bg-dark-600 text-dark-400 opacity-50'}
              `}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

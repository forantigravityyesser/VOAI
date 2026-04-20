"use client";

import React, { useState } from "react";
import { 
  Paperclip, 
  Settings2, 
  Mic, 
  ArrowUp,
  Sparkles
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";

interface UserInteractionContainerProps {
  onSend: (text: string) => void;
  isGenerating: boolean;
}

export default function UserInteractionContainer({ onSend, isGenerating }: UserInteractionContainerProps) {
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
      <div className="bg-dark-800/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-4 shadow-2xl transition-all group-focus-within:border-accent-purple/50 ring-1 ring-white/5">
        
        {/* Main Input Area */}
        <div className="flex items-start px-2 py-2">
          <Sparkles className="w-5 h-5 text-accent-purple mt-1 shrink-0" />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Спросите о чем угодно..."
            className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none text-white placeholder-dark-400 text-[16px] px-4 py-1 resize-none min-h-[44px] custom-scrollbar"
            rows={1}
            spellCheck={false}
          />
        </div>

        {/* Action Controls Footer */}
        <div className="flex items-center justify-between mt-2 pt-2 px-2 border-t border-white/5">
          <div className="flex items-center gap-1">
            <Button variant="ghost" className="h-9 px-3 text-dark-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
              <Paperclip className="w-4 h-4 mr-2" /> Прикрепить
            </Button>
            <Button variant="ghost" className="h-9 px-3 text-dark-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
              <Settings2 className="w-4 h-4 mr-2" /> Настройки
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="w-10 h-10 text-dark-400 hover:text-white rounded-2xl">
              <Mic className="w-5 h-5" />
            </Button>
            <Button 
              onClick={handleSend}
              disabled={!text.trim() || isGenerating}
              className={cn(
                "w-10 h-10 rounded-2xl transition-all shadow-xl p-0",
                text.trim() && !isGenerating 
                  ? "bg-accent-purple text-white hover:scale-105 active:scale-95 shadow-accent-purple/30" 
                  : "bg-dark-600 text-dark-400 opacity-50"
              )}
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

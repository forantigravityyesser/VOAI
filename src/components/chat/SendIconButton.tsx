"use client";

import { Send, Square } from "lucide-react";

interface SendIconButtonProps {
  canSend: boolean;
  isGenerating: boolean;
  onSend: () => void;
  onCancel: () => void;
}

export default function SendIconButton({ canSend, isGenerating, onSend, onCancel }: SendIconButtonProps) {
  if (isGenerating) {
    return (
      <button
        onClick={onCancel}
        aria-label="Cancel response"
        className="min-w-[56px] min-h-[56px] flex items-center justify-center rounded-xl bg-dark-700 text-accent-red hover:bg-dark-600 transition-all cursor-pointer"
      >
        <Square className="w-5 h-5 fill-current" />
      </button>
    );
  }

  return (
    <button
      disabled={!canSend}
      onClick={onSend}
      aria-label="Send message"
      className={`min-w-[56px] min-h-[56px] flex items-center justify-center rounded-xl transition-all duration-300
        ${
          canSend
            ? "bg-gradient-to-br from-accent-purple to-accent-purple-light text-white shadow-[0_0_15px_rgba(108,92,231,0.4)] hover:shadow-[0_0_25px_rgba(108,92,231,0.6)] hover:scale-105 active:scale-95 cursor-pointer"
            : "bg-dark-800 border border-accent-purple/10 text-dark-400 cursor-not-allowed opacity-40"
        }`}
    >
      <Send className={`w-5 h-5 transition-transform duration-300 ${canSend ? "rotate-0 transform translate-x-0.5" : "-rotate-12"}`} />
    </button>
  );
}

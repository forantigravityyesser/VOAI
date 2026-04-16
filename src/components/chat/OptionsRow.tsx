"use client";

import { Plus, Paperclip, LayoutTemplate, MoreHorizontal } from "lucide-react";

export default function OptionsRow() {
  return (
    <div className="flex items-center gap-2 px-2 pb-2">
      <button 
        aria-label="Add context"
        className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg hover:bg-dark-700 text-dark-200 hover:text-white transition-all cursor-pointer focus:ring-1 focus:ring-accent-purple"
      >
        <Plus className="w-5 h-5" />
      </button>
      <button 
        aria-label="Attach files"
        className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg hover:bg-dark-700 text-dark-200 hover:text-white transition-all cursor-pointer"
      >
        <Paperclip className="w-5 h-5" />
      </button>
      <button 
        aria-label="Templates"
        className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg hover:bg-dark-700 text-dark-200 hover:text-white transition-all cursor-pointer"
      >
        <LayoutTemplate className="w-5 h-5" />
      </button>
      <button 
        aria-label="More options"
        className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg hover:bg-dark-700 text-dark-200 hover:text-white transition-all cursor-pointer"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </div>
  );
}

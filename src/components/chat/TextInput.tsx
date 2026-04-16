"use client";

import React, { useRef, useEffect } from "react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  label?: string;
}

export default function TextInput({ value, onChange, onSend, label = "Что сделать" }: TextInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize logic
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 480);
      textarea.style.height = `${newHeight}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col pt-1">
      {value.length === 0 && (
        <label className="absolute pointer-events-none text-dark-300 text-sm pl-3 pt-1.5 transition-all">
          {label}
        </label>
      )}
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent border-none outline-none text-white text-sm resize-none px-3 py-1.5 min-h-[36px] max-h-[480px] custom-scrollbar focus:ring-0"
        style={{ scrollbarWidth: "thin" }}
      />
    </div>
  );
}

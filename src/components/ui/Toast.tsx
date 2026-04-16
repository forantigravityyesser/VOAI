"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-10 right-10 z-[100] animate-fade-up">
      <div className={`px-4 py-3 rounded-xl shadow-2xl border flex items-center gap-3 glass-card
        ${type === "success" ? "border-accent-green/50" : "border-accent-red/50"}
      `}>
        {type === "success" ? (
          <CheckCircle2 className="w-5 h-5 text-accent-green" />
        ) : (
          <AlertCircle className="w-5 h-5 text-accent-red" />
        )}
        <span className="text-sm font-medium text-white">{message}</span>
      </div>
    </div>
  );
}

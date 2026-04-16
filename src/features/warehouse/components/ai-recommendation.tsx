import React from "react";
import { Sparkles } from "lucide-react";

interface AIRecommendationProps {
  text: string;
  color?: string;
}

export const AIRecommendation = ({ text, color = "accent-purple" }: AIRecommendationProps) => (
  <div className={`w-full bg-${color}/10 border border-${color}/20 rounded-2xl p-4 flex items-start gap-4 mb-6 relative overflow-hidden group transition-all duration-500`}>
    <div className={`p-2 bg-${color}/20 rounded-xl shrink-0 group-hover:scale-110 transition-transform`}>
      <Sparkles className={`w-4 h-4 text-${color}`} />
    </div>
    <p className="text-sm text-dark-100/90 leading-relaxed italic relative z-10">
      <span className={`font-bold text-${color} not-italic uppercase tracking-wider text-[10px] mr-2`}>AI Резюме:</span> {text}
    </p>
    <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}/5 blur-[50px] rounded-full -mr-16 -mt-16`}></div>
  </div>
);

import React from "react";
import { ArrowUpDown } from "lucide-react";

interface TableHeaderProps {
  label: string;
  sortable?: boolean;
}

export const TableHeader = ({ label, sortable = true }: TableHeaderProps) => (
  <th className="py-4 px-4 text-left">
    <div className="flex items-center gap-1.5 group cursor-pointer">
      <span className="text-[10px] text-dark-400 font-black uppercase tracking-widest group-hover:text-dark-200 transition-colors">
        {label}
      </span>
      {sortable && (
        <ArrowUpDown className="w-2.5 h-2.5 text-dark-500 group-hover:text-accent-purple transition-colors" />
      )}
    </div>
  </th>
);

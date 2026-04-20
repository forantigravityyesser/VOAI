"use client";

import React, { useState, useEffect } from "react";
import { 
  MoreHorizontal, 
  Plus, 
  Clock,
  ArrowRight,
  ChevronDown,
  LayoutGrid,
  List
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Task, KanbanColumn } from "@/core/types/collaboration";
import { teamService } from "../services/team.service";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/lib/utils";

export default function KanbanBoard() {
  const [columns, setColumns] = useState<KanbanColumn[]>([]);
  const [activeTab, setActiveTab] = useState("Board");

  useEffect(() => {
    teamService.getKanbanData().then(setColumns);
  }, []);

  const getPriorityStyles = (priority: Task["priority"]) => {
    switch (priority) {
      case "urgent": return "text-accent-red bg-accent-red/10 border-accent-red/20";
      case "high": return "text-accent-orange bg-accent-orange/10 border-accent-orange/20";
      case "medium": return "text-accent-blue bg-accent-blue/10 border-accent-blue/20";
      case "low": return "text-accent-green bg-accent-green/10 border-accent-green/20";
      default: return "";
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Kanban Header */}
      <div className="px-8 mt-10">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-6">
            <h1 className="text-6xl font-black text-white tracking-tighter">Wildberries AI Project</h1>
            <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl bg-dark-800 border border-white/5">
              <Plus className="w-6 h-6" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="bg-dark-800 border border-white/5 rounded-2xl text-[11px] font-black uppercase tracking-widest px-5 h-auto py-3">
              Sort by date <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <div className="flex bg-dark-800 p-1.5 rounded-2xl border border-white/5 gap-1">
              <Button size="icon" className="bg-accent-red rounded-xl"><LayoutGrid className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="text-dark-400 hover:text-white"><List className="w-5 h-5" /></Button>
            </div>
          </div>
        </div>

        {/* Tabs Row */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex gap-12">
            {["Board", "Timeline", "Polls", "Groups"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative pb-5 text-[14px] font-black tracking-tight transition-all uppercase",
                  activeTab === tab ? "text-accent-red" : "text-dark-400 hover:text-white"
                )}
              >
                {tab}
                {tab === "Groups" && <span className="ml-3 px-2 py-0.5 bg-dark-800 rounded-lg text-[10px] text-dark-400 font-bold border border-white/5">3</span>}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-accent-red rounded-t-full shadow-[0_0_15px_rgba(255,107,107,0.6)]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Board Columns */}
      <div className="flex-1 overflow-x-auto p-8 pt-6">
        <div className="flex gap-16 h-full min-w-max pb-4">
           {columns.map(col => (
             <div key={col.id} className="w-[380px] flex flex-col group/col">
              <div className="flex items-center justify-between mb-8 px-1">
                <h3 className="text-2xl font-black text-white flex items-center gap-3 tracking-tighter">
                  {col.title} <span className="text-dark-400 font-bold ml-1">{col.tasks.length}</span>
                </h3>
                <Plus className="w-5 h-5 text-dark-400 cursor-pointer hover:text-white transition-colors" />
              </div>

              <div className="flex-1 space-y-6 overflow-y-auto pr-3 custom-scrollbar">
                <AnimatePresence>
                  {col.tasks.map((task) => (
                    <TaskCard key={task.id} task={task} priorityStyles={getPriorityStyles(task.priority)} />
                  ))}
                </AnimatePresence>

                {col.id === "in-progress" && col.tasks.length < 3 && (
                   <div className="border-2 border-dashed border-white/10 rounded-[2.5rem] h-40 flex flex-col items-center justify-center gap-3 text-dark-400 bg-dark-800/20">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 opacity-40" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Drag card here</span>
                   </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task, priorityStyles }: { task: Task; priorityStyles: string }) {
  return (
    <motion.div
      layout
      className="group cursor-grab active:cursor-grabbing"
      whileHover={{ y: -5 }}
    >
      <Card variant="glass" className="p-7 rounded-[2.5rem] border-white/5 group-hover:border-white/10 transition-all">
        <CardContent className="p-0">
          <div className="flex items-center justify-between mb-6">
            <Badge variant="outline" className={cn("px-3 py-1.5 rounded-xl uppercase font-black text-[9px] tracking-widest", priorityStyles)}>
              {task.priority}
            </Badge>
            <MoreHorizontal className="w-5 h-5 text-dark-400 cursor-pointer" />
          </div>

          <h4 className="text-[17px] font-bold text-white mb-4 leading-[1.3] tracking-tight">
            {task.title}
          </h4>
          
          {task.description && (
            <p className="text-[13px] text-dark-300 leading-[1.6] mb-6 font-medium">
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex -space-x-3 items-center">
               <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-dark-400 to-dark-600 border-[3px] border-dark-800 flex items-center justify-center text-[10px] font-black text-white">
                  {task.assignee.name.split(' ').map(n => n[0]).join('')}
               </div>
            </div>

            <div className="flex items-center gap-5 text-dark-300">
               <div className="flex items-center gap-2 bg-dark-700/50 px-3 py-1.5 rounded-xl border border-white/5">
                  <Clock className="w-3.5 h-3.5 text-accent-blue" />
                  <span className="text-[10px] font-black uppercase text-white/90">{task.dueDate}</span>
               </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

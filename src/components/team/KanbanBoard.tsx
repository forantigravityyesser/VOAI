"use client";

import React, { useState } from "react";
import { 
  MoreHorizontal, 
  Plus, 
  Paperclip, 
  MessageSquare, 
  Video, 
  CheckCircle2, 
  Clock,
  ArrowRight,
  Zap,
  ChevronDown,
  LayoutGrid,
  List
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  description?: string;
  members: { name: string; avatar: string }[];
  attachments?: number;
  comments?: number;
  date?: string;
  progress?: { current: number; total: number };
  hasMeeting?: boolean;
  status: "todo" | "progress" | "done";
}

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Visual concept",
    category: "MOTION DESIGN",
    categoryColor: "text-accent-purple bg-accent-purple/10",
    description: "We form the main visual idea from the position of animation",
    members: [
      { name: "AV", avatar: "AV" },
      { name: "JD", avatar: "JD" },
      { name: "MK", avatar: "MK" },
      { name: "AL", avatar: "AL" }
    ],
    attachments: 3,
    comments: 8,
    status: "todo"
  },
  {
    id: "2",
    title: "Deploying the p and examining t",
    category: "DEVELOPMENT",
    categoryColor: "text-accent-orange bg-accent-orange/10",
    members: [
      { name: "MS", avatar: "MS" },
      { name: "KP", avatar: "KP" }
    ],
    hasMeeting: true,
    date: "6 Mar",
    status: "todo"
  },
  {
    id: "3",
    title: "Online payment module",
    category: "TESTING",
    categoryColor: "text-accent-blue bg-accent-blue/10",
    attachments: 2,
    comments: 5,
    members: [
      { name: "AL", avatar: "AL" }
    ],
    status: "todo"
  },
  {
    id: "4",
    title: "Component library",
    category: "UI/UX DESIGN",
    categoryColor: "text-accent-green bg-accent-green/10",
    members: [
      { name: "AL", avatar: "AL" },
      { name: "RV", avatar: "RV" }
    ],
    attachments: 2,
    comments: 6,
    date: "4 Mar",
    status: "progress"
  },
  {
    id: "4-drag",
    title: "UX Audit",
    category: "RESEARCH",
    categoryColor: "text-accent-orange bg-accent-orange/10",
    members: [
      { name: "MS", avatar: "MS" },
      { name: "AL", avatar: "AL" },
      { name: "JD", avatar: "JD" }
    ],
    progress: { current: 3, total: 7 },
    date: "10 Mar",
    status: "progress"
  },
  {
    id: "5",
    title: "Structure of the formation of business processes",
    category: "RESEARCH",
    categoryColor: "text-accent-orange bg-accent-orange/10",
    description: "Document describes all external factors influencing the product",
    members: [
      { name: "RV", avatar: "RV" },
      { name: "A", avatar: "A" }
    ],
    status: "done"
  }
];

export default function KanbanBoard() {
  const [tasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeTab, setActiveTab] = useState("Board");

  const columns = [
    { title: "To Do", id: "todo" as const },
    { title: "In progress", id: "progress" as const },
    { title: "Done", id: "done" as const }
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Kanban Header */}
      <div className="px-8 mt-10">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-6">
            <h1 className="text-6xl font-black text-white tracking-tighter">Android Banking App</h1>
            <button className="p-3 bg-dark-800 rounded-2xl border border-white/5 hover:bg-dark-700 transition-all group shadow-xl">
              <Plus className="w-6 h-6 text-dark-400 group-hover:text-white" />
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-3 px-5 py-3 bg-dark-800 border border-white/5 rounded-2xl text-[11px] font-black text-dark-200 hover:text-white transition-all uppercase tracking-widest shadow-xl">
              Sort by date <ChevronDown className="w-4 h-4 text-dark-400" />
            </button>
            <div className="flex bg-dark-800 p-1.5 rounded-2xl border border-white/5 gap-1 shadow-xl">
              <button className="p-2.5 bg-accent-red rounded-xl text-white shadow-lg shadow-accent-red/20"><LayoutGrid className="w-5 h-5" /></button>
              <button className="p-2.5 text-dark-400 hover:text-white transition-all"><List className="w-5 h-5" /></button>
            </div>
          </div>
        </div>

        {/* Tabs Row (matches sketch) */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex gap-12">
            {["Board", "Timeline", "Polls", "Groups"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-5 text-[14px] font-black tracking-tight transition-all uppercase ${
                  activeTab === tab ? "text-accent-red" : "text-dark-400 hover:text-white"
                }`}
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
                  {col.title} <span className="text-dark-400 font-bold ml-1">{tasks.filter(t => t.status === col.id).length}</span>
                </h3>
                <button className="p-2 hover:bg-white/5 rounded-xl transition-all cursor-pointer">
                  <Plus className="w-5 h-5 text-dark-400" />
                </button>
              </div>

              <div className="flex-1 space-y-6 overflow-y-auto pr-3 custom-scrollbar">
                <AnimatePresence>
                  {tasks.filter(t => t.status === col.id).map((task) => (
                    <TaskCard key={task.id} task={task} isDragging={task.id === '4-drag'} />
                  ))}
                </AnimatePresence>

                {/* Placeholder logic for In progress */}
                {col.id === "progress" && tasks.filter(t => t.status === col.id).length < 3 && (
                   <div className="border-2 border-dashed border-white/10 rounded-[2.5rem] h-40 flex flex-col items-center justify-center gap-3 text-dark-400 hover:border-white/20 hover:text-dark-200 transition-all cursor-pointer group bg-dark-800/20">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                        <ArrowRight className="w-5 h-5 opacity-40" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Drag the card to this window</span>
                   </div>
                )}

                {/* System Alert for Done column */}
                {col.id === "done" && (
                  <div className="bg-accent-orange/10 border border-accent-orange/20 rounded-[2rem] p-6 flex items-start gap-4 shadow-xl backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                       <Zap className="w-16 h-16" />
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-accent-orange/20 flex items-center justify-center shrink-0 border border-accent-orange/30">
                      <Zap className="w-5 h-5 text-accent-orange" />
                    </div>
                    <div className="relative z-10">
                      <p className="text-[10px] text-accent-orange font-black leading-tight uppercase tracking-widest mb-1 shadow-orange-500">System Notification</p>
                      <p className="text-[13px] text-white/90 font-medium leading-relaxed">Access to the column will be closed after <span className="font-black text-accent-orange">7 days</span></p>
                    </div>
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

function TaskCard({ task, isDragging }: { task: Task; isDragging?: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className={`bg-dark-800/90 border border-white/5 rounded-[2.5rem] p-7 shadow-2xl relative overflow-hidden group cursor-grab active:cursor-grabbing transition-all hover:border-white/10 select-none
        ${isDragging ? 'z-50 shadow-[0_40px_80px_rgba(0,0,0,0.6)] border-accent-red/50 ring-2 ring-accent-red/20' : ''}
      `}
    >
      {/* Visual background details */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Category Tag Header */}
      <div className="flex items-center justify-between mb-6">
        <span className={`text-[10px] font-black tracking-[0.15em] px-3 py-1.5 rounded-xl ${task.categoryColor} border border-current opacity-70 group-hover:opacity-100 transition-all uppercase`}>
          {task.category}
        </span>
        <button className="text-dark-400 hover:text-white transition-colors p-1">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <h4 className="text-[17px] font-bold text-white mb-4 group-hover:text-accent-purple-light transition-colors leading-[1.3] tracking-tight">
        {task.title}
      </h4>
      
      {task.description && (
        <p className="text-[13px] text-dark-300 leading-[1.6] mb-6 font-medium">
          {task.description}
        </p>
      )}

      {/* Dynamic Progress/Metadata Section */}
      <div className="mt-auto space-y-6">
        {task.hasMeeting ? (
          <button className="w-full flex items-center justify-center gap-3 py-4 rounded-[1.5rem] bg-accent-green/10 text-accent-green text-xs font-black hover:bg-accent-green/20 transition-all uppercase tracking-widest border border-accent-green/10">
            <Video className="w-4 h-4" /> Start meeting
          </button>
        ) : task.progress ? (
           <div className="bg-white/3 rounded-[1.5rem] p-4 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black text-dark-400 uppercase tracking-widest">Team Progress</span>
                <span className="text-[11px] font-black text-white tracking-widest">{task.progress.current} / {task.progress.total}</span>
              </div>
              <div className="flex gap-1.5">
                {Array.from({ length: task.progress.total }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${
                      task.progress && i < task.progress.current ? 'bg-accent-red shadow-[0_0_12px_rgba(255,107,107,0.5)] scale-y-110' : 'bg-dark-700'
                    }`} 
                  />
                ))}
              </div>
           </div>
        ) : null}

        <div className="flex items-center justify-between pt-2">
          {/* Members Avatars with overlap */}
          <div className="flex -space-x-3 items-center">
            {task.members?.slice(0, 3).map((m, i) => (
              <div 
                key={i}
                className="w-9 h-9 rounded-2xl bg-gradient-to-br from-dark-400 to-dark-600 border-[3px] border-dark-800 flex items-center justify-center text-[11px] font-black text-white shadow-xl relative z-20 hover:z-30 transition-all hover:-translate-y-1"
                title={m.name}
              >
                {m.avatar}
              </div>
            ))}
            {(task.members?.length || 0) > 3 && (
              <div className="w-9 h-9 rounded-2xl bg-dark-700 border-[3px] border-dark-800 flex items-center justify-center text-[10px] font-black text-accent-orange shadow-xl relative z-10 hover:z-30 transition-all hover:-translate-y-1">
                +{(task.members?.length || 0) - 3}
              </div>
            )}
          </div>

          <div className="flex items-center gap-5 text-dark-300">
            {(task.attachments || task.comments) && (
              <div className="flex items-center gap-4 border-r border-white/5 pr-4">
                {task.attachments && (
                  <div className="flex items-center gap-1.5 group/meta">
                    <Paperclip className="w-4 h-4 group-hover/meta:text-white transition-colors" />
                    <span className="text-[11px] font-black group-hover/meta:text-white">{task.attachments}</span>
                  </div>
                )}
                {task.comments && (
                  <div className="flex items-center gap-1.5 group/meta">
                    <MessageSquare className="w-4 h-4 group-hover/meta:text-white transition-colors" />
                    <span className="text-[11px] font-black group-hover/meta:text-white">{task.comments}</span>
                  </div>
                )}
              </div>
            )}
            
            {(task.date || task.status === "done") && (
              <div className="flex items-center gap-3">
                {task.date && (
                  <div className="flex items-center gap-2 bg-dark-700/50 px-3 py-1.5 rounded-xl border border-white/5">
                    <Clock className="w-3.5 h-3.5 text-accent-purple-light" />
                    <span className="text-[10px] font-black uppercase tracking-tighter text-white/90">{task.date}</span>
                  </div>
                )}
                {task.status === "done" && (
                   <button className="flex items-center gap-2 text-[11px] font-bold text-white bg-dark-500 px-4 py-2 rounded-xl hover:bg-accent-purple transition-all shadow-lg active:scale-95 border border-white/5 uppercase tracking-widest">
                     <CheckCircle2 className="w-4 h-4" /> Open
                   </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

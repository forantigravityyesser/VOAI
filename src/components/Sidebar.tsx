"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import {
  LayoutDashboard,
  User,
  Database,
  Users,
  FolderKanban,
  Settings,
  HelpCircle,
  Sparkles,
  X,
  ExternalLink,
  ChevronLast,
  ChevronFirst
} from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Главная", id: "home", path: "/" },
  { icon: User, label: "Личный кабинет", id: "profile", path: "/profile" },
  { icon: Users, label: "Чаты с командой", id: "team", path: "/team" },
  { icon: Database, label: "Мои данные", id: "data", path: "/data" },
  { icon: FolderKanban, label: "Управление командой", id: "projects", path: "/projects" },
  { icon: Settings, label: "Настройки", id: "settings", path: "/settings" },
  { icon: HelpCircle, label: "Центр помощи", id: "help", path: "/help" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      isCollapsed ? "80px" : "220px"
    );
  }, [isCollapsed]);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-sidebar-bg border-r border-card-border flex flex-col z-50 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-[80px]' : 'w-[220px]'}`}>
      <div className={`p-4 pb-6 flex items-center transition-all duration-300 ${isCollapsed ? 'flex-col gap-4' : 'justify-between'}`}>
        <Link href="/" className="flex items-center gap-3">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shadow-lg shadow-accent-purple/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="text-left animate-in fade-in slide-in-from-left-2 duration-300 pointer-events-none">
              <h1 className="text-base font-bold tracking-tight text-white leading-tight">
                Ethereal
              </h1>
              <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-accent-purple-light block mt-0.5">
                Arch VIP
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={toggleCollapse}
          className={`flex items-center justify-center rounded-xl bg-dark-800/50 hover:bg-dark-700 text-dark-300 hover:text-white transition-all border border-white/5 group
            ${isCollapsed ? 'w-10 h-10' : 'w-8 h-8'}`}
          title={isCollapsed ? "Развернуть" : "Свернуть"}
        >
          {isCollapsed ? (
            <ChevronLast className="w-5 h-5 group-hover:scale-110 transition-transform" />
          ) : (
            <ChevronFirst className="w-4 h-4 group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.id}
              href={item.path}
              title={isCollapsed ? item.label : ""}
              className={`w-full flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative
                ${isCollapsed ? 'justify-center' : 'gap-3'}
                ${
                  isActive
                    ? "bg-accent-purple text-white shadow-lg shadow-accent-purple/25"
                    : "text-dark-200 hover:text-white hover:bg-dark-700"
                }`}
            >
              <item.icon
                className={`w-[20px] h-[20px] shrink-0 transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-dark-300 group-hover:text-white"
                }`}
              />
              {!isCollapsed && (
                <span className="animate-in fade-in slide-in-from-left-2 duration-300 truncate">
                  {item.label}
                </span>
              )}
              
              {isCollapsed && isActive && (
                <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full animate-in slide-in-from-left duration-300" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Promotional Banner */}
      <div className={`px-4 mb-4 transition-all duration-300 ${isCollapsed ? 'opacity-0 h-0 overflow-hidden pointer-events-none' : 'opacity-100 h-32'}`}>
        <button 
          onClick={() => setShowModal(true)}
          className="w-full relative group overflow-hidden rounded-2xl h-full transition-all duration-300 hover:scale-[1.02] cursor-pointer"
        >
          {/* Background Image */}
          <Image 
            src="/wbai_banner.png" 
            alt="WBAi Banner" 
            fill
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="relative z-10 h-full flex flex-col justify-end p-3 text-left">
            <p className="text-[10px] font-bold text-white/90 uppercase tracking-wider mb-1 text-xs">Закрытая группа</p>
            <div className="flex items-center gap-2">
               <div className="w-1 h-4 bg-accent-purple rounded-full" />
               <p className="text-xs font-bold text-white leading-tight">WBAi Assistant VIP</p>
            </div>
          </div>
        </button>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          
          <div className="relative w-full max-w-[380px] bg-[#12141a] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Top Section (Header Banner) */}
            <div className="h-32 bg-gradient-to-r from-indigo-500 to-blue-400 relative flex items-center justify-center overflow-hidden">
               {/* Subtle Dot Pattern Overlay */}
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
               
               <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                 <Sparkles className="w-8 h-8 text-white drop-shadow-lg" />
               </div>

               {/* Close Button */}
               <button 
                 onClick={() => setShowModal(false)}
                 className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/70 hover:text-white transition-all z-20"
               >
                 <X className="w-4 h-4" />
               </button>
            </div>

            {/* Bottom Section (Content) */}
            <div className="px-8 pt-8 pb-10 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Закрытый VIP-канал</h3>
              <p className="text-sm text-gray-400 leading-relaxed px-2">
                Получите доступ к эксклюзивным данным, AI-инструментам и сообществу топ-селлеров WB.
              </p>
              
              <div className="mt-8 space-y-4">
                <a 
                  href="#" 
                  target="_blank"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-400 text-white font-semibold flex items-center justify-center gap-2 
                  hover:shadow-[0_0_25px_rgba(79,70,229,0.4)] hover:scale-[1.01] transition-all active:scale-[0.98] shadow-lg"
                >
                  Перейти в закрытый канал
                  <ExternalLink className="w-4 h-4" />
                </a>
                
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-full py-2 text-sm font-medium text-gray-500 hover:text-gray-300 transition-colors"
                >
                  Позже
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

"use client";

import React, { useState } from "react";
import { 
  Crown, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Lock, 
  ExternalLink,
  Wallet,
  CalendarDays,
  Share2,
  Check,
  Loader2,
  Sparkles
} from "lucide-react";

export default function ProfilePage() {
  const [isSharing, setIsSharing] = useState(false);
  const [showShareSuccess, setShowShareSuccess] = useState(false);

  const handleShare = () => {
    setIsSharing(true);
    // Simulate generation of share image
    setTimeout(() => {
      setIsSharing(false);
      setShowShareSuccess(true);
      setTimeout(() => setShowShareSuccess(false), 3000);
    }, 1500);
  };

  return (
    <main className="h-full w-full bg-dark-900 p-8 overflow-y-auto custom-scrollbar animate-fade-up">
      
      {/* Top Row: Profile Header & AI Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* 1. Блок Идентификации и Статуса */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl glass-card p-8 flex items-center gap-6 shadow-2xl transition-all duration-500 hover:shadow-accent-purple/10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 to-transparent pointer-events-none" />
          
          <div className="relative group/avatar">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent-purple via-accent-cyan to-accent-blue p-1 z-10 relative shadow-[0_0_40px_rgba(108,92,231,0.3)] group-hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full bg-dark-900 rounded-xl flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay" />
                <Sparkles className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] relative z-10" />
              </div>
            </div>
            {/* Pulsing indicator */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-dark-900 rounded-full flex items-center justify-center z-20">
              <div className="w-3 h-3 bg-accent-green rounded-full shadow-[0_0_15px_#00d68f] animate-pulse-glow" />
            </div>
          </div>

          <div className="flex-1 relative z-10">
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">WildBoost Shop</h1>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 px-3 py-1.5 rounded-full">
                <Crown className="w-4 h-4 text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]" />
                <span className="text-sm font-bold text-amber-400 tracking-wide uppercase">Резидент закрытого клуба</span>
              </div>
              
              <div className="flex items-center gap-2 text-dark-300 bg-dark-900/50 px-3 py-1.5 rounded-full border border-white/5">
                <CalendarDays className="w-4 h-4" />
                <span className="text-sm font-medium">Вместе с WBAi уже <strong className="text-white">145 дней</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Личный счетчик пользы от ИИ */}
        <div className="lg:col-span-1 rounded-3xl glass-card p-6 flex flex-col justify-center space-y-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/10 rounded-full blur-3xl" />
          
          <div className="bg-dark-900/40 border border-white/5 rounded-2xl p-4 flex items-center gap-4 relative z-10 hover:border-accent-blue/40 hover:bg-dark-900/60 transition-all duration-300 group/item">
            <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
              <Wallet className="w-6 h-6 text-accent-blue drop-shadow-[0_0_8px_rgba(79,156,247,0.5)]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-dark-400 uppercase tracking-widest mb-1">ИИ сэкономил логистику</p>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-black text-white">245 000 ₽</p>
                <TrendingUp className="w-4 h-4 text-accent-green mb-1.5 animate-bounce-subtle" />
              </div>
            </div>
          </div>

          <div className="bg-dark-900/40 border border-white/5 rounded-2xl p-4 flex items-center gap-4 relative z-10 hover:border-accent-purple/40 hover:bg-dark-900/60 transition-all duration-300 group/item">
            <div className="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6 text-accent-purple drop-shadow-[0_0_8px_rgba(108,92,231,0.5)]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-dark-400 uppercase tracking-widest mb-1">Предотвращено штрафов</p>
              <p className="text-2xl font-black text-white">50 000 ₽</p>
            </div>
          </div>
        </div>

      </div>

      {/* Middle Row: Share Widget & Hall of Fame */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        
        {/* 2. Главная витрина (Share-виджет) */}
        <div className="xl:col-span-2 rounded-3xl glass-card p-8 flex flex-col relative overflow-hidden group shadow-2xl">
          <div className="absolute top-[-50%] left-[-10%] w-[120%] h-full bg-gradient-to-b from-accent-purple/5 to-transparent pointer-events-none" />
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Эффективность магазина</h2>
              <p className="text-sm text-dark-300">Сводный график роста с момента интеграции WBAi</p>
            </div>
            
            <button 
              onClick={handleShare}
              disabled={isSharing}
              className={`relative overflow-hidden px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all backdrop-blur-md border border-white/10
                ${showShareSuccess 
                  ? "bg-accent-green text-white border-accent-green/30" 
                  : "bg-white/10 hover:bg-white/20 text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                } disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              <div className="relative z-10 flex items-center gap-2">
                {isSharing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : showShareSuccess ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
                {isSharing ? "Генерация..." : showShareSuccess ? "Готово!" : "Поделиться результатом"}
              </div>
              {isSharing && (
                <div className="absolute inset-0 bg-white/10 animate-pulse" />
              )}
            </button>
          </div>

          {/* Styled Neon Graph Mockup */}
          <div className="flex-1 min-h-[220px] relative w-full rounded-2xl bg-dark-900/50 border border-white/5 flex items-end justify-between p-6 px-12 overflow-hidden">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            {/* Neon Area Fill (SVG Mock) */}
            <svg className="absolute bottom-0 left-0 w-full h-[80%] preserve-3d" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9D4EDD" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00D2D3" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#9D4EDD" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#00D2D3" stopOpacity="0.0" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path 
                d="M0,200 L0,150 C100,140 200,180 300,120 C450,30 600,110 750,40 C850,-10 950,-5 1000,10 L1000,200 Z" 
                fill="url(#areaGradient)"
              />
              <path 
                d="M0,150 C100,140 200,180 300,120 C450,30 600,110 750,40 C850,-10 950,-5 1000,10" 
                fill="none" 
                stroke="url(#neonGradient)" 
                strokeWidth="6" 
                strokeLinecap="round"
                className="opacity-20 blur-[6px]"
              />
              <path 
                d="M0,150 C100,140 200,180 300,120 C450,30 600,110 750,40 C850,-10 950,-5 1000,10" 
                fill="none" 
                stroke="url(#neonGradient)" 
                strokeWidth="4" 
                strokeLinecap="round"
                filter="url(#glow)"
              />
            </svg>

            {/* Glowing Points */}
            <div className="absolute right-[5%] top-[10%] w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(0,210,211,1)] z-10" />
            <div className="absolute left-[30%] top-[40%] w-3 h-3 bg-accent-purple rounded-full shadow-[0_0_15px_rgba(157,78,221,1)] z-10" />
          </div>
        </div>

        {/* 3. Зал Славы (Ачивки) */}
        <div className="xl:col-span-1 rounded-3xl glass-card p-8 flex flex-col shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-1">Зал Славы</h2>
            <p className="text-xs text-dark-300">Ваши достижения на платформе</p>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
            
            {/* Active Achivement 1 */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-accent-purple/10 to-transparent border border-accent-purple/30 flex items-start gap-4 group hover:bg-accent-purple/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center shrink-0 border border-accent-purple/40 shadow-[0_0_15px_rgba(157,78,221,0.2)]">
                <TrendingUp className="w-6 h-6 text-accent-purple" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Мастер логистики</h4>
                <p className="text-xs text-dark-300 leading-relaxed">Удержан индекс локализации &gt;85% в течение месяца.</p>
              </div>
            </div>

            {/* Active Achivement 2 */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-accent-blue/10 to-transparent border border-accent-blue/30 flex items-start gap-4 group hover:bg-accent-blue/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent-blue/20 flex items-center justify-center shrink-0 border border-accent-blue/40 shadow-[0_0_15px_rgba(0,210,211,0.2)]">
                <ShieldCheck className="w-6 h-6 text-accent-blue" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Железный сток</h4>
                <p className="text-xs text-dark-300 leading-relaxed">Ни один топовый товар не ушел в OOS за 30 дней.</p>
              </div>
            </div>

            {/* Inactive Achivement */}
            <div className="p-4 rounded-2xl bg-dark-900 border border-white/5 flex items-start gap-4 opacity-50 select-none">
              <div className="w-12 h-12 rounded-xl bg-dark-800 flex items-center justify-center shrink-0 border border-white/10 relative">
                <Lock className="w-5 h-5 text-dark-400" />
              </div>
              <div>
                <h4 className="font-bold text-dark-200 mb-1">Клуб Миллионеров</h4>
                <p className="text-xs text-dark-400 leading-relaxed">Достигните оборота в 10 млн ₽ в месяц для разблокировки.</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Row: VIP Access */}
      {/* 4. Закрытое комьюнити */}
      <div className="w-full relative overflow-hidden rounded-[2.5rem] p-8 lg:p-12 flex items-center justify-between border border-white/5 group shadow-[0_0_50px_rgba(79,70,229,0.2)]">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-accent-purple to-accent-blue opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay" />
        
        {/* Animated fluid lines effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
           <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,rgba(0,210,211,0.2),transparent_70%)] animate-pulse-glow" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-8">
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-500">
              <Zap className="w-10 h-10 text-white drop-shadow-lg" />
            </div>
            <div>
              <h3 className="text-2xl lg:text-3xl font-black text-white mb-2 tracking-tight">Ваш пропуск в закрытый клуб</h3>
              <p className="text-white/80 font-medium max-w-lg leading-relaxed">
                Закрытый Telegram-канал для резидентов. Обновления ИИ, инсайды ВБ, секретные стратегии ранжирования и нетворкинг с топ-селлерами.
              </p>
            </div>
          </div>
          
          <button className="shrink-0 bg-white text-indigo-900 border-2 border-transparent hover:border-white/50 px-8 py-4 rounded-2xl text-base font-bold flex items-center gap-3 hover:bg-white/90 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95">
            Перейти в Telegram
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>

    </main>
  );
}

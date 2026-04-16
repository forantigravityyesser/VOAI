"use client";

import React, { useState } from "react";
import { 
  User, Shield, Key, Bell, Monitor, RefreshCw, AlertTriangle, Trash2, 
  CheckCircle2, XCircle, ExternalLink, Mail, Archive, BarChart3,
  LogOut, Send
} from "lucide-react";

// UI Components
const Toggle = ({ checked, onChange, disabled = false }: { checked: boolean, onChange: () => void, disabled?: boolean }) => (
  <button 
    type="button"
    onClick={onChange}
    disabled={disabled}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 focus:ring-offset-dark-900 ${checked ? 'bg-accent-purple' : 'bg-dark-600'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  // Mock states for toggles
  const [alerts, setAlerts] = useState({
    critical: true,
    warehouse: true,
    reports: false
  });

  const [tgConnected, setTgConnected] = useState(false);
  const [showTgCode, setShowTgCode] = useState(false);

  const tabs = [
    { id: "profile", label: "Профиль и Защита", icon: User },
    { id: "api", label: "Интеграция WB API", icon: Key },
    { id: "notifications", label: "Алерты и Уведомления", icon: Bell },
    { id: "appearance", label: "Интерфейс", icon: Monitor },
  ];

  return (
    <main className="h-full w-full bg-dark-900 flex flex-col md:flex-row overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0 bg-dark-800/50 border-r border-card-border p-6 overflow-y-auto custom-scrollbar">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Настройки</h1>
          <p className="text-xs text-dark-300">Управление аккаунтом и системой</p>
        </div>

        <nav className="space-y-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left
                  ${isActive 
                    ? "bg-accent-purple/20 text-accent-purple-light border border-accent-purple/30 shadow-[0_0_15px_rgba(108,92,231,0.1)]" 
                    : "text-dark-200 hover:text-white hover:bg-dark-800 border border-transparent"
                  }`}
              >
                <tab.icon className={`w-5 h-5 ${isActive ? "text-accent-purple-light" : "text-dark-400"}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12">
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
          
          {/* =========================================
              1. Профиль и Безопасность
             ========================================= */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-fade-up">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Профиль и Безопасность</h2>
                <p className="text-sm text-dark-300">Управление вашей учетной записью и параметрами входа.</p>
              </div>

              {/* Account Details */}
              <div className="glass-card rounded-2xl p-6 border border-card-border">
                <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-accent-cyan" /> Основная информация
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-dark-300 mb-1.5 form-label">Email аккаунта</label>
                    <input 
                      type="email" 
                      disabled
                      value="seller@wildboost.ru"
                      className="w-full bg-dark-900/50 border border-white/5 rounded-xl px-4 py-3 text-white/50 cursor-not-allowed text-sm"
                    />
                    <p className="text-[10px] text-dark-400 mt-1">Email используется для входа и не может быть изменен напрямую.</p>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="glass-card rounded-2xl p-6 border border-card-border">
                <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent-purple" /> Смена пароля
                </h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-medium text-dark-300 mb-1.5">Старый пароль</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-dark-300 mb-1.5">Новый пароль</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-dark-300 mb-1.5">Повторить пароль</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 transition-all text-sm" />
                  </div>
                  <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                    Обновить пароль
                  </button>
                </div>
              </div>

              {/* Sessions */}
              <div className="glass-card rounded-2xl p-6 border border-card-border flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
                    Активные сессии
                  </h3>
                  <p className="text-xs text-dark-300 text-balance max-w-sm">
                    Завершите сеансы на всех других устройствах для обеспечения безопасности.
                  </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-accent-orange/10 text-accent-orange hover:bg-accent-orange/20 border border-accent-orange/20 rounded-xl text-sm font-medium transition-all">
                  <LogOut className="w-4 h-4" /> Выйти со всех устройств
                </button>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-950/10 border border-red-900/30 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(220,38,38,0.1),transparent_50%)]" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-red-400 mb-1 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Опасная зона
                    </h3>
                    <p className="text-xs text-red-300/60 max-w-sm">
                      Удаление аккаунта приведет к безвозвратному уничтожению всех данных, настроек и накопленной статистики.
                    </p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl text-sm font-bold transition-all">
                    <Trash2 className="w-4 h-4" /> Удалить аккаунт
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =========================================
              2. Подключение к Wildberries (API)
             ========================================= */}
          {activeTab === "api" && (
            <div className="space-y-6 animate-fade-up">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Интеграция с Wildberries API</h2>
                  <p className="text-sm text-dark-300">Настройка ключей для связи приложения с вашим кабинетом селлера.</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-dark-300 bg-dark-800/50 px-3 py-1.5 rounded-lg border border-card-border">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Синхронизировано: 14:30
                </div>
              </div>

              {/* Stats Key */}
              <div className="glass-card rounded-2xl p-6 border border-card-border relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-green/5 rounded-full blur-3xl" />
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div>
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                      Ключ «Статистика»
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent-green/10 text-accent-green text-[10px] uppercase font-bold border border-accent-green/20">
                        <CheckCircle2 className="w-3 h-3" /> Активен
                      </span>
                    </h3>
                    <p className="text-xs text-dark-300 mt-1">Read-only доступ для получения заказов, выкупов и остатков.</p>
                  </div>
                </div>
                <div className="flex gap-4 relative z-10">
                  <input 
                    type="password" 
                    defaultValue="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="flex-1 bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white/70 font-mono text-sm focus:outline-none focus:border-accent-purple/50" 
                  />
                  <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all shrink-0">
                    Обновить ключ
                  </button>
                </div>
              </div>

              {/* Standard Key */}
              <div className="glass-card rounded-2xl p-6 border border-card-border relative overflow-hidden">
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div>
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                      Ключ «Стандартный»
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-dark-700 text-dark-300 text-[10px] uppercase font-bold border border-white/5">
                        <XCircle className="w-3 h-3" /> Не задан
                      </span>
                    </h3>
                    <p className="text-xs text-dark-300 mt-1">Опционально. Требуется для управления ценами и участия в акциях.</p>
                  </div>
                </div>
                <div className="flex gap-4 relative z-10">
                  <input 
                    type="text" 
                    placeholder="Введите стандартный API ключ WB..."
                    className="flex-1 bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-accent-purple/50" 
                  />
                  <button className="bg-accent-purple hover:bg-accent-purple/80 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-lg shadow-accent-purple/20 shrink-0">
                    Сохранить
                  </button>
                </div>
              </div>

               {/* Force Sync Action */}
               <div className="p-6 rounded-2xl bg-gradient-to-r from-dark-800 to-dark-900 border border-card-border flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Принудительная синхронизация</h4>
                  <p className="text-xs text-dark-300">Обновите данные, если подозреваете расхождение с WB.</p>
                </div>
                <button className="flex items-center gap-2 bg-dark-700 hover:bg-dark-600 border border-white/10 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all">
                  <RefreshCw className="w-4 h-4" /> Запустить проверку
                </button>
              </div>
            </div>
          )}

          {/* =========================================
              3. Уведомления и Алерты
             ========================================= */}
          {activeTab === "notifications" && (
            <div className="space-y-6 animate-fade-up">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Каналы Уведомлений</h2>
                <p className="text-sm text-dark-300">Настройте, как и куда вы хотите получать важную информацию.</p>
              </div>

              {/* Connection Channels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Telegram Bot */}
                <div className="glass-card rounded-2xl p-6 border border-card-border flex flex-col justify-between">
                  <div className="mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#0088cc]/10 flex items-center justify-center mb-4">
                      <Send className="w-5 h-5 text-[#0088cc]" />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-1">Telegram Бот</h3>
                    <p className="text-xs text-dark-300 h-10">Мгновенные оповещения прямо в ваш мессенджер.</p>
                  </div>
                  
                  {tgConnected ? (
                    <div className="flex items-center justify-between bg-[#0088cc]/5 border border-[#0088cc]/20 rounded-xl p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent-green" />
                        <span className="text-sm font-medium text-white">@wildboost_ceo</span>
                      </div>
                      <button onClick={() => setTgConnected(false)} className="text-xs text-dark-400 hover:text-red-400 transition-colors">Отвязать</button>
                    </div>
                  ) : showTgCode ? (
                    <div className="bg-dark-900 border border-white/5 rounded-xl p-4 text-center animate-fade-up">
                      <p className="text-xs text-dark-300 mb-2">Отправьте боту код подтверждения:</p>
                      <code className="block bg-dark-800 text-accent-cyan font-mono text-lg font-bold py-2 rounded-lg mb-3">/start 8B29F4</code>
                      <a href="#" className="flex items-center justify-center gap-2 text-sm text-[#0088cc] hover:underline font-medium">
                        Открыть @WBAi_Notifier_Bot <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setShowTgCode(true)}
                      className="w-full bg-[#0088cc] hover:bg-[#0088cc]/90 text-white py-2.5 rounded-xl text-sm font-medium transition-all shadow-lg shadow-[#0088cc]/20"
                    >
                      Подключить Telegram
                    </button>
                  )}
                </div>

                {/* Email Channel */}
                <div className="glass-card rounded-2xl p-6 border border-card-border flex flex-col justify-between">
                  <div className="mb-6">
                    <div className="w-10 h-10 rounded-xl bg-dark-700 flex items-center justify-center mb-4">
                      <Mail className="w-5 h-5 text-white/70" />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-1">Email для рассылок</h3>
                    <p className="text-xs text-dark-300 h-10">Резервный канал и получение объемных системных отчетов.</p>
                  </div>
                  <div className="space-y-2">
                    <input 
                      type="email" 
                      defaultValue="manager@wildboost.ru"
                      className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-accent-purple/50" 
                    />
                  </div>
                </div>

              </div>

              <h2 className="text-xl font-bold text-white mt-12 mb-4">Типы Алерта</h2>
              
              <div className="glass-card rounded-2xl border border-card-border overflow-hidden">
                {/* Alert Item 1 */}
                <div className="p-6 border-b border-card-border flex items-center justify-between hover:bg-dark-800/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-500/10 rounded-lg mt-1">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Критические инциденты</h4>
                      <p className="text-xs text-dark-300">Блокировка API, новые штрафы, скрытие карточек.</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-[10px] bg-[#0088cc]/20 text-[#0088cc] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Только TG</span>
                      </div>
                    </div>
                  </div>
                  <Toggle 
                    checked={alerts.critical} 
                    onChange={() => setAlerts({...alerts, critical: !alerts.critical})} 
                  />
                </div>

                {/* Alert Item 2 */}
                <div className="p-6 border-b border-card-border flex items-center justify-between hover:bg-dark-800/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent-orange/10 rounded-lg mt-1">
                      <Archive className="w-4 h-4 text-accent-orange" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Складские события</h4>
                      <p className="text-xs text-dark-300">Риск Out-of-Stock, падение Индекса локализации.</p>
                      <div className="flex gap-2 mt-2">
                         <span className="text-[10px] bg-[#0088cc]/20 text-[#0088cc] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">TG</span>
                         <span className="text-[10px] bg-dark-600 text-dark-300 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Email</span>
                      </div>
                    </div>
                  </div>
                  <Toggle 
                    checked={alerts.warehouse} 
                    onChange={() => setAlerts({...alerts, warehouse: !alerts.warehouse})} 
                  />
                </div>

                {/* Alert Item 3 */}
                <div className="p-6 flex items-center justify-between hover:bg-dark-800/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent-blue/10 rounded-lg mt-1">
                      <BarChart3 className="w-4 h-4 text-accent-blue" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Системные отчеты</h4>
                      <p className="text-xs text-dark-300">Еженедельная/ежемесячная сводка по продажам и результатам.</p>
                       <div className="flex gap-2 mt-2">
                         <span className="text-[10px] bg-dark-600 text-dark-300 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Только Email</span>
                      </div>
                    </div>
                  </div>
                  <Toggle 
                    checked={alerts.reports} 
                    onChange={() => setAlerts({...alerts, reports: !alerts.reports})} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* =========================================
              4. Интерфейс и Внешний вид
             ========================================= */}
          {activeTab === "appearance" && (
            <div className="space-y-8 animate-fade-up">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Оформление</h2>
                <p className="text-sm text-dark-300">Настройка внешнего вида и поведения приложения под ваши привычки.</p>
              </div>

               {/* Themes */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">Тема приложения</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Light */}
                  <div className="bg-dark-900 border border-white/5 rounded-2xl p-4 cursor-pointer hover:border-white/20 transition-all opacity-50 relative group">
                    <div className="h-24 rounded-lg bg-gray-100 mb-3 border border-gray-200 overflow-hidden relative">
                      <div className="w-1/3 h-full bg-white border-r border-gray-200 absolute left-0" />
                      <div className="absolute top-2 right-2 w-12 h-2 bg-gray-200 rounded" />
                      <div className="absolute top-6 right-2 w-16 h-8 bg-white border border-gray-200 rounded shrink-0" />
                    </div>
                    <div className="text-center text-sm font-medium text-dark-200">Светлая</div>
                    <div className="absolute inset-0 bg-dark-900/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-bold text-white uppercase tracking-wider bg-dark-900/80 px-2 py-1 rounded backdrop-blur-sm">В разработке</span>
                    </div>
                  </div>

                  {/* Dark (Active) */}
                  <div className="bg-accent-purple/10 border-2 border-accent-purple rounded-2xl p-4 relative shadow-[0_0_20px_rgba(108,92,231,0.15)] cursor-pointer">
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-accent-purple rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                    <div className="h-24 rounded-lg bg-[#0f1117] mb-3 border border-white/10 overflow-hidden relative">
                      <div className="w-1/3 h-full bg-[#161923] border-r border-white/5 absolute left-0" />
                       <div className="absolute top-2 right-2 w-12 h-2 bg-dark-600 rounded" />
                       <div className="absolute top-6 right-2 w-16 h-8 bg-dark-800 border border-white/5 rounded" />
                    </div>
                    <div className="text-center text-sm font-bold text-white">Темная</div>
                  </div>

                  {/* System */}
                  <div className="bg-dark-900 border border-white/5 rounded-2xl p-4 cursor-pointer hover:border-white/20 transition-all">
                    <div className="h-24 rounded-lg bg-gradient-to-r from-gray-100 to-[#0f1117] mb-3 border border-white/10 overflow-hidden relative">
                       <div className="absolute top-2 left-2 w-8 h-2 bg-gray-300 rounded" />
                       <div className="absolute bottom-2 right-2 w-8 h-2 bg-dark-600 rounded" />
                    </div>
                    <div className="text-center text-sm font-medium text-dark-200">Системная</div>
                  </div>
                </div>
              </div>

              {/* Startup Screen */}
              <div className="glass-card rounded-2xl p-6 border border-card-border">
                <h3 className="text-sm font-semibold text-white mb-2">Стартовый экран</h3>
                <p className="text-xs text-dark-300 mb-4 max-w-lg">Выберите раздел, который будет открываться по умолчанию после успешного входа в систему.</p>
                
                <div className="max-w-xs relative bg-dark-900 rounded-xl overflow-hidden border border-white/10">
                  <select className="w-full appearance-none bg-transparent py-3 pl-4 pr-10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent-purple cursor-pointer">
                    <option value="dashboard" className="bg-dark-800">Главный Дашборд</option>
                    <option value="warehouse" className="bg-dark-800">Склад и Логистика</option>
                    <option value="planning" className="bg-dark-800">Умное планирование</option>
                    <option value="profile" className="bg-dark-800">Личный кабинет</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-dark-400 border-l border-white/5 bg-dark-800/50">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </main>
  );
}

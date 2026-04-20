"use client";

import OfficeChatContainer from "./OfficeChatContainer";
import ChatHistorySidebar from "../components/ChatHistorySidebar";

export default function TeamChatContainer() {
  return (
    <div className="flex w-full h-[calc(100vh-64px)] bg-dark-900 overflow-hidden">
      {/* Left Chat Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="px-6 pt-4 pb-2 shrink-0">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            Чаты с командой
            <span className="text-[10px] uppercase tracking-widest bg-dark-700 px-2 py-0.5 rounded text-dark-300">Global Chat</span>
          </h1>
        </div>

        <div className="flex-1 min-h-0">
          <OfficeChatContainer />
        </div>
      </main>

      {/* Right History Sidebar */}
      <ChatHistorySidebar />
    </div>
  );
}

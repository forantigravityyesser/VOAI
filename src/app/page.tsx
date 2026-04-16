import MetricsGrid from "@/components/MetricsGrid";
import AIChatAssistant from "@/components/AIChatAssistant";
import InsightsPanel from "@/components/InsightsPanel";
import WarehouseKPI from "@/components/WarehouseKPI";
import { Calendar, FileDown, FilePlus2 } from "lucide-react";

export default function Home() {
  const currentDate = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const currentTime = new Date().toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex">
      {/* Center Content */}
      <main className="flex-1 p-6 max-w-[calc(100%-320px)]">
        {/* Greeting */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">
            Добрый день, Чем займёмся сегодня?
          </h2>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-xs text-dark-300">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentDate} | {currentTime}</span>
            </div>
            <div className="flex gap-2 ml-auto">
              <button className="px-4 py-2 rounded-xl border border-card-border text-xs font-medium text-dark-100
                hover:border-accent-purple/40 hover:text-white transition-all flex items-center gap-2 cursor-pointer">
                <FileDown className="w-3.5 h-3.5" />
                Export Data
              </button>
              <button className="px-4 py-2 rounded-xl bg-accent-purple text-xs font-medium text-white
                hover:bg-accent-purple/80 hover:shadow-lg hover:shadow-accent-purple/25 transition-all flex items-center gap-2 cursor-pointer">
                <FilePlus2 className="w-3.5 h-3.5" />
                + Create Report
              </button>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <MetricsGrid />

        {/* AI Chat */}
        <AIChatAssistant />
      </main>

      {/* Right Sidebar */}
      <aside className="w-[320px] p-6 pl-0 shrink-0">
        <InsightsPanel />
        <WarehouseKPI />
      </aside>
    </div>
  );
}

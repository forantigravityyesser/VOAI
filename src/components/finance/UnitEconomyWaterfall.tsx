import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { Search, Package, ChevronRight } from "lucide-react";

export default function UnitEconomyWaterfall() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSku, setSelectedSku] = useState("SKU-184");

  // Mock products list
  const products = [
    { id: "SKU-184", name: "Футболка Oversize", profit: "770 ₽", margin: "25.7%" },
    { id: "SKU-202", name: "Худи Classic", profit: "920 ₽", margin: "28.4%" },
    { id: "SKU-311", name: "Штаны Cargo", profit: "150 ₽", margin: "8.2%" },
    { id: "SKU-405", name: "Кепка Basic", profit: "45 ₽", margin: "3.1%" },
    { id: "SKU-520", name: "Носки Wool", profit: "120 ₽", margin: "32.1%" },
  ];

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock data mapping (adjusting based on selected SKU for demo effect)
  const isBad = selectedSku === "SKU-311" || selectedSku === "SKU-405";
  const basePrice = isBad ? 2500 : 3000;
  
  const data = [
    { name: 'Цена на ВБ', value: basePrice, itemStyle: { color: '#00d68f' } },
    { name: 'СПП', value: -400, itemStyle: { color: '#4f9cf7' } },
    { name: 'Комиссия', value: isBad ? -600 : -450, itemStyle: { color: '#ffa94d' } },
    { name: 'Логистика', value: isBad ? -550 : -350, itemStyle: { color: '#ff4757' } },
    { name: 'Налог (6%)', value: -180, itemStyle: { color: '#687092' } },
    { name: 'Себестоимость', value: -850, itemStyle: { color: '#6c5ce7' } },
    { name: 'Чистая прибыль', value: isBad ? -80 : 770, itemStyle: { color: isBad ? '#ff4757' : '#00b8d9' } },
  ];

  // Waterfall calculation logic
  let total = 0;
  const helpData = [];
  const positiveData = [];

  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      helpData.push(0);
      positiveData.push(data[i]);
      total += data[i].value;
    } else if (i === data.length - 1) {
      helpData.push(0);
      positiveData.push(data[i]);
    } else {
      total += data[i].value;
      helpData.push(total);
      positiveData.push({ ...data[i], value: Math.abs(data[i].value) });
    }
  }

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#161923',
      borderColor: '#2a2f45',
      textStyle: { color: '#fff', fontFamily: 'inherit' },
      formatter: function (params: any) {
        const tar = params[1];
        const sign = tar.name === 'Цена на ВБ' || tar.name === 'Чистая прибыль' ? '' : '- ';
        const colorText = tar.name === 'Чистая прибыль' ? (tar.value < 0 ? '#ff4757' : '#00b8d9') : (tar.name === 'Цена на ВБ' ? '#00d68f' : '#ff4757');
        return `
            <div style="padding: 4px;">
               <div style="font-weight: 800; margin-bottom: 5px; color:#9099b7; font-size: 11px; text-transform: uppercase;">${tar.name}</div>
               <div style="font-weight: 900; color: ${colorText}; font-size: 14px;">${sign}${tar.value} ₽</div>
            </div>
        `;
      }
    },
    grid: { left: '2%', right: '2%', bottom: '5%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: data.map(item => item.name),
      axisLine: { lineStyle: { color: '#2a2f45' } },
      axisLabel: { color: '#687092', fontSize: 9, fontWeight: 'bold', interval: 0, rotate: 25 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.02)', type: 'dashed' } },
      axisLabel: { color: '#687092', fontSize: 9, fontWeight: 'bold' }
    },
    series: [
      {
        name: 'Placeholder',
        type: 'bar',
        stack: 'Total',
        itemStyle: { borderColor: 'transparent', color: 'transparent' },
        emphasis: { itemStyle: { borderColor: 'transparent', color: 'transparent' } },
        data: helpData
      },
      {
        name: 'Life Cost',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'top',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 9,
          formatter: (params: any) => {
             const pct = Math.abs((params.value / data[0].value) * 100).toFixed(0);
             return `${params.value} ₽\n(${pct}%)`;
          }
        },
        itemStyle: { borderRadius: 4 },
        data: positiveData
      }
    ]
  };

  return (
    <div className="glass-card p-10 rounded-[2.5rem] border border-card-border h-[820px] flex flex-col group relative overflow-hidden transition-all hover:border-accent-blue/30">
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-3xl font-black text-white tracking-tight mb-1">Рентген Юнит-экономики</h3>
          <p className="text-[12px] font-extrabold text-dark-400 uppercase tracking-widest">Детальный разбор прибыльности артикула</p>
        </div>
        <div className="p-3 bg-accent-blue/10 rounded-2xl border border-accent-blue/20 shadow-lg shadow-accent-blue/10">
            <Package className="w-6 h-6 text-accent-blue" />
        </div>
      </div>
      
      {/* Chart Section */}
      <div className="h-[340px] w-full relative z-10 mb-8 bg-dark-900/60 rounded-[2rem] border border-white/5 p-6 shadow-inner">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>

      {/* Search & List Section */}
      <div className="flex-1 flex flex-col min-h-0 relative z-10 bg-dark-900/20 rounded-[2rem] p-1 border border-white/5">
         <div className="relative mb-4 px-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
            <input 
               type="text" 
               placeholder="Поиск по артикулу или названию..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-dark-900/80 border border-card-border/30 rounded-2xl py-4 pl-14 pr-4 text-xs font-bold text-white placeholder:text-dark-600 focus:outline-none focus:border-accent-blue/50 transition-all shadow-inner"
            />
         </div>

         <div className="flex-1 overflow-y-auto px-2 custom-scrollbar space-y-2.5 pb-2">
            {filteredProducts.map((p) => (
               <button 
                  key={p.id}
                  onClick={() => setSelectedSku(p.id)}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 group/item ${
                     selectedSku === p.id 
                     ? "bg-accent-blue/10 border-accent-blue/40 shadow-[0_0_30px_rgba(0,184,217,0.15)] ring-1 ring-accent-blue/20" 
                     : "bg-dark-900/40 border-white/5 hover:border-white/20 hover:bg-dark-800/80"
                  }`}
               >
                  <div className="flex items-center gap-4">
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        selectedSku === p.id ? "bg-accent-blue text-white" : "bg-dark-800 text-dark-400 group-hover/item:text-white"
                     }`}>
                        <span className="text-[10px] font-black uppercase tracking-tighter">{p.id.split('-')[1]}</span>
                     </div>
                     <div className="text-left">
                        <p className={`text-xs font-black transition-colors ${selectedSku === p.id ? "text-white" : "text-dark-200"}`}>{p.name}</p>
                        <p className="text-[10px] text-dark-500 font-bold uppercase tracking-wider">{p.id}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-6">
                     <div className="text-right">
                        <p className={`text-xs font-black ${p.profit.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>{p.profit}</p>
                        <p className="text-[10px] text-dark-500 font-bold uppercase">{p.margin} Маржа</p>
                     </div>
                     <ChevronRight className={`w-4 h-4 transition-all ${selectedSku === p.id ? "text-accent-blue translate-x-1" : "text-dark-600"}`} />
                  </div>
               </button>
            ))}
            {filteredProducts.length === 0 && (
               <div className="py-12 text-center">
                  <p className="text-xs font-bold text-dark-500 uppercase tracking-widest">Товары не найдены</p>
               </div>
            )}
         </div>
      </div>

      <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-accent-blue/5 blur-[100px] rounded-full pointer-events-none"></div>
    </div>
  );
}

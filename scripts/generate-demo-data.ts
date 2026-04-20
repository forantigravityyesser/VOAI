import { createClient } from '@insforge/sdk';

const insforge = createClient({
  baseUrl: 'https://m732ftc9.eu-central.insforge.app',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OC0xMjM0LTU2NzgtOTBhYi1jZGVmMTIzNDU2NzgiLCJlbWFpbCI6ImFub25AaW5zZm9yZ2UuY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2ODc4MDF9.f0zWDGkuE44vD0FKMkKGt5jbIXfqUX3wYNoQb5UipRQ'
});

async function run() {
  console.log('Generating 90-day demo fixtures...');
  
  const today = new Date();
  
  // 1. Возвращаем моковые SKU и кампании (как из нашего mock-data)
  const mockSKUs = [
    { id: "SKU-184", name: "Футболка Oversize", revenue: 124000, margin: 42, profit: 52080, roi: 2.8, recommendation: "Увеличить рекламный бюджет на 15%", segment: "Scale" },
    { id: "SKU-202", name: "Худи Classic", revenue: 98500, margin: 38, profit: 37430, roi: 2.4, recommendation: "Включить внутреннюю рекламу", segment: "Scale" },
    { id: "SKU-311", name: "Штаны Cargo", revenue: 156000, margin: 12, profit: 18720, roi: 1.2, recommendation: "Повысить цену на 5%", segment: "Optimize" },
    { id: "SKU-405", name: "Кепка Basic", revenue: 210000, margin: 8, profit: 16800, roi: 0.9, recommendation: "Снизить логистические затраты", segment: "Optimize" },
    { id: "SKU-520", name: "Носки Wool", revenue: 15000, margin: 55, profit: 8250, roi: 4.5, recommendation: "Прокачать SEO и отзывы", segment: "Promote" },
  ];
  
  const mockPNLData = [
    { id: "revenue", label: "Выручка (Gross Sales)", value: 5840000, type: "income", isMain: true },
    { id: "market_costs", label: "Расходы маркетплейса", value: -1850000, type: "expense", isMain: false,
      children: [
        { id: "comission", label: "Комиссия WB", value: -840000, type: "expense" },
        { id: "logistics", label: "Логистика", value: -620000, type: "expense" },
      ]
    },
    { id: "cogs", label: "Себестоимость товара (COGS)", value: -2100000, type: "expense", isMain: false },
    { id: "gross_profit", label: "Валовая прибыль", value: 1890000, type: "result", isMain: true },
    { id: "net_profit", label: "Чистая прибыль (Net Income)", value: 1119600, type: "result", isMain: true }
  ];

  // 2. Генерируем 90 дней истории с привязкой к ТЕКУЩЕЙ ДАТЕ
  const history = Array.from({ length: 90 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (89 - i));
    
    // Эмулируем растущий тренд с волатильностью
    const trend = i * 200;
    const seasonality = Math.sin(i / 5) * 8000;
    const randomNoise = (Math.random() - 0.5) * 5000;
    
    const baseRevenue = 40000 + trend + seasonality + randomNoise;
    const profit = baseRevenue * 0.18 + (Math.random() * 2000);
    
    return {
      date: d.toISOString().split('T')[0],
      revenue: Math.max(0, Math.round(baseRevenue)),
      profit: Math.max(0, Math.round(profit)),
      orders: Math.max(0, Math.round(baseRevenue / 1800))
    };
  });

  const dashboardData = {
    metrics: { margin: 42.8, roi: 184, revenue: 5840000, netProfit: 1119600 },
    history,
    skus: mockSKUs,
    pnl: mockPNLData,
    generatedAt: new Date().toISOString()
  };

  // 3. Отправляем в InsForge
  // Поскольку у нас пока нет метода `upsert`, используем check -> insert or update
  const { data: existing } = await insforge.from('demo_fixtures').select('id').eq('endpoint', 'dashboard/finances').single();
  
  if (existing) {
    console.log('Update existing fixture...');
    const { error } = await insforge.from('demo_fixtures')
      .update({ data: dashboardData, updated_at: new Date().toISOString() })
      .eq('id', existing.id);
    if (error) console.error('Ошибка при обновлении:', error);
    else console.log('Успешно обновлено.');
  } else {
    console.log('Insert new fixture...');
    const { error } = await insforge.from('demo_fixtures')
      .insert([{ endpoint: 'dashboard/finances', data: dashboardData }]);
    if (error) console.error('Ошибка при вставке:', error);
    else console.log('Успешно создано.');
  }
}

run();

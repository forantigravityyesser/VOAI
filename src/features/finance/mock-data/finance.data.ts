import { SKU, AdCampaign, FinanceEvent, PNLRow } from "@/core/types/finance";

export interface TimelineEvent extends FinanceEvent {
  day: string;
  description: string;
  status: "past" | "current" | "future";
  value?: string;
}

export const mockSKUs: SKU[] = [
  { id: "SKU-184", name: "Футболка Oversize", revenue: 124000, margin: 42, profit: 52080, roi: 2.8, recommendation: "Увеличить рекламный бюджет на 15%", segment: "Scale" },
  { id: "SKU-202", name: "Худи Classic", revenue: 98500, margin: 38, profit: 37430, roi: 2.4, recommendation: "Включить внутреннюю рекламу", segment: "Scale" },
  { id: "SKU-311", name: "Штаны Cargo", revenue: 156000, margin: 12, profit: 18720, roi: 1.2, recommendation: "Повысить цену на 5%", segment: "Optimize" },
  { id: "SKU-405", name: "Кепка Basic", revenue: 210000, margin: 8, profit: 16800, roi: 0.9, recommendation: "Снизить логистические затраты", segment: "Optimize" },
  { id: "SKU-520", name: "Носки Wool", revenue: 15000, margin: 55, profit: 8250, roi: 4.5, recommendation: "Прокачать SEO и отзывы", segment: "Promote" },
  { id: "SKU-612", name: "Ремень Leather", revenue: 22000, margin: 48, profit: 10560, roi: 3.2, recommendation: "Запустить тест видео-обложки", segment: "Promote" },
  { id: "SKU-777", name: "Сумка Tote", revenue: 8000, margin: -5, profit: -400, roi: -0.2, recommendation: "Вывести из ассортимента", segment: "Eliminate" },
  { id: "SKU-888", name: "Чехол Phone", revenue: 12000, margin: 5, profit: 600, roi: 0.4, recommendation: "Ликвидировать остатки", segment: "Eliminate" },
  { id: "SKU-991", name: "Футболка Print", revenue: 110000, margin: 35, profit: 38500, roi: 2.2, recommendation: "Масштабировать рекламу", segment: "Scale" },
  { id: "SKU-992", name: "Свитшот Warm", revenue: 130000, margin: 45, profit: 58500, roi: 3.0, recommendation: "Масштабировать продажи", segment: "Scale" },
];

export const mockAdCampaigns: AdCampaign[] = [
  { id: "1", name: "Летнее Платье АРК", skuCode: "WB-DR-552", imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=100&q=80", spend: 540000, profit: 1200000, drr: 12.5, status: "profitable", isActive: true, durationDays: 14, revenue: 4320000, margin: 28, roi: 2.2, segment: "Scale" },
  { id: "2", name: "Босоножки Кожа", skuCode: "WB-SH-912", imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=100&q=80", spend: 820000, profit: -45000, drr: 105.0, status: "loss", isActive: true, durationDays: 28, revenue: 780000, margin: -6, roi: -0.1, segment: "Eliminate" },
  { id: "3", name: "Сумка Кросс-боди", skuCode: "WB-BG-112", imageUrl: "https://images.unsplash.com/photo-1584917033904-491a84e2ee93?w=100&q=80", spend: 120000, profit: 450000, drr: 18.2, status: "profitable", isActive: false, durationDays: 5, revenue: 650000, margin: 69, roi: 3.8, segment: "Promote" },
  { id: "4", name: "Кеды Urban", skuCode: "WB-SN-772", imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=100&q=80", spend: 310000, profit: 150000, drr: 42.1, status: "warning", isActive: true, durationDays: 21, revenue: 735000, margin: 20, roi: 0.5, segment: "Optimize" },
];

export const mockPNLData: PNLRow[] = [
  { id: "revenue", label: "Выручка (Gross Sales)", value: 5840000, type: "income", isMain: true },
  {
    id: "market_costs", label: "Расходы маркетплейса", value: -1850000, type: "expense", isMain: false,
    children: [
      { id: "comission", label: "Комиссия WB", value: -840000, type: "expense" },
      { id: "logistics", label: "Логистика", value: -620000, type: "expense" },
      { id: "storage", label: "Хранение", value: -120000, type: "expense" },
      { id: "fines", label: "Штрафы и удержания", value: -85000, type: "expense" },
      { id: "ads_wb", label: "Реклама (Внутренняя)", value: -185000, type: "expense" },
    ]
  },
  { id: "cogs", label: "Себестоимость товара (COGS)", value: -2100000, type: "expense", isMain: false },
  { id: "gross_profit", label: "Валовая прибыль", value: 1890000, type: "result", isMain: true },
  {
    id: "fixed_costs", label: "Постоянные расходы (OPEX)", value: -420000, type: "expense", isMain: false,
    children: [
      { id: "salary", label: "ФОТ (Сотрудники)", value: -250000, type: "expense" },
      { id: "rent", label: "Аренда склада/офиса", value: -80000, type: "expense" },
      { id: "services", label: "Сервисы и софт", value: -45000, type: "expense" },
      { id: "marketing_ext", label: "Внешний маркетинг", value: -45000, type: "expense" },
    ]
  },
  { id: "tax", label: "Налоги (УСН 6%)", value: -350400, type: "expense", isMain: false },
  { id: "net_profit", label: "Чистая прибыль (Net Income)", value: 1119600, type: "result", isMain: true }
];

export const mockTimelineEvents: TimelineEvent[] = [
  { id: "1", date: "13 Апр", day: "Понедельник", title: "Отчет №452", description: "Сформирован еженедельный финансовый отчет", type: "report", status: "past", amount: 1200000, value: "1.2M ₽" },
  { id: "2", date: "15 Апр", day: "Среда", title: "Выплата", description: "Деньги отправлены на ваш расчетный счет", type: "payment", status: "past", amount: 840000, value: "+840k ₽" },
  { id: "3", date: "16 Апр", day: "Сегодня", title: "Сверка остатков", description: "Плановая проверка складских лимитов", type: "report", status: "current", amount: 0 },
  { id: "4", date: "18 Апр", day: "Пятница", title: "Логистика", description: "Изменение тарифа в категории 'Обувь'", type: "tariff", status: "future", amount: 0, value: "+15%" },
  { id: "5", date: "20 Апр", day: "Понедельник", title: "Налоги", description: "Крайний срок уплаты аванса по УСН", type: "tax", status: "future", amount: 0 },
  { id: "6", date: "22 Апр", day: "Среда", title: "Выплата", description: "Ожидаемое поступление средств", type: "payment", status: "future", amount: 900000, value: "~900k ₽" }
];

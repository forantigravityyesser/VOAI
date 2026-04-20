import { Stock, TransitItem, OrderHistoryItem, DeadStock, LocalizationItem, RecommendedPlan } from "@/core/types/warehouse.types";

export const mockWarehouseStock: Stock[] = [
  { name: "Шампунь органик", stock: 78, stockMax: 100, reserved: 26, inTransit: 27, daysLeft: 26, daysTrend: "down", salesDay: 8.1, salesTrend: "+2%", risk: "18.0%", riskTrend: "down", warehouse: "СПб", color: "bg-accent-green" },
  { name: "Роутер Wi-Fi 6", stock: 12, stockMax: 50, reserved: 8, inTransit: 40, daysLeft: 3, daysTrend: "up", salesDay: 4, salesTrend: "+25%", risk: "95.0%", riskTrend: "up", warehouse: "Москва", color: "bg-accent-red" },
  { name: "Джинсы классика", stock: 370, stockMax: 500, reserved: 10, inTransit: 0, daysLeft: 231, daysTrend: "down", salesDay: 1.6, salesTrend: "-18%", risk: "5.0%", riskTrend: "down", warehouse: "Казань", color: "bg-accent-green" },
  { name: "Маска для волос", stock: 25, stockMax: 100, reserved: 10, inTransit: 45, daysLeft: 6, daysTrend: "up", salesDay: 4.2, salesTrend: "+14%", risk: "78.0%", riskTrend: "up", warehouse: "Москва", color: "bg-accent-orange" },
  { name: "Гантели 10кг", stock: 200, stockMax: 300, reserved: 12, inTransit: 0, daysLeft: 50, daysTrend: "down", salesDay: 4, salesTrend: "-5%", risk: "15.0%", riskTrend: "down", warehouse: "Казань", color: "bg-accent-green" },
];

export const mockDeadStock: DeadStock[] = [
  { name: 'Свечи зажигания', value: 580, speed: "0.2 ед/день", daysWithout: 12 },
  { name: 'Джинсы классика', value: 380, speed: "0.5 ед/день", daysWithout: 8 },
  { name: 'Чайник электрич.', value: 200, speed: "0.3 ед/день", daysWithout: 15 },
];

export const mockGoodsInTransit: TransitItem[] = [
  { item: "Смартфон X200", qty: "50 шт", ordered: "18.02.2026", arrival: "28.02.2026", wh: "Москва" },
  { item: "Куртка зимняя", qty: "80 шт", ordered: "15.02.2026", arrival: "05.03.2026", wh: "Москва" },
];

export const mockLocalization: LocalizationItem[] = [
  { name: "Смартфон X200-Ultra", id: "WB-10293", score: 92, zones: "Мск (100%), Юг (85%)", status: "Цель", color: "bg-accent-green", bar: "w-[92%]" },
  { name: "Чехол силиконовый Grey", id: "WB-55201", score: 68, zones: "Мск (70%), Сибирь (10%)", status: "Риск", color: "bg-accent-orange", bar: "w-[68%]" },
  { name: "Крем для лица (50мл)", id: "WB-99283", score: 45, zones: "Мск (40%), Юг (5%)", status: "Штраф", color: "bg-accent-red", bar: "w-[45%]" },
];

export const mockOrderHistory: OrderHistoryItem[] = [
  { date: "12.04.2026", item: "Шампунь органик", qty: "200 шт", wh: "Коледино", arrived: "Выполнено" },
  { date: "10.04.2026", item: "Роутер Wi-Fi 6", qty: "50 шт", wh: "Электросталь", arrived: "Выполнено" },
  { date: "05.04.2026", item: "Джинсы классика", qty: "300 шт", wh: "Казань", arrived: "Выполнено" },
];

export const mockWarehouseDistribution: WarehouseDistribution[] = [
  { name: "Коледино", type: "Центральный", status: "Высокая", color: "text-accent-red", items: 1240, stock: 45000, capacity: 92, bar: "bg-accent-red", logCost: "55.2 ₽", storeCost: "0.12 ₽", acceptanceCoeff: 1.5, demandCoverage: 45 },
  { name: "Электросталь", type: "Центральный", status: "Средняя", color: "text-accent-orange", items: 850, stock: 32000, capacity: 75, bar: "bg-accent-orange", logCost: "48.5 ₽", storeCost: "0.08 ₽", acceptanceCoeff: 1.0, demandCoverage: 32 },
  { name: "Казань", type: "Региональный", status: "Низкая", color: "text-accent-green", items: 400, stock: 15000, capacity: 42, bar: "bg-accent-green", logCost: "32.1 ₽", storeCost: "0.05 ₽", acceptanceCoeff: 1.0, demandCoverage: 18 },
  { name: "Екатеринбург", type: "Региональный", status: "Низкая", color: "text-accent-green", items: 250, stock: 8000, capacity: 30, bar: "bg-accent-green", logCost: "35.8 ₽", storeCost: "0.06 ₽", acceptanceCoeff: 1.0, demandCoverage: 15 },
];

export const mockRecommendedPlans: RecommendedPlan[] = [
  { name: "Шампунь органик", current: 78, recommended: 300, forecast: 12, daysToZero: 6, warehouse: "Коледино", budget: "45 000 ₽", color: "text-accent-orange", status: "Срочно" },
  { name: "Роутер Wi-Fi 6", current: 12, recommended: 50, forecast: 4, daysToZero: 3, warehouse: "Электросталь", budget: "125 000 ₽", color: "text-accent-red", status: "Критично" },
  { name: "Маска для волос", current: 25, recommended: 150, forecast: 8, daysToZero: 3, warehouse: "Коледино", budget: "32 000 ₽", color: "text-accent-orange", status: "Срочно" },
  { name: "Крем для лица", current: 45, recommended: 200, forecast: 10, daysToZero: 4, warehouse: "Электросталь", budget: "58 000 ₽", color: "text-accent-green", status: "Норма" },
];

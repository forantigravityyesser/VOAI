import { 
  Stock, 
  DeadStock, 
  TransitItem, 
  OrderHistoryItem, 
  SpaceEfficiency, 
  WarehouseDistribution,
  LocalizationItem,
  RecommendedPlan 
} from '../types/warehouse.types';


export const STOCK_DATA: Stock[] = [
  { name: "Шампунь органик", stock: 78, stockMax: 100, reserved: 26, inTransit: 27, daysLeft: 26, daysTrend: "down", salesDay: 8.1, salesTrend: "+2%", risk: "18.0%", riskTrend: "down", warehouse: "СПб", color: "bg-accent-green" },
  { name: "Роутер Wi-Fi 6", stock: 12, stockMax: 50, reserved: 8, inTransit: 40, daysLeft: 3, daysTrend: "up", salesDay: 4, salesTrend: "+25%", risk: "95.0%", riskTrend: "up", warehouse: "Москва", color: "bg-accent-red" },
  { name: "Джинсы классика", stock: 370, stockMax: 500, reserved: 10, inTransit: 0, daysLeft: 231, daysTrend: "down", salesDay: 1.6, salesTrend: "-18%", risk: "5.0%", riskTrend: "down", warehouse: "Казань", color: "bg-accent-green" },
  { name: "Маска для волос", stock: 25, stockMax: 100, reserved: 10, inTransit: 45, daysLeft: 6, daysTrend: "up", salesDay: 4.2, salesTrend: "+14%", risk: "78.0%", riskTrend: "up", warehouse: "Москва", color: "bg-accent-orange" },
  { name: "Гантели 10кг", stock: 200, stockMax: 300, reserved: 12, inTransit: 0, daysLeft: 50, daysTrend: "down", salesDay: 4, salesTrend: "-5%", risk: "15.0%", riskTrend: "down", warehouse: "Казань", color: "bg-accent-green" },
];

export const DEAD_STOCK: DeadStock[] = [
  { name: 'Свечи зажигания', value: 580, speed: '0.2 ед/день', daysWithout: 12 },
  { name: 'Джинсы классика', value: 380, speed: '0.5 ед/день', daysWithout: 8 },
  { name: 'Чайник электрич.', value: 200, speed: '0.3 ед/день', daysWithout: 15 },
  { name: 'Наушники BT-500', value: 310, speed: '0.8 ед/день', daysWithout: 5 },
  { name: 'Коврик для йоги', value: 330, speed: '1.2 ед/день', daysWithout: 2 },
  { name: 'Ежедневник A5', value: 920, speed: '2.5 ед/день', daysWithout: 1 }
];

export const GOODS_IN_TRANSIT: TransitItem[] = [
  { item: "Смартфон X200", qty: "50 шт", ordered: "18.02.2026", arrival: "28.02.2026", wh: "Москва" },
  { item: "Куртка зимняя", qty: "80 шт", ordered: "15.02.2026", arrival: "05.03.2026", wh: "Москва" },
  { item: "Набор посуды", qty: "20 шт", ordered: "20.02.2026", arrival: "10.03.2026", wh: "Казань" },
  { item: "Тормозные колодки", qty: "36 шт", ordered: "19.02.2026", arrival: "01.03.2026", wh: "Москва" },
  { item: "Маска для волос", qty: "45 шт", ordered: "17.02.2026", arrival: "27.02.2026", wh: "Москва" },
  { item: "Масляный фильтр", qty: "30 шт", ordered: "21.02.2026", arrival: "03.03.2026", wh: "Москва" },
  { item: "Футболка базовая", qty: "100 шт", ordered: "16.02.2026", arrival: "26.02.2026", wh: "Москва" },
];

export const ORDER_HISTORY: OrderHistoryItem[] = [
  { date: "10.02.2026", item: "Смартфон X200", qty: "100 шт", wh: "Москва", arrived: "20.02.2026" },
  { date: "05.02.2026", item: "Кофе Арабика", qty: "500 шт", wh: "Москва", arrived: "12.02.2026" },
  { date: "01.02.2026", item: "Футболка базовая", qty: "200 шт", wh: "Москва", arrived: "08.02.2026" },
  { date: "28.01.2026", item: "Крем для лица", qty: "150 шт", wh: "СПб", arrived: "05.02.2026" },
  { date: "25.01.2026", item: "Масляный фильтр", qty: "300 шт", wh: "Москва", arrived: "01.02.2026" },
  { date: "20.01.2026", item: "Куртка зимняя", qty: "100 шт", wh: "Москва", arrived: "28.01.2026" },
  { date: "15.01.2026", item: "Набор посуды", qty: "50 шт", wh: "Казань", arrived: "25.01.2026" },
];

export const SPACE_EFFICIENCY: SpaceEfficiency[] = [
  { name: "Коврик для йоги XL", space: "35%", orders: "8%", loss: "-27%" },
  { name: "Набор конструктора", space: "25%", orders: "14%", loss: "-11%" },
];

export const WAREHOUSE_DISTRIBUTION: WarehouseDistribution[] = [
  { name: "Коледино", type: "Центральный", items: 45, stock: 12450, capacity: 85, logCost: "55 ₽", storeCost: "0.15 ₽", status: "Высокая нагрузка", color: "text-accent-red", bar: "bg-accent-red" },
  { name: "Электросталь", type: "Центральный", items: 32, stock: 8300, capacity: 45, logCost: "50 ₽", storeCost: "0.12 ₽", status: "Оптимально", color: "text-accent-green", bar: "bg-accent-green" },
  { name: "Казань", type: "Региональный", items: 120, stock: 25000, capacity: 92, logCost: "40 ₽", storeCost: "0.10 ₽", status: "Перегруз", color: "text-accent-orange", bar: "bg-accent-orange" },
  { name: "Краснодар", type: "Региональный", items: 18, stock: 3200, capacity: 25, logCost: "65 ₽", storeCost: "0.18 ₽", status: "Доступен", color: "text-accent-blue", bar: "bg-accent-blue" },
];

export const LOCALIZATION_DATA: LocalizationItem[] = [
  { name: "Москва и МО", id: "MSK-01", score: 92, zones: "4 зоны", color: "text-accent-green", bar: "bg-accent-green", status: "Локализовано" },
  { name: "Санкт-Петербург", id: "SPB-01", score: 85, zones: "2 зоны", color: "text-accent-green", bar: "bg-accent-green", status: "Локализовано" },
  { name: "Казань", id: "KZN-01", score: 45, zones: "1 зона", color: "text-accent-orange", bar: "bg-accent-orange", status: "Требует внимания" },
  { name: "Екатеринбург", id: "EKB-01", score: 12, zones: "0 зон", color: "text-accent-red", bar: "bg-accent-red", status: "Не локализовано" },
];

export const RECOMMENDED_PLANS: RecommendedPlan[] = [
  { name: "Шампунь органик", current: 78, recommended: 150, forecast: 210, budget: "45,000 ₽", warehouse: "Электросталь", status: "Срочно", color: "text-accent-red" },
  { name: "Маска для волос", current: 25, recommended: 60, forecast: 95, budget: "12,000 ₽", warehouse: "Коледино", status: "Средний", color: "text-accent-orange" },
  { name: "Гантели 10кг", current: 200, recommended: 250, forecast: 280, budget: "60,000 ₽", warehouse: "Казань", status: "Низкий", color: "text-accent-green" },
];


import { 
  HelpCircle, Code, PieChart, Warehouse, Lightbulb, AlertTriangle 
} from "lucide-react";

export const tickets = [
  {
    id: "#2041",
    type: "Вопрос",
    timestamp: "11:52 AM",
    title: "Почему не сходятся данные с отчетом о реализации WB?",
    description: "Заметил расхождение в 5-7% между данными в кабинете и выгруженным отчетом за прошлую неделю. Это баг или особенность расчета?",
    user: {
      name: "Алексей С.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexey"
    },
    tags: ["Финансы", "Баг"],
    attachments: 1,
    comments: 4
  },
  {
    id: "#2038",
    type: "Предложение",
    timestamp: "10:15 AM",
    title: "Добавить интеграцию с ТК Деловые Линии",
    description: "Было бы отлично видеть статусы отгрузок напрямую в дашборде планирования склада. Сейчас приходится проверять вручную.",
    user: {
      name: "Мария К.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
    },
    tags: ["Логистика", "Идея"],
    attachments: 0,
    comments: 12
  },
  {
    id: "#2035",
    type: "Ошибка",
    timestamp: "Вчера",
    title: "Не загружаются фотографии товаров через API",
    description: "При попытке обновления карточек через массовое редактирование API возвращает 500 ошибку. Проверьте, пожалуйста.",
    user: {
      name: "Иван П.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan"
    },
    tags: ["API", "Критично"],
    attachments: 2,
    comments: 2
  }
];

export const helpCategories = [
  { label: "Начало работы", id: "getting-started", active: true, icon: HelpCircle },
  { label: "API и Интеграция WB", id: "api", icon: Code },
  { label: "Финансы и Отчеты", id: "finance", icon: PieChart },
  { label: "Склад и Планирование", id: "warehouse", icon: Warehouse },
  { label: "Предложить идею (Feature)", id: "feature", icon: Lightbulb },
  { label: "Баги и Ошибки", id: "bugs", icon: AlertTriangle },
];

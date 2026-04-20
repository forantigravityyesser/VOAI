import { z } from 'zod';

export const StockSchema = z.object({
  name: z.string(),
  stock: z.number(),
  stockMax: z.number(),
  reserved: z.number(),
  inTransit: z.number(),
  daysLeft: z.number(),
  daysTrend: z.enum(['up', 'down', 'stable']).optional().or(z.string()),
  salesDay: z.number(),
  salesTrend: z.string(),
  risk: z.string(),
  riskTrend: z.enum(['up', 'down', 'stable']).optional().or(z.string()),
  warehouse: z.string(),
  color: z.string(),
});

export const DeadStockSchema = z.object({
  name: z.string(),
  value: z.number(),
  speed: z.string(),
  daysWithout: z.number(),
});

export const TransitItemSchema = z.object({
  item: z.string(),
  qty: z.string().or(z.number()), // Supports "50 шт" or 50
  ordered: z.string(),
  arrival: z.string(),
  wh: z.string(),
});

export const OrderHistoryItemSchema = z.object({
  date: z.string(),
  item: z.string(),
  qty: z.string().or(z.number()),
  wh: z.string(),
  arrived: z.string(),
});

export const SpaceEfficiencySchema = z.object({
  name: z.string(),
  space: z.string(),
  orders: z.string(),
  loss: z.string(),
});

export const WarehouseDistributionSchema = z.object({
  name: z.string(),
  type: z.string(),
  items: z.number(),
  stock: z.number(),
  capacity: z.number(),
  logCost: z.string(),
  storeCost: z.string(),
  status: z.string(),
  color: z.string(),
  bar: z.string(),
  acceptanceCoeff: z.number(),
  demandCoverage: z.number(),
});

export const LocalizationSchema = z.object({
  name: z.string(),
  id: z.string(),
  score: z.number(),
  zones: z.string(),
  color: z.string(),
  bar: z.string(),
  status: z.string(),
});

export const RecommendedPlanSchema = z.object({
  name: z.string(),
  current: z.number(),
  recommended: z.number(),
  forecast: z.number(),
  daysToZero: z.number(),
  budget: z.string(),
  warehouse: z.string(),
  status: z.string(),
  color: z.string(),
});


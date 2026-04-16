import { z } from 'zod';
import { 
  StockSchema, 
  DeadStockSchema, 
  TransitItemSchema, 
  OrderHistoryItemSchema, 
  SpaceEfficiencySchema, 
  WarehouseDistributionSchema,
  LocalizationSchema,
  RecommendedPlanSchema 
} from '../schemas/warehouse.schema';

export type Stock = z.infer<typeof StockSchema>;
export type DeadStock = z.infer<typeof DeadStockSchema>;
export type TransitItem = z.infer<typeof TransitItemSchema>;
export type OrderHistoryItem = z.infer<typeof OrderHistoryItemSchema>;
export type SpaceEfficiency = z.infer<typeof SpaceEfficiencySchema>;
export type WarehouseDistribution = z.infer<typeof WarehouseDistributionSchema>;
export type LocalizationItem = z.infer<typeof LocalizationSchema>;
export type RecommendedPlan = z.infer<typeof RecommendedPlanSchema>;


export type WarehouseTab = "Здоровье склада" | "Эффективность товаров" | "Планирование запасов";


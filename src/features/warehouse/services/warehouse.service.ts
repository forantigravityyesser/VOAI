import { 
  STOCK_DATA, 
  DEAD_STOCK, 
  GOODS_IN_TRANSIT, 
  ORDER_HISTORY, 
  SPACE_EFFICIENCY, 
  WAREHOUSE_DISTRIBUTION,
  LOCALIZATION_DATA,
  RECOMMENDED_PLANS
} from "@/core/mock-data/warehouse.data";
import { 
  StockSchema, 
  DeadStockSchema, 
  TransitItemSchema, 
  OrderHistoryItemSchema, 
  SpaceEfficiencySchema, 
  WarehouseDistributionSchema,
  LocalizationSchema,
  RecommendedPlanSchema
} from "@/core/schemas/warehouse.schema";
import { z } from "zod";

/**
 * Warehouse Service
 * Responsible for data retrieval and validation (Onion Architecture - Application/Feature Layer)
 */
export const warehouseService = {
  getStocks: () => z.array(StockSchema).parse(STOCK_DATA),
  getDeadStock: () => z.array(DeadStockSchema).parse(DEAD_STOCK),
  getTransitItems: () => z.array(TransitItemSchema).parse(GOODS_IN_TRANSIT),
  getOrderHistory: () => z.array(OrderHistoryItemSchema).parse(ORDER_HISTORY),
  getSpaceEfficiency: () => z.array(SpaceEfficiencySchema).parse(SPACE_EFFICIENCY),
  getDistribution: () => z.array(WarehouseDistributionSchema).parse(WAREHOUSE_DISTRIBUTION),
  getLocalization: () => z.array(LocalizationSchema).parse(LOCALIZATION_DATA),
  getRecommendedPlans: () => z.array(RecommendedPlanSchema).parse(RECOMMENDED_PLANS),

  // Combined data for the whole feature
  getInitialData: () => {
    return {
      stocks: z.array(StockSchema).parse(STOCK_DATA),
      deadStock: z.array(DeadStockSchema).parse(DEAD_STOCK),
      transit: z.array(TransitItemSchema).parse(GOODS_IN_TRANSIT),
      orders: z.array(OrderHistoryItemSchema).parse(ORDER_HISTORY),
      efficiency: z.array(SpaceEfficiencySchema).parse(SPACE_EFFICIENCY),
      distribution: z.array(WarehouseDistributionSchema).parse(WAREHOUSE_DISTRIBUTION),
      localization: z.array(LocalizationSchema).parse(LOCALIZATION_DATA),
      recommendedPlans: z.array(RecommendedPlanSchema).parse(RECOMMENDED_PLANS),
    };
  }
};


import { 
  mockWarehouseStock, 
  mockDeadStock, 
  mockGoodsInTransit, 
  mockLocalization,
  mockOrderHistory,
  mockWarehouseDistribution,
  mockRecommendedPlans
} from "../mock-data/warehouse.data";
import { Stock, DeadStock, TransitItem, LocalizationItem } from "@/core/types/warehouse.types";

export const warehouseService = {
  getStock: async (): Promise<Stock[]> => {
    return mockWarehouseStock;
  },

  getDeadStock: async (): Promise<DeadStock[]> => {
    return mockDeadStock;
  },

  getTransitItems: async (): Promise<TransitItem[]> => {
    return mockGoodsInTransit;
  },

  getLocalizationData: async (): Promise<LocalizationItem[]> => {
    return mockLocalization;
  },

  getInitialData: () => {
    return {
      stocks: mockWarehouseStock,
      deadStock: mockDeadStock,
      transit: mockGoodsInTransit,
      localization: mockLocalization,
      orders: mockOrderHistory,
      distribution: mockWarehouseDistribution,
      recommendedPlans: mockRecommendedPlans,
    };
  }
};

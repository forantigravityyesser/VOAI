import { mockSKUs, mockAdCampaigns, mockPNLData } from "../mock-data/finance.data";
import { SKU, AdCampaign, PNLRow } from "@/core/types/finance";

/**
 * Service for handling financial data and calculations.
 * In a real app, this would fetch from an API.
 */
export const financeService = {
  getSKUs: async (): Promise<SKU[]> => {
    // Simulate API delay
    return mockSKUs;
  },

  getAdCampaigns: async (): Promise<AdCampaign[]> => {
    return mockAdCampaigns;
  },

  getPNLData: async (): Promise<PNLRow[]> => {
    return mockPNLData;
  },

  getOverallMetrics: () => {
    return {
      margin: 42.8,
      roi: 184,
      revenue: 5840000,
      netProfit: 1119600
    };
  }
};

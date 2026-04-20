import { SKU } from "./common";

export type { SKU };

export interface PNLRow {
  id: string;
  label: string;
  value: number;
  isMain?: boolean;
  type: "income" | "expense" | "result";
  children?: PNLRow[];
}

export interface AdCampaign extends SKU {
  spend: number;
  drr: number;
  status: "profitable" | "warning" | "loss";
  isActive: boolean;
  durationDays: number;
}

export interface FinanceEvent {
  id: string;
  date: string;
  title: string;
  amount: number;
  type: "report" | "payment" | "tariff" | "tax";
}

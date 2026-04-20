export type Segment = "Scale" | "Optimize" | "Promote" | "Eliminate" | "All";

export interface SKU {
  id: string;
  name: string;
  revenue: number;
  margin: number;
  profit: number;
  roi: number;
  recommendation?: string;
  segment: Exclude<Segment, "All">;
  imageUrl?: string;
  skuCode?: string;
}

export interface ChartParam {
  name: string;
  value: number;
  data: Record<string, unknown>;
}

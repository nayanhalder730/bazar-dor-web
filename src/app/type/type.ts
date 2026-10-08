export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface PriceChange {
  dir: "up" | "down" | "same";
  pct: number;
}

   export interface Category {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: Market[];
}
export interface MonthlyPrice {
  month: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  investment: number;
  units: number;
  monthlyPrices: MonthlyPrice[];
}

export interface DiscreteDerivative {
  month: string;
  priceChange: number;
  percentageChange: number;
}

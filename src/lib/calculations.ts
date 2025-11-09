import { Product, DiscreteDerivative, MonthlyPrice } from "@/types/product";

export const calculateUnitPrice = (investment: number, units: number): number => {
  if (units === 0) return 0;
  return investment / units;
};

export const calculateProfitMargin = (sellingPrice: number, unitCost: number): number => {
  if (unitCost === 0) return 0;
  return ((sellingPrice - unitCost) / unitCost) * 100;
};

export const calculateDiscreteDerivative = (
  monthlyPrices: MonthlyPrice[]
): DiscreteDerivative[] => {
  const derivatives: DiscreteDerivative[] = [];

  for (let i = 1; i < monthlyPrices.length; i++) {
    const currentPrice = monthlyPrices[i].price;
    const previousPrice = monthlyPrices[i - 1].price;
    const priceChange = currentPrice - previousPrice;
    const percentageChange =
      previousPrice !== 0 ? (priceChange / previousPrice) * 100 : 0;

    derivatives.push({
      month: monthlyPrices[i].month,
      priceChange,
      percentageChange,
    });
  }

  return derivatives;
};

export const convertBOBtoUSD = (bob: number, exchangeRate: number = 6.96): number => {
  return bob / exchangeRate;
};

export const convertUSDtoBOB = (usd: number, exchangeRate: number = 6.96): number => {
  return usd * exchangeRate;
};

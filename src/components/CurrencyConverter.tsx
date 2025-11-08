import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRightLeft } from "lucide-react";
import { convertBOBtoUSD, convertUSDtoBOB } from "@/lib/calculations";
import currencyIcon from "@/assets/currency-icon.png";

const CurrencyConverter = () => {
  const [bob, setBob] = useState("");
  const [usd, setUsd] = useState("");
  const [exchangeRate, setExchangeRate] = useState("6.91");

  const handleBobChange = (value: string) => {
    setBob(value);
    const numValue = parseFloat(value) || 0;
    const rate = parseFloat(exchangeRate) || 6.91;
    setUsd(convertBOBtoUSD(numValue, rate).toFixed(2));
  };

  const handleUsdChange = (value: string) => {
    setUsd(value);
    const numValue = parseFloat(value) || 0;
    const rate = parseFloat(exchangeRate) || 6.91;
    setBob(convertUSDtoBOB(numValue, rate).toFixed(2));
  };

  const handleRateChange = (value: string) => {
    setExchangeRate(value);
    if (bob) {
      const numValue = parseFloat(bob) || 0;
      const rate = parseFloat(value) || 6.91;
      setUsd(convertBOBtoUSD(numValue, rate).toFixed(2));
    }
  };

  return (
    <Card className="shadow-medium animate-fade-in">
      <CardHeader>
        <div className="flex items-center gap-3">
          <img src={currencyIcon} alt="Currency" className="w-12 h-12" />
          <CardTitle className="text-2xl bg-gradient-accent bg-clip-text text-transparent">
            Conversor de Moneda
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Label htmlFor="rate">Tipo de Cambio (BOB/USD)</Label>
            <Input
              id="rate"
              type="number"
              step="0.01"
              value={exchangeRate}
              onChange={(e) => handleRateChange(e.target.value)}
              className="text-lg font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <Label htmlFor="bob" className="text-lg">
                Bolivianos (Bs)
              </Label>
              <Input
                id="bob"
                type="number"
                step="0.01"
                value={bob}
                onChange={(e) => handleBobChange(e.target.value)}
                placeholder="0.00"
                className="text-2xl font-bold text-primary h-14"
              />
            </div>

            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center animate-glow-pulse">
                <ArrowRightLeft className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>

            <div className="md:col-start-2">
              <Label htmlFor="usd" className="text-lg">
                Dólares ($)
              </Label>
              <Input
                id="usd"
                type="number"
                step="0.01"
                value={usd}
                onChange={(e) => handleUsdChange(e.target.value)}
                placeholder="0.00"
                className="text-2xl font-bold text-secondary h-14"
              />
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              1 USD = {exchangeRate} BOB
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;

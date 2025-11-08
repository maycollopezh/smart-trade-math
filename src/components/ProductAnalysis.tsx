import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types/product";
import {
  calculateUnitPrice,
  calculateProfitMargin,
  calculateDiscreteDerivative,
} from "@/lib/calculations";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ProductAnalysisProps {
  product: Product;
}

const ProductAnalysis = ({ product }: ProductAnalysisProps) => {
  const unitPrice = calculateUnitPrice(product.investment, product.units);
  const derivatives = calculateDiscreteDerivative(product.monthlyPrices);

  const chartData = product.monthlyPrices.map((mp, index) => ({
    month: mp.month,
    price: mp.price,
    derivative: index > 0 ? derivatives[index - 1]?.priceChange : 0,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-secondary bg-clip-text text-transparent">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Inversión Total</p>
              <p className="text-2xl font-bold text-primary">Bs {product.investment.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Unidades</p>
              <p className="text-2xl font-bold text-secondary">{product.units}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Precio Unitario</p>
              <p className="text-2xl font-bold text-accent">Bs {unitPrice.toFixed(2)}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Evolución de Precios</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  name="Precio (Bs)"
                />
                <Line
                  type="monotone"
                  dataKey="derivative"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  name="Cambio de Precio"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Análisis de Derivada Discreta</h3>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Mes</TableHead>
                    <TableHead>Precio (Bs)</TableHead>
                    <TableHead>Cambio (Δp)</TableHead>
                    <TableHead>% Cambio</TableHead>
                    <TableHead>Margen vs Costo</TableHead>
                    <TableHead>Tendencia</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.monthlyPrices.map((mp, index) => {
                    const derivative = index > 0 ? derivatives[index - 1] : null;
                    const margin = calculateProfitMargin(mp.price, unitPrice);

                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{mp.month}</TableCell>
                        <TableCell>Bs {mp.price.toFixed(2)}</TableCell>
                        <TableCell>
                          {derivative ? (
                            <span
                              className={
                                derivative.priceChange > 0
                                  ? "text-primary font-semibold"
                                  : derivative.priceChange < 0
                                  ? "text-destructive font-semibold"
                                  : "text-muted-foreground"
                              }
                            >
                              {derivative.priceChange > 0 ? "+" : ""}
                              {derivative.priceChange.toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {derivative ? (
                            <span
                              className={
                                derivative.percentageChange > 0
                                  ? "text-primary font-semibold"
                                  : derivative.percentageChange < 0
                                  ? "text-destructive font-semibold"
                                  : "text-muted-foreground"
                              }
                            >
                              {derivative.percentageChange > 0 ? "+" : ""}
                              {derivative.percentageChange.toFixed(1)}%
                            </span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              margin > 0
                                ? "text-primary font-semibold"
                                : margin < 0
                                ? "text-destructive font-semibold"
                                : "text-muted-foreground"
                            }
                          >
                            {margin > 0 ? "+" : ""}
                            {margin.toFixed(1)}%
                          </span>
                        </TableCell>
                        <TableCell>
                          {derivative ? (
                            derivative.priceChange > 0 ? (
                              <TrendingUp className="h-5 w-5 text-primary" />
                            ) : derivative.priceChange < 0 ? (
                              <TrendingDown className="h-5 w-5 text-destructive" />
                            ) : (
                              <Minus className="h-5 w-5 text-muted-foreground" />
                            )
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductAnalysis;

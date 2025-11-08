import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Product, MonthlyPrice } from "@/types/product";
import { toast } from "sonner";

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
}

const ProductForm = ({ onAddProduct }: ProductFormProps) => {
  const [name, setName] = useState("");
  const [investment, setInvestment] = useState("");
  const [units, setUnits] = useState("");
  const [monthlyPrices, setMonthlyPrices] = useState<MonthlyPrice[]>([
    { month: "Mes 1", price: 0 },
  ]);

  const handleAddMonth = () => {
    setMonthlyPrices([
      ...monthlyPrices,
      { month: `Mes ${monthlyPrices.length + 1}`, price: 0 },
    ]);
  };

  const handleRemoveMonth = (index: number) => {
    if (monthlyPrices.length > 1) {
      setMonthlyPrices(monthlyPrices.filter((_, i) => i !== index));
    }
  };

  const handlePriceChange = (index: number, value: string) => {
    const newPrices = [...monthlyPrices];
    newPrices[index].price = parseFloat(value) || 0;
    setMonthlyPrices(newPrices);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !investment || !units) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      name,
      investment: parseFloat(investment),
      units: parseFloat(units),
      monthlyPrices,
    };

    onAddProduct(product);
    toast.success("Producto agregado exitosamente");

    // Reset form
    setName("");
    setInvestment("");
    setUnits("");
    setMonthlyPrices([{ month: "Mes 1", price: 0 }]);
  };

  return (
    <Card className="shadow-medium animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
          Registrar Producto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="name">Nombre del Producto</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Agua mineral"
                required
              />
            </div>
            <div>
              <Label htmlFor="investment">Inversión Total (Bs)</Label>
              <Input
                id="investment"
                type="number"
                step="0.01"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <Label htmlFor="units">Unidades</Label>
              <Input
                id="units"
                type="number"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                placeholder="0"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <Label>Precios Mensuales (Bs)</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleAddMonth}
                className="border-primary text-primary hover:bg-primary/10"
              >
                <Plus className="h-4 w-4 mr-1" />
                Agregar Mes
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {monthlyPrices.map((month, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      type="number"
                      step="0.01"
                      value={month.price}
                      onChange={(e) => handlePriceChange(index, e.target.value)}
                      placeholder={month.month}
                    />
                  </div>
                  {monthlyPrices.length > 1 && (
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemoveMonth(index)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            Agregar Producto
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;

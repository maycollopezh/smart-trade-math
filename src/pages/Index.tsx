import { useState, useRef } from "react";
import Hero from "@/components/Hero";
import ProductForm from "@/components/ProductForm";
import ProductAnalysis from "@/components/ProductAnalysis";
import CurrencyConverter from "@/components/CurrencyConverter";
import EducationalSection from "@/components/EducationalSection";
import { Product } from "@/types/product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, DollarSign, BookOpen } from "lucide-react";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const handleGetStarted = () => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero onGetStarted={handleGetStarted} />

      <div ref={dashboardRef} className="container mx-auto px-4 py-16 space-y-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Panel de Análisis
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gestiona tus productos y visualiza el análisis de precios en tiempo real
          </p>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1 mb-8">
            <TabsTrigger value="products" className="py-3">
              <Calculator className="h-4 w-4 mr-2" />
              Productos
            </TabsTrigger>
            <TabsTrigger value="analysis" className="py-3">
              <TrendingUp className="h-4 w-4 mr-2" />
              Análisis
            </TabsTrigger>
            <TabsTrigger value="converter" className="py-3">
              <DollarSign className="h-4 w-4 mr-2" />
              Conversor
            </TabsTrigger>
            <TabsTrigger value="learn" className="py-3">
              <BookOpen className="h-4 w-4 mr-2" />
              Aprender
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-8">
            <ProductForm onAddProduct={handleAddProduct} />

            {products.length === 0 && (
              <div className="text-center py-16 px-4 bg-muted/50 rounded-2xl">
                <Calculator className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No hay productos registrados</h3>
                <p className="text-muted-foreground">
                  Comienza agregando un producto para ver el análisis de precios
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analysis">
            {products.length > 0 ? (
              <div className="space-y-8">
                {products.map((product) => (
                  <ProductAnalysis key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 bg-muted/50 rounded-2xl">
                <TrendingUp className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No hay análisis disponibles</h3>
                <p className="text-muted-foreground">
                  Agrega productos para ver su análisis de precios
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="converter">
            <CurrencyConverter />
          </TabsContent>

          <TabsContent value="learn">
            <EducationalSection />
          </TabsContent>
        </Tabs>
      </div>

      <footer className="bg-card border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>SmartTrade - Análisis de Precios</p>
          <p className="text-sm mt-2">Herramienta para emprendedores</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

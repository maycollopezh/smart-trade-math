import { Button } from "@/components/ui/button";
import { TrendingUp, Calculator, BarChart3 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">


          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            SmartTrade
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Analiza cambios de precios para
            optimizar tus decisiones en tu negocio y/o emprendimiento
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Comenzar Análisis
            </Button>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 bg-card rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <Calculator className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cálculos Automáticos</h3>
              <p className="text-muted-foreground">
                Precio unitario, márgenes de ganancia al instante
              </p>
            </div>

            <div className="p-6 bg-card rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-secondary rounded-2xl flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Análisis de Tendencias</h3>
              <p className="text-muted-foreground">
                Visualiza cómo cambian tus precios mes a mes con gráficas interactivas
              </p>
            </div>

            <div className="p-6 bg-card rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-accent rounded-2xl flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Conversión de Moneda</h3>
              <p className="text-muted-foreground">
                Convierte entre Bolivianos y Dólares de forma instantánea
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

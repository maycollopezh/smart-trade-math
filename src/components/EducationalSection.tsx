import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Lightbulb, Calculator } from "lucide-react";

const EducationalSection = () => {
  return (
    <Card className="shadow-medium animate-fade-in">
 
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
  

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent" />
                ¿Cómo se Aplica al Comercio?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-3 text-base">
              <p>
                En el comercio informal, los precios cambian constantemente por diferentes factores:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Temporadas del año</li>
                <li>Disponibilidad de productos</li>
                <li>Competencia en el mercado</li>
                <li>Demanda de los clientes</li>
              </ul>
              <p>
                Al calcular la derivada discreta mes a mes, puedes{" "}
                <span className="font-semibold text-primary">identificar tendencias</span> y tomar decisiones como:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Ajustar precios para maximizar ganancias</li>
                <li>Detectar cuándo comprar más inventario</li>
                <li>Prever cambios en la demanda</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-secondary" />
                Interpretando los Resultados
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-3 text-base">
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 border-l-4 border-primary rounded">
                  <p className="font-semibold text-primary mb-2">Δp {'>'} 0 (Positivo)</p>
                  <p>
                    El precio está <span className="font-semibold">aumentando</span>. 
                    Esto puede indicar mayor demanda o escasez del producto.
                  </p>
                </div>

                <div className="p-4 bg-destructive/10 border-l-4 border-destructive rounded">
                  <p className="font-semibold text-destructive mb-2">Δp {'<'} 0 (Negativo)</p>
                  <p>
                    El precio está <span className="font-semibold">disminuyendo</span>. 
                    Puede ser señal de menor demanda o mayor competencia.
                  </p>
                </div>

                <div className="p-4 bg-muted border-l-4 border-border rounded">
                  <p className="font-semibold mb-2">Δp = 0 (Sin cambio)</p>
                  <p>
                    El precio se mantiene <span className="font-semibold">estable</span>. 
                    El mercado está equilibrado.
                  </p>
                </div>

                <div className="p-4 bg-accent/10 border-l-4 border-accent rounded">
                  <p className="font-semibold text-accent mb-2">% Cambio</p>
                  <p>
                    El porcentaje de cambio te ayuda a <span className="font-semibold">comparar</span>{" "}
                    la magnitud del cambio independientemente del precio inicial.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default EducationalSection;

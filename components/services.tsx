import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  Code2,
  Database,
  Brain
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Desarrollo a Medida",
    description: "Construimos aplicaciones web y móviles que se adaptan exactamente a tus procesos de negocio. Utilizamos arquitecturas modernas y escalables con tecnologías probadas, garantizando soluciones profesionales que crecen junto a tu empresa.",
  },
  {
    icon: Database,
    title: "Arquitectura e Integración",
    description: "Diseñamos e implementamos arquitecturas robustas y APIs modernas que conectan tus sistemas de manera eficiente. Integración con servicios cloud (Azure, AWS) y bases de datos optimizadas para máximo rendimiento y confiabilidad.",
  },
  {
    icon: Brain,
    title: "IA Aplicada al Negocio",
    description: "Incorporamos inteligencia artificial práctica en tus procesos empresariales. Desde agentes conversacionales hasta automatización inteligente y análisis predictivo, transformamos datos en decisiones estratégicas que generan ventaja competitiva.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="min-h-[calc(100vh-4rem)] flex items-center bg-card">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl tracking-tight mb-4 font-bold text-foreground">
            Nuestros Servicios
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Soluciones tecnológicas integrales para llevar tu empresa al siguiente nivel
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className="relative border-border hover:shadow-xl transition-shadow bg-background">
              <CardHeader>
                <div className="mb-4 p-3 bg-primary rounded-xl w-fit">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { 
  Code2, 
  Database, 
  Brain
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Desarrollo de Software a Medida",
    description: "Construcción de aplicaciones web y móviles con arquitecturas modernas. Backend robusto con .NET y NestJS, frontend responsive con React y Vue. Soluciones escalables que crecen con tu negocio.",
  },
  {
    icon: Database,
    title: "Integración y Bases de Datos",
    description: "Diseño e implementación de APIs RESTful y GraphQL. Integración con servicios cloud (Azure, AWS). Arquitectura de bases de datos SQL y NoSQL optimizadas para alto rendimiento.",
  },
  {
    icon: Brain,
    title: "Soluciones de IA Aplicada",
    description: "Implementación de agentes inteligentes con Anthropic y Gemini. Automatización de procesos empresariales con IA. Análisis de datos y machine learning para decisiones estratégicas.",
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
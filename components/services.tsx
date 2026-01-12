import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  Code2,
  Database,
  Brain
} from "lucide-react";
import { Dictionary } from "@/dictionaries/es";

interface ServicesProps {
  dict: Dictionary;
}

export function Services({ dict }: ServicesProps) {
  const services = [
    {
      icon: Code2,
      title: dict.services.items.customDevelopment.title,
      description: dict.services.items.customDevelopment.description,
    },
    {
      icon: Database,
      title: dict.services.items.architecture.title,
      description: dict.services.items.architecture.description,
    },
    {
      icon: Brain,
      title: dict.services.items.ai.title,
      description: dict.services.items.ai.description,
    },
  ];

  return (
    <section id="servicios" className="min-h-[calc(100vh-4rem)] flex items-center bg-card">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl tracking-tight mb-4 font-bold text-foreground">
            {dict.services.title}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            {dict.services.subtitle}
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
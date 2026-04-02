import {
  Code2,
  Database,
  Brain,
  Terminal,
  CloudCheck,
  Cpu
} from "lucide-react";
import { Dictionary } from "@/dictionaries/es";

interface ServicesProps {
  dict: Dictionary;
}

export function Services({ dict }: ServicesProps) {
  const services = [
    {
      icon: Terminal,
      title: dict.services.items.customDevelopment.title,
      description: dict.services.items.customDevelopment.description,
      features: [
        "Enterprise ERP/CRM",
        "Fintech Infrastructure",
        "Real-time Data Viz"
      ],
      color: "text-primary"
    },
    {
      icon: CloudCheck,
      title: dict.services.items.architecture.title,
      description: dict.services.items.architecture.description,
      features: [
        "Multi-cloud Strategy",
        "Kubernetes Management",
        "Edge Computing"
      ],
      color: "text-tertiary"
    },
    {
      icon: Brain,
      title: dict.services.items.ai.title,
      description: dict.services.items.ai.description,
      features: [
        "LLM Orchestration",
        "Computer Vision",
        "Predictive Analytics"
      ],
      color: "text-primary"
    },
  ];

  return (
    <section id="servicios" className="py-40 bg-surface">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <div className="max-w-3xl">
            <span className="text-primary font-headline font-bold uppercase tracking-[0.3em] text-xs block mb-6">
              Pilares de Ejecución
            </span>
            <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
              PRECISIÓN<br/>TÉCNICA.
            </h2>
          </div>
          <p className="max-w-md text-on-surface-variant text-lg font-light leading-relaxed border-l border-primary/30 pl-8">
            {dict.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
          {services.map((service, index) => (
            <div key={index} className="group bg-surface p-12 hover:bg-surface-container-low transition-all duration-500">
              <service.icon className={`h-12 w-12 ${service.color} mb-12 block`} strokeWidth={1.5} />
              <h3 className="font-headline text-3xl font-black uppercase mb-6 tracking-tight">
                {service.title}
              </h3>
              <p className="text-on-surface-variant font-light leading-relaxed mb-12">
                {service.description}
              </p>
              <ul className="space-y-4 mb-4 text-sm font-medium tracking-wide text-on-surface/60">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-3">
                    <span className={`w-1 h-1 rounded-full ${service.color.replace('text-', 'bg-')}`}></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

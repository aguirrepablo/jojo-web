import { Dictionary } from "@/dictionaries/es";
import Image from "next/image";

interface ApproachProps {
  dict: Dictionary;
}

export function Approach({ dict }: ApproachProps) {
  const values = [
    {
      id: "01",
      title: dict.approach.items.team.title,
      description: dict.approach.items.team.description,
    },
    {
      id: "02",
      title: dict.approach.items.practices.title,
      description: dict.approach.items.practices.description,
    },
    {
      id: "03",
      title: dict.approach.items.tech.title,
      description: dict.approach.items.tech.description,
    },
  ];

  return (
    <section id="enfoque" className="py-40 bg-surface-container-lowest border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="flex flex-col lg:flex-row items-center gap-32">
          <div className="lg:w-1/2">
            <span className="text-primary font-headline font-bold uppercase tracking-[0.3em] text-xs block mb-6">
              Quiénes Somos
            </span>
            <h2 className="font-headline text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 leading-[0.9]">
              {dict.approach.title}<br/><span className="text-primary">{dict.approach.title_highlight}.</span>
            </h2>
            
            <div className="space-y-12">
              {values.map((value, index) => (
                <div key={index} className="flex gap-8 group">
                  <span className="font-headline text-5xl font-black text-white/10 group-hover:text-primary transition-colors duration-500">
                    {value.id}
                  </span>
                  <div>
                    <h4 className="font-headline text-2xl font-black uppercase mb-3">
                      {value.title}
                    </h4>
                    <p className="text-on-surface-variant leading-relaxed opacity-80">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-square border border-white/10 shadow-2xl">
              <img 
                alt="Tech Laboratory" 
                className="w-full h-full object-cover grayscale brightness-75 hover:scale-105 transition-transform duration-1000" 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
              
              <div className="absolute bottom-12 left-12 glass-panel p-8 rounded-xl animate-subtle-float">
                <p className="text-[10px] font-headline font-bold uppercase tracking-[0.3em] text-primary mb-3">
                  {dict.approach.kpi?.label || "KPI del Sistema"}
                </p>
                <p className="text-3xl font-black font-headline tracking-tighter uppercase">
                  {dict.approach.kpi?.value || "98.4% EFICIENCIA"}
                </p>
                <p className="text-[10px] text-on-surface/40 uppercase mt-2">
                  {dict.approach.kpi?.description || "Rendimiento Arquitectónico Verificado"}
                </p>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-12 -right-12 w-48 h-48 border border-white/5 rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-12 -left-12 w-32 h-32 border border-primary/10 rounded-full pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

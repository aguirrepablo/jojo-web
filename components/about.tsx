import { Dictionary } from "@/dictionaries/es";

interface AboutProps {
  dict: Dictionary;
}

export function About({ dict }: AboutProps) {
  return (
    <section id="quienes-somos" className="py-40 bg-surface-container-lowest border-t border-white/5 relative overflow-hidden mesh-grid">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="container mx-auto px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12">
            <div className="max-w-3xl">
                <span className="text-primary font-headline font-bold uppercase tracking-[0.3em] text-xs block mb-6">
                    Manifiesto Técnico
                </span>
                <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                    EXCELENCIA EN<br/>INGENIERÍA.
                </h2>
            </div>
            <div className="hidden lg:block w-32 h-px bg-primary/30 mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8">
                <p className="text-2xl md:text-4xl text-on-surface font-light leading-tight tracking-tight mb-12">
                    {dict.about.description}
                </p>
            </div>
            
            <div className="lg:col-span-4 flex flex-col gap-12">
                <div className="glass-panel p-8 rounded-xl border-l-2 border-primary">
                    <p className="text-[10px] font-headline font-bold uppercase tracking-[0.3em] text-primary mb-4">Filosofía Central</p>
                    <p className="text-on-surface/80 text-sm leading-relaxed italic">
                        "No solo escribimos código; arquitecturamos sistemas resilientes que potencian a las empresas para moverse a la velocidad del pensamiento."
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

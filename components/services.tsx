import Image from "next/image";
import { Terminal, Cloud, Brain } from "lucide-react";
import { Dictionary } from "@/dictionaries/es";
import servicesImg from "@/public/assets/illustrations/services.jpg";

interface ServicesProps {
  dict: Dictionary;
}

export function Services({ dict }: ServicesProps) {
  const items = [
    { icon: Terminal, ...dict.services.items.customDevelopment },
    { icon: Cloud, ...dict.services.items.architecture },
    { icon: Brain, ...dict.services.items.ai },
  ];

  return (
    <section id="servicios" className="relative w-full scroll-mt-28 overflow-hidden">
      <Image
        src={servicesImg}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 scrim-panel" />

      <div className="section-editorial relative z-10 mx-auto max-w-wide px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="display text-[2rem] leading-tight text-white sm:text-[2.75rem]">
            {dict.services.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/75">
            {dict.services.subtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {items.map((it, i) => (
            <div key={i} className="glass-dark rounded-xl p-6">
              <it.icon size={22} strokeWidth={1.5} className="text-white/90" />
              <h3 className="mt-5 font-sans text-[17px] font-medium tracking-[-0.01em] text-white">
                {it.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/70">
                {it.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

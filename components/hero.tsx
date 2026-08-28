"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { Dictionary } from "@/dictionaries/es";
import { heroPhaseFor, type HeroPhase } from "@/lib/hero-phase";

// atardecer = el arte base (hero.jpg); ver docs/new_desing/BRIEF_HERO_HORAS.md
import heroAtardecer from "@/public/assets/illustrations/hero.jpg";
import heroNoche from "@/public/assets/illustrations/hero-noche.jpg";
import heroMadrugada from "@/public/assets/illustrations/hero-madrugada.jpg";
import heroManana from "@/public/assets/illustrations/hero-manana.jpg";
import heroMediodia from "@/public/assets/illustrations/hero-mediodia.jpg";
import heroTarde from "@/public/assets/illustrations/hero-tarde.jpg";

const PHASE_IMG: Record<HeroPhase, typeof heroAtardecer> = {
  noche: heroNoche,
  madrugada: heroMadrugada,
  manana: heroManana,
  mediodia: heroMediodia,
  tarde: heroTarde,
  atardecer: heroAtardecer,
};

interface HeroProps {
  onOpenChat: () => void;
  onOpenContact: () => void;
  dict: Dictionary;
}

export function Hero({ onOpenContact, dict }: HeroProps) {
  // "atardecer" = el arte actual; se corrige a la hora real de Córdoba al montar.
  const [phase, setPhase] = useState<HeroPhase>("atardecer");

  useEffect(() => {
    const update = () => setPhase(heroPhaseFor());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      <Image
        key={phase}
        src={PHASE_IMG[phase]}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 scrim-hero" />

      <div className="relative z-10 flex min-h-screen items-end">
        <div className="w-full px-4 pb-8 sm:px-8 sm:pb-12">
          <div className="glass-dark max-w-[460px] rounded-xl p-6 sm:p-7">
            <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-white/65">
              {dict.hero.badge}
            </span>

            <h1 className="display display-xl mt-3 text-[2.4rem] leading-[1.05] text-white sm:text-[3rem]">
              <span className="block lowercase first-letter:uppercase">{dict.hero.title_top}</span>
              <span className="block font-normal lowercase text-coral first-letter:uppercase">
                {dict.hero.title_bottom}
              </span>
            </h1>

            <p className="mt-4 text-[15px] leading-relaxed text-white/80">
              {dict.hero.subtitle.split("\n")[0]}
            </p>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onOpenContact}
                className="btn border-[0.8px] border-coral bg-transparent text-coral transition-colors hover:bg-white/5"
              >
                {dict.hero.cta}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 right-6 z-10 hidden items-center gap-2 sm:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/55">
          {dict.hero.scroll}
        </span>
        <ArrowDown size={12} className="text-white/55" />
      </div>
    </section>
  );
}

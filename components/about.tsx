import Image from "next/image";
import { Dictionary } from "@/dictionaries/es";
import aboutImg from "@/public/assets/illustrations/about.jpg";

interface AboutProps {
  dict: Dictionary;
}

export function About({ dict }: AboutProps) {
  return (
    <section id="quienes-somos" className="scroll-mt-28 bg-parchment">
      <div className="rule-triple" />
      <div className="section-editorial mx-auto max-w-content px-6 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="frame">
            <div className="panel relative aspect-square overflow-hidden">
              <Image
                src={aboutImg}
                alt="El taller de JOJO al anochecer, con las Sierras de Córdoba en la ventana"
                fill
                placeholder="blur"
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <span className="font-mono text-caption uppercase tracking-[0.16em] text-coral-deep">
              {dict.about.title}
            </span>

            <p className="mt-6 text-[17px] leading-relaxed text-ash">
              {dict.about.description}
            </p>

            <p className="display mt-10 text-[1.75rem] leading-[1.15] text-graphite sm:text-[2rem]">
              {dict.about.statement}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

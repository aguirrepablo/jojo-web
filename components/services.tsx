"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Dictionary } from "@/dictionaries/es";
import { revealUp, parallax, energyFloat, spin, pulse, blink } from "@/lib/animations";
import { DevelopmentIcon, ArchitectureIcon, AiIcon } from "./service-icons";

interface ServicesProps {
  dict: Dictionary;
  onOpenContact: () => void;
}

export function Services({ dict, onOpenContact }: ServicesProps) {
  const scope = useRef<HTMLElement>(null);

  const items = [
    { Icon: DevelopmentIcon, ...dict.services.items.customDevelopment },
    { Icon: ArchitectureIcon, ...dict.services.items.architecture },
    { Icon: AiIcon, ...dict.services.items.ai },
  ];

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);
      revealUp(q("[data-head]"), { trigger: scope.current });
      q("[data-block]").forEach((block) => {
        revealUp(block.querySelectorAll("[data-rise]"), { trigger: block });
        const blob = block.querySelector(".blob");
        if (blob) parallax(blob, { amount: 20, trigger: block });
      });
      energyFloat(q(".service-icon"));

      // Animacion por parte (SVG en capas).
      q(".ai-orbit").forEach((el, i) =>
        spin(el, {
          duration: 15 + i * 5,
          direction: i % 2 ? -1 : 1,
          svgOrigin: "300 240",
        }),
      );
      pulse(q(".ai-core"), { svgOrigin: "300 240", scale: 1.05, duration: 3 });
      pulse(q(".arch-hub"), { svgOrigin: "300 240", scale: 1.05, duration: 3.2 });
      pulse(q(".arch-node"), { scale: 1.12, duration: 2.6, stagger: 0.4 });
      blink(q(".dev-caret"), { min: 0.5, duration: 1.1 });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="servicios"
      className="section-y scroll-mt-24"
    >
      <div className="mx-auto max-w-wide px-4 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <span data-head className="eyebrow">
            {dict.header.services}
          </span>
          <h2 data-head className="display mt-6 text-[clamp(2.25rem,6vw,4.75rem)]">
            {dict.services.title}
          </h2>
          <p data-head className="mt-5 text-body-lg text-surface-50">
            {dict.services.subtitle}
          </p>
        </div>

        <div className="mt-20 flex flex-col">
          {items.map((it, i) => (
            <div
              key={i}
              data-block
              className={`grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 ${
                i > 0 ? "hairline-t" : ""
              }`}
            >
              <div
                data-rise
                className="relative order-1 aspect-[4/3] lg:order-none"
              >
                <span
                  aria-hidden
                  className="blob left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2"
                />
                <it.Icon className="service-icon relative h-full w-full overflow-visible" />
              </div>

              <div className="order-2 lg:order-none">
                <span data-rise className="eyebrow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  data-rise
                  className="display mt-6 text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1]"
                >
                  {it.title}
                </h3>
                <p data-rise className="mt-4 max-w-md text-body text-surface-50">
                  {it.description}
                </p>
                <button
                  data-rise
                  onClick={onOpenContact}
                  className="pill pill-sm mt-8"
                >
                  {dict.common.explore}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Dictionary } from "@/dictionaries/es";
import { revealUp } from "@/lib/animations";

interface ServicesProps {
  dict: Dictionary;
}

export function Services({ dict }: ServicesProps) {
  const scope = useRef<HTMLElement>(null);

  const items = [
    dict.services.items.customDevelopment,
    dict.services.items.architecture,
    dict.services.items.ai,
  ];

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);
      revealUp(q("[data-head]"), { trigger: scope.current });
      q("[data-block]").forEach((block) => {
        revealUp(block.querySelectorAll("[data-rise]"), { trigger: block });
      });
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

        <div className="hairline-b mt-20 flex flex-col">
          {items.map((it, i) => (
            <div
              key={i}
              data-block
              className="hairline-t grid gap-6 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16"
            >
              <span
                data-rise
                className="display text-[clamp(2.5rem,5vw,4rem)] leading-none text-surface-50 lg:col-span-2"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3
                data-rise
                className="display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] lg:col-span-4"
              >
                {it.title}
              </h3>

              <div className="lg:col-span-6">
                <p data-rise className="max-w-xl text-body text-surface-50">
                  {it.description}
                </p>
                <p data-rise className="mt-5 text-body-sm text-surface-cream/80">
                  {it.tags.join(" · ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

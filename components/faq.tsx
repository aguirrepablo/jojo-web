"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Minus, Plus } from "lucide-react";
import { Dictionary } from "@/dictionaries/es";
import { revealUp } from "@/lib/animations";

interface FaqProps {
  dict: Dictionary;
}

export function Faq({ dict }: FaqProps) {
  const scope = useRef<HTMLElement>(null);
  // primer item abierto por defecto: da contexto y evita un bloque vacio.
  const [open, setOpen] = useState<number | null>(0);

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);
      revealUp(q("[data-rise]"), { trigger: scope.current });
      q("[data-faq-item]").forEach((row) =>
        revealUp(row, { trigger: row, y: 24 }),
      );
    },
    { scope },
  );

  return (
    <section ref={scope} id="faq" className="section-y scroll-mt-24">
      <div className="mx-auto max-w-content px-4 sm:px-8">
        <span data-rise className="eyebrow">
          {dict.faq.eyebrow}
        </span>
        <h2 data-rise className="display mt-6 text-[clamp(2.25rem,6vw,4.75rem)]">
          {dict.faq.title}
        </h2>
        <p data-rise className="mt-5 text-body-lg text-surface-50">
          {dict.faq.subtitle}
        </p>

        <ul className="mt-16">
          {dict.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li
                key={i}
                data-faq-item
                className={i > 0 ? "hairline-t" : ""}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-trigger-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-6 py-7 text-left"
                  >
                    <span className="text-subheading text-surface-cream">
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className="mt-1 shrink-0 text-coral-bright"
                    >
                      {isOpen ? <Minus size={22} /> : <Plus size={22} />}
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 text-body text-surface-50">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Dictionary } from "@/dictionaries/es";
import { revealUp, countUp } from "@/lib/animations";

interface ApproachProps {
  dict: Dictionary;
  onOpenContact: () => void;
}

export function Approach({ dict, onOpenContact }: ApproachProps) {
  const scope = useRef<HTMLElement>(null);
  const kpiRef = useRef<HTMLParagraphElement>(null);

  const items = [
    dict.approach.items.team,
    dict.approach.items.practices,
    dict.approach.items.ai,
    dict.approach.items.tech,
  ];

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);
      revealUp(q("[data-rise]"), { trigger: scope.current });
      q("[data-principle]").forEach((row) =>
        revealUp(row, { trigger: row, y: 24 }),
      );
      countUp(kpiRef.current, dict.approach.kpi.value, {
        trigger: kpiRef.current,
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="enfoque"
      className="section-y scroll-mt-24 overflow-hidden"
    >
      <div className="mx-auto max-w-content px-4 sm:px-8">
        <span data-rise className="eyebrow">
          {dict.header.focus}
        </span>
        <h2 data-rise className="display mt-6 text-[clamp(2.25rem,6vw,4.75rem)]">
          {dict.approach.title}{" "}
          <span className="text-coral-bright">{dict.approach.title_highlight}</span>
        </h2>
        <p data-rise className="mt-5 text-body-lg text-surface-50">
          {dict.approach.subtitle}
        </p>

        {/* KPI enorme */}
        <div data-rise className="mt-20">
          <span className="text-caption uppercase tracking-[0.2em] text-surface-50">
            {dict.approach.kpi.label}
          </span>
          <p
            ref={kpiRef}
            className="display mt-3 text-[clamp(3rem,11vw,8rem)] leading-[0.95]"
          >
            {dict.approach.kpi.value}
          </p>
          <span className="mt-3 block text-caption uppercase tracking-[0.14em] text-surface-50">
            {dict.approach.kpi.description}
          </span>
        </div>

        {/* Principios */}
        <ul className="mt-20">
          {items.map((it, i) => (
            <li
              key={i}
              data-principle
              className={`flex flex-col gap-2 py-8 sm:flex-row sm:gap-12 ${
                i > 0 ? "hairline-t" : ""
              }`}
            >
              <h3 className="shrink-0 text-subheading text-surface-cream sm:w-64">
                {it.title}
              </h3>
              <p className="max-w-xl text-body text-surface-50">
                {it.description}
              </p>
            </li>
          ))}
        </ul>

        <button onClick={onOpenContact} className="pill pill-cta mt-16">
          {dict.hero.cta}
        </button>
      </div>
    </section>
  );
}

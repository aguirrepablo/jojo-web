"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Dictionary } from "@/dictionaries/es";
import approachImg from "@/public/assets/illustrations/approach.jpg";

interface ApproachProps {
  dict: Dictionary;
  onOpenContact: () => void;
}

export function Approach({ dict, onOpenContact }: ApproachProps) {
  const items = [
    dict.approach.items.team,
    dict.approach.items.practices,
    dict.approach.items.ai,
    dict.approach.items.tech,
  ];

  return (
    <section id="enfoque" className="scroll-mt-28 bg-parchment">
        <div className="rule-triple" />
        <div className="section-editorial mx-auto max-w-content px-6 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            {/* Motivo — "la hoguera" */}
            <div className="mx-auto mb-8 h-[clamp(96px,12vw,128px)] w-[clamp(96px,12vw,128px)] overflow-hidden rounded-lg border-[0.8px] border-mist">
              <Image
                src={approachImg}
                alt=""
                placeholder="blur"
                sizes="128px"
                className="h-full w-full object-cover object-[52%_74%]"
              />
            </div>

            <h2 className="display text-[2rem] leading-tight text-graphite sm:text-[2.75rem]">
              {dict.approach.title}{" "}
              <span className="text-coral-deep">{dict.approach.title_highlight}</span>
            </h2>
            <p className="mt-5 text-[15px] text-ash">{dict.approach.subtitle}</p>
          </div>

          <div className="frame mt-14">
            {/* KPI */}
            <div className="panel flex flex-col gap-1 p-6 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <span className="font-mono text-caption uppercase tracking-[0.16em] text-ash">
                  {dict.approach.kpi.label}
                </span>
                <p className="display mt-1 text-[1.75rem] text-graphite">
                  {dict.approach.kpi.value}
                </p>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ash">
                {dict.approach.kpi.description}
              </span>
            </div>

            {/* Lista de principios */}
            <ul className="mt-4 overflow-hidden rounded-xl bg-paper shadow-[var(--shadow-diagram)]">
              {items.map((it, i) => (
                <li
                  key={i}
                  className={`flex items-start justify-between gap-6 p-6 ${i > 0 ? "hairline-t" : ""}`}
                >
                  <div>
                    <h3 className="font-sans text-[16px] font-medium tracking-[-0.01em] text-graphite">
                      {it.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-ash">
                      {it.description}
                    </p>
                  </div>
                  <button
                    onClick={onOpenContact}
                    aria-label={dict.hero.cta}
                    className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-mist text-charcoal transition-colors hover:border-coral hover:text-coral-deep"
                  >
                    <ArrowRight size={13} strokeWidth={2} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-center">
              <button onClick={onOpenContact} className="link-ghost">
                {dict.hero.cta}
                <span className="grid h-[18px] w-[18px] place-items-center rounded-full border border-fog">
                  <ArrowRight size={11} strokeWidth={2} />
                </span>
              </button>
            </div>
          </div>
        </div>
    </section>
  );
}

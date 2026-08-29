"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Dictionary } from "@/dictionaries/es";
import { revealUp, revealLines, parallax } from "@/lib/animations";

interface AboutProps {
  dict: Dictionary;
}

export function About({ dict }: AboutProps) {
  const scope = useRef<HTMLElement>(null);

  // Corta el statement en clausulas (tras ":" o ".") para el reveal por lineas.
  const statementLines = dict.about.statement
    .split(/(?<=[:.])\s+/)
    .filter(Boolean);

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);
      revealUp(q("[data-rise]"), { trigger: scope.current });
      revealLines(scope.current, { trigger: q("[data-statement]")[0] });
      parallax(q(".blob")[0], { amount: 18 });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="quienes-somos"
      className="section-y relative scroll-mt-24 overflow-hidden"
    >
      <span
        aria-hidden
        className="blob blob-cream right-[-12%] top-[20%] h-[50vmin] w-[50vmin]"
      />

      <div className="relative z-10 mx-auto max-w-content px-4 sm:px-8">
        <span data-rise className="eyebrow">
          {dict.about.title}
        </span>

        <p
          data-rise
          className="mt-8 max-w-2xl text-body-lg text-surface-50"
        >
          {dict.about.description}
        </p>

        <div data-statement className="mt-16 max-w-4xl">
          {statementLines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span
                data-line
                className="display block text-[clamp(1.9rem,5vw,3.4rem)] leading-[1.1]"
              >
                {line}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

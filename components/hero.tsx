"use client";

import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Dictionary } from "@/dictionaries/es";
import { revealUp, revealLines, parallax, prefersReducedMotion } from "@/lib/animations";

interface HeroProps {
  onOpenChat: () => void;
  onOpenContact: () => void;
  dict: Dictionary;
}

export function Hero({ onOpenContact, dict }: HeroProps) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);
      revealLines(scope.current, { delay: 0.15 });
      revealUp(q("[data-rise]"), { delay: 0.5, y: 24 });
      const blobs = q(".blob");
      parallax(blobs[0], { amount: 22 });
      parallax(blobs[1], { amount: -14 });

      if (!prefersReducedMotion()) {
        gsap.to(q("[data-scrollcue]"), {
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { start: "top top", end: "+=220", scrub: true },
        });
      }
    },
    { scope },
  );

  const goToAbout = () => {
    const el = document.getElementById("quienes-somos");
    if (el) window.scrollTo({ top: el.offsetTop - 96, behavior: "smooth" });
  };

  return (
    <section
      ref={scope}
      id="home"
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-4 pb-16 pt-28 sm:px-8"
    >
      <span aria-hidden className="blob left-[-10%] top-[8%] h-[60vmin] w-[60vmin]" />
      <span
        aria-hidden
        className="blob blob-cream bottom-[6%] right-[-8%] h-[46vmin] w-[46vmin]"
      />

      <div className="relative z-10 mx-auto w-full max-w-wide">
        <span data-rise className="eyebrow">
          {dict.hero.badge}
        </span>

        <h1 className="display mt-8 text-[clamp(3rem,13vw,9.5rem)]">
          {/* Texto real del H1 para buscadores / lectores de pantalla; los
              renglones visuales van aria-hidden para no leerlo dos veces. */}
          <span className="sr-only">{dict.hero.h1}</span>
          <span aria-hidden className="-mb-[0.2em] block overflow-hidden">
            <span
              data-line
              className="block pb-[0.2em] lowercase first-letter:uppercase"
            >
              {dict.hero.title_top}
            </span>
          </span>
          <span aria-hidden className="-mb-[0.2em] block overflow-hidden">
            <span
              data-line
              className="block pb-[0.2em] lowercase text-coral-bright first-letter:uppercase"
            >
              {dict.hero.title_bottom}
            </span>
          </span>
        </h1>

        <p
          data-rise
          className="mt-8 max-w-xl text-body-lg text-surface-50"
        >
          {dict.hero.subtitle.split("\n")[0]}
        </p>

        <div data-rise className="mt-10 flex flex-wrap items-center gap-4">
          <button onClick={onOpenContact} className="pill pill-cta">
            {dict.hero.cta}
          </button>
          <button onClick={goToAbout} className="pill">
            {dict.common.explore}
          </button>
        </div>
      </div>

      <div
        data-scrollcue
        className="pointer-events-none absolute inset-x-0 bottom-8 z-10 mx-auto flex max-w-wide items-center gap-2 px-4 text-surface-50 sm:px-8"
      >
        <span className="text-caption uppercase tracking-[0.25em]">
          {dict.hero.scroll}
        </span>
        <ArrowDown size={13} />
      </div>
    </section>
  );
}

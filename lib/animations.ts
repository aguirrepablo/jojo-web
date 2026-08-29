import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** true si el usuario pidio menos movimiento (SO / navegador). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type RevealOpts = {
  /** elemento (o selector) que dispara el reveal al entrar en viewport.
   *  Si se omite, la animacion corre de inmediato (uso en el hero). */
  trigger?: gsap.DOMTarget;
  start?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
};

/** Sube + fade de uno o varios elementos. Escalona si son varios. */
export function revealUp(targets: gsap.TweenTarget, opts: RevealOpts = {}) {
  const {
    trigger,
    start = "top 85%",
    y = 40,
    stagger = 0.08,
    duration = 0.9,
    delay = 0,
  } = opts;

  if (prefersReducedMotion()) {
    gsap.set(targets, { autoAlpha: 1, y: 0 });
    return;
  }

  return gsap.from(targets, {
    autoAlpha: 0,
    y,
    duration,
    stagger,
    delay,
    ease: "power3.out",
    scrollTrigger: trigger ? { trigger, start, once: true } : undefined,
  });
}

/** Revela linea por linea. `scopeEl` contiene elementos con [data-line];
 *  cada [data-line] debe ir dentro de un wrapper con overflow:hidden. */
export function revealLines(
  scopeEl: Element | null,
  opts: { trigger?: gsap.DOMTarget; start?: string; delay?: number } = {},
) {
  if (!scopeEl) return;
  const lines = scopeEl.querySelectorAll<HTMLElement>("[data-line]");
  if (!lines.length) return;

  if (prefersReducedMotion()) {
    gsap.set(lines, { yPercent: 0, autoAlpha: 1 });
    return;
  }

  return gsap.from(lines, {
    yPercent: 115,
    autoAlpha: 0,
    duration: 1,
    stagger: 0.12,
    delay: opts.delay ?? 0,
    ease: "power4.out",
    scrollTrigger: opts.trigger
      ? { trigger: opts.trigger, start: opts.start ?? "top 80%", once: true }
      : undefined,
  });
}

/** Flotacion "con energia" para los iconos de servicios (guia-animaciones-energia,
 *  Opcion A): levitacion + micro-escala + glow coral pulsante, en loop infinito.
 *  Si son varios targets, los desfasa para que no se muevan sincronizados. */
export function energyFloat(
  targets: gsap.TweenTarget,
  opts: { amount?: number; duration?: number } = {},
) {
  if (prefersReducedMotion()) return;
  const { amount = 8, duration = 3.2 } = opts;

  const glowLow = "drop-shadow(0 0 14px rgba(255, 115, 85, 0.22))";
  const glowHigh = "drop-shadow(0 0 26px rgba(255, 115, 85, 0.6))";

  gsap.set(targets, { filter: glowLow, willChange: "transform, filter" });

  return gsap.to(targets, {
    y: -amount,
    scale: 1.015,
    filter: glowHigh,
    duration,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    stagger: { each: 0.8, from: "start" },
  });
}

/** Rotacion continua alrededor de un punto. Para orbitas / anillos SVG.
 *  Pasar `svgOrigin` ("cx cy" en unidades del viewBox) para el centro exacto;
 *  si se omite, gira sobre el centro de su bounding box. */
export function spin(
  targets: gsap.TweenTarget,
  opts: { duration?: number; direction?: 1 | -1; svgOrigin?: string } = {},
) {
  if (prefersReducedMotion()) return;
  const { duration = 12, direction = 1, svgOrigin } = opts;
  return gsap.to(targets, {
    rotation: 360 * direction,
    duration,
    ease: "none",
    repeat: -1,
    ...(svgOrigin ? { svgOrigin } : { transformOrigin: "50% 50%" }),
  });
}

/** Pulso de escala suave, en loop. Para nucleos y nodos. */
export function pulse(
  targets: gsap.TweenTarget,
  opts: {
    scale?: number;
    duration?: number;
    svgOrigin?: string;
    stagger?: number;
  } = {},
) {
  if (prefersReducedMotion()) return;
  const { scale = 1.08, duration = 2.8, svgOrigin, stagger = 0 } = opts;
  return gsap.to(targets, {
    scale,
    duration,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    stagger,
    ...(svgOrigin ? { svgOrigin } : { transformOrigin: "50% 50%" }),
  });
}

/** Parpadeo de opacidad (cursor de codigo). */
export function blink(
  targets: gsap.TweenTarget,
  opts: { min?: number; duration?: number } = {},
) {
  if (prefersReducedMotion()) return;
  const { min = 0.25, duration = 0.75 } = opts;
  return gsap.to(targets, {
    opacity: min,
    duration,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true,
  });
}

/** Parallax vertical sutil ligado al scroll. */
export function parallax(
  el: Element | null,
  opts: { amount?: number; trigger?: gsap.DOMTarget } = {},
) {
  if (!el || prefersReducedMotion()) return;
  const { amount = 16, trigger } = opts;
  return gsap.to(el, {
    yPercent: amount,
    ease: "none",
    scrollTrigger: {
      trigger: trigger ?? el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

/** Cuenta desde 0 hasta el numero que aparece en `rawValue`, preservando
 *  el resto del texto (ej: "98.4% EFICIENCIA"). */
export function countUp(
  el: HTMLElement | null,
  rawValue: string,
  opts: { trigger?: gsap.DOMTarget; start?: string; duration?: number } = {},
) {
  if (!el) return;
  const raw = String(rawValue);
  const match = raw.match(/[\d]+(?:[.,][\d]+)?/);
  if (!match) {
    el.textContent = raw;
    return;
  }
  const numStr = match[0];
  const target = parseFloat(numStr.replace(",", "."));
  const decimals = (numStr.split(/[.,]/)[1] || "").length;
  const render = (v: number) => raw.replace(numStr, v.toFixed(decimals));

  if (prefersReducedMotion()) {
    el.textContent = raw;
    return;
  }

  const state = { v: 0 };
  el.textContent = render(0);
  return gsap.to(state, {
    v: target,
    duration: opts.duration ?? 2,
    ease: "power2.out",
    onUpdate: () => {
      el.textContent = render(state.v);
    },
    scrollTrigger: {
      trigger: opts.trigger ?? el,
      start: opts.start ?? "top 85%",
      once: true,
    },
  });
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Registra ScrollTrigger una sola vez y refresca los calculos cuando cambia
 * la ruta (toggle de idioma) o terminan de cargar las fuentes, para que los
 * triggers no queden desalineados. No agrega DOM: deja pasar children tal cual
 * (evita romper la nav `fixed` y el modal).
 */
export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();

    // fuentes: el reflow al cargar DM Sans mueve los triggers
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh);
    }
    // tras montar / cambiar de idioma
    const id = window.setTimeout(refresh, 200);

    return () => window.clearTimeout(id);
  }, [pathname]);

  return <>{children}</>;
}

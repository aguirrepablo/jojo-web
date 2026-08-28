export type HeroPhase =
  | "noche"
  | "madrugada"
  | "manana"
  | "mediodia"
  | "tarde"
  | "atardecer";

/**
 * Fase del hero según la hora de Córdoba (misma zona horaria que el reloj de la nav).
 * Franjas en docs/new_desing/BRIEF_HERO_HORAS.md §5 — ajustables acá.
 */
export function heroPhaseFor(date: Date = new Date()): HeroPhase {
  const hour =
    Number(
      new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        hour12: false,
        timeZone: "America/Argentina/Cordoba",
      }).format(date)
    ) % 24;

  if (hour >= 21 || hour < 6) return "noche";
  if (hour < 7) return "madrugada";
  if (hour < 11) return "manana";
  if (hour < 15) return "mediodia";
  if (hour < 18) return "tarde";
  return "atardecer";
}

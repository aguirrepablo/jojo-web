import { notFound } from "next/navigation";

/**
 * Catch-all: cualquier ruta bajo `/es/*` o `/en/*` que no exista cae acá y
 * dispara `notFound()`, que renderiza `app/[lang]/not-found.tsx` con el layout
 * de idioma. Sin esto, las URLs no encontradas usan el 404 interno de Next
 * (este proyecto no tiene `app/layout.tsx` ni `app/not-found.tsx` en la raíz).
 */
export default function CatchAllNotFound() {
  notFound();
}

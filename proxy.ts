import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Hasta octubre de 2026 el sitio vivía bajo `/es` y `/en`. Ahora es solo en
// español y sin prefijo: las URLs viejas redirigen con 301 a su equivalente
// para no perder lo que Google ya indexó (`/es/paginas-web` -> `/paginas-web`).
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = url.pathname.replace(/^\/(es|en)(?=\/|$)/, "") || "/";
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ['/es', '/es/:path*', '/en', '/en/:path*'],
};

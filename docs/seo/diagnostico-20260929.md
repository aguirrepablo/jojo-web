# SEO jojo.ar — Plan de trabajo

Diagnóstico técnico del sitio (Next.js, App Router, i18n `/es` + `/en`, detrás de Cloudflare).
Host canónico: **`https://jojo.ar`** (sin www).

## Estado

| # | Tarea | Prioridad | Estado |
|---|---|---|---|
| 0 | Redirect `www.jojo.ar` → `jojo.ar` (Cloudflare) | Crítica | ✅ Hecho |
| 1 | Matcher del middleware excluye estáticos | Crítica | ✅ Código (8b6dd1a) |
| 2 | Manifest accesible | Crítica | ✅ Código (8b6dd1a) |
| 3 | `og:image` en PNG (WhatsApp / redes) | Crítica | ✅ Código (8b6dd1a) |
| 4 | Metadata en `<head>` (`htmlLimitedBots`) | Importante | ✅ Código (8b6dd1a) |
| 5 | Redirect `/` → `/es` permanente | Importante | ❌ Descartada (ver nota) |
| 6 | Selector de idioma con links reales | Importante | ✅ Código (8b6dd1a) |
| 7 | Fixes de JSON-LD | Importante | 🟡 Falta `email` |
| 8 | H1 visible con keyword | Importante | ⬜ |
| 9 | Íconos: sacar duplicado y agregar apple-touch-icon | Menor | ✅ Código (8b6dd1a) |
| 10 | Limpieza: `meta keywords` | Menor | ✅ Código (8b6dd1a) |
| 11 | Search Console | Post-deploy | ⬜ |
| 12 | Contenido: páginas de servicio, casos y local | Estrategia | ⬜ |

"✅ Código" = implementado y probado en local con `next start`; falta verificar post-deploy.

Orden de ejecución: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → deploy → 11 → 12.
La tarea 1 va primero porque, si no se hace, la og.png de la tarea 3 también va a dar 404.

---

## 0. Redirect www → jojo.ar ✅

Hecho en Cloudflare y verificado:
- `https://www.jojo.ar/` termina en `https://jojo.ar/es`
- `https://www.jojo.ar/en` termina en `https://jojo.ar/en` (se conserva la ruta)
- No hay loop.

Código de estado confirmado: **301** (inicialmente era 307, se corrigió en Cloudflare).

```bash
curl -sI https://www.jojo.ar/ | findstr /i "HTTP location"
```

El código ya declaraba `jojo.ar` en canonical, sitemap, robots, hreflang y schema, así que no hace falta cambiarlo.

---

## 1. Matcher del middleware

**Problema:** el middleware de idioma intercepta archivos estáticos y les antepone `/es`:
- `/manifest.webmanifest` → `/es/manifest.webmanifest` → **404**
- `/og.png` → `/es/og.png` → **404**

`og.svg`, `favicon.ico` y `/assets/*` sí funcionan porque están excluidos de forma puntual.

**Archivo:** `middleware.ts` (Next ≤15) o `proxy.ts` (Next 16), en la raíz del proyecto o en `src/`.

**Cambio:**

```ts
export const config = {
  // Excluye api, internos de Next y cualquier archivo con extensión
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

> Antes de pisar el matcher actual, revisá si excluye alguna ruta a propósito y mantenela.

**Verificación (post-deploy):**
- [ ] `https://jojo.ar/manifest.webmanifest` no redirige a `/es/...`
- [ ] `/robots.txt` y `/sitemap.xml` siguen respondiendo 200
- [ ] `/es` y `/en` siguen funcionando
- [ ] `https://jojo.ar/` sigue redirigiendo a `/es`

---

## 2. Manifest accesible

**Problema:** el HTML declara `<link rel="manifest" href="/manifest.webmanifest">` y la URL da 404.

**Paso 1:** después de la tarea 1, probar la URL. Si da 200, esta tarea está cerrada.

**Paso 2 (si sigue en 404):** el archivo no existe. Crearlo en la raíz de `app/`, **no** dentro de `app/[lang]/`:

```ts
// app/manifest.ts
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'JOJO',
    short_name: 'JOJO',
    start_url: '/es',
    display: 'standalone',
    background_color: '#0f0f0f', // ajustar a la paleta del sitio
    theme_color: '#0f0f0f',
    icons: [{ src: '/favicon.ico', sizes: '256x256', type: 'image/x-icon' }],
  };
}
```

La otra opción, si no se necesita el manifest, es sacar `manifest` de la metadata.

- [ ] `https://jojo.ar/manifest.webmanifest` → 200

---

## 3. og:image en PNG

**Problema:** `og:image` y `twitter:image` apuntan a `https://jojo.ar/og.svg`. WhatsApp, Facebook, LinkedIn y X **no aceptan SVG**, y por eso el link compartido sale sin imagen.

**Pasos:**
1. Exportar `og.svg` a PNG de **1200×630**, de **menos de 300 KB**.
2. Guardarlo en `public/og.png`.
3. Actualizar la metadata en `app/[lang]/`:

```ts
metadataBase: new URL('https://jojo.ar'),
openGraph: {
  // ...lo existente
  images: [{ url: '/og.png', width: 1200, height: 630, alt: 'JOJO' }],
},
twitter: {
  card: 'summary_large_image',
  images: ['/og.png'],
},
```

4. Actualizar también `image` en el JSON-LD (tarea 7).

**Verificación:**
- [ ] `https://jojo.ar/og.png` → 200, `image/png`, sin redirigir a `/es/og.png`
- [ ] `og:image` en el HTML = `https://jojo.ar/og.png`
- [ ] El Meta Sharing Debugger (developers.facebook.com/tools/debug) muestra la imagen
- [ ] En WhatsApp, compartiendo `https://jojo.ar/?v=2` (saltea la caché), aparece la imagen

---

## 4. Metadata en el `<head>`

**Problema:** title, description, canonical, hreflang, OG e íconos se renderizan **al final del `<body>`** (*streaming metadata* de Next 15.2+). Los crawlers que Next no reconoce como bots pueden no leerla. Un síntoma probable: Google muestra "JOJO" como título y un snippet del FAQ.

**Nota:** con user-agent de WhatsApp la metadata ya salía en `<head>` (está en la lista por defecto de Next); el que la recibía en el body era Googlebot. Las previews de WhatsApp las arregla la tarea 3, no esta.

**Archivo:** `next.config.ts`

```ts
const nextConfig = {
  // ...config existente
  htmlLimitedBots: /.*/, // metadata bloqueante en <head> para todos
};
```

**Verificación:**
- [ ] `<title>`, `canonical` y `og:*` aparecen antes de `</head>`:
```bash
  curl -s -A "WhatsApp/2.23.20.0" https://jojo.ar/es | findstr /i "og:image"
  curl -s -A "Googlebot" https://jojo.ar/es | findstr /i "<title>"
```

---

## 5. Redirect `/` → `/es` permanente

**Descartada.** El proxy negocia el idioma por `Accept-Language` (`/` → `/en` para navegadores en inglés). Un redirect permanente que varía por usuario queda cacheado por el navegador, y fijarlo a `/es` pierde la detección. Se mantiene el 307; `x-default` apunta a `/es` y la tarea 6 hace descubrible `/en`.

```bash
curl -sI https://jojo.ar/ | findstr /i "HTTP location"
```

**Si da 307**, hacerlo permanente. En el middleware:

```ts
if (request.nextUrl.pathname === '/') {
  return NextResponse.redirect(new URL('/es', request.url), 308);
}
```

O en `next.config.ts`:

```ts
async redirects() {
  return [{ source: '/', destination: '/es', permanent: true }];
},
```

- [ ] `/` → 301 o 308 → `/es`

---

## 6. Selector de idioma con links reales

**Problema:** el botón `EN`/`ES` del header (`aria-label="Language"`) es un `<button>`, así que Google no descubre `/en` siguiendo un link.

```tsx
import Link from 'next/link';

<Link
  href={lang === 'es' ? '/en' : '/es'}
  hrefLang={lang === 'es' ? 'en' : 'es'}
  aria-label="Language"
  className="text-body-sm text-surface-cream/60 transition-colors hover:text-surface-cream"
>
  {lang === 'es' ? 'EN' : 'ES'}
</Link>
```

Los botones "Explorar" de cada servicio tienen que pasar a ser `<Link>` cuando existan las páginas de la tarea 12.

- [ ] En `view-source:https://jojo.ar/es` hay un `<a href="/en">`

---

## 7. Fixes de JSON-LD

| Campo | Actual | Corregido |
|---|---|---|
| `logo` | `https://jojo.ar//assets/svg/jojo_logo_dark.svg` (doble barra) | `https://jojo.ar/logo.png` (PNG cuadrado ≥112×112) |
| `image` | `https://jojo.ar/og.svg` | `https://jojo.ar/og.png` |
| `email` | — | `hola@jojo.ar` |
| `sameAs` | solo LinkedIn personal | sumar perfiles de empresa si existen |

Conviene armar todas las URLs desde una sola constante:

```ts
// lib/site.ts
export const SITE_URL = 'https://jojo.ar';
```

Usarla en `metadataBase`, `sitemap.ts`, `robots.ts` y el JSON-LD. `FAQPage` se deja como está.

**Hecho:** `logo`, `image` y `SITE_URL`. La causa del `//` era la barra final de `siteConfig.url`. **Pendiente:** `email` (confirmar dirección) y `sameAs`.

- [ ] Rich Results Test sin errores y sin `//` en las URLs

---

## 8. H1 visible con keyword

**Problema:** el H1 real está en `span.sr-only` y el texto visible ("INGENIERÍA INTELIGENTE") lleva `aria-hidden`.

- **A (recomendada):** dejar "Ingeniería inteligente" como display decorativo fuera del H1 y poner como H1 visible, por ejemplo, "Desarrollo de software a medida e IA para empresas".
- **B:** mantener la estructura y agregar un subtítulo visible con la keyword.

También conviene reemplazar el badge "Estudio de Ingeniería de Precisión" por algo como "Desarrollo de software · Córdoba, Argentina".

- [ ] El H1 es visible y contiene "desarrollo de software a medida"

---

## 9. Íconos

Hay dos `<link rel="icon">`: uno lo genera Next desde `app/favicon.ico` y el otro viene de `icons` en la metadata.

1. Sacar `icons` de la metadata.
2. Agregar `app/apple-icon.png` (180×180).

- [ ] Un solo `rel="icon"` y un `rel="apple-touch-icon"`

---

## 10. Limpieza

- [ ] Sacar `keywords` de la metadata (Google lo ignora).

---

## 11. Search Console (post-deploy)

- [ ] Propiedad de **Dominio** `jojo.ar`
- [ ] Reenviar `https://jojo.ar/sitemap.xml`
- [ ] Inspección de URL en `/es` y `/en` → revisar el HTML rastreado → Solicitar indexación
- [ ] En 1–3 semanas: confirmar que Google muestre `jojo.ar` y el title correcto

---

## 12. Contenido (estrategia)

- [ ] Páginas de servicio con title, H1 y contenido propio (500 palabras o más), agregadas al sitemap:
  - `/es/desarrollo-a-medida` · `/en/custom-software-development`
  - `/es/arquitectura-e-integracion` · `/en/architecture-integration`
  - `/es/ia-aplicada` · `/en/applied-ai`
- [ ] Casos o proyectos: problema, solución, stack y resultado.
- [ ] SEO local: Córdoba / Villa Carlos Paz y un Google Business Profile.
- [ ] Copy del hero y de los servicios con los términos que busca la gente.

---

## Lo que ya está bien

- `robots.txt` correcto, apunta a `https://jojo.ar/sitemap.xml`.
- `sitemap.xml` con `/es` y `/en` y alternates `xhtml:link`.
- `/en` con canonical propio y hreflang recíprocos.
- 404 reales, sin soft-404.
- El favicon responde 200 y Google lo muestra.
- `<html lang>` correcto por idioma.
- Schema `ProfessionalService` completo en lo esencial.
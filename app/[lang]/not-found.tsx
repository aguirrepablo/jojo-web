import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { es } from "@/dictionaries/es";
import { en } from "@/dictionaries/en";

/**
 * 404 con branding JOJO. Se renderiza dentro de `[lang]/layout.tsx` (sin
 * Header/Footer) cuando una ruta bajo `/es/*` o `/en/*` no existe — ver el
 * catch-all en `[lang]/[...notFound]/page.tsx`.
 *
 * Debe ser 100% Server Component: bajo el boundary de `notFound()` los Client
 * Components no emiten HTML en el SSR (Next 16). El idioma se lee del header
 * `x-pathname` que setea `proxy.ts` (este archivo no recibe `params`).
 */
export default async function NotFound() {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const lang = pathname.startsWith("/en") ? "en" : "es";
  const t = (lang === "en" ? en : es).notFound;

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-8">
      <span
        aria-hidden
        className="blob left-[-10%] top-[10%] h-[55vmin] w-[55vmin]"
      />
      <span
        aria-hidden
        className="blob blob-cream bottom-[8%] right-[-8%] h-[42vmin] w-[42vmin]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-content flex-col items-center">
        <Link href={`/${lang}`} aria-label="JOJO" className="mb-14">
          <Image
            src="/assets/svg/jojo_logo_dark.svg"
            alt="JOJO"
            width={44}
            height={44}
            className="h-11 w-11"
          />
        </Link>

        <span className="eyebrow">{t.eyebrow}</span>

        <p className="display mt-8 text-[clamp(5rem,22vw,15rem)] leading-none text-coral-bright">
          404
        </p>

        <h1 className="display mt-6 text-[clamp(1.9rem,5vw,3.5rem)]">
          {t.title}
        </h1>

        <p className="mt-6 max-w-md text-body-lg text-surface-50">
          {t.description}
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link href={`/${lang}`} className="pill pill-cta">
            {t.back}
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Dictionary } from "@/dictionaries/es";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  dict: Dictionary;
  lang: string;
}

export function Header({ dict, lang }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clock, setClock] = useState("");
  const [hidden, setHidden] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > last + 4);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Argentina/Cordoba",
      }).format(new Date());
    setClock(fmt());
    const id = setInterval(() => setClock(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 96, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const toggleLang = () => {
    const next = lang === "es" ? "en" : "es";
    router.push(pathname.replace(`/${lang}`, `/${next}`));
    setIsMenuOpen(false);
  };

  const links = [
    { label: dict.header.services, id: "servicios" },
    { label: dict.header.focus, id: "enfoque" },
  ];

  return (
    <>
      {/* Reloj de Córdoba — discreto */}
      <div
        className={`fixed right-5 top-5 z-50 hidden transition-transform duration-300 lg:block ${
          hidden && !isMenuOpen ? "-translate-y-[160%]" : "translate-y-0"
        }`}
      >
        <span className="font-mono text-[11px] tracking-[0.18em] text-coral tabular-nums">
          {clock || "--:--"}
        </span>
      </div>

      {/* Nav flotante */}
      <header
        className={`fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 transition-transform duration-300 ${
          hidden && !isMenuOpen ? "-translate-y-[160%]" : "translate-y-0"
        }`}
      >
        <div className="relative flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 glass-nav">
          <Link
            href={`/${lang}#home`}
            onClick={(e) => scrollTo(e, "home")}
            aria-label="JOJO"
            className="shrink-0 rounded-md p-1.5"
          >
            <Image
              src="/assets/svg/jojo_logo_dark.svg"
              alt="JOJO"
              width={26}
              height={26}
              className="h-[26px] w-[26px]"
              priority
            />
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => scrollTo(e, l.id)}
                className="font-sans text-[13px] tracking-[-0.01em] text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleLang}
              aria-label="Language"
              className="px-2 py-1 font-mono text-[11px] tracking-[0.1em] text-white/60 transition-colors hover:text-white"
            >
              {lang === "es" ? "EN" : "ES"}
            </button>

            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="grid h-8 w-8 place-items-center text-white/80 md:hidden"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mt-2 flex flex-col gap-1 rounded-2xl p-4 glass-nav md:hidden">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => scrollTo(e, l.id)}
                className="rounded-md px-2 py-2 font-sans text-[15px] text-white/80 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  );
}

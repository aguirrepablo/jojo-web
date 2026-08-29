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
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 120 && y > last + 4);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    { label: dict.header.faq, id: "faq" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        hidden && !isMenuOpen ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-just-black/85 backdrop-blur-md hairline-b"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-wide items-center justify-between gap-4 px-4 sm:px-8">
        <Link
          href={`/${lang}#home`}
          onClick={(e) => scrollTo(e, "home")}
          aria-label="JOJO"
          className="shrink-0"
        >
          <Image
            src="/assets/svg/jojo_logo_dark.svg"
            alt="JOJO"
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => scrollTo(e, l.id)}
              className="text-body-sm text-surface-cream/70 transition-colors hover:text-surface-cream"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            aria-label="Language"
            className="text-body-sm text-surface-cream/60 transition-colors hover:text-surface-cream"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="grid h-8 w-8 place-items-center text-surface-cream md:hidden"
            aria-label={isMenuOpen ? dict.common.close : dict.common.menu}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="hairline-t bg-just-black/95 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-wide flex-col gap-1 px-4 py-4 sm:px-8">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => scrollTo(e, l.id)}
                className="py-2 text-body text-surface-cream/80 transition-colors hover:text-surface-cream"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import Image from "next/image";
import { Dictionary } from "@/dictionaries/es";

interface FooterProps {
  dict: Dictionary;
}

export function Footer({ dict }: FooterProps) {
  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 96, behavior: "smooth" });
  };

  const nav = [
    { label: "Inicio", id: "home" },
    { label: dict.about.title, id: "quienes-somos" },
    { label: dict.header.services, id: "servicios" },
    { label: dict.header.focus, id: "enfoque" },
    { label: dict.header.faq, id: "faq" },
  ];

  return (
    <footer className="hairline-t bg-off-black">
      <div className="mx-auto max-w-wide px-4 py-20 sm:px-8">
        <div className="flex flex-col gap-12">
          <div className="flex max-w-sm flex-col gap-6">
            <Image
              src="/assets/svg/jojo_logo_dark.svg"
              alt="JOJO"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <p className="text-body-sm text-surface-50">{dict.footer.description}</p>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {nav.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={(e) => scrollTo(e, n.id)}
                  className="text-body-sm text-surface-cream/70 transition-colors hover:text-surface-cream"
                >
                  {n.label}
                </a>
              ))}
              <a
                href="https://www.linkedin.com/in/paguirre90/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm text-surface-cream/70 transition-colors hover:text-surface-cream"
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </div>

        <div className="hairline-t mt-16 pt-8">
          <span className="eyebrow text-caption text-surface-50">
            {dict.footer.rights} · {dict.footer.location}
          </span>
        </div>
      </div>
    </footer>
  );
}

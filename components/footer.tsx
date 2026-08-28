"use client";

import Image from "next/image";
import { ArrowRight, Linkedin } from "lucide-react";
import { Dictionary } from "@/dictionaries/es";
import footerImg from "@/public/assets/illustrations/footer.jpg";

interface FooterProps {
  dict: Dictionary;
  onOpenContact: () => void;
}

export function Footer({ dict, onOpenContact }: FooterProps) {
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
  ];

  return (
    <footer className="bg-parchment">
      <div className="rule-triple" />

      <div className="section-editorial mx-auto max-w-wide px-6 pb-16 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-5">
            <Image
              src="/assets/svg/jojo_logo_light.svg"
              alt="JOJO"
              width={30}
              height={30}
              className="h-[30px] w-[30px]"
            />
            <p className="max-w-xs text-[14px] leading-relaxed text-ash">
              {dict.footer.description}
            </p>
            <nav className="flex flex-wrap gap-x-5 gap-y-2">
              {nav.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={(e) => scrollTo(e, n.id)}
                  className="font-sans text-[13px] text-charcoal transition-colors hover:text-coral-deep"
                >
                  {n.label}
                </a>
              ))}
              <a
                href="https://www.linkedin.com/in/paguirre90/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[13px] text-charcoal transition-colors hover:text-coral-deep"
              >
                LinkedIn
              </a>
            </nav>
          </div>

          <div className="flex flex-col items-start gap-4">
            <button onClick={onOpenContact} className="link-ghost">
              {dict.footer.cta}
              <span className="grid h-[18px] w-[18px] place-items-center rounded-full border border-fog">
                <ArrowRight size={11} strokeWidth={2} />
              </span>
            </button>
            <a
              href="https://www.linkedin.com/in/paguirre90/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-9 w-9 place-items-center rounded-md border border-mist text-charcoal transition-colors hover:border-coral hover:text-coral-deep"
            >
              <Linkedin size={15} />
            </a>
          </div>
        </div>
      </div>

      <div className="rule-triple" />
      <div className="relative h-[clamp(220px,34vh,420px)] w-full overflow-hidden">
        <Image
          src={footerImg}
          alt=""
          fill
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-6 pb-5 sm:px-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
            {dict.footer.rights}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
            {dict.footer.location}
          </span>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { Dictionary } from "@/dictionaries/es";
import { Button } from "./ui/button";

interface HeroProps {
  onOpenChat: () => void;
  onOpenContact: () => void;
  dict: Dictionary;
}

export function Hero({ onOpenChat, onOpenContact, dict }: HeroProps) {
  const showChat = process.env.NEXT_PUBLIC_CHAT_FEATURE_FLAG === "true";

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden mesh-grid">
      {/* Background Accents */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-tertiary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-8 relative z-10 flex flex-col items-center text-center">
        <div className="mb-10 flex items-center gap-3 px-4 py-1.5 glass-panel rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[11px] uppercase tracking-[0.3em] font-headline font-bold text-primary">
            {dict.hero.badge}
          </span>
        </div>

        <h1 className="font-headline font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[1.2] tracking-tight text-on-surface mb-10 max-w-7xl uppercase">
          {dict.hero.title_top}<br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffb3ad] to-[#ff5451] inline-block">
            {dict.hero.title_bottom}
          </span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-on-surface-variant font-light mb-14 leading-relaxed opacity-80 whitespace-pre-line">
          {dict.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-8">
          <Button
            onClick={onOpenContact}
            data-contact-trigger
            className="hero-gradient text-on-primary font-headline font-bold px-12 py-7 rounded-md tracking-widest hover:scale-105 transition-all duration-300 uppercase shadow-2xl shadow-primary/30 text-sm border-none"
          >
            {dict.hero.cta}
          </Button>

          {showChat && (
            <Button
              onClick={onOpenChat}
              className="glass-panel text-on-surface px-12 py-7 rounded-md font-headline font-bold tracking-widest hover:bg-surface-variant/50 transition-all uppercase text-sm border-none"
            >
              {dict.chat.title}
            </Button>
          )}
        </div>

        <div className="mt-24 flex flex-col items-center gap-4 opacity-40">
          <span className="text-[10px] uppercase tracking-[0.4em] font-headline text-on-surface">
            {dict.hero.scroll || "Explorar"}
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent"></div>
        </div>
      </div>
    </section>
  );
}

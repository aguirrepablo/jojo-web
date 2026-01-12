"use client";

import { Dictionary } from "@/dictionaries/es";

interface HeroProps {
  onOpenChat: () => void;
  dict: Dictionary;
}

export function Hero({ onOpenChat, dict }: HeroProps) {
  const showChat = process.env.NEXT_PUBLIC_CHAT_FEATURE_FLAG === "true";

  return (
    <section id="home" className="relative overflow-hidden bg-background min-h-[calc(100vh-4rem)] flex items-center">
      <div className="container mx-auto px-4 text-center">
        <h1
          className="mx-auto max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl tracking-tight mb-6 text-foreground"
        >
          {dict.hero.title}
        </h1>
        <p
          className="mx-auto max-w-3xl text-xl text-muted-foreground mb-10 leading-relaxed whitespace-pre-line"
        >
          {dict.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          {showChat ? (
            <button
              onClick={onOpenChat}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 py-2 w-full sm:w-auto"
            >
              {dict.hero.cta}
            </button>
          ) : (
            <a
              href="https://wa.me/5493541214876"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 py-2 w-full sm:w-auto"
            >
              {dict.hero.cta}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
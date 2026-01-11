"use client";

interface HeroProps {
  onOpenChat: () => void;
}

export function Hero({ onOpenChat }: HeroProps) {
  const showChat = process.env.NEXT_PUBLIC_CHAT_FEATURE_FLAG === "true";

  return (
    <section id="home" className="relative overflow-hidden bg-background min-h-[calc(100vh-4rem)] flex items-center">
      <div className="container mx-auto px-4 text-center">
        <h1
          className="mx-auto max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl tracking-tight mb-6 text-foreground"
        >
          Socios tecnológicos para la transformación digital
        </h1>
        <p
          className="mx-auto max-w-3xl text-xl text-muted-foreground mb-10 leading-relaxed"
        >
          Transformamos ideas en soluciones digitales inteligentes.<br/>
          Desarrollamos software a medida con arquitecturas modernas, implementando buenas prácticas de la industria y potenciando cada proyecto con Inteligencia Artificial.<br/>
          Tu socio tecnológico para escalar y profesionalizar tu negocio.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          {showChat ? (
            <button
              onClick={onOpenChat}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 py-2 w-full sm:w-auto"
            >
              Conversemos sobre tu proyecto
            </button>
          ) : (
            <a
              href="https://wa.me/5493541214876"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 py-2 w-full sm:w-auto"
            >
              Conversemos sobre tu proyecto
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
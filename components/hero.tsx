"use client";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-background min-h-[calc(100vh-4rem)] flex items-center">
      <div className="container mx-auto px-4 text-center">
        <h1
          className="mx-auto max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl tracking-tight mb-6 text-foreground"
        >
          Innovación y crecimiento digital
        </h1>
        <p
          className="mx-auto max-w-2xl text-xl text-muted-foreground mb-10 leading-relaxed"
        >
          Desbloquea el potencial digital de tu empresa con
          soluciones de software a medida e Inteligencia
          Artificial.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="https://wa.me/5493541214876"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 py-2 w-full sm:w-auto"
          >
            Charlemos
          </a>
        </div>
      </div>
    </section>
  );
}
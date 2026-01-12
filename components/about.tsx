import { Dictionary } from "@/dictionaries/es";

interface AboutProps {
  dict: Dictionary;
}

export function About({ dict }: AboutProps) {
  return (
    <section id="quienes-somos" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
            {dict.about.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {dict.about.description}
          </p>
        </div>
      </div>
    </section>
  );
}

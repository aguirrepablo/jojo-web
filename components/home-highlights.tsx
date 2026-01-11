import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, Code2, Shield } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function HomeHighlights() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Services Teaser */}
          <Card className="border-border bg-card hover:shadow-lg transition-shadow">
            <CardContent className="p-8 flex flex-col items-start h-full">
              <div className="p-3 bg-primary/10 rounded-xl mb-6">
                <Code2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Nuestros Servicios</h3>
              <p className="text-muted-foreground mb-8 flex-grow">
                Ofrecemos soluciones integrales: desde desarrollo a medida y arquitectura de sistemas hasta implementación de IA aplicada al negocio.
              </p>
              <Button asChild variant="outline" className="group">
                <Link href="/servicios">
                  Ver todos los servicios
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Approach Teaser */}
          <Card className="border-border bg-card hover:shadow-lg transition-shadow">
            <CardContent className="p-8 flex flex-col items-start h-full">
              <div className="p-3 bg-primary/10 rounded-xl mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Nuestro Diferencial</h3>
              <p className="text-muted-foreground mb-8 flex-grow">
                Nos distinguimos por aplicar buenas prácticas, tecnología moderna y un enfoque senior en cada proyecto.
              </p>
              <Button asChild variant="outline" className="group">
                <Link href="/enfoque">
                  Conoce nuestro enfoque
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

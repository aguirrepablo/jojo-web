import { Services } from "@/components/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios - Desarrollo de Software y Consultoría | JOJO",
  description: "Descubre nuestros servicios de desarrollo de software a medida, arquitectura de sistemas, integración de APIs y soluciones de Inteligencia Artificial para tu negocio.",
  alternates: {
    canonical: "https://jojo.ar/servicios",
  },
};

export default function ServiciosPage() {
  return (
    <div>
      <Services />
    </div>
  );
}

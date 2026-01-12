import { Approach } from "@/components/approach";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nuestro Enfoque - Metodología y Valores | JOJO",
  description: "Conoce nuestro enfoque de trabajo basado en buenas prácticas, innovación tecnológica, y un equipo senior comprometido con la calidad y el éxito de tu proyecto.",
  alternates: {
    canonical: "https://jojo.ar/enfoque",
  },
};

export default function EnfoquePage() {
  return (
    <div>
      <Approach />
    </div>
  );
}

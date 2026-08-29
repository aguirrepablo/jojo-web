# Guía de implementación: íconos con energía y movimiento

## Objetivo

Animar los íconos abstractos de los servicios con una estética premium, cálida y tecnológica. La intención visual es comunicar **energía, flujo, conexión e inteligencia**, sin movimientos agresivos ni pesados.

Los íconos deben conservar su composición centrada, sus tonos cálidos (marfil, durazno, coral) y poder mostrarse sobre un fondo oscuro. La animación debe sentirse sutil, continua y profesional.

## Principios de diseño

- Usar movimientos lentos, suaves y cíclicos.
- Evitar cambios bruscos, rebotes excesivos o rotaciones demasiado rápidas.
- Mantener la animación decorativa: no debe competir con el texto ni afectar la legibilidad.
- Priorizar SVG, CSS y Framer Motion por encima de video o GIF para reducir peso y mantener escalabilidad.
- Respetar `prefers-reduced-motion` para usuarios que solicitan menos movimiento.
- Usar transformaciones (`transform`, `opacity`, `filter`) en vez de animar propiedades costosas como `top`, `left`, `width` o `height`.

## Propuesta por servicio

| Servicio | Idea de animación | Parámetros sugeridos |
|---|---|---|
| IA | Partículas/orbitas lentas alrededor de un núcleo que pulsa | Órbita: 8–12 s. Pulso: 2.5–3.2 s |
| Arquitectura | Anillos orbitales girando en direcciones contrarias alrededor de la estructura | Anillo exterior: 10–14 s. Interior: 7–10 s |
| Desarrollo | Cintas entrelazadas con flujo de color y brillo puntual en las intersecciones | Flujo: 3–5 s. Pulso en cruces: 2–3 s |

## Comportamiento visual

### IA

- Un núcleo central emite un resplandor coral suave.
- Los anillos o partículas orbitan lentamente.
- El núcleo aumenta y reduce su escala de forma muy leve.
- El brillo se intensifica en el punto máximo del pulso.

### Arquitectura

- Los anillos que rodean la figura arquitectónica rotan de forma continua.
- Un anillo puede girar en sentido horario y otro en sentido antihorario.
- La estructura central debe permanecer estable o tener un pulso de brillo muy tenue.
- Se puede añadir un halo de luz coral que recorra los anillos para sugerir flujo energético.

### Desarrollo

- Las bandas entrelazadas deben conservar la sensación de continuidad.
- Aplicar un gradiente animado que se desplace suavemente por los recorridos.
- En los puntos de cruce, elevar levemente el brillo o glow de manera periódica.
- Evitar que la geometría se deforme: el efecto debe provenir principalmente de gradientes, máscaras, sombras y opacidad.

## Stack recomendado

- Next.js / React.
- Framer Motion para animaciones declarativas y controladas en React.
- SVG inline para controlar rutas, gradientes, máscaras y filtros.
- CSS para keyframes simples y fallback.
- Imágenes PNG transparentes solo como fallback estático; idealmente, reconstruir o exportar los íconos como SVG si se requiere animar partes individuales.

## Accesibilidad y rendimiento

Implementar siempre reducción de movimiento:

```css
@media (prefers-reduced-motion: reduce) {
  .energy-orbit,
  .energy-core,
  .energy-flow {
    animation: none !important;
    transition: none !important;
  }
}
```

Reglas de rendimiento:

- Pausar o simplificar la animación si el ícono está fuera del viewport.
- Usar `will-change: transform` únicamente en elementos realmente animados.
- Evitar múltiples filtros SVG complejos en móviles de gama baja.
- No usar GIF para este efecto.
- Mantener los ciclos entre 2.5 y 14 segundos; evitar animaciones nerviosas o constantes de menos de 1 segundo.

## Ejemplo CSS base

Este ejemplo representa un núcleo energético que pulsa y dos anillos que orbitan en sentidos opuestos.

```css
.energy-icon {
  position: relative;
  width: min(18rem, 70vw);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  isolation: isolate;
}

.energy-orbit {
  position: absolute;
  inset: 10%;
  border: 0.85rem solid rgba(255, 226, 194, 0.96);
  border-radius: 999px;
  transform-origin: center;
  will-change: transform;
}

.energy-orbit--outer {
  animation: orbit 11s linear infinite;
}

.energy-orbit--inner {
  inset: 23%;
  border-color: rgba(255, 151, 127, 0.8);
  animation: orbit-reverse 8s linear infinite;
}

.energy-core {
  width: 34%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(
    circle at 35% 30%,
    #fff6df 0%,
    #ffd2b9 30%,
    #ff987c 65%,
    #f45e4e 100%
  );
  box-shadow: 0 0 1.2rem rgba(255, 115, 85, 0.45);
  will-change: transform, filter;
  animation: energy-pulse 2.8s ease-in-out infinite;
}

@keyframes orbit {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes orbit-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

@keyframes energy-pulse {
  0%,
  100% {
    transform: scale(1);
    filter: drop-shadow(0 0 0.5rem rgba(255, 115, 85, 0.38));
  }
  50% {
    transform: scale(1.06);
    filter: drop-shadow(0 0 1.8rem rgba(255, 95, 70, 0.95));
  }
}

@media (prefers-reduced-motion: reduce) {
  .energy-orbit,
  .energy-core {
    animation: none;
  }
}
```

## Ejemplo React + Framer Motion

Usar este componente como base para el icono de IA. Adaptar las formas a los SVG definitivos cuando estén disponibles.

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

type EnergyIconProps = {
  className?: string;
};

export function EnergyIcon({ className }: EnergyIconProps) {
  const reduceMotion = useReducedMotion();

  const orbitTransition = (duration: number) => ({
    duration,
    ease: "linear" as const,
    repeat: Infinity,
  });

  return (
    <div
      aria-hidden="true"
      className={`relative grid aspect-square w-72 place-items-center ${className ?? ""}`}
    >
      <motion.div
        className="absolute inset-[9%] rounded-full border-[18px] border-orange-100/95"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={orbitTransition(11)}
      />

      <motion.div
        className="absolute inset-[23%] rounded-full border-[12px] border-orange-300/80"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={orbitTransition(8)}
      />

      <motion.div
        className="aspect-square w-[34%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff6df_0%,#ffd2b9_30%,#ff987c_65%,#f45e4e_100%)]"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.06, 1],
                boxShadow: [
                  "0 0 18px rgba(255, 110, 80, .45)",
                  "0 0 55px rgba(255, 85, 60, .9)",
                  "0 0 18px rgba(255, 110, 80, .45)",
                ],
              }
        }
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
```

## Animar los assets existentes

Los PNG actuales tienen fondo transparente, pero son imágenes rasterizadas. Se pueden aplicar efectos generales al contenedor, como levitación, glow o escala, pero no se pueden animar por separado los anillos, bandas o partes internas sin reconstruir el gráfico.

### Opción A: efecto sobre PNG (rápida)

Usar los PNG como una sola capa y animar solo el contenedor. Es adecuada para una primera versión.

```tsx
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type ServiceIconProps = {
  src: string;
  alt: string;
};

export function AnimatedServiceIcon({ src, alt }: ServiceIconProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -8, 0],
              scale: [1, 1.015, 1],
              filter: [
                "drop-shadow(0 0 14px rgba(255, 115, 85, 0.25))",
                "drop-shadow(0 0 30px rgba(255, 115, 85, 0.65))",
                "drop-shadow(0 0 14px rgba(255, 115, 85, 0.25))",
              ],
            }
      }
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      className="relative aspect-square w-full max-w-sm"
    >
      <Image src={src} alt={alt} fill className="object-contain" />
    </motion.div>
  );
}
```

### Opción B: reconstrucción SVG (recomendada)

Recrear cada icono como SVG en capas:

- Una capa por anillo, banda o partícula.
- Gradientes lineales/radiales con posiciones animables.
- Filtros SVG de glow moderados (`feGaussianBlur`, `feMerge`).
- Máscaras o `stroke-dasharray` / `stroke-dashoffset` para crear flujo de luz sobre recorridos.

Esta alternativa permite que cada elemento tenga movimiento independiente y brinda un resultado más convincente, liviano y escalable.

## Criterios de aceptación

- Los íconos muestran movimiento continuo y elegante sin distraer.
- En desktop, el ciclo se percibe fluido y sin cortes visibles.
- En mobile, la animación se mantiene liviana y no provoca caídas perceptibles de rendimiento.
- Con `prefers-reduced-motion`, los íconos quedan estáticos sin perder calidad visual.
- No hay layout shift al cargar los íconos.
- Los colores se mantienen dentro de la paleta cálida: marfil, durazno, coral y rojo-anaranjado suave.
- El foco visual permanece en el contenido de cada tarjeta de servicio.

## Decisión recomendada

Implementar primero la opción rápida sobre PNG para validar la dirección visual. Luego, si los íconos son un elemento central de marca, reemplazarlos gradualmente por SVG en capas para lograr órbitas, flujo de energía y brillos localizados reales.

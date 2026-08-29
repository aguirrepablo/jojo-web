# Manual de Branding Visual para Instagram: JOJO

Este manual traduce el sistema de diseño del sitio web (`docs/desing_new/DESIGN.md` y `app/globals.css`) al formato y requerimientos visuales de **Instagram**.

---

## 1. Reglas Fundamentales de Estética

> **Concepto:** *Un estudio de ingeniería de precisión en un lienzo casi negro. Tipografía cream imponente, firmas tipográficas con llaves `{ }`, acento coral vibrante y diagramas arquitectónicos limpios. Cero fotos de stock.*

| Elemento | Regla JOJO | Prohibido ❌ |
| :--- | :--- | :--- |
| **Fondo / Canvas** | `Just Black` (`#0e100f`) o `Off Black` (`#191919`). | Fondos blancos planos, degradados multicolor genéricos. |
| **Texto Primario** | `Surface Cream` (`#fffce1`). Calidez editorial. | Blanco puro (`#ffffff`), gris estándar. |
| **Texto Secundario** | `Surface 50` (`#7c7c6f`). | Textos de bajo contraste ilegibles. |
| **Acento Cromático** | `Coral` (`#F24444`) o `Coral Bright` (`#ff6b6b`). | Múltiples colores mezclados (azules, amarillos, púrpuras). |
| **Divisores** | Hairlines de 1px en `Surface 25` (`#42433d`). | Sombras proyectadas (`box-shadow`), bordes gruesos. |
| **Firma Visual** | Anotaciones entre llaves `{ 01 }`, `{ Caso de Estudio }`. | Emojis excesivos o badges genéricos. |
| **Botones / Badges** | Ghost pills con bordes de 1px en cream o coral, radio 100px. | Botones rectangulares o sombras 3D. |
| **Imaginería** | Diagramas vectoriales limpios, código tipado, métricas gigantes y blobs radiales difuminados de fondo. | Fotos de stock de gente con computadoras o apretones de manos. |

---

## 2. Paleta de Colores Oficial

```
┌─────────────────────────────────────────────────────────────────┐
│                          PALETA JOJO                            │
├─────────────────┬─────────────────┬─────────────────────────────┤
│  #0e100f        │  #191919        │  #fffce1                    │
│  Just Black     │  Off Black      │  Surface Cream              │
│  (Lienzo)       │  (Paneles/Code) │  (Texto & Líneas)           │
├─────────────────┼─────────────────┼─────────────────────────────┤
│  #7c7c6f        │  #42433d        │  #f24444                    │
│  Surface 50     │  Surface 25     │  Coral JOJO                 │
│  (Subtítulos)   │  (Hairlines)    │  (Acento / Marca)           │
└─────────────────┴─────────────────┴─────────────────────────────┘
```

* **Gradiente de Blob de Fondo:** `radial-gradient(circle at 35% 35%, rgba(242, 68, 68, 0.4) 0%, rgba(255, 252, 225, 0.08) 55%, transparent 75%)` con `filter: blur(60px)`.

---

## 3. Tipografía y Jerarquías para Posts (Formato 1080 × 1350 px)

* **Formato Estándar:** Retrato 4:5 (1080 px ancho × 1350 px alto).

### Escala recomendada para carruseles:
1. **Eyebrow / Firma de Sección:**
   * `{ 01 }` o `{ Arquitectura }` o `{ IA Aplicada }`
   * Tamaño: 22–26 px | Color: `#fffce1` con llaves en `#7c7c6f`.
2. **Titular Principal (Hook / Portada):**
   * Tamaño: 72–96 px | Peso: Semibold (600) | Line-height: 0.95 | Tracking: `-0.025em`.
   * Color: `#fffce1` con palabras clave destacadas en `#ff6b6b`.
3. **Subtítulo / Bajada:**
   * Tamaño: 32–38 px | Color: `#7c7c6f` | Line-height: 1.3.
4. **Cuerpo de Diapositiva (Slides internas):**
   * Tamaño: 28–34 px | Color: `#fffce1` o `#7c7c6f` | Line-height: 1.45.
5. **Métricas de Impacto / Números Clave:**
   * Tamaño: 110–140 px | Peso: Bold | Color: `#fffce1` o `#f24444`.

---

## 4. Anatomía de una Diapositiva de Carrusel JOJO

```
┌────────────────────────────────────────────────────────┐
│  [Logo JOJO]                            { 01 / 06 }    │  <- Header sutil
│                                                        │
│  { Arquitectura }                                      │  <- Eyebrow
│                                                        │
│  ¿Tu empresa superó                                    │  <- Titular Display
│  el software enlatado?                                 │     (Cream + Coral)
│                                                        │
│  ( Blob difuso coral de fondo )                        │
│                                                        │
│  ────────────────────────────────────────────────────  │  <- Hairline #42433d
│                                                        │
│  4 señales claras de que necesitás                     │  <- Bajada / Cuerpo
│  desarrollo a medida para escalar.                     │
│                                                        │
│                                                        │
│  [ (pill) Deslizá -> ]                       jojo.ar   │  <- Footer con URL
└────────────────────────────────────────────────────────┘
```

---

## 5. Plantillas de Prompts para Generación de Assets

Cuando se generen imágenes complementarias o mockups:
* **Prompt para Fondo / Textura:**
  > `"Minimalist luxury engineering slide background, deep charcoal black (#0e100f), extremely subtle glowing coral red (#F24444) orb blur in the background, sharp thin hairline grid lines (#42433d), ultra-clean studio lighting, no text, 4:5 vertical aspect ratio."`
* **Prompt para Diagrama de IA / Arquitectura:**
  > `"Clean minimalist technical architecture diagram, isometric glowing server nodes, dark canvas, vibrant coral lines (#F24444) and cream endpoints (#FFFCE1), high precision engineering aesthetic, 4:5 ratio."`

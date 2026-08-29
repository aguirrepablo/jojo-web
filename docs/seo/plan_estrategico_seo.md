# Plan Estratégico de SEO y Posicionamiento de Contenidos: JOJO Web

**Fecha de creación:** Agosto 2026  
**Proyecto:** JOJO (`jojo.ar`)  
**Objetivo:** Establecer una base técnica y editorial sólida para posicionar a JOJO como referente B2B en desarrollo de software a medida, arquitecturas modernas e integración de inteligencia artificial en Argentina, LATAM y mercados internacionales.

---

## 1. Resumen Ejecutivo y Objetivos

### 1.1. Situación de Partida
JOJO cuenta con un sitio web de alto rendimiento visual y técnico (Next.js App Router, SSR, Tailwind CSS 4, animaciones GSAP). Sin embargo, su configuración actual como *One-Pager* con enlaces ancla (`#`) y una baja densidad de palabras clave transaccionales impide que los motores de búsqueda indexen y clasifiquen el sitio para múltiples intenciones de búsqueda de alto valor comercial.

### 1.2. Objetivos Principales
1. **Posicionamiento Transaccional:** Rankear en primeros resultados para términos como *"desarrollo de software a medida"*, *"consultoría de inteligencia artificial"*, *"arquitectura cloud y microservicios"* en Argentina y la región.
2. **Captura de Búsquedas Long-Tail y GEO (Generative Engine Optimization):** Posicionar respuestas estructuradas en Google AI Overviews, Perplexity y ChatGPT mediante una sección integral de preguntas frecuentes (FAQ) y datos estructurados JSON-LD.
3. **Evolución Arquitectónica:** Pasar progresivamente de una landing única a una arquitectura modular con páginas dedicadas por servicio y casos de estudio.
4. **Optimización de Conversión (CRO + SEO):** Alinear la intención de búsqueda de directores de tecnología (CTOs) y líderes de negocio (CEOs/Founders) con llamadas a la acción directas hacia el formulario de contacto o el asistente IA.

---

## 2. Auditoría Técnica y Correcciones Inmediatas (Quick Wins)

### 2.1. Corrección del Sitemap XML (`app/sitemap.ts`)
* **Problema:** Actualmente contiene fragmentos hash (`https://jojo.ar/#servicios`), que los motores de búsqueda descartan por estándar, y no explicita las URLs por idioma.
* **Solución:** Configurar un sitemap dinámico que liste las URLs canónicas reales para cada idioma (`/es` y `/en`), con fecha de última modificación y frecuencia de actualización adecuada.

```typescript
// Estructura objetivo para app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jojo.ar';
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/es`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          es: `${baseUrl}/es`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/es`,
          en: `${baseUrl}/en`,
        },
      },
    },
  ];
}
```

### 2.2. Optimización de Jerarquía de Encabezados (H1 - H3)
* **Problema:** En el componente `hero.tsx`, el `<h1>` está asignado al texto conceptual *"INGENIERÍA INTELIGENTE"*, perdiendo el factor de relevancia más alto del HTML.
* **Solución:** 
  * Mantener el impacto visual estilístico pero incluir un `<h1>` semántico con alto valor de búsqueda:
    * **ES:** *Desarrollo de Software a Medida, Arquitecturas Modernas e Inteligencia Artificial*
    * **EN:** *Custom Software Development, Modern Architecture & Enterprise AI Solutions*
  * Ajustar los `<h2>` para que describan servicios y soluciones concretas:
    * `<h2>`: *Servicios de Ingeniería de Software y Soluciones de Inteligencia Artificial*
    * `<h2>`: *Enfoque y Metodología de Ingeniería Ágil*
    * `<h2>`: *Preguntas Frecuentes sobre Nuestros Servicios*

### 2.3. Marcado Estructurado (Schema.org JSON-LD)
Implementar esquemas enriquecidos en `app/[lang]/layout.tsx` o por componente:
1. **`ProfessionalService` / `Organization`:** Ampliar con catálogo de servicios (`hasOfferCatalog`), tecnologías conocidas (`knowsAbout`), área de servicio (`areaServed`) y enlaces a perfiles oficiales (`sameAs`).
2. **`FAQPage`:** Inyectar automáticamente el listado de preguntas y respuestas en formato estructurado para ganar fragmentos enriquecidos (Rich Snippets) en las SERPs de Google.

> **Estado (2026-08-29):** El `ProfessionalService` base ya está implementado en `app/[lang]/layout.tsx` (name, url, logo, address, contactPoint, sameAs, priceRange). En este cambio se agrega `knowsAbout`, `areaServed`, `hasOfferCatalog` y el bloque `FAQPage`.

---

## 3. Estrategia de Contenidos: Sección FAQ (Preguntas Frecuentes)

Las FAQs son el pilar para capturar búsquedas conversacionales y objeciones de compra en etapas de consideración y decisión.

### 3.1. Listado de Preguntas y Respuestas (Español / Inglés)

#### Pregunta 1: ¿Qué tipo de soluciones de software desarrollan en JOJO?
* **ES:** Desarrollamos soluciones digitales a medida: aplicaciones web de alto rendimiento, plataformas móviles, sistemas de gestión interna (ERP, CRM bespoke), arquitecturas orientadas a microservicios y modernización de sistemas legacy. Construimos software escalable utilizando stacks modernos.
* **EN:** We develop bespoke digital solutions: high-performance web applications, mobile platforms, custom internal management systems (ERP, bespoke CRM), microservice architectures, and legacy system modernization. We build scalable software using modern stacks.

#### Pregunta 2: ¿Cómo integran Inteligencia Artificial en empresas y productos existentes?
* **ES:** Integramos IA práctica y orientada al negocio: agentes autónomos para atención y soporte, automatización de flujos de trabajo operativos, orquestación de LLMs con recuperación contextual (RAG), y análisis predictivo de datos. Diseñamos cada solución con estrictos estándares de privacidad, seguridad de datos y control de costos de infraestructura.
* **EN:** We integrate practical, business-driven AI: autonomous support agents, operational workflow automation, LLM orchestration with contextual retrieval (RAG), and predictive analytics. We design every solution following strict data privacy, enterprise security, and cloud cost control standards.

#### Pregunta 3: ¿Cuáles son los tiempos de entrega y cómo es la metodología de trabajo?
* **ES:** Trabajamos con metodologías ágiles en ciclos de entrega quincenales (sprints). Diseñamos arquitecturas modulares que nos permiten desplegar un Producto Mínimo Viable (MVP) funcional y de calidad de producción en semanas, permitiendo a tu empresa validar y escalar rápidamente.
* **EN:** We work with agile methodologies in two-week delivery sprints. We design modular architectures that enable us to deploy functional, production-grade Minimum Viable Products (MVPs) in weeks, allowing your company to validate and scale quickly.

#### Pregunta 4: ¿Cómo garantizan la seguridad, mantenibilidad y escalabilidad del software?
* **ES:** Aplicamos estándares de ingeniería de grado enterprise: tipado estricto en frontend y backend, pruebas automatizadas (unitarias, integración y e2e), integración y entrega continua (CI/CD), contenedores (Docker/Kubernetes) y arquitecturas cloud sobre AWS, Azure o Google Cloud con alta disponibilidad.
* **EN:** We apply enterprise-grade engineering standards: strict typing across frontend and backend, automated testing (unit, integration, and e2e), continuous integration and deployment (CI/CD), containerization (Docker/Kubernetes), and cloud architectures on AWS, Azure, or Google Cloud built for high availability.

#### Pregunta 5: ¿Cómo se integran con nuestro equipo técnico o de producto?
* **ES:** Trabajamos con total transparencia y trato directo: te integrás a los mismos repositorios, tableros y canales de comunicación que usamos a diario, sin capas intermedias ni cuentas que rebotan. Nos sumamos a tu flujo de trabajo como un socio técnico más del equipo.
* **EN:** We work with full transparency and direct contact: you get access to the same repositories, boards, and communication channels we use every day, with no intermediaries or account managers in between. We plug into your workflow as one more technical partner on the team.

#### Pregunta 6: ¿Dónde están ubicados y cuál es el alcance geográfico de sus servicios?
* **ES:** Somos de Villa Carlos Paz, Córdoba (Argentina). Trabajamos de forma 100% remota, así que podemos colaborar con clientes de cualquier parte del mundo. Nos podés contratar por proyecto cerrado (llave en mano) o por colaboración continua por horas o por sprint.
* **EN:** We're from Villa Carlos Paz, Córdoba (Argentina). We work fully remote, so we can collaborate with clients anywhere in the world. You can hire us for a fixed-scope project or for ongoing work billed by the hour or by sprint.

---

## 4. Enriquecimiento de Contenidos en la Home Page

Para aumentar la relevancia semántica de la home antes de crear páginas secundarias, se planifican los siguientes bloques:

### 4.1. Bloque de Stack Tecnológico Visible
* **Objetivo:** Indexar tecnologías que buscan los tomadores de decisión técnicos.
* **Contenido:**
  * **Frontend & Web:** Next.js, React, TypeScript, Tailwind CSS, WebSockets.
  * **Backend & APIs:** Go (Golang), Python, .NET / C#, NestJS / Node.js, GraphQL, gRPC, REST.
  * **Inteligencia Artificial:** OpenAI, Anthropic Claude, Gemini, LangChain, LlamaIndex, Pinecone, pgvector.
  * **Cloud & DevOps:** AWS, Azure, Google Cloud, Docker, Kubernetes, Terraform, GitHub Actions.
  * **Bases de Datos:** PostgreSQL, Redis, MongoDB, Supabase.

### 4.2. Bloque de Industrias y Casos de Uso
* **Fintech & Pagos:** Infraestructura de alta concurrencia, pasarelas de pago y seguridad transaccional.
* **Logística & Cadena de Suministro:** Plataformas de trazabilidad en tiempo real y optimización de rutas con IA.
* **B2B SaaS & Plataformas Empresariales:** Arquitectura multi-tenant, suscripciones y portales de clientes.
* **Salud & Healthtech:** Sistemas de gestión médica interoperables y asistentes clínicos con IA.

---

## 5. Arquitectura Modular de Servicios (Fase 2)

Para competir contra empresas consolidadas en términos de alto volumen, es imperativo crear páginas dedicadas por vertical de servicio.

### 5.1. Estructura de Rutas Planificada

```
app/
└── [lang]/
    ├── layout.tsx
    ├── page.tsx (Home Page optimizada)
    └── servicios/
        ├── desarrollo-software-a-medida/
        │   └── page.tsx
        ├── inteligencia-artificial-empresas/
        │   └── page.tsx
        └── arquitectura-cloud-devops/
            └── page.tsx
```

### 5.2. Plantilla de Contenido para cada Página de Servicio
Cada landing page de servicio contendrá entre 700 y 1.200 palabras organizadas así:
1. **Hero de Servicio:** H1 transaccional, propuesta de valor específica, CTA directo.
2. **Problemas que Resolvemos:** Dolores comunes del cliente (deuda técnica, lentitud operativa, falta de escala).
3. **Nuestras Capacidades:** Detalle técnico de qué incluye el servicio.
4. **Stack y Herramientas:** Tecnologías específicas utilizadas para ese servicio.
5. **Proceso de Trabajo (Paso a Paso):** Descubrimiento -> Arquitectura -> Desarrollo -> Testing -> Despliegue.
6. **FAQ Específica del Servicio:** 3 a 5 preguntas enfocadas exclusivamente en ese servicio.
7. **Formulario de Contacto / Asistente IA Integrado.**

---

## 6. Autoridad Temática y Contenido Editorial (Fase 3)

### 6.1. Casos de Estudio (`/[lang]/casos/...`)

Los casos de éxito son las páginas con mayor tasa de conversión en servicios de ingeniería. Objetivo: publicar 2 a 4 casos detallados con métricas de impacto.

#### 6.1.1. Cómo se construye un caso

**Paso 1 — Permiso del cliente.** De mejor a peor opción:
1. *Con nombre y logo:* pedirlo por escrito (un email alcanza) ofreciendo que revisen el borrador antes de publicar. Momento ideal: justo tras una entrega exitosa.
2. *Anonimizado:* "una fintech de pagos en LATAM, ~40 empleados". No requiere permiso formal; funciona casi igual para SEO y conversión. Avisar por cortesía.
3. *Sin permiso ni anonimato:* no es un caso, es un ejemplo genérico dentro de la página de servicio. No llamarlo caso de estudio.

**Paso 2 — Los números.** Si no se midió el "antes", reconstruirlo con lo disponible:
* **Infra/cloud:** factura AWS/GCP antes vs. después (el dato más fácil y creíble).
* **Performance:** p95 de latencia, tiempo de build, tiempo de deploy, uptime.
* **Negocio:** "resolución de tickets de 2 días a 4 horas", "de 1 release/mes a 1/día" (preguntar al cliente).
* **Magnitud** (si no hay métrica): "12 microservicios", "200k líneas legacy migradas", "MVP en producción en 6 semanas".
* **Regla:** nunca inventar un número. Un "reducción significativa de costos" honesto vale más que un "98.4%" indefendible.

**Paso 3 — Estructura (1 página, ~500-800 palabras):**
1. Título con resultado: *"Cómo redujimos un 60% los costos cloud de una fintech migrando a Go y Kubernetes"*.
2. El cliente y el contexto (2-3 líneas: quién es, qué hace, tamaño).
3. El problema: qué dolía y por qué, en concreto.
4. Restricciones: presupuesto, deadline, no parar producción, equipo chico (hacen creíble la historia).
5. Qué hicimos: decisiones técnicas y por qué (el detalle que un CTO quiere leer).
6. Resultado: números en bullets, antes vs. después.
7. Qué sigue / quote del cliente.
8. CTA al formulario.

**Paso 4 — Implementación en el sitio:**
* Ruta `/[lang]/casos/slug-descriptivo`.
* Schema JSON-LD `Article` o `CreativeWork`.
* Enlazar cada caso desde la página de servicio relacionada (el link interno le da fuerza SEO).
* Incluir una foto o diagrama de arquitectura para que no sea un muro de texto.

**Arranque:** elegir un proyecto terminado, escribir el borrador anonimizado sin esperar el permiso, y en paralelo mandar el email al cliente. Con uno publicado ya hay prueba social; los otros dos salen más rápido con la plantilla lista.

#### 6.1.2. Candidatos iniciales
* *Ejemplo 1:* Reducción de latencia y costos cloud mediante migración a Go y Kubernetes.
* *Ejemplo 2:* Implementación de asistente RAG para soporte interno reduciendo tiempos de resolución.

### 6.2. Blog Técnico / Hub de Recursos (`/[lang]/blog/...`)
* Artículos pilares orientados a búsquedas informacionales de CTOs y Product Managers:
  * *"Cómo elegir entre microservicios y arquitectura modular monolítica"*
  * *"Guía para implementar agentes de IA en entornos corporativos con seguridad"*
  * *"Next.js vs. Single Page Apps: Impacto en SEO y rendimiento B2B"*

---

## 7. Plan de Acción y Roadmap de Ejecución

**Leyenda:** ✅ hecho · 🔶 parcial / en progreso · ⬜ pendiente

### Sprint 1: Quick Wins & Sección FAQ en Home (Semana 1)
- [x] ✅ **Sitemap:** Actualizar `app/sitemap.ts` con URLs limpias para `/es` y `/en`, excluyendo fragmentos hash. *(2026-08-29, rama `rediseno-gsap`)*
- [x] 🔶 **Metadatos & Headings:** H1 semántico con keywords agregado en `components/hero.tsx` vía `sr-only` (mantiene el diseño). Pendiente: revisar `title`/`description` en diccionarios (decisión de voz de marca).
- [x] ✅ **Componente FAQ:** `components/faq.tsx` con acordeón accesible (`aria-expanded`/`aria-controls`), reveal GSAP y contenido multilingüe en `dictionaries/es.ts` / `dictionaries/en.ts` (6 Q&A de la sección 3). *(2026-08-29)*
- [x] ✅ **Schema FAQPage:** JSON-LD dinámico generado desde el diccionario en `app/[lang]/layout.tsx`. *(2026-08-29)*
- [x] ✅ **Integración en Home:** Sección FAQ montada en `components/home-page.tsx` + enlace `#faq` en `header.tsx` y `footer.tsx`. *(2026-08-29)*
- [x] ✅ **Schema enrichment:** `knowsAbout`, `areaServed`, `hasOfferCatalog` sumados al `ProfessionalService`. *(2026-08-29)*

### Sprint 2: Bloque de Stack Tecnológico & Densidad Semántica (Semana 2)
- [ ] ⬜ Crear componente de Stack Tecnológico e Industrias en la Home.
- [ ] ⬜ Enriquecer descripciones de servicios en `dictionaries/es.ts` y `dictionaries/en.ts` con casos de uso concretos.
- [x] 🔶 Configurar canonicals y etiquetas `hreflang` exhaustivas (`x-default`, `es-AR`, `en-US`). *(2026-08-29: hecho en `layout.tsx` y `sitemap.ts`; falta validar en Search Console tras deploy)*
- [ ] ⬜ **OG image:** reemplazar `public/og.svg` por PNG/JPG 1200×630 (varios crawlers y redes no renderizan SVG).

### Sprint 3: Páginas de Servicios Dedicadas (Semanas 3 y 4)
- [ ] Desarrollar la plantilla y ruta `/[lang]/servicios/desarrollo-software-a-medida`.
- [ ] Desarrollar la plantilla y ruta `/[lang]/servicios/inteligencia-artificial-empresas`.
- [ ] Desarrollar la plantilla y ruta `/[lang]/servicios/arquitectura-cloud-devops`.
- [ ] Actualizar sitemap y breadcrumbs para la nueva jerarquía de páginas.

### Sprint 4: Medición, Indexación y Casos de Estudio (Mes 2)
- [ ] Verificar configuración en Google Search Console y Bing Webmaster Tools.
- [ ] Enviar el nuevo sitemap XML para recrawl de Googlebot.
- [ ] Monitorear impresiones de palabras clave y posiciones en Search Console.
- [ ] Diseñar y publicar los primeros casos de estudio técnicos.

---

## 8. Métricas de Éxito y Monitoreo (KPIs)

| KPI | Herramienta | Meta (3 a 6 meses) |
| :--- | :--- | :--- |
| **Indexación de URLs** | Google Search Console | 100% de páginas válidas indexadas sin errores. |
| **Impresiones Orgánicas** | Google Search Console | Crecimiento sostenido (+150% en términos de desarrollo/IA). |
| **Rich Snippets FAQ** | GSC / Resultados SERP | Aparición de acordeones de FAQ en resultados de marca y genéricos. |
| **Conversiones Orgánicas** | Google Analytics 4 | Incremento de leads y conversaciones iniciadas desde tráfico orgánico. |
| **Core Web Vitals** | PageSpeed Insights | Puntuación > 90 en Performance, Accesibilidad y SEO en Mobile y Desktop. |

---

## 9. Registro de Ejecución

### 2026-08-29 — rama `rediseno-gsap`
Primer lote de quick wins subido junto al rediseño GSAP:
- `app/sitemap.ts`: reescrito. Elimina fragmentos `#` y publica `/es` y `/en` con `alternates.languages`.
- `app/[lang]/layout.tsx`:
  - `hreflang` ampliado a `es-AR`, `en-US` y `x-default`.
  - `ProfessionalService` enriquecido con `knowsAbout`, `areaServed`, `hasOfferCatalog`.
  - Nuevo bloque JSON-LD `FAQPage` generado desde `dict.faq.items`.
- `components/faq.tsx`: nueva sección FAQ (acordeón accesible + reveal GSAP). 6 preguntas de la sección 3 del plan, ES/EN.
- `components/home-page.tsx`: FAQ montada tras `Approach`.
- `components/header.tsx` y `components/footer.tsx`: enlace de navegación `#faq`.
- `components/hero.tsx`: `<h1>` con texto semántico rico en keywords vía `sr-only`; los renglones visuales pasan a `aria-hidden` (el lector de pantalla lee el H1 una sola vez).
- `dictionaries/es.ts` y `dictionaries/en.ts`: nuevo bloque `faq` + `header.faq` + `hero.h1`.

**Pendiente de este lote:** validar en Search Console tras el deploy; reemplazar `public/og.svg` por un PNG/JPG 1200×630.

### 2026-08-29 — pasada de honestidad / voz de marca (`dictionaries/`)
Posicionamiento: **estudio independiente, proyecto personal y cercano, con trato directo y colaboradores de confianza cuando hace falta; busca crecer con cada cliente.** Tono discreto, sin subrayar "solo" ni "senior". Se ajusta el copy que insinuaba un equipo mayor o prometía capacidades no verificables:
- `about.description`: de "un equipo de desarrollo… extensión táctica de élite" → "estudio de ingeniería de software independiente… proyecto personal y cercano… sumamos colaboradores de confianza cuando un trabajo lo necesita".
- `approach.items.team`: `Liderazgo Experto` → `Continuidad Real` ("el mismo responsable te acompaña de la primera reunión al despliegue").
- `faq` P5: se quita "extensión técnica de élite / Staff Augmentation / Dedicated Squad".
- `faq` P6: se quita "nuestra sede"; queda "somos de Villa Carlos Paz, trabajo 100% remoto para todo el mundo".
- `faq` P1: se quitan lenguajes concretos, queda "stacks modernos".
- `approach.items.tech`: "frameworks de desarrollo propios" → "pipeline de deploy automatizado y base de proyecto propia que se mantiene al día".
- `approach.kpi`: se elimina el placeholder inventado `98.4% EFICIENCIA / Rendimiento Arquitectónico Verificado` → mensaje de agilidad sin número de precisión falsa: `CICLOS CORTOS / Ritmo de trabajo` ("iteración continua y entregas frecuentes, sin esperas de meses"). El helper `countUp` ya no anima (no hay dígito); degrada a texto plano.
- `services.subtitle`: se reemplaza la frase grandilocuente por una descripción real de los tres servicios.

**Pendiente / a decidir:** ¿nombrar al desarrollador (Pablo Aguirre) en `about` y agregar `founder` (Person) al JSON-LD para reforzar E-E-A-T? Revisar `metadata.title`/`description` con la misma voz.

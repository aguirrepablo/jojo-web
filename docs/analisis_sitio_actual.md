# Análisis del Sitio Actual: JOJO Web

Este documento resume la identidad visual, comunicacional y estructural actual de JOJO para facilitar futuros procesos de rediseño.

## 1. Identidad Visual (Paleta de Colores)

El sitio utiliza un sistema de temas (Claro/Oscuro) basado en variables CSS.

### Colores Base (Light Mode)
- **Primary:** `#F24444` (Rojo vibrante, usado en botones, acentos y logo).
- **Background:** `#FFFFFF` (Blanco puro).
- **Foreground:** `#0f172a` (Azul muy oscuro/negro para texto principal).
- **Card/Muted:** `#f8fafc` / `#f1f5f9` (Grises muy claros para fondos secundarios).
- **Border:** `#e2e8f0` (Gris suave para líneas de división).

### Colores Base (Dark Mode)
- **Primary:** `#F24444` (Se mantiene igual para consistencia).
- **Background:** `#171717` (Negro neutro).
- **Foreground:** `#ffffff` (Blanco para texto).
- **Card/Muted:** `#262626` / `#3f3f3f` (Grises oscuros para profundidad).
- **Border:** `#3f3f3f` (Gris oscuro para divisiones).

---

## 2. Comunicación y Tono
JOJO se posiciona como un **Socio Tecnológico (Tech Partner)**, no solo como una agencia de desarrollo.

- **Propuesta de Valor:** Transformación digital, software a medida, arquitecturas modernas e IA.
- **Tono:** Profesional, experto, confiable y orientado a resultados corporativos ("Enterprise standards").
- **Keywords:** Inteligencia Artificial, Escalabilidad, Buenas Prácticas, Arquitectura Robusta, Metodologías Ágiles.

---

## 3. Estructura de Secciones (Arquitectura de Información)

El sitio es una **Landing Page** de una sola página con navegación fluida:

1.  **Header:** Logo dinámico, enlaces a servicios/enfoque, selector de idioma (ES/EN) y toggle de tema.
2.  **Hero Section:** 
    - Título: "Socios tecnológicos para la transformación digital".
    - Subtítulo: Enfocado en transformar ideas en soluciones inteligentes con IA.
    - CTA: Botones para abrir Chat o Modal de Contacto.
3.  **Quiénes Somos (About):** Breve descripción del equipo, experiencia senior y metodología.
4.  **Servicios:** Grid de 3 pilares:
    - Desarrollo a Medida (Web/Mobile).
    - Arquitectura e Integración (Cloud/APIs).
    - IA Aplicada al Negocio (Agentes/Automatización).
5.  **Diferencial (Approach):** Lista de beneficios clave (Buenas prácticas, IA como acelerador, Tecnología moderna, Equipo senior).
6.  **Footer:** Repetición de navegación, ubicación (Córdoba, Argentina) y derechos reservados.

---

## 4. Componentes Interactivos Clave

- **Chat Assistant:** Un chat en tiempo real (WebSockets) que permite interacción directa con un asistente IA.
- **Modal de Contacto:** 
    - **Campos:** Nombre, Email, Teléfono, Empresa, Descripción.
    - **Identidad:** Incluye el logo de JOJO y un diseño espacioso.
    - **Funcionalidad:** Envío vía SMTP integrado con validación de campos.

---

## 5. Tipografía y Estilo
- **Fuentes:** El sistema utiliza variables para fuentes (Syne para títulos con peso extrabold y DM Sans para cuerpo de texto, según se observa en las clases de los componentes).
- **Estética:** Bordes con radio suave (`0.5rem`), fondos con desenfoque (`backdrop-blur`) en modales y navegación, y animaciones sutiles de entrada (`fade-in`, `slide-in`).

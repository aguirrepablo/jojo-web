import type { ServicePageContent } from "@/components/service-page";

// Condiciones del abono confirmadas por el cliente (2026-10-21): hosting incluido,
// dominio aparte (anual), permanencia mínima de 6 meses, extras por pago único.
// No prometer acá nada que no esté confirmado (ej. cambios mensuales incluidos).
export const paginasWeb: ServicePageContent = {
    slug: "paginas-web",
    metaTitle: "Páginas web en Villa Carlos Paz con abono mensual | JOJO",
    metaDescription: "Páginas web para negocios de Villa Carlos Paz y el Valle de Punilla por un abono mensual con hosting incluido. Rápidas, pensadas para celular, con WhatsApp y listas para Google.",
    serviceName: "Páginas web con abono mensual",
    serviceType: "Diseño y desarrollo de páginas web",
    eyebrow: "Páginas web · Villa Carlos Paz y Punilla",
    title: "Páginas web con abono mensual en Villa Carlos Paz",
    intro: "Tener la web de tu negocio no tiene que significar un pago grande de entrada. Con el abono mensual te armamos la página, la publicamos y la mantenemos online con el hosting incluido. Vos te ocupás de tu negocio; nosotros, de que la web funcione.",
    audience: {
        title: "Para negocios que quieren que los encuentren",
        body: "Cabañas y alojamientos, restaurantes y bares, comercios, profesionales y servicios de Villa Carlos Paz, el Valle de Punilla y Córdoba. Sobre todo en temporada, cuando muchos turistas buscan desde el celular dónde dormir, dónde comer o qué hacer, y le escriben al primero que les responde por WhatsApp.",
    },
    lists: [
        {
            title: "Qué incluye el plan básico",
            items: [
                "Diseño y armado de la web de tu negocio",
                "Hosting incluido en el abono",
                "Pensada primero para celular",
                "Botón de WhatsApp para que te escriban directo",
                "Preparada para Google: títulos, descripciones y velocidad cuidados",
            ],
        },
        {
            title: "Cómo se cobra",
            items: [
                "Abono mensual, sin un pago grande de entrada",
                "Permanencia mínima de 6 meses",
                "El dominio (tu .com o .com.ar) se paga aparte, una vez al año",
                "Si necesitás algo más que el plan básico, se suma un único pago extra",
                "Los proyectos muy personalizados se cotizan a medida",
            ],
        },
    ],
    steps: {
        title: "Cómo trabajamos",
        items: [
            {
                title: "Charlamos",
                description: "Nos contás cómo es tu negocio y qué querés lograr con la web. Si estás en Carlos Paz o alrededores, nos juntamos en persona.",
            },
            {
                title: "Armamos tu web",
                description: "Te mostramos una primera versión y la ajustamos con lo que nos digas, hasta que quede como la querés.",
            },
            {
                title: "La publicamos",
                description: "Queda online con tu dominio, rápida desde el celular y lista para que te encuentren en Google.",
            },
            {
                title: "Seguimos cerca",
                description: "Hablás siempre con quien hizo tu web. Sin call centers ni tickets: le escribís a la misma persona.",
            },
        ],
    },
    closing: {
        title: "¿Por qué abono y no pago único?",
        body: "Con el abono no tenés que poner todo de entrada, y la web no queda abandonada después de publicarla: el hosting está incluido y siempre sabés a quién escribirle. Es la forma más simple de tener una web profesional sin preocuparte por la parte técnica.",
    },
    related: {
        text: "¿Necesitás algo más que una web? También hacemos sistemas de turnos y reservas, automatizaciones y asistentes de WhatsApp con inteligencia artificial.",
        link: "Ver todos los servicios",
        href: "/#servicios",
    },
    faq: {
        eyebrow: "FAQ",
        title: "Preguntas sobre páginas web",
        subtitle: "Lo que más nos consultan antes de arrancar con una web.",
        items: [
            {
                q: "¿Cuánto cuesta una página web con abono?",
                a: "Depende de lo que necesites. El plan básico se paga por mes y tiene el hosting incluido; si querés algo más que el básico se suma un único pago extra, y lo muy personalizado lo cotizamos a medida. Escribinos y te pasamos el valor actualizado.",
            },
            {
                q: "¿El dominio está incluido?",
                a: "No. El dominio (tu .com o .com.ar) se paga aparte, una vez al año, porque se renueva de forma anual. El hosting sí está incluido en el abono mensual.",
            },
            {
                q: "¿Hay permanencia mínima?",
                a: "Sí, el plan básico tiene una permanencia mínima de 6 meses.",
            },
            {
                q: "¿Mi web va a aparecer en Google?",
                a: "La armamos preparada para Google: rápida, pensada para celular y con títulos y descripciones cuidados. Nadie puede garantizarte el primer puesto, pero sí que la web tenga todo lo necesario para competir. Para búsquedas locales también ayuda mucho tener completo el perfil de tu negocio en Google.",
            },
            {
                q: "¿Trabajan solo en Villa Carlos Paz?",
                a: "No. Estamos en Villa Carlos Paz y trabajamos con negocios de todo el Valle de Punilla, como Cosquín, La Falda, Tanti, Icho Cruz o San Antonio de Arredondo, y de Córdoba capital. Con el resto del país trabajamos por videollamada.",
            },
        ],
    },
    cta: {
        title: "¿Arrancamos tu web?",
        body: "Contanos qué hace tu negocio y te decimos cómo sería tu página.",
        whatsapp: "Escribinos por WhatsApp",
        whatsappText: "Hola JOJO, quiero info sobre páginas web con abono mensual",
    },
};

import type { Metadata } from "next";
import type { ServicePageContent } from "@/components/service-page";
import { SITE_URL } from "@/lib/site";

const OG_IMAGE = `${SITE_URL}/og.png`;

export const serviceUrl = (content: ServicePageContent) => `${SITE_URL}/${content.slug}`;

export function serviceMetadata(content: ServicePageContent): Metadata {
  const url = serviceUrl(content);
  return {
    title: { absolute: content.metaTitle },
    description: content.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "es_AR",
      url,
      siteName: "JOJO",
      title: content.metaTitle,
      description: content.metaDescription,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "JOJO" }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
      images: [OG_IMAGE],
    },
  };
}

export function serviceJsonLd(content: ServicePageContent) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": content.serviceName,
      "description": content.metaDescription,
      "url": serviceUrl(content),
      "serviceType": content.serviceType,
      "provider": { "@type": "ProfessionalService", "name": "JOJO", "url": SITE_URL },
      "areaServed": ["Villa Carlos Paz", "Valle de Punilla", "Córdoba"],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": content.faq.items.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a }
      }))
    },
  ];
}

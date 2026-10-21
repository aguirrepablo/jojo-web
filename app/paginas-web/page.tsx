import type { Metadata } from "next";
import { getDictionary } from "@/app/get-dictionary";
import { ServicePage } from "@/components/service-page";
import { paginasWeb as content } from "@/content/paginas-web";
import { SITE_URL } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/${content.slug}`;
const OG_IMAGE = `${SITE_URL}/og.png`;

export function generateMetadata(): Metadata {
  return {
    title: { absolute: content.metaTitle },
    description: content.metaDescription,
    alternates: { canonical: PAGE_URL },
    openGraph: {
      type: "website",
      locale: "es_AR",
      url: PAGE_URL,
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

export default async function Page() {
  const dict = await getDictionary();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": content.serviceName,
            "description": content.metaDescription,
            "url": PAGE_URL,
            "serviceType": "Diseño y desarrollo de páginas web",
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
        ]) }}
      />
      <ServicePage dict={dict} content={content} />
    </>
  );
}

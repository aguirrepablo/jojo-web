import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { getDictionary } from "./get-dictionary";
import { SITE_URL } from "@/lib/site";

// Familia unica del sistema — sustituto libre de Mori (ver docs/desing_new/DESIGN.md)
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const OG_IMAGE = `${SITE_URL}/og.png`;

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.metadata.title,
      template: `%s | ${dict.metadata.title}`,
    },
    description: dict.metadata.description,
    openGraph: {
      type: "website",
      locale: 'es_AR',
      url: SITE_URL,
      siteName: "JOJO",
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "JOJO",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const dict = await getDictionary();

  return (
    <html lang="es">
      <body className={`${dmSans.variable} antialiased`}>
        <Providers>
          {gaMeasurementId && (
            <>
              {/* Google Analytics Script */}
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}></script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gaMeasurementId}');
                  `,
                }}
              />
            </>
          )}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "JOJO",
              "url": SITE_URL,
              "logo": `${SITE_URL}/logo.png`,
              "image": OG_IMAGE,
              "description": dict.metadata.description,
              "email": "hola@jojo.ar",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Villa Carlos Paz",
                "addressRegion": "Córdoba",
                "addressCountry": "AR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+54-9-3541-61-8385",
                "email": "hola@jojo.ar",
                "contactType": "customer service",
                "areaServed": ["AR", "US", "LATAM"],
                "availableLanguage": ["es", "en"]
              },
              "areaServed": ["Villa Carlos Paz", "Valle de Punilla", "Córdoba", "AR", "LATAM", "US", "EU"],
              "knowsAbout": [
                "Custom Software Development",
                "Software Architecture",
                "Microservices",
                "Cloud Computing",
                "DevOps",
                "Artificial Intelligence",
                "LLM Orchestration",
                "Next.js",
                "TypeScript"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servicios de JOJO",
                "itemListElement": [
                  dict.services.items.customDevelopment.title,
                  dict.services.items.architecture.title,
                  dict.services.items.ai.title,
                  dict.services.items.web.title
                ].map((name) => ({
                  "@type": "Offer",
                  "itemOffered": { "@type": "Service", "name": name }
                }))
              },
              "sameAs": [
                "https://www.linkedin.com/in/paguirre90/"
              ],
              "priceRange": "$$"
            }) }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}

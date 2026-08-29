import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "../globals.css";
import { getDictionary } from "../get-dictionary";

// Familia unica del sistema — sustituto libre de Mori (ver docs/desing_new/DESIGN.md)
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteConfig = {
  url: "https://jojo.ar/",
  ogImage: "https://jojo.ar/og.svg",
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dict.metadata.title,
      template: `%s | ${dict.metadata.title}`,
    },
    description: dict.metadata.description,
    keywords: [
      "Desarrollo de Software",
      "Inteligencia Artificial",
      "Consultora de Software",
      "Socios tecnológicos",
      "Next.js",
      "React",
      ".NET",
      "NestJS",
      "Transformación Digital",
      "Argentina",
      "Córdoba",
      "Software a medida",
      "Software Development",
      "Artificial Intelligence",
      "Software Consultancy",
      "Technology Partners",
      "Digital Transformation",
      "Custom Software"
    ],
    alternates: {
      canonical: `${siteConfig.url}${lang}`,
      languages: {
        'es-AR': 'https://jojo.ar/es',
        'en-US': 'https://jojo.ar/en',
        'x-default': 'https://jojo.ar/es',
      },
    },
    openGraph: {
      type: "website",
      locale: lang === 'es' ? 'es_AR' : 'en_US',
      url: `${siteConfig.url}${lang}`,
      siteName: "JOJO",
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: [
        {
          url: siteConfig.ogImage,
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
      images: [siteConfig.ogImage],
    },
    icons: {
      icon: "/favicon.ico",
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

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
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
              "url": siteConfig.url,
              "logo": `${siteConfig.url}/assets/svg/jojo_logo_dark.svg`,
              "image": siteConfig.ogImage,
              "description": dict.metadata.description,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Villa Carlos Paz",
                "addressRegion": "Córdoba",
                "addressCountry": "AR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+54-9-3541-214876",
                "contactType": "customer service",
                "areaServed": ["AR", "US", "LATAM"],
                "availableLanguage": ["es", "en"]
              },
              "areaServed": ["AR", "LATAM", "US", "EU"],
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
                "name": lang === "es" ? "Servicios de JOJO" : "JOJO Services",
                "itemListElement": [
                  dict.services.items.customDevelopment.title,
                  dict.services.items.architecture.title,
                  dict.services.items.ai.title
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": dict.faq.items.map((item) => ({
                "@type": "Question",
                "name": item.q,
                "acceptedAnswer": { "@type": "Answer", "text": item.a }
              }))
            }) }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}

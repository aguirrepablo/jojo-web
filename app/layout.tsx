import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteConfig = {
  name: "JOJO - Socios tecnológicos para la transformación digital",
  url: "https://jojo.ar", // Reemplazar con tu dominio final
  description: "Transformamos ideas en soluciones digitales inteligentes. Desarrollamos software a medida con arquitecturas modernas, implementando buenas prácticas de la industria y potenciando cada proyecto con Inteligencia Artificial. Tu socio tecnológico para escalar y profesionalizar tu negocio.",
  ogImage: "https://jojo.ar/og.svg", // Reemplazar con la URL de tu imagen para redes sociales
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
    "Software a medida"
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
              "name": siteConfig.name,
              "url": siteConfig.url,
              "logo": `${siteConfig.url}/assets/svg/jojo_logo_dark.svg`,
              "image": siteConfig.ogImage,
              "description": siteConfig.description,
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
                "areaServed": "AR",
                "availableLanguage": ["es", "en"]
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

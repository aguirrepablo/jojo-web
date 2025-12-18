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
  name: "JOJO - Consultora de Software",
  url: "https://jojo.ar", // Reemplazar con tu dominio final
  description: "Consultora de software especializada en desarrollo a medida, integración de sistemas y soluciones de inteligencia artificial para empresas que buscan transformación digital.",
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
    "Next.js",
    "React",
    ".NET",
    "NestJS",
    "Transformación Digital",
  ],
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
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": siteConfig.name,
            "url": siteConfig.url,
            "logo": `${siteConfig.url}/assets/svg/jojo_logo_dark.svg`, // o la versión light
            "description": siteConfig.description,
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+54-9-3541-214876",
              "contactType": "Customer Service"
            }
          }) }}
        />
        {children}
      </body>
    </html>
  );
}

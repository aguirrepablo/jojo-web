import type { Metadata } from "next";
import { getDictionary } from "@/app/get-dictionary";
import { HomePage } from "@/components/home-page";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

export default async function Page() {
  const dict = await getDictionary();

  return (
    <>
      {/* FAQPage va por página: el marcado tiene que coincidir con las preguntas visibles */}
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
      <HomePage dict={dict} />
    </>
  );
}

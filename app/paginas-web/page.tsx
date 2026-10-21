import { getDictionary } from "@/app/get-dictionary";
import { ServicePage } from "@/components/service-page";
import { paginasWeb as content } from "@/content/paginas-web";
import { serviceJsonLd, serviceMetadata } from "@/lib/service-seo";

export const generateMetadata = () => serviceMetadata(content);

export default async function Page() {
  const dict = await getDictionary();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(content)) }}
      />
      <ServicePage dict={dict} content={content} />
    </>
  );
}

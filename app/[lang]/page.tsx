import { getDictionary } from "@/app/get-dictionary";
import { HomePage } from "@/components/home-page";

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <HomePage dict={dict} lang={lang} />;
}

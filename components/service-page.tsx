"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Faq } from "@/components/faq";
import { ContactModal } from "@/components/contact-modal";
import { ScrollProvider } from "@/components/scroll-provider";
import { Dictionary } from "@/dictionaries/es";

export interface ServicePageContent {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  serviceName: string;
  eyebrow: string;
  title: string;
  intro: string;
  audience: { title: string; body: string };
  lists: { title: string; items: string[] }[];
  steps: { title: string; items: { title: string; description: string }[] };
  closing: { title: string; body: string };
  related: { text: string; link: string; href: string };
  faq: Dictionary["faq"];
  cta: { title: string; body: string; whatsapp: string; whatsappText: string };
}

interface ServicePageProps {
  dict: Dictionary;
  content: ServicePageContent;
}

const WHATSAPP_NUMBER = "5493541618385";

export function ServicePage({ dict, content }: ServicePageProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(content.cta.whatsappText)}`;

  return (
    <div className="min-h-screen">
      <Header dict={dict} />
      <ScrollProvider>
        <main>
          <section className="relative overflow-hidden px-4 pb-16 pt-40 sm:px-8">
            <span aria-hidden className="blob left-[-10%] top-[8%] h-[60vmin] w-[60vmin]" />
            <div className="relative z-10 mx-auto max-w-wide">
              <span className="eyebrow">{content.eyebrow}</span>
              <h1 className="display mt-6 max-w-5xl text-[clamp(2.75rem,8vw,6.5rem)]">
                {content.title}
              </h1>
              <p className="mt-8 max-w-2xl text-body-lg text-surface-50">{content.intro}</p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <button onClick={() => setIsContactOpen(true)} className="pill pill-cta">
                  {dict.hero.cta}
                </button>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="pill">
                  {content.cta.whatsapp}
                </a>
              </div>
            </div>
          </section>

          <section className="section-y">
            <div className="mx-auto max-w-content px-4 sm:px-8">
              <h2 className="display text-[clamp(2rem,5vw,3.5rem)]">{content.audience.title}</h2>
              <p className="mt-6 max-w-2xl text-body-lg text-surface-50">{content.audience.body}</p>

              <div className="mt-20 grid gap-12 md:grid-cols-2">
                {content.lists.map((list) => (
                  <div key={list.title}>
                    <h2 className="text-subheading text-surface-cream">{list.title}</h2>
                    <ul className="mt-6">
                      {list.items.map((item) => (
                        <li key={item} className="hairline-t py-4 text-body text-surface-50">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-y hairline-t">
            <div className="mx-auto max-w-wide px-4 sm:px-8">
              <h2 className="display text-[clamp(2rem,5vw,3.5rem)]">{content.steps.title}</h2>
              <ol className="hairline-b mt-16 flex flex-col">
                {content.steps.items.map((step, i) => (
                  <li key={step.title} className="hairline-t grid gap-4 py-10 lg:grid-cols-12 lg:gap-10">
                    <span className="display text-[clamp(2rem,4vw,3rem)] leading-none text-surface-50 lg:col-span-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-subheading text-surface-cream lg:col-span-4">{step.title}</h3>
                    <p className="max-w-xl text-body text-surface-50 lg:col-span-6">{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="section-y">
            <div className="mx-auto max-w-content px-4 sm:px-8">
              <h2 className="display text-[clamp(2rem,5vw,3.5rem)]">{content.closing.title}</h2>
              <p className="mt-6 max-w-2xl text-body-lg text-surface-50">{content.closing.body}</p>
              <p className="mt-10 max-w-2xl text-body text-surface-50">
                {content.related.text}{" "}
                <Link href={content.related.href} className="text-coral-bright underline underline-offset-4">
                  {content.related.link}
                </Link>
              </p>
            </div>
          </section>

          <Faq faq={content.faq} />

          <section className="section-y hairline-t">
            <div className="mx-auto max-w-content px-4 text-center sm:px-8">
              <h2 className="display text-[clamp(2.25rem,6vw,4.75rem)]">{content.cta.title}</h2>
              <p className="mx-auto mt-6 max-w-xl text-body-lg text-surface-50">{content.cta.body}</p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <button onClick={() => setIsContactOpen(true)} className="pill pill-cta">
                  {dict.hero.cta}
                </button>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="pill">
                  {content.cta.whatsapp}
                </a>
              </div>
            </div>
          </section>

          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
            dict={dict}
          />
        </main>
      </ScrollProvider>
      <Footer dict={dict} />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { Approach } from "@/components/approach";
import { Services } from "@/components/services";
import { Faq } from "@/components/faq";
import { About } from "@/components/about";
import { Chat } from "@/components/chat";
import { ContactModal } from "@/components/contact-modal";
import { ScrollProvider } from "@/components/scroll-provider";
import { Dictionary } from "@/dictionaries/es";

interface HomePageProps {
  dict: Dictionary;
  lang: string;
}

export function HomePage({ dict, lang }: HomePageProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const showChat = process.env.NEXT_PUBLIC_CHAT_FEATURE_FLAG === "true";

  const openContact = () => setIsContactOpen(true);

  return (
    <div className="min-h-screen">
      <Header dict={dict} lang={lang} />
      <ScrollProvider>
        <main>
          <Hero
            onOpenChat={() => setIsChatOpen(true)}
            onOpenContact={openContact}
            dict={dict}
          />
          {showChat && (
            <Chat
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
              dict={dict}
            />
          )}
          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
            dict={dict}
            lang={lang}
          />
          <About dict={dict} />
          <Services dict={dict} onOpenContact={openContact} />
          <Approach dict={dict} onOpenContact={openContact} />
          <Faq dict={dict} />
        </main>
      </ScrollProvider>
      <Footer dict={dict} />
    </div>
  );
}

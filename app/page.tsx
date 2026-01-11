"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { Approach } from "@/components/approach";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { useTheme } from "@/hooks/useTheme";
import { Chat } from "@/components/chat";

export default function Page() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const showChat = process.env.NEXT_PUBLIC_CHAT_FEATURE_FLAG === "true";

  return (
    <div className="min-h-screen">
      <Header onToggleTheme={toggleTheme} currentTheme={resolvedTheme} />
      <main>
        <Hero onOpenChat={() => setIsChatOpen(true)} />
        {showChat && <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
        <About />
        <Services />
        <Approach />
      </main>
      <Footer currentTheme={resolvedTheme} />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Hero } from "@/components/hero";
import { HomeHighlights } from "@/components/home-highlights";
import { About } from "@/components/about";
import { Chat } from "@/components/chat";

export default function Page() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const showChat = process.env.NEXT_PUBLIC_CHAT_FEATURE_FLAG === "true";

  return (
    <>
      <Hero onOpenChat={() => setIsChatOpen(true)} />
      {showChat && <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
      <About />
      <HomeHighlights />
    </>
  );
}

"use client";

import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { Approach } from "@/components/approach";
import { Services } from "@/components/services";
import { useTheme } from "@/hooks/useTheme";

export default function Page() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen">
      <Header onToggleTheme={toggleTheme} currentTheme={resolvedTheme} />
      <main>
        <Hero />
        {/* <ChatSection />
        
       */}
       <Services />
       <Approach />
      </main>
      <Footer currentTheme={resolvedTheme} />
    </div>
  );
}

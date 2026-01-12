"use client"; // 1. Obligatorio para componentes con interactividad (onClick)

import Link from "next/link";
import Image from "next/image";
import { Menu, Sun, Moon } from 'lucide-react';
import { Button } from "./ui/button";
import { useRef } from "react";
import { Dictionary } from "@/dictionaries/es";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  onToggleTheme: () => void;
  currentTheme: "light" | "dark";
  dict: Dictionary;
  lang: string;
}

export function Header({ onToggleTheme, currentTheme, dict, lang }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace(/.*#/, "");
    const elem = document.getElementById(targetId);
    if (elem) {
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      const targetPosition = elem.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  const toggleLanguage = () => {
    const newLang = lang === 'es' ? 'en' : 'es';
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/100">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href={`/${lang}#home`} onClick={(e) => handleScroll(e, "#home")} aria-label="Ir al inicio">
            <Image
              src={currentTheme === 'dark' ? '/assets/svg/jojo_logo_dark.svg' : '/assets/svg/jojo_logo_light.svg'}
              alt="JOJO Logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain cursor-pointer"
              priority
            />
          </Link>
        </div>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center space-x-6 absolute left-1/2 -translate-x-1/2">
          <Link
            href="#servicios"
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => handleScroll(e, "#servicios")}
          >
            {dict.header.services}
          </Link>
          <Link
            href="#enfoque"
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => handleScroll(e, "#enfoque")}
          >
            {dict.header.focus}
          </Link>
        </nav>

        {/* Botones de acción */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            aria-label="Switch Language"
          >
            <span className="text-sm font-bold">{lang === 'es' ? 'EN' : 'ES'}</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            aria-label="Cambiar tema"
          >
            {currentTheme === "dark" ? (
              <Sun className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Abrir menú"
            onClick={() => {
              // TODO: Implement mobile menu toggle functionality
            }}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
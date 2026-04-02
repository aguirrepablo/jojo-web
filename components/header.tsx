"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Sun, Moon, X } from 'lucide-react';
import { Button } from "./ui/button";
import { useRef, useState } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    const newLang = lang === 'es' ? 'en' : 'es';
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
    setIsMenuOpen(false);
  };

  return (
    <header ref={headerRef} className="fixed top-0 z-50 w-full bg-surface/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1440px] mx-auto flex h-20 items-center justify-between px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link 
            href={`/${lang}#home`} 
            onClick={(e) => handleScroll(e, "#home")} 
            className="flex items-center"
            aria-label="JOJO Home"
          >
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
        <nav className="hidden md:flex items-center space-x-10 absolute left-1/2 -translate-x-1/2">
          <Link
            href="#servicios"
            className="font-headline tracking-widest uppercase text-on-surface/60 font-medium hover:text-primary transition-colors duration-300 text-xs"
            onClick={(e) => handleScroll(e, "#servicios")}
          >
            {dict.header.services}
          </Link>
          <Link
            href="#enfoque"
            className="font-headline tracking-widest uppercase text-on-surface/60 font-medium hover:text-primary transition-colors duration-300 text-xs"
            onClick={(e) => handleScroll(e, "#enfoque")}
          >
            {dict.header.focus}
          </Link>
        </nav>

        {/* Botones de acción */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="font-headline tracking-widest text-xs font-bold hover:text-primary transition-colors"
              aria-label="Switch Language"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleTheme}
              className="text-on-surface/60 hover:text-primary transition-colors"
              aria-label="Cambiar tema"
            >
              {currentTheme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          <Button
            className="hidden md:flex bg-on-surface text-surface font-headline font-bold px-6 py-2 rounded-md text-xs tracking-widest uppercase hover:bg-primary transition-colors border-none"
            onClick={() => {
              const contactBtn = document.querySelector('[data-contact-trigger]');
              if (contactBtn instanceof HTMLElement) contactBtn.click();
            }}
          >
            {dict.header.contact}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Menú Móvil */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-surface z-[100] flex flex-col p-8 space-y-12 animate-in slide-in-from-top-2 overflow-y-auto h-[calc(100vh-80px)]">
          <nav className="flex flex-col space-y-8">
            <Link
              href="#servicios"
              className="font-headline text-4xl font-black uppercase tracking-tighter border-b border-white/5 pb-6"
              onClick={(e) => handleScroll(e, "#servicios")}
            >
              {dict.header.services}
            </Link>
            <Link
              href="#enfoque"
              className="font-headline text-4xl font-black uppercase tracking-tighter border-b border-white/5 pb-6"
              onClick={(e) => handleScroll(e, "#enfoque")}
            >
              {dict.header.focus}
            </Link>
          </nav>
          
          <div className="flex flex-col space-y-8 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.3em] font-headline font-bold text-on-surface/40">{dict.header.settings}</span>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="font-headline font-bold tracking-widest text-xs"
                >
                  {lang === 'es' ? 'ENGLISH' : 'ESPAÑOL'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onToggleTheme}
                  className="flex items-center space-x-2"
                >
                  {currentTheme === "dark" ? (
                    <><Sun className="h-4 w-4" /> <span>Light</span></>
                  ) : (
                    <><Moon className="h-4 w-4" /> <span>Dark</span></>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

"use client"; // 1. Obligatorio para componentes con interactividad (onClick)

import Link from "next/link";
import Image from "next/image";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useRef } from "react";

interface HeaderProps {
  onToggleTheme: () => void;
  currentTheme: "light" | "dark";
}

export function Header({ onToggleTheme, currentTheme }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);

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

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/100">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="#home" onClick={(e) => handleScroll(e, "#home")}>
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
            Servicios
          </Link>
          <Link
            href="#enfoque"
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => handleScroll(e, "#enfoque")}
          >
            Enfoque
          </Link>
        </nav>

        {/* Botones de acción */}
        <div className="flex items-center space-x-4">
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
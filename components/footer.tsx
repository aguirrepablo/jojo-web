"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Dictionary } from "@/dictionaries/es";

interface FooterProps {
    currentTheme: 'light' | 'dark';
    dict: Dictionary;
    onOpenContact: () => void;
}

export function Footer({ currentTheme, dict, onOpenContact }: FooterProps) {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace(/.*#/, "");
        const elem = document.getElementById(targetId);
        if (elem) {
            const header = document.querySelector('header');
            const headerHeight = header?.offsetHeight ?? 0;
            const targetPosition = elem.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <footer className="relative w-full py-24 bg-surface border-t border-white/5">
            <div className="max-w-[1440px] mx-auto px-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center">
                            <Image
                                src={currentTheme === 'dark' ? '/assets/svg/jojo_logo_dark.svg' : '/assets/svg/jojo_logo_light.svg'}
                                alt="JOJO Logo"
                                width={40}
                                height={40}
                                className="h-10 w-10 object-contain"
                            />
                        </div>
                        <p className="text-on-surface-variant max-w-sm text-sm font-light leading-relaxed">
                            {dict.footer.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
                        <div className="flex flex-col gap-6">
                            <span className="text-[10px] uppercase tracking-[0.3em] font-headline font-bold text-on-surface/40">
                                {dict.footer.services_title}
                            </span>
                            <ul className="flex flex-col gap-4">
                                <li>
                                    <Link
                                        href="#servicios"
                                        onClick={(e) => handleScroll(e, "#servicios")}
                                        className="text-on-surface/60 hover:text-primary font-headline text-[11px] tracking-[0.2em] uppercase transition-colors"
                                    >
                                        {dict.footer.links.customDevelopment}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#servicios"
                                        onClick={(e) => handleScroll(e, "#servicios")}
                                        className="text-on-surface/60 hover:text-primary font-headline text-[11px] tracking-[0.2em] uppercase transition-colors"
                                    >
                                        {dict.footer.links.architecture}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#servicios"
                                        onClick={(e) => handleScroll(e, "#servicios")}
                                        className="text-on-surface/60 hover:text-primary font-headline text-[11px] tracking-[0.2em] uppercase transition-colors"
                                    >
                                        {dict.footer.links.ai}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-6">
                            <span className="text-[10px] uppercase tracking-[0.3em] font-headline font-bold text-on-surface/40">
                                {dict.footer.contact_title}
                            </span>
                            <ul className="flex flex-col gap-4">
                                <li>
                                    <button 
                                        onClick={onOpenContact} 
                                        className="text-on-surface/60 hover:text-primary font-headline text-[11px] tracking-[0.2em] uppercase transition-colors text-left"
                                    >
                                        {dict.footer.cta}
                                    </button>
                                </li>
                                <li>
                                    <a 
                                        href="https://www.linkedin.com/in/paguirre90/" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-on-surface/60 hover:text-primary font-headline text-[11px] tracking-[0.2em] uppercase transition-colors"
                                    >
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-6 hidden md:flex">
                            <span className="text-[10px] uppercase tracking-[0.3em] font-headline font-bold text-on-surface/40">
                                Ubicación
                            </span>
                            <p className="text-on-surface/60 font-headline text-[11px] tracking-[0.2em] uppercase">
                                {dict.footer.location}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
                    <div className="text-on-surface/40 font-headline text-[10px] tracking-[0.3em] uppercase">
                        {dict.footer.rights}
                    </div>
                    {/* <div className="flex flex-wrap justify-center gap-12">
                        <a className="text-on-surface/40 hover:text-primary font-headline text-[10px] tracking-[0.3em] uppercase transition-colors" href="#">Privacy</a>
                        <a className="text-on-surface/40 hover:text-primary font-headline text-[10px] tracking-[0.3em] uppercase transition-colors" href="#">Security</a>
                        <a className="text-on-surface/40 hover:text-primary font-headline text-[10px] tracking-[0.3em] uppercase transition-colors" href="#">Manifesto</a>
                    </div> */}
                </div>
            </div>
        </footer>
    );
}

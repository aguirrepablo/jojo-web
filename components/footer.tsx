"use client";

import { Separator } from './ui/separator';
import Image from 'next/image';
import Link from 'next/link';
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
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <Image
                                src={currentTheme === 'dark' ? '/assets/svg/jojo_logo_dark.svg' : '/assets/svg/jojo_logo_light.svg'}
                                alt="JOJO"
                                className="h-9 w-9"
                                width={36}  // required
                                height={36} // required
                            />
                        </div>
                        <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                            {dict.footer.description}
                        </p>
                        <p>
                            {dict.footer.location}
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold text-foreground">{dict.footer.services_title}</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link
                                    href="#servicios"
                                    onClick={(e) => handleScroll(e, "#servicios")}
                                    className="hover:text-foreground transition-colors"
                                >
                                    {dict.footer.links.customDevelopment}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#servicios"
                                    onClick={(e) => handleScroll(e, "#servicios")}
                                    className="hover:text-foreground transition-colors"
                                >
                                    {dict.footer.links.architecture}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#servicios"
                                    onClick={(e) => handleScroll(e, "#servicios")}
                                    className="hover:text-foreground transition-colors"
                                >
                                    {dict.footer.links.ai}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#enfoque"
                                    onClick={(e) => handleScroll(e, "#enfoque")}
                                    className="hover:text-foreground transition-colors"
                                >
                                    {dict.footer.links.focus}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold text-foreground">{dict.footer.contact_title}</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <button 
                                    onClick={onOpenContact} 
                                    className="hover:text-foreground transition-colors cursor-pointer text-left"
                                >
                                    {dict.footer.cta}
                                </button>
                            </li>
                            <li><a href="https://www.linkedin.com/in/paguirre90/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                        {dict.footer.rights}
                    </p>
                    {/* <div className="flex space-x-6 text-sm text-muted-foreground">
                        <a href="#" className="hover:text-foreground transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-foreground transition-colors">Términos</a>
                    </div> */}
                </div>
            </div>
        </footer>
    );
}
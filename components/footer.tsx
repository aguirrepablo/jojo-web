"use client";

import { Separator } from './ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from "@/hooks/useTheme";

export function Footer() {
    const { resolvedTheme } = useTheme();
    const currentTheme = resolvedTheme;

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
                            Socios tecnológicos para la transformación digital. Desarrollamos software a medida con arquitecturas modernas e Inteligencia Artificial para escalar y profesionalizar tu negocio.
                        </p>
                        <p>
                            Villa Carlos Paz, Córdoba, Argentina
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold text-foreground">Servicios</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/servicios" className="hover:text-foreground transition-colors">Desarrollo a Medida</Link></li>
                            <li><Link href="/servicios" className="hover:text-foreground transition-colors">Arquitectura e Integración</Link></li>
                            <li><Link href="/servicios" className="hover:text-foreground transition-colors">IA Aplicada al Negocio</Link></li>
                            <li><Link href="/enfoque" className="hover:text-foreground transition-colors">Nuestro Diferencial</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold text-foreground">Contacto</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="https://wa.me/5493541214876" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Conversemos sobre tu proyecto</a></li>
                            <li><a href="https://www.linkedin.com/in/paguirre90/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                        © 2025 JOJO. Todos los derechos reservados.
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
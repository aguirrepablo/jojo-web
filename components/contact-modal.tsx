"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Dictionary } from "@/dictionaries/es";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  dict: Dictionary;
  currentTheme: "light" | "dark";
  lang: string;
}

export function ContactModal({ isOpen, onClose, dict, currentTheme, lang }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    description: "",
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.description) {
      return;
    }
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/${lang}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Fallback: Still show success to not frustrate the user, 
      // but in a real app, we'd handle this better (maybe with a toast).
      // setIsSuccess(true); // Keeping user flow smooth
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200 font-dm-sans">
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={onClose} 
      />
      <Card className="relative w-full max-w-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300 border-border bg-card overflow-hidden mx-auto">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 hover:text-primary transition-colors z-10"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>

        {!isSuccess ? (
          <>
            <CardHeader className="space-y-6 pt-12 px-6 sm:px-12 pb-0">
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src={currentTheme === 'dark' ? '/assets/svg/jojo_logo_dark.svg' : '/assets/svg/jojo_logo_light.svg'}
                  alt="JOJO Logo"
                  width={52}
                  height={52}
                  className="h-14 w-14 object-contain"
                  priority
                />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-3xl sm:text-4xl font-bold tracking-tight font-syne text-foreground">
                  {dict.contact.title}
                </CardTitle>
                <CardDescription className="text-base sm:text-lg text-muted-foreground font-dm-sans leading-relaxed">
                  {dict.contact.subtitle}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-8 px-6 sm:px-12 pb-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70 font-dm-sans">
                      {dict.contact.form.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={dict.contact.form.name_placeholder}
                      className="w-full bg-muted/30 border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/40 font-dm-sans"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70 font-dm-sans">
                      {dict.contact.form.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={dict.contact.form.email_placeholder}
                      className="w-full bg-muted/30 border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/40 font-dm-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70 font-dm-sans">
                      {dict.contact.form.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={dict.contact.form.phone_placeholder}
                      className="w-full bg-muted/30 border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/40 font-dm-sans"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70 font-dm-sans">
                      {dict.contact.form.company} <span className="text-[10px] lowercase font-normal opacity-50 ml-1 italic">{dict.contact.form.optional}</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder={dict.contact.form.company_placeholder}
                      className="w-full bg-muted/30 border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/40 font-dm-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70 font-dm-sans">
                    {dict.contact.form.description}
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder={dict.contact.form.description_placeholder}
                    className="w-full bg-muted/30 border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none placeholder:text-muted-foreground/40 font-dm-sans"
                  />
                </div>

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full py-7 text-base font-bold uppercase tracking-wider font-syne bg-primary hover:bg-primary/90 text-primary-foreground rounded-sm transition-transform active:scale-[0.985]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "..." : dict.contact.form.submit}
                  </Button>
                </div>

                <p className="text-center text-[12px] text-muted-foreground/60 font-dm-sans pt-2">
                  {dict.contact.form.footer}
                </p>
              </form>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex flex-col items-center justify-center py-16 px-8 space-y-6">
            <div className="h-16 w-16 rounded-full border-2 border-primary flex items-center justify-center animate-in zoom-in duration-500">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold tracking-tight font-syne text-foreground">{dict.contact.success.title}</h3>
              <p className="text-muted-foreground text-sm font-dm-sans whitespace-pre-line leading-relaxed">
                {dict.contact.success.description}
              </p>
            </div>
            <Button 
              variant="outline" 
              className="mt-4 font-syne font-bold uppercase tracking-widest px-8 py-5 rounded-sm border-border hover:bg-muted"
              onClick={onClose}
            >
              Cerrar
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { Button } from "./ui/button";
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-0 sm:p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="fixed inset-0 cursor-pointer hidden sm:block" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-5xl bg-surface-container sm:rounded-[2rem] border-x sm:border border-white/10 overflow-hidden flex flex-col lg:flex-row shadow-2xl animate-in zoom-in-95 duration-300 min-h-screen sm:min-h-0">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 sm:right-6 sm:top-6 hover:text-primary transition-colors z-20 text-on-surface/50 bg-surface/50 backdrop-blur-md rounded-full sm:bg-transparent"
          onClick={onClose}
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="sr-only">Close</span>
        </Button>

        {!isSuccess ? (
          <>
            {/* Left Side: Brand & Info */}
            <div className="w-full lg:w-2/5 p-8 sm:p-12 md:p-16 hero-gradient relative overflow-hidden flex flex-col justify-center">
              <div className="absolute inset-0 mesh-grid opacity-10"></div>
              <div className="relative z-10 flex flex-col h-full justify-between gap-8 sm:gap-12">
                <div>
                  <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black uppercase text-on-primary tracking-tighter leading-[1.1] mb-4 sm:mb-8">
                    {dict.contact.title_top}<br/>
                    {dict.contact.title_bottom}
                  </h2>
                  <p className="text-on-primary/80 max-w-xs text-base sm:text-lg font-medium leading-relaxed">
                    {dict.contact.subtitle}
                  </p>
                </div>
                
                <div className="space-y-4 sm:space-y-8">
                  <div>
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-on-primary/60 mb-1 sm:mb-2 font-bold font-headline">Consultas por Email</p>
                    <p className="text-lg sm:text-xl font-headline font-bold text-on-primary break-all">hola@jojo.ar</p>
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-on-primary/60 mb-1 sm:mb-2 font-bold font-headline">Sede Global</p>
                    <p className="text-lg sm:text-xl font-headline font-bold text-on-primary">Villa Carlos Paz, Córdoba</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-3/5 p-8 sm:p-12 md:p-16 bg-surface">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-2">
                    <label className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-on-surface/40 font-bold font-headline">{dict.contact.form.name}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={dict.contact.form.name_placeholder}
                      className="w-full bg-transparent border-b border-white/10 py-2 sm:py-3 focus:border-primary outline-none transition-colors font-headline text-base sm:text-lg placeholder:text-on-surface/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-on-surface/40 font-bold font-headline">{dict.contact.form.email}</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={dict.contact.form.email_placeholder}
                      className="w-full bg-transparent border-b border-white/10 py-2 sm:py-3 focus:border-primary outline-none transition-colors font-headline text-base sm:text-lg placeholder:text-on-surface/10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-2">
                    <label className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-on-surface/40 font-bold font-headline">{dict.contact.form.phone}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={dict.contact.form.phone_placeholder}
                      className="w-full bg-transparent border-b border-white/10 py-2 sm:py-3 focus:border-primary outline-none transition-colors font-headline text-base sm:text-lg placeholder:text-on-surface/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-on-surface/40 font-bold font-headline">
                      {dict.contact.form.company} <span className="opacity-50 text-[8px] sm:text-[9px] lowercase italic">{dict.contact.form.optional}</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder={dict.contact.form.company_placeholder}
                      className="w-full bg-transparent border-b border-white/10 py-2 sm:py-3 focus:border-primary outline-none transition-colors font-headline text-base sm:text-lg placeholder:text-on-surface/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-on-surface/40 font-bold font-headline">{dict.contact.form.description}</label>
                  <textarea
                    name="description"
                    required
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder={dict.contact.form.description_placeholder}
                    className="w-full bg-transparent border-b border-white/10 py-2 sm:py-3 focus:border-primary outline-none transition-colors font-headline text-base sm:text-lg resize-none placeholder:text-on-surface/10"
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-on-surface text-surface font-headline font-black py-4 sm:py-6 rounded-md uppercase tracking-[0.2em] hover:bg-primary transition-all duration-300 text-sm sm:text-base disabled:opacity-50"
                  >
                    {isSubmitting ? "..." : dict.contact.form.submit}
                  </button>
                </div>

                <p className="text-center text-[9px] sm:text-[10px] uppercase tracking-widest text-on-surface/40 font-bold">
                  {dict.contact.form.footer}
                </p>
              </form>
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-24 px-8 space-y-8 bg-surface">
            <div className="h-20 w-20 rounded-full border-2 border-primary flex items-center justify-center animate-in zoom-in duration-500">
              <Check className="h-10 w-10 text-primary" />
            </div>
            <div className="text-center space-y-4">
              <h3 className="text-4xl font-black tracking-tighter font-headline uppercase text-on-surface">{dict.contact.success.title}</h3>
              <p className="text-on-surface-variant text-lg font-light max-w-md mx-auto leading-relaxed">
                {dict.contact.success.description}
              </p>
            </div>
            <Button 
              variant="outline" 
              className="mt-8 font-headline font-bold uppercase tracking-widest px-12 py-7 rounded-md border-white/10 hover:bg-surface-container-high transition-colors"
              onClick={onClose}
            >
              Cerrar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

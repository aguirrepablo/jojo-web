"use client";

import { useState, useEffect } from "react";
import { X, Check, ArrowRight } from "lucide-react";
import { Dictionary } from "@/dictionaries/es";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  dict: Dictionary;
  lang: string;
}

export function ContactModal({ isOpen, onClose, dict, lang }: ContactModalProps) {
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const label =
    "block font-mono text-[11px] uppercase tracking-[0.14em] text-ash";

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="fixed inset-0 hidden cursor-pointer sm:block" onClick={onClose} />

      <div className="relative flex min-h-screen w-full max-w-4xl flex-col overflow-hidden border-mist bg-paper sm:min-h-0 sm:rounded-2xl sm:border lg:flex-row">
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full border border-mist bg-paper/80 text-charcoal backdrop-blur transition-colors hover:border-coral hover:text-coral-deep sm:right-5 sm:top-5"
        >
          <X size={16} />
        </button>

        {!isSuccess ? (
          <>
            {/* Panel de marca */}
            <div className="flex w-full flex-col justify-between gap-10 bg-dusk p-8 text-white sm:p-12 lg:w-2/5">
              <div>
                <h2 className="display text-[2rem] leading-[1.08] text-white sm:text-[2.4rem]">
                  <span className="block lowercase first-letter:uppercase">
                    {dict.contact.title_top}
                  </span>
                  <span className="block font-normal lowercase text-coral first-letter:uppercase">
                    {dict.contact.title_bottom}
                  </span>
                </h2>
                <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/75">
                  {dict.contact.subtitle}
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
                    Email
                  </p>
                  <p className="mt-1 text-[15px] text-white">hola@jojo.ar</p>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
                    {dict.footer.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="w-full bg-paper p-8 sm:p-12 lg:w-3/5">
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className={label}>{dict.contact.form.name}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={dict.contact.form.name_placeholder}
                      className="field w-full text-[15px] placeholder:text-fog"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={label}>{dict.contact.form.email}</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={dict.contact.form.email_placeholder}
                      className="field w-full text-[15px] placeholder:text-fog"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className={label}>{dict.contact.form.phone}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={dict.contact.form.phone_placeholder}
                      className="field w-full text-[15px] placeholder:text-fog"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={label}>
                      {dict.contact.form.company}{" "}
                      <span className="lowercase text-fog">
                        {dict.contact.form.optional}
                      </span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder={dict.contact.form.company_placeholder}
                      className="field w-full text-[15px] placeholder:text-fog"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className={label}>{dict.contact.form.description}</label>
                  <textarea
                    name="description"
                    required
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder={dict.contact.form.description_placeholder}
                    className="field w-full resize-none text-[15px] placeholder:text-fog"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary mt-2 justify-center py-3 disabled:opacity-50"
                >
                  {isSubmitting ? "…" : dict.contact.form.submit}
                  {!isSubmitting && (
                    <span className="grid h-[18px] w-[18px] place-items-center rounded-full border border-white/25">
                      <ArrowRight size={11} strokeWidth={2} />
                    </span>
                  )}
                </button>

                <p className="text-center font-mono text-[11px] uppercase tracking-[0.12em] text-ash">
                  {dict.contact.form.footer}
                </p>

                {/* Atribución reCAPTCHA — requerida por Google al ocultar el badge */}
                <p className="text-center text-[11px] leading-relaxed text-fog">
                  {lang === "es" ? (
                    <>
                      Protegido por reCAPTCHA; aplican la{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-coral-deep"
                      >
                        Política de Privacidad
                      </a>{" "}
                      y los{" "}
                      <a
                        href="https://policies.google.com/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-coral-deep"
                      >
                        Términos de Servicio
                      </a>{" "}
                      de Google.
                    </>
                  ) : (
                    <>
                      This site is protected by reCAPTCHA and the Google{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-coral-deep"
                      >
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://policies.google.com/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-coral-deep"
                      >
                        Terms of Service
                      </a>{" "}
                      apply.
                    </>
                  )}
                </p>
              </form>
            </div>
          </>
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-7 bg-paper px-8 py-24 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full border border-coral text-coral-deep">
              <Check size={26} />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="display text-[1.9rem] text-graphite">
                {dict.contact.success.title}
              </h3>
              <p className="mx-auto max-w-md whitespace-pre-line text-[15px] leading-relaxed text-ash">
                {dict.contact.success.description}
              </p>
            </div>
            <button onClick={onClose} className="btn btn-dark mt-2">
              {lang === "es" ? "Cerrar" : "Close"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

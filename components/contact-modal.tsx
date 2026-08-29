"use client";

import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const label =
    "block text-caption uppercase tracking-[0.14em] text-surface-50";

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-just-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div
        className="fixed inset-0 hidden cursor-pointer sm:block"
        onClick={onClose}
      />

      <div className="relative flex min-h-screen w-full max-w-4xl flex-col overflow-hidden bg-just-black sm:min-h-0 sm:rounded-[var(--radius-card)] sm:border sm:border-surface-25 lg:flex-row">
        <button
          onClick={onClose}
          aria-label={dict.common.close}
          className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full border border-surface-25 text-surface-cream/70 transition-colors hover:border-surface-cream hover:text-surface-cream sm:right-5 sm:top-5"
        >
          <X size={16} />
        </button>

        {!isSuccess ? (
          <>
            {/* Panel de marca */}
            <div className="flex w-full flex-col justify-between gap-10 bg-off-black p-8 sm:p-12 lg:w-2/5">
              <div>
                <h2 className="display text-[clamp(1.9rem,4vw,2.6rem)] leading-[1.05]">
                  <span className="block lowercase first-letter:uppercase">
                    {dict.contact.title_top}
                  </span>
                  <span className="block lowercase text-coral-bright first-letter:uppercase">
                    {dict.contact.title_bottom}
                  </span>
                </h2>
                <p className="mt-5 max-w-xs text-body-sm text-surface-50">
                  {dict.contact.subtitle}
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-caption uppercase tracking-[0.14em] text-surface-50">
                    Email
                  </p>
                  <p className="mt-1 text-body-sm text-surface-cream">hola@jojo.ar</p>
                </div>
                <div>
                  <p className="text-caption uppercase tracking-[0.14em] text-surface-50">
                    {dict.footer.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="w-full p-8 sm:p-12 lg:w-3/5">
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
                      className="field"
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
                      className="field"
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
                      className="field"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={label}>
                      {dict.contact.form.company}{" "}
                      <span className="lowercase text-surface-25">
                        {dict.contact.form.optional}
                      </span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder={dict.contact.form.company_placeholder}
                      className="field"
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
                    className="field resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="pill pill-cta mt-2 justify-center disabled:opacity-50"
                >
                  {isSubmitting ? "…" : dict.contact.form.submit}
                </button>

                <p className="text-center text-caption uppercase tracking-[0.12em] text-surface-50">
                  {dict.contact.form.footer}
                </p>

                {/* Atribucion reCAPTCHA — requerida por Google al ocultar el badge */}
                <p className="text-center text-[11px] leading-relaxed text-surface-50">
                  {lang === "es" ? (
                    <>
                      Protegido por reCAPTCHA; aplican la{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-coral-bright"
                      >
                        Política de Privacidad
                      </a>{" "}
                      y los{" "}
                      <a
                        href="https://policies.google.com/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-coral-bright"
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
                        className="underline underline-offset-2 hover:text-coral-bright"
                      >
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://policies.google.com/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-coral-bright"
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
          <div className="flex w-full flex-col items-center justify-center gap-7 px-8 py-24 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full border border-coral text-coral-bright">
              <Check size={26} />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="display text-[clamp(1.7rem,4vw,2.2rem)]">
                {dict.contact.success.title}
              </h3>
              <p className="mx-auto max-w-md whitespace-pre-line text-body-sm text-surface-50">
                {dict.contact.success.description}
              </p>
            </div>
            <button onClick={onClose} className="pill pill-sm mt-2">
              {dict.common.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

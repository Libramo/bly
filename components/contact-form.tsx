"use client";

import { useActionState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { submitContact, type ContactFormState } from "@/actions/contact";

const copy = {
  en: {
    eyebrow: "Get in touch",
    title: "Got a problem worth solving?",
    sub: "No pitch, no deck. Just tell us what you want build.",
    name: "Your name",
    email: "Your email",
    message: "What are you building?",
    message_hint:
      "Tell me about your project, timeline, and what kind of help you need.",
    submit: "Send message",
    submitting: "Sending…",
    success_title: "Message sent.",
    success_sub:
      "I'll get back to you within 24 hours. Check your inbox for a confirmation.",
    send_another: "Send another",
    error_generic:
      "Something went wrong. Email contact@blyanalytics.com directly.",
  },
  fr: {
    eyebrow: "Contactez-moi",
    title: "Un problème qui vaut la peine d'être résolu ?",
    sub: "Pas de pitch, pas de deck. Dites-nous ce que vous voulez construire.",
    name: "Votre nom",
    email: "Votre e-mail",
    message: "Que construisez-vous ?",
    message_hint:
      "Parlez-moi de votre projet, votre calendrier et le type d'aide dont vous avez besoin.",
    submit: "Envoyer",
    submitting: "Envoi…",
    success_title: "Message envoyé.",
    success_sub:
      "Je vous répondrai dans les 24 heures. Vérifiez votre boîte mail.",
    send_another: "Envoyer un autre",
    error_generic:
      "Une erreur s'est produite. Écrivez directement à contact@blyanalytics.com",
  },
};

const initialState: ContactFormState = { status: "idle" };

// Shared field base classes — no border-color here, handled via onFocus/onBlur
const fieldBase =
  "w-full bg-[var(--surface)] rounded-[4px] px-[14px] py-3 text-[14px] text-[var(--fg)] font-sans outline-none transition-colors duration-200";

export function ContactForm({ lang = "en" }: { lang?: "en" | "fr" }) {
  const t = copy[lang];
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(submitContact, initialState);

  const handleSubmit = () => {
    const input =
      formRef.current?.querySelector<HTMLInputElement>('input[name="lang"]');
    if (input) input.value = lang;
  };

  const borderColor = (hasError: boolean) =>
    hasError ? "#ff6b6b" : "var(--border)";

  return (
    <AnimatePresence mode="wait">
      {state.status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center px-4 py-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 260,
              damping: 18,
            }}
            className="w-12 h-12 rounded-full border border-[#4f72ff] flex items-center justify-center mx-auto mb-6"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="#4f72ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10l4.5 4.5L16 6" />
            </svg>
          </motion.div>

          <p className="font-serif text-[26px] tracking-[-0.025em] text-[var(--fg)] mb-3">
            {t.success_title}
          </p>
          <p className="text-[14px] text-[var(--muted)] leading-[1.75] max-w-[340px] mx-auto mb-8">
            {t.success_sub}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-[12px] text-[var(--accent)] bg-transparent border border-[var(--accent-subtle)] rounded-[4px] px-4 py-[7px] cursor-pointer"
          >
            {t.send_another}
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <form
            ref={formRef}
            action={action}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <input type="hidden" name="lang" defaultValue={lang} />

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.4 }}
            >
              <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--muted-2)] mb-[7px]">
                {t.name}
              </label>
              <input
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Liban Hassan"
                className={fieldBase}
                style={{
                  border: `1px solid ${borderColor(!!state.errors?.name)}`,
                }}
                onFocus={(e) => (e.target.style.borderColor = "#4f72ff")}
                onBlur={(e) =>
                  (e.target.style.borderColor = borderColor(
                    !!state.errors?.name,
                  ))
                }
              />
              {state.errors?.name && (
                <p className="text-[11px] text-[#ff6b6b] mt-1">
                  {state.errors.name}
                </p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-[#444] mb-[7px]">
                {t.email}
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                className={fieldBase}
                style={{
                  border: `1px solid ${borderColor(!!state.errors?.email)}`,
                }}
                onFocus={(e) => (e.target.style.borderColor = "#4f72ff")}
                onBlur={(e) =>
                  (e.target.style.borderColor = borderColor(
                    !!state.errors?.email,
                  ))
                }
              />
              {state.errors?.email && (
                <p className="text-[11px] text-[#ff6b6b] mt-1">
                  {state.errors.email}
                </p>
              )}
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-[#444] mb-[7px]">
                {t.message}
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder={t.message_hint}
                className={`${fieldBase} resize-y min-h-[120px]`}
                style={{
                  border: `1px solid ${borderColor(!!state.errors?.message)}`,
                }}
                onFocus={(e) => (e.target.style.borderColor = "#4f72ff")}
                onBlur={(e) =>
                  (e.target.style.borderColor = borderColor(
                    !!state.errors?.message,
                  ))
                }
              />
              {state.errors?.message && (
                <p className="text-[11px] text-[#ff6b6b] mt-1">
                  {state.errors.message}
                </p>
              )}
            </motion.div>

            {/* Generic server error */}
            <AnimatePresence>
              {state.status === "error" && state.message && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[13px] text-[#ff6b6b] leading-[1.6]"
                >
                  {state.message}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <motion.button
                type="submit"
                disabled={pending}
                whileHover={pending ? {} : { scale: 1.02 }}
                whileTap={pending ? {} : { scale: 0.97 }}
                className={`text-[13px] font-bold tracking-[0.04em] rounded-[4px] w-full px-6 py-3 border-none flex items-center gap-2 transition-colors duration-200 ${
                  pending
                    ? "bg-[var(--surface)] text-[#444] cursor-not-allowed"
                    : "bg-[#4f72ff] text-white cursor-pointer"
                }`}
              >
                {pending && (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="block w-3 h-3 rounded-full border-2 border-[var(--border)] border-t-[var(--muted)]"
                  />
                )}
                {pending ? t.submitting : t.submit}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

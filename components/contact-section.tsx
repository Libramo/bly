"use client";

import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ContactForm } from "./contact-form";

const copy = {
  en: {
    eyebrow: "Get in touch",
    title: "Got a problem worth solving?",
    sub: "No pitch, no deck. Just tell us what you want to build.",
    alt: "Or email directly:",
  },
  fr: {
    eyebrow: "Contactez-moi",
    title: "Un problème qui vaut la peine d'être résolu ?",
    sub: "Pas de pitch, pas de deck. Dites-nous ce que vous voulez construire.",
    alt: "Ou écrivez directement :",
  },
};

export function ContactSection({ lang = "en" }: { lang?: "en" | "fr" }) {
  const t = copy[lang];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="max-w-230 mx-auto px-10 pt-8 pb-28"
    >
      <div
        // className="grid gap-20 items-start"
        className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-20 items-start"
      >
        {/* Left — heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="sm:sticky sm:top-20"
        >
          <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-(--accent) mb-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={lang + "ey"}
                initial={{ rotateX: -60, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: 60, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="inline-block"
              >
                {t.eyebrow}
              </motion.span>
            </AnimatePresence>
          </p>

          <h2 className="font-serif text-[clamp(24px,3.5vw,38px)] tracking-[-0.025em] text-(--fg) leading-[1.1] mb-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={lang + "ti"}
                initial={{ rotateX: -60, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: 60, opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.05 }}
                className="inline-block"
              >
                {t.title}
              </motion.span>
            </AnimatePresence>
          </h2>

          <p className="text-[14px] text-(--muted) leading-[1.8] mb-8">
            <AnimatePresence mode="wait">
              <motion.span
                key={lang + "su"}
                initial={{ rotateX: -60, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: 60, opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.08 }}
                className="inline-block"
              >
                {t.sub}
              </motion.span>
            </AnimatePresence>
          </p>

          <div className="border-t border-[var(--border)] pt-6">
            <p className="text-[11px] text-[var(--muted-2)] mb-[6px]">
              {t.alt}
            </p>
            <motion.a
              href="mailto:contact@blyanalytics.com"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[13px] font-bold text-[var(--accent)] no-underline border-b border-[var(--accent-subtle)] pb-[2px] inline-block"
            >
              contact@blyanalytics.com
            </motion.a>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <ContactForm lang={lang} />
        </motion.div>
      </div>
    </section>
  );
}

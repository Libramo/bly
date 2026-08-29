"use client";

import { motion } from "motion/react";
import { ContactSection } from "./contact-section";
import FooterSection from "./footer-section";
import { Navbar } from "./navbar";
import type { Lang } from "@/lib/i18n";

const C = {
  en: {
    eyebrow: "Get in touch",
    title: "Contact",
    intro:
      "Bly Analytics is a digital consultancy based in Djibouti, working with governments, clinics, and businesses across East Africa. Tell us what you're building below, or reach us directly at contact@blyanalytics.com.",
  },
  fr: {
    eyebrow: "Contactez-nous",
    title: "Contact",
    intro:
      "Bly Analytics est une agence de conseil numérique basée à Djibouti, qui travaille avec des gouvernements, cliniques et entreprises à travers l'Afrique de l'Est. Dites-nous ce que vous construisez ci-dessous, ou écrivez-nous directement à contact@blyanalytics.com.",
  },
};

function FadeUp({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ContactPage({ lang }: { lang: Lang }) {
  const t = C[lang];

  return (
    <div className="bg-(--bg) text-(--fg) font-sans min-h-screen">
      <Navbar lang={lang} />

      <div className="max-w-230 mx-auto px-8 pt-20">
        <FadeUp>
          <h1 className="font-serif text-[clamp(32px,5vw,52px)] tracking-[-0.03em] text-(--fg) leading-[1.05] mb-5">
            {t.title}
          </h1>
          <p className="text-[16px] text-(--muted) leading-[1.85] max-w-140 mb-4">
            {t.intro}
          </p>
        </FadeUp>
      </div>

      <ContactSection lang={lang} />

      <FooterSection lang={lang} />
    </div>
  );
}

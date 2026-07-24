"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { ContactSection } from "./contact-section";
import FooterSection from "./footer-section";

type Lang = "en" | "fr";

const NAV_COPY = {
  en: { home: "← Home", lang: "FR" },
  fr: { home: "← Accueil", lang: "EN" },
};

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

export function ContactPage() {
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<Lang>(
    (searchParams.get("lang") as Lang) ?? "en",
  );
  const t = C[lang];
  const nav = NAV_COPY[lang];

  return (
    <div className="bg-(--bg) text-(--fg) font-sans min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-40 flex items-center justify-between px-8 h-13.5 border-b border-(--border) bg-(--nav-bg-scrolled) backdrop-blur-[14px]"
      >
        <Link
          href="/"
          className="font-serif text-[21px] tracking-[-0.025em] text-(--fg) no-underline"
        >
          Bly
        </Link>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => setLang((l) => (l === "en" ? "fr" : "en"))}
            className="text-[10px] font-bold tracking-[0.1em] text-[var(--muted)] bg-transparent border border-[var(--border)] rounded-[3px] px-[9px] py-1 cursor-pointer"
          >
            {nav.lang}
          </button>
          <Link
            href="/"
            className="text-[12px] text-(--muted) no-underline border border-(--border) rounded-sm px-3.25 py-1.5"
          >
            {nav.home}
          </Link>
        </div>
      </motion.header>

      <div className="max-w-[720px] mx-auto px-8 pt-20">
        <FadeUp>
          <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--accent)] mb-[0.6rem]">
            {t.eyebrow}
          </p>
          <h1 className="font-serif text-[clamp(32px,5vw,52px)] tracking-[-0.03em] text-[var(--fg)] leading-[1.05] mb-5">
            {t.title}
          </h1>
          <p className="text-[16px] text-[var(--muted)] leading-[1.85] max-w-[560px] mb-4">
            {t.intro}
          </p>
        </FadeUp>
      </div>

      <ContactSection lang={lang} />

      <FooterSection lang={lang} />
    </div>
  );
}

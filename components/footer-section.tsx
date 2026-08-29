"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { localizedHref, type Lang } from "@/lib/i18n";

function Flip({ v, id }: { v: string; id: string }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={id + v}
        initial={{ rotateX: -70, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        exit={{ rotateX: 70, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "inline-block" }}
      >
        {v}
      </motion.span>
    </AnimatePresence>
  );
}

const C = {
  en: {
    footer: "Proudly  Djiboutian.",
    services: "Services",
    contact: "Contact",
  },
  fr: {
    footer: "Fièrement Djiboutien.",
    services: "Services",
    contact: "Contact",
  },
};

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/bly-analytics/",
  },
  { label: "X", href: "https://x.com/" },
];

const FooterSection = ({ lang = "fr" }: { lang?: Lang }) => {
  const { resolvedTheme: theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const t = C[lang];
  return (
    <>
      {/* ── FOOTER ── */}
      <footer className="border-t border-(--border) px-8 py-6 flex items-center justify-between max-w-230 mx-auto">
        <a href={localizedHref(lang, "/")}>
          <Image
            src={
              mounted && theme === "dark" ? "/bly-logo-white.svg" : "/bly-logo-black.svg"
            }
            alt="Bly"
            width={80}
            height={15}
            priority
          />
        </a>

        <div className="flex items-center gap-4">
          <a
            href={localizedHref(lang, "/services")}
            className="text-[12px] text-(--muted-2) hover:text-(--fg) transition-colors duration-200"
          >
            {t.services}
          </a>
          <a
            href={localizedHref(lang, "/contact")}
            className="text-[12px] text-(--muted-2) hover:text-(--fg) transition-colors duration-200"
          >
            {t.contact}
          </a>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-(--muted-2) hover:text-(--fg) transition-colors duration-200"
            >
              {s.label}
            </a>
          ))}
        </div>

        <span className="text-[12px] text-(--muted-2)">
          <Flip v={t.footer} id={"ft" + lang} />
        </span>
      </footer>
    </>
  );
};

export default FooterSection;

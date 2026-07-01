"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

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
  },
  fr: {
    footer: "Fièrement Djiboutien.",
  },
};

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/bly-analytics/",
  },
  { label: "X", href: "https://x.com/" },
];

const FooterSection = ({ lang = "en" }: { lang?: "en" | "fr" }) => {
  const { resolvedTheme: theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const t = C[lang];
  return (
    <>
      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--border)] px-8 py-6 flex items-center justify-between max-w-230 mx-auto">
        <a href={"/"}>
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
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-[var(--muted-2)] hover:text-[var(--fg)] transition-colors duration-200"
            >
              {s.label}
            </a>
          ))}
        </div>

        <span className="text-[12px] text-[var(--muted-2)]">
          <Flip v={t.footer} id={"ft" + lang} />
        </span>
      </footer>
    </>
  );
};

export default FooterSection;

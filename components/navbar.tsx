"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "./theme-toggle";
import { useTheme } from "./theme-provider";
import Image from "next/image";

type Lang = "en" | "fr";

const NAV_LINKS = [
  { href: "#services", en: "Services", fr: "Services" },
  { href: "#work", en: "Portofolio", fr: "Portofolio" },
  { href: "#team", en: "Team", fr: "Équipe" },
  { href: "#contact", en: "Contact", fr: "Contact" },
];

export function Navbar({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 h-[54px] flex items-center justify-between px-8 transition-[background,border-color,backdrop-filter] duration-300"
        style={{
          background: scrolled ? "var(--nav-bg-scrolled)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-[22px] tracking-[-0.025em] text-[var(--fg)] no-underline leading-none"
        >
          <Image
            src={
              theme === "dark" ? "/bly-logo-white.svg" : "/bly-logo-black.svg"
            }
            alt="Bly"
            width={120}
            height={22}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActive(link.href)}
              className={`relative text-[13px] font-medium pb-[2px] no-underline transition-colors duration-200 hover:text-[var(--fg)] ${
                active === link.href
                  ? "text-[var(--fg)]"
                  : "text-[var(--muted)]"
              }`}
            >
              {lang === "fr" ? link.fr : link.en}
              {active === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-px rounded-[1px] bg-[var(--accent)]"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={() => setLang(lang === "en" ? "fr" : "en")}
            className="text-[10px] font-bold tracking-[0.1em] text-[var(--muted)] bg-transparent border border-[var(--border)] rounded-[3px] px-[9px] py-1 cursor-pointer transition-colors duration-200 hover:text-[var(--fg)] hover:border-[var(--fg)]"
          >
            {lang === "en" ? "FR" : "EN"}
          </button>

          <a
            href="#contact"
            className="text-[12px] font-semibold bg-[var(--accent)] text-white rounded-[4px] px-[15px] py-[7px] no-underline transition-opacity duration-200 hover:opacity-85"
          >
            {lang === "fr" ? "Travaillons" : "Let's work"}
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="flex sm:hidden flex-col gap-1 bg-transparent border-none cursor-pointer p-1"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
              className="block w-[18px] h-px bg-[var(--fg)] rounded-[1px] origin-center"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              className="block w-[18px] h-px bg-[var(--fg)] rounded-[1px]"
              transition={{ duration: 0.15 }}
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
              className="block w-[18px] h-px bg-[var(--fg)] rounded-[1px] origin-center"
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[54px] left-0 right-0 z-[49] bg-[var(--bg)] border-b border-[var(--border)] px-8 pt-5 pb-6 flex flex-col gap-5"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActive(link.href);
                  setOpen(false);
                }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="text-base font-medium text-[var(--muted)] no-underline"
              >
                {lang === "fr" ? link.fr : link.en}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

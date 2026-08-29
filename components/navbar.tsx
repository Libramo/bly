"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "./theme-toggle";
import {
  localizedHref,
  otherLocale,
  stripLocalePrefix,
  type Lang,
} from "@/lib/i18n";

import Image from "next/image";

const NAV_LINKS = [
  { href: "/services", en: "Services", fr: "Services" },
  { href: "#work", en: "Portofolio", fr: "Portofolio" },
  { href: "#team", en: "Team", fr: "Équipe" },
  { href: "/contact", en: "Contact", fr: "Contact" },
  {
    href: "https://surveys.blyanalytics.com",
    en: "Surveys",
    fr: "Sondages ",
    external: true,
  },
];

// "#work"/"#team" only exist on the homepage — used from any other page
// they must resolve back to the homepage first, in the current locale.
function navHref(lang: Lang, href: string) {
  if (href.startsWith("#")) return `${localizedHref(lang, "/")}${href}`;
  if (href.startsWith("/")) return localizedHref(lang, href);
  return href;
}

export function Navbar({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const toggleHref = localizedHref(otherLocale(lang), stripLocalePrefix(pathname));
  const { resolvedTheme: theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [scrolled, setScrolled] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setAtBottom(y > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={{
          opacity: 1,
          // y: atBottom ? 16 : 0,
          y: 0,
          left: atBottom && !isMobile ? "50%" : 0,
          x: atBottom && !isMobile ? "-50%" : "0%",
          width: atBottom && !isMobile ? 920 : "100%",
          height: atBottom && !isMobile ? 48 : 54,
          paddingLeft: atBottom && !isMobile ? 24 : 32,
          paddingRight: atBottom && !isMobile ? 24 : 32,
          // borderRadius: atBottom ? 12 : 0,
          borderRadius: 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 z-50 flex items-center justify-between transition-[background,border-color,backdrop-filter] duration-300"
        style={{
          background:
            scrolled || atBottom ? "var(--nav-bg-scrolled)" : "transparent",
          backdropFilter: scrolled || atBottom ? "blur(16px)" : "none",
          border:
            scrolled || atBottom
              ? "1px solid var(--border)"
              : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <Link
          href={localizedHref(lang, "/")}
          className="font-serif text-[22px] tracking-[-0.025em] text-(--fg) no-underline leading-none"
        >
          <Image
            src={
              mounted && theme === "dark"
                ? "/bly-logo-white.svg"
                : "/bly-logo-black.svg"
            }
            alt="Bly"
            width={120}
            height={22}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={navHref(lang, link.href)}
              onClick={() => setActive(link.href)}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={`relative text-[13px] font-medium pb-0.5 no-underline transition-colors duration-200 hover:text-(--fg) ${
                active === link.href ? "text-(--fg)" : "text-(--muted)"
              }`}
            >
              {lang === "fr" ? link.fr : link.en}
              {active === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-px rounded-[1px] bg-(--accent)"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Right cluster — desktop */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle blur />

          <Link
            href={toggleHref}
            className="text-[10px] font-bold tracking-widest text-(--muted) bg-transparent border border-(--border) rounded-[3px] px-2.25 py-1 cursor-pointer transition-colors duration-200 hover:text-(--fg) hover:border-(--fg)"
          >
            {lang === "en" ? "FR" : "EN"}
          </Link>

          <a
            href={localizedHref(lang, "/contact")}
            className="text-[12px] font-semibold bg-(--accent) text-white rounded-sm px-3.75 py-1.75 no-underline transition-opacity duration-200 hover:opacity-85"
          >
            {lang === "fr" ? "collaborons !" : "Let's work"}
          </a>
        </div>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="flex md:hidden flex-col gap-1 bg-transparent border-none cursor-pointer p-1"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
            className="block w-4.5 h-px bg-(--fg) rounded-[1px] origin-center"
            transition={{ duration: 0.2 }}
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            className="block w-4.5 h-px bg-(--fg) rounded-[1px]"
            transition={{ duration: 0.15 }}
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
            className="block w-4.5 h-px bg-(--fg) rounded-[1px] origin-center"
            transition={{ duration: 0.2 }}
          />
        </button>
      </motion.header>

      {/* Scroll-to-top button */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            key="scroll-top"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 w-9 h-9 flex items-center justify-center rounded-none border border-(--border) bg-(--surface) text-(--muted) cursor-pointer transition-colors duration-200 hover:text-(--fg) hover:border-(--fg)"
            style={{ backdropFilter: "blur(12px)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="blue">
              <path
                d="M7 11V3M3 7l4-4 4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-13.5 left-0 right-0 z-49 bg-(--bg) border-b border-(--border) px-8 pt-5 pb-6 flex flex-col gap-5"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={navHref(lang, link.href)}
                onClick={() => {
                  setActive(link.href);
                  setOpen(false);
                }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="text-base font-medium text-(--muted) no-underline"
              >
                {lang === "fr" ? link.fr : link.en}
              </motion.a>
            ))}

            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.05 }}
              className="flex justify-between items-center gap-3 pt-2 border-t border-(--border)"
            >
              <ThemeToggle blur />
              <Link
                href={toggleHref}
                onClick={() => setOpen(false)}
                className="text-[10px] font-bold tracking-widest text-(--muted) bg-transparent border border-(--border) rounded-[3px] px-2.25 py-1 cursor-pointer transition-colors duration-200 hover:text-(--fg) hover:border-(--fg)"
              >
                {lang === "en" ? "FR" : "EN"}
              </Link>
              <a
                href={localizedHref(lang, "/contact")}
                onClick={() => setOpen(false)}
                className="text-[12px] font-semibold bg-(--accent) text-white rounded-sm px-3.75 py-1.75 no-underline transition-opacity duration-200 hover:opacity-85"
              >
                {lang === "fr" ? "Collaborons !" : "Let's work"}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

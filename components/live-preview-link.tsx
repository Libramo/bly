"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion } from "motion/react";

const OPEN_DELAY_MS = 250;
const CARD_WIDTH = 280;
// Browser bar + 16:10 screenshot + footer, rounded up
const CARD_HEIGHT = 240;
const GAP = 12;

const FOOTER = {
  en: "Live · Open the site ↗",
  fr: "En ligne · Ouvrir le site ↗",
};

type Position = { left: number; top: number; above: boolean };

export function BrowserFrame({
  url,
  preview,
  alt,
  sizes,
  footer,
  eager,
}: {
  url: string;
  preview: string;
  alt: string;
  sizes: string;
  footer?: React.ReactNode;
  eager?: boolean;
}) {
  return (
    <span className="block bg-(--surface) border border-(--border) rounded-md overflow-hidden">
      <span className="flex items-center gap-1.5 px-2.5 py-1.75 border-b border-(--border)">
        <span className="w-1.5 h-1.5 rounded-full bg-(--border)" />
        <span className="w-1.5 h-1.5 rounded-full bg-(--border)" />
        <span className="w-1.5 h-1.5 rounded-full bg-(--border)" />
        <span className="ml-1.5 flex-1 text-[10px] text-(--muted) bg-(--surface-hover) rounded-[3px] px-2 py-0.5 truncate">
          {new URL(url).hostname}
        </span>
      </span>
      <Image
        src={preview}
        alt={alt}
        width={1440}
        height={900}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className="block w-full h-auto"
      />
      {footer && (
        <span className="flex items-center gap-1.5 px-2.5 py-1.75 border-t border-(--border) text-[10px] text-(--muted) tracking-[0.04em]">
          <span className="w-1.5 h-1.5 rounded-full bg-(--accent) block shrink-0" />
          {footer}
        </span>
      )}
    </span>
  );
}

/**
 * Outbound link to a delivered product. On hover-capable devices, a small
 * screenshot card fades in above the link (or below, if there's no room)
 * after a short delay; touch devices just get the plain link. The card is
 * portalled to <body> so overflow-hidden ancestors (e.g. the animated work
 * cards) can't clip it.
 */
export function LivePreviewLink({
  url,
  preview,
  label,
  lang,
  className,
  children,
}: {
  url: string;
  preview?: string;
  label: string;
  lang: "en" | "fr";
  className?: string;
  children: React.ReactNode;
}) {
  const [pos, setPos] = useState<Position | null>(null);
  const ref = useRef<HTMLAnchorElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const above = r.top >= CARD_HEIGHT + GAP;
      setPos({
        left: Math.min(r.left, window.innerWidth - CARD_WIDTH - GAP),
        top: above ? r.top - GAP : r.bottom + GAP,
        above,
      });
    }, OPEN_DELAY_MS);
  };
  const hide = () => {
    clearTimeout(timer.current);
    setPos(null);
  };

  // Fixed positioning goes stale on scroll — just close the card
  useEffect(() => {
    if (!pos) return;
    const close = () => setPos(null);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [pos]);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <>
      <a
        ref={ref}
        href={url}
        target="_blank"
        rel="noopener"
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={preview ? show : undefined}
        onMouseLeave={preview ? hide : undefined}
        onFocus={preview ? show : undefined}
        onBlur={preview ? hide : undefined}
        className={className}
      >
        {children}
      </a>

      {preview &&
        pos &&
        createPortal(
          <motion.span
            initial={{ opacity: 0, y: pos.above ? 6 : -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
            style={{
              left: pos.left,
              top: pos.top,
              translate: pos.above ? "0 -100%" : undefined,
            }}
            className="hidden pointer-fine:block fixed w-70 z-100 pointer-events-none shadow-[0_12px_32px_-12px_rgba(0,0,0,0.25)]"
          >
            <BrowserFrame
              url={url}
              preview={preview}
              alt={label}
              sizes="280px"
              footer={FOOTER[lang]}
            />
          </motion.span>,
          document.body,
        )}
    </>
  );
}

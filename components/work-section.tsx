"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "motion/react";
import { PROJECTS } from "@/lib/projects";
import { localizedHref, type Lang } from "@/lib/i18n";
import { LivePreviewLink } from "@/components/live-preview-link";

const COPY = {
  en: {
    eyebrow: "Our work",
    title: "What we've shipped",
    sub: "Live platforms, delivered for real organisations in Djibouti.",
    case_study: "Read case study →",
    see_all: "See all our work →",
    visit_site: "Visit the live site ↗",
    stack_label: "Stack",
    client_label: "Client",
    status_label: "Status",
    status_live: "Live",
    collapse: "Close",
  },
  fr: {
    eyebrow: "Réalisations",
    title: "Ce qu'on a livré",
    sub: "Des plateformes en production, livrées pour de vraies organisations à Djibouti.",
    case_study: "Lire l'étude de cas →",
    see_all: "Voir toutes nos réalisations →",
    visit_site: "Voir le site en ligne ↗",
    stack_label: "Stack",
    client_label: "Client",
    status_label: "Statut",
    status_live: "En ligne",
    collapse: "Fermer",
  },
};

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function WorkSection({ lang = "fr" }: { lang?: Lang }) {
  const t = COPY[lang];
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="work" className="max-w-230 mx-auto px-8 py-20">
      <FadeUp>
        <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-(--accent) mb-[0.4rem]">
          {t.eyebrow}
        </p>
        <h2 className="font-serif text-[clamp(26px,4vw,40px)] tracking-[-0.025em] text-(--fg) mb-[0.6rem] leading-[1.1]">
          {t.title}
        </h2>
        <p className="text-[14px] text-(--muted) leading-[1.75] max-w-100 mb-10">
          {t.sub}
        </p>
      </FadeUp>

      <div className="flex flex-col">
        {PROJECTS.map((project, i) => {
          const isOpen = expanded === project.slug;
          return (
            <FadeUp key={project.slug} delay={i * 0.08}>
              {/* Collapsed row */}
              <motion.div
                onClick={() => setExpanded(isOpen ? null : project.slug)}
                whileHover={{ x: isOpen ? 0 : 3 }}
                transition={{ duration: 0.2 }}
                className="border-t border-(--border) py-7 grid gap-4 items-center cursor-pointer"
                style={{ gridTemplateColumns: "1fr auto" }}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-[10px] font-bold tracking-[0.08em] uppercase bg-(--accent-subtle) text-(--accent) px-2.25 py-0.75 rounded-[3px]">
                      {project.tag[lang]}
                    </span>
                    <span className="text-[10px] text-(--muted) font-serif">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-[clamp(18px,2.5vw,24px)] tracking-[-0.02em] text-(--fg) leading-[1.2] mb-[0.35rem]">
                    {project.title[lang]}
                  </h3>
                  <p className="text-[13px] text-(--muted) leading-[1.6] max-w-125">
                    {project.oneliner[lang]}
                  </p>
                </div>

                {/* Expand toggle */}
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="w-7 h-7 border border-(--border) rounded-full flex items-center justify-center shrink-0 text-(--muted)"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M5 1v8M1 5h8" />
                  </svg>
                </motion.div>
              </motion.div>

              {/* Expanded panel */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div
                      className="border-t border-(--border) pt-7 pb-8 grid gap-12"
                      style={{ gridTemplateColumns: "1fr 1fr" }}
                    >
                      {/* Left */}
                      <div>
                        {project.stat && (
                          <div className="mb-6">
                            <p className="font-serif text-[48px] tracking-[-0.04em] text-(--accent) leading-none mb-1">
                              {project.stat.value}
                            </p>
                            <p className="text-[11px] text-(--muted) tracking-[0.04em]">
                              {project.stat.label[lang]}
                            </p>
                          </div>
                        )}

                        <p className="text-[14px] text-(--fg) leading-[1.8] mb-6">
                          {project.description[lang]}
                        </p>

                        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
                          <Link
                            href={localizedHref(lang, `/work/${project.slug}`)}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-block text-[12px] font-bold tracking-[0.04em] text-(--accent) no-underline border-b border-(--accent-subtle) pb-0.5"
                          >
                            {t.case_study}
                          </Link>
                          {project.url && (
                            <LivePreviewLink
                              url={project.url}
                              preview={project.preview}
                              label={project.client ?? project.title[lang]}
                              lang={lang}
                              className="inline-block text-[12px] font-bold tracking-[0.04em] text-(--muted) hover:text-(--accent) transition-colors no-underline border-b border-(--border) pb-0.5"
                            >
                              {t.visit_site}
                            </LivePreviewLink>
                          )}
                        </div>
                      </div>

                      {/* Right — client, stack, live status */}
                      <div className="flex flex-col gap-6">
                        {project.client && (
                          <div>
                            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-(--muted) mb-3">
                              {t.client_label}
                            </p>
                            <p className="text-[14px] text-(--fg) leading-[1.6]">
                              {project.client}
                            </p>
                          </div>
                        )}
                        {project.stack && (
                          <div>
                            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-(--muted) mb-3">
                              {t.stack_label}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {project.stack.map((s) => (
                                <motion.span
                                  key={s}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.25 }}
                                  className="text-[11px] text-(--muted) bg-(--surface-hover) border border-(--border) px-2.5 py-1 rounded-[3px]"
                                >
                                  {s}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        )}
                        {project.url && (
                          <div>
                            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-(--muted) mb-3">
                              {t.status_label}
                            </p>
                            <p className="flex items-center gap-2 text-[14px] text-(--fg)">
                              <span className="w-1.5 h-1.5 rounded-full bg-(--accent) block shrink-0" />
                              {t.status_live} · {new URL(project.url).hostname}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </FadeUp>
          );
        })}
        <div className="border-t border-(--border)" />
      </div>

      <FadeUp>
        <Link
          href={localizedHref(lang, "/work")}
          className="inline-block mt-8 text-[13px] font-bold tracking-[0.04em] text-(--accent) no-underline border-b border-(--accent-subtle) pb-0.5"
        >
          {t.see_all}
        </Link>
      </FadeUp>
    </section>
  );
}

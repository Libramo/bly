"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { type Project } from "@/lib/projects";
import { useSearchParams } from "next/navigation";

type Lang = "en" | "fr";

const NAV_COPY = {
  en: { back: "← All work", lang: "FR" },
  fr: { back: "← Tous notre portofolio", lang: "EN" },
};

const LABELS = {
  en: {
    challenge: "The challenge",
    what: "What we built",
    decisions: "Key decisions",
    outcome: "The outcome",
    stack: "Stack",
    next: "Next project →",
  },
  fr: {
    challenge: "Le défi",
    what: "Ce qu'on a construit",
    decisions: "Décisions clés",
    outcome: "Le résultat",
    stack: "Stack",
    next: "Projet suivant →",
  },
};

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function CaseStudyPage({
  project,
  nextProject,
}: {
  project: Project;
  nextProject?: Project;
}) {
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<Lang>(
    (searchParams.get("lang") as Lang) ?? "en",
  );
  const t = LABELS[lang];
  const nav = NAV_COPY[lang];

  return (
    <div className="bg-(--bg) text-[var(--fg)] font-sans min-h-screen">
      {/* Nav */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-40 flex items-center justify-between px-8 h-[54px] border-b border-[var(--border)] bg-[var(--nav-bg-scrolled)] backdrop-blur-[14px]"
      >
        <Link
          href="/"
          className="font-serif text-[21px] tracking-[-0.025em] text-[var(--fg)] no-underline"
        >
          bly
        </Link>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => setLang((l) => (l === "en" ? "fr" : "en"))}
            className="text-[10px] font-bold tracking-[0.1em] text-[var(--muted)] bg-transparent border border-[var(--border)] rounded-[3px] px-[9px] py-1 cursor-pointer"
          >
            {nav.lang}
          </button>
          <Link
            href="/work"
            className="text-[12px] text-[var(--muted)] no-underline border border-[var(--border)] rounded-[4px] px-[13px] py-[6px]"
          >
            {nav.back}
          </Link>
        </div>
      </motion.header>

      <article className="max-w-[720px] mx-auto px-8 pt-20 pb-28">
        {/* Header */}
        <FadeUp delay={0.05}>
          <span className="text-[10px] font-bold tracking-[0.12em] uppercase bg-[var(--accent-subtle)] text-[var(--accent)] px-[9px] py-[3px] rounded-[3px] inline-block mb-5">
            {project.tag[lang]}
          </span>
          <h1 className="font-serif text-[clamp(32px,5vw,52px)] tracking-[-0.03em] text-[var(--fg)] leading-[1.05] mb-5">
            {project.title[lang]}
          </h1>
          <p className="text-[16px] text-[var(--muted)] leading-[1.85] max-w-[560px] mb-10">
            {project.description[lang]}
          </p>
        </FadeUp>

        {/* Stat + stack strip */}
        <FadeUp delay={0.12}>
          <div className="flex gap-px bg-[var(--border)] border border-[var(--border)] rounded-[6px] overflow-hidden mb-16">
            <div className="bg-[var(--surface)] px-6 py-5 shrink-0">
              <p className="font-serif text-[36px] tracking-[-0.04em] text-[var(--accent)] leading-none mb-[3px]">
                {project.stat.value}
              </p>
              <p className="text-[11px] text-[var(--muted)] tracking-[0.04em]">
                {project.stat.label[lang]}
              </p>
            </div>
            <div className="bg-[var(--surface)] px-6 py-5 flex-1">
              <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--muted)] mb-[0.6rem]">
                {t.stack}
              </p>
              <div className="flex flex-wrap gap-[5px]">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] text-[var(--muted)] bg-[var(--surface-hover)] border border-[var(--border)] px-2 py-[3px] rounded-[3px]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Body sections */}
        {[
          { label: t.challenge, content: project.challenge[lang] },
          { label: t.what, content: project.what[lang] },
        ].map((section, i) => (
          <FadeUp key={section.label} delay={0.18 + i * 0.06}>
            <div className="mb-12">
              <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--accent)] mb-3">
                {section.label}
              </p>
              <p className="text-[15px] text-[var(--fg)] leading-[1.9]">
                {section.content}
              </p>
            </div>
          </FadeUp>
        ))}

        {/* Key decisions */}
        <FadeUp delay={0.3}>
          <div className="mb-12">
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--accent)] mb-5">
              {t.decisions}
            </p>
            <div className="flex flex-col">
              {project.decisions.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="border-t border-[var(--border)] py-5 grid gap-8 items-start"
                  style={{ gridTemplateColumns: "200px 1fr" }}
                >
                  <p className="text-[13px] font-semibold text-[var(--fg)] leading-[1.4]">
                    {d.title[lang]}
                  </p>
                  <p className="text-[13px] text-[var(--muted)] leading-[1.8]">
                    {d.body[lang]}
                  </p>
                </motion.div>
              ))}
              <div className="border-t border-[var(--border)]" />
            </div>
          </div>
        </FadeUp>

        {/* Outcome */}
        <FadeUp delay={0.35}>
          <div className="mb-16 border-l-2 border-[var(--accent)] pl-5">
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--accent)] mb-[0.65rem]">
              {t.outcome}
            </p>
            <p className="text-[15px] text-[var(--fg)] leading-[1.9]">
              {project.outcome[lang]}
            </p>
          </div>
        </FadeUp>

        {/* Next project */}
        {nextProject && (
          <FadeUp delay={0.4}>
            <div className="border-t border-[var(--border)] pt-8">
              <Link
                href={`/work/${nextProject.slug}?lang=${lang}`}
                className="no-underline flex items-center justify-between"
              >
                <div>
                  <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--muted)] mb-1">
                    {t.next}
                  </p>
                  <p className="font-serif text-[22px] tracking-[-0.02em] text-[var(--fg)]">
                    {nextProject.title[lang]}
                  </p>
                </div>
                <motion.span
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="text-[20px] text-[var(--accent)]"
                >
                  →
                </motion.span>
              </Link>
            </div>
          </FadeUp>
        )}
      </article>
    </div>
  );
}

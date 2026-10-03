"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { type Project } from "@/lib/projects";
import { Navbar } from "./navbar";
import { BrowserFrame } from "./live-preview-link";
import { localizedHref, type Lang } from "@/lib/i18n";

const LABELS = {
  en: {
    challenge: "The context",
    what: "What we built",
    highlights: "Highlights",
    decisions: "Key decisions",
    outcome: "The outcome",
    stack: "Stack",
    client: "Client",
    status: "Type",
    own_initiative: "Bly initiative · public interest",
    live: "Live · Open the site ↗",
    next: "Next project →",
  },
  fr: {
    challenge: "Le contexte",
    what: "Ce qu'on a construit",
    highlights: "Points clés",
    decisions: "Décisions clés",
    outcome: "Le résultat",
    stack: "Stack",
    client: "Client",
    status: "Type",
    own_initiative: "Initiative Bly · intérêt public",
    live: "En ligne · Ouvrir le site ↗",
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
  lang,
}: {
  project: Project;
  nextProject?: Project;
  lang: Lang;
}) {
  const t = LABELS[lang];

  return (
    <div className="bg-(--bg) text-(--fg) font-sans min-h-screen">
      <Navbar lang={lang} />

      <article className="max-w-180 mx-auto px-8 pt-20 pb-28">
        {/* Header */}
        <FadeUp delay={0.05}>
          <span className="text-[10px] font-bold tracking-[0.12em] uppercase bg-(--accent-subtle) text-(--accent) px-2.25 py-0.75 rounded-[3px] inline-block mb-5">
            {project.tag[lang]}
          </span>
          <h1 className="font-serif text-[clamp(32px,5vw,52px)] tracking-[-0.03em] text-(--fg) leading-[1.05] mb-5">
            {project.title[lang]}
          </h1>
          <p className="text-[16px] text-(--muted) leading-[1.85] max-w-140 mb-10">
            {project.description[lang]}
          </p>
        </FadeUp>

        {/* Stat + stack strip */}
        {(project.stat || project.stack) && (
          <FadeUp delay={0.12}>
            <div className="flex gap-px bg-(--border) border border-(--border) rounded-md overflow-hidden mb-16">
              {project.stat && (
                <div className="bg-(--surface) px-6 py-5 shrink-0">
                  <p className="font-serif text-[36px] tracking-[-0.04em] text-(--accent) leading-none mb-0.75">
                    {project.stat.value}
                  </p>
                  <p className="text-[11px] text-(--muted) tracking-[0.04em]">
                    {project.stat.label[lang]}
                  </p>
                </div>
              )}
              {project.stack && (
                <div className="bg-(--surface) px-6 py-5 flex-1">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-(--muted) mb-[0.6rem]">
                    {t.stack}
                  </p>
                  <div className="flex flex-wrap gap-1.25">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] text-(--muted) bg-(--surface-hover) border border-(--border) px-2 py-0.75 rounded-[3px]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {project.url && !project.stack && (
                <div className="bg-(--surface) px-6 py-5 flex-1">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-(--muted) mb-[0.6rem]">
                    {project.client ? t.client : t.status}
                  </p>
                  <p className="text-[14px] text-(--fg) leading-[1.5]">
                    {project.client ?? t.own_initiative}
                  </p>
                </div>
              )}
            </div>
          </FadeUp>
        )}

        {/* Live product */}
        {project.url && project.preview && (
          <FadeUp delay={0.15}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener"
              className="block mb-16 no-underline transition-opacity hover:opacity-90"
            >
              <BrowserFrame
                url={project.url}
                preview={project.preview}
                alt={project.title[lang]}
                sizes="(min-width: 768px) 656px, 100vw"
                footer={t.live}
                eager
              />
            </a>
          </FadeUp>
        )}

        {/* Body sections */}
        {[
          { label: t.challenge, content: project.challenge[lang] },
          { label: t.what, content: project.what[lang] },
        ].map((section, i) => (
          <FadeUp key={section.label} delay={0.18 + i * 0.06}>
            <div className="mb-12">
              <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-(--accent) mb-3">
                {section.label}
              </p>
              <p className="text-[15px] text-(--fg) leading-[1.9]">
                {section.content}
              </p>
            </div>
          </FadeUp>
        ))}

        {/* Highlights / key decisions */}
        {[
          { label: t.highlights, items: project.highlights },
          { label: t.decisions, items: project.decisions },
        ].map(
          ({ label, items }) =>
            items && (
              <FadeUp key={label} delay={0.3}>
                <div className="mb-12">
                  <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-(--accent) mb-5">
                    {label}
                  </p>
                  <div className="flex flex-col">
                    {items.map((d, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                        className="border-t border-(--border) py-5 grid gap-8 items-start"
                        style={{ gridTemplateColumns: "200px 1fr" }}
                      >
                        <p className="text-[13px] font-semibold text-(--fg) leading-[1.4]">
                          {d.title[lang]}
                        </p>
                        <p className="text-[13px] text-(--muted) leading-[1.8]">
                          {d.body[lang]}
                        </p>
                      </motion.div>
                    ))}
                    <div className="border-t border-(--border)" />
                  </div>
                </div>
              </FadeUp>
            ),
        )}

        {/* Outcome */}
        <FadeUp delay={0.35}>
          <div className="mb-16 border-l-2 border-(--accent) pl-5">
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-(--accent) mb-[0.65rem]">
              {t.outcome}
            </p>
            <p className="text-[15px] text-(--fg) leading-[1.9]">
              {project.outcome[lang]}
            </p>
          </div>
        </FadeUp>

        {/* Next project */}
        {nextProject && (
          <FadeUp delay={0.4}>
            <div className="border-t border-(--border) pt-8">
              <Link
                href={localizedHref(lang, `/work/${nextProject.slug}`)}
                className="no-underline flex items-center justify-between"
              >
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-(--muted) mb-1">
                    {t.next}
                  </p>
                  <p className="font-serif text-[22px] tracking-[-0.02em] text-(--fg)">
                    {nextProject.title[lang]}
                  </p>
                </div>
                <motion.span
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="text-[20px] text-(--accent)"
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

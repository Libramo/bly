"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import FooterSection from "./footer-section";
import { Navbar } from "./navbar";
import { PROJECTS, type Project } from "@/lib/projects";
import { localizedHref, type Lang } from "@/lib/i18n";

const C = {
  en: {
    eyebrow: "Our work",
    title: "Work",
    intro:
      "Platforms we've designed, built, and put into production — for federations, networks, and institutions in Djibouti, and for the public good.",
    own_initiative: "Bly initiative · public interest",
    case_study: "Read case study →",
    live: "Live site ↗",
    cta_title: "Have a project in mind?",
    cta: "Let's talk →",
  },
  fr: {
    eyebrow: "Nos réalisations",
    title: "Réalisations",
    intro:
      "Les plateformes que nous avons conçues, développées et mises en production — pour des fédérations, des réseaux et des institutions à Djibouti, et pour l'intérêt général.",
    own_initiative: "Initiative Bly · intérêt public",
    case_study: "Lire l'étude de cas →",
    live: "Site en ligne ↗",
    cta_title: "Un projet en tête ?",
    cta: "Parlons-en →",
  },
};

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CardVisual({
  project,
  lang,
  aboveFold,
}: {
  project: Project;
  lang: Lang;
  aboveFold: boolean;
}) {
  if (project.preview) {
    return (
      <div className="aspect-16/10 overflow-hidden border border-(--border) rounded-[3px] bg-(--surface)">
        <Image
          src={project.preview}
          alt={project.title[lang]}
          width={1440}
          height={900}
          sizes="(min-width: 768px) 420px, 100vw"
          loading={aboveFold ? "eager" : "lazy"}
          className="block w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      </div>
    );
  }
  // No screenshot: lead with the project's headline number instead
  return (
    <div className="aspect-16/10 border border-(--border) rounded-[3px] bg-(--accent-subtle) flex flex-col justify-end p-6">
      {project.stat && (
        <>
          <p className="font-serif text-[56px] tracking-[-0.04em] text-(--accent) leading-none mb-1">
            {project.stat.value}
          </p>
          <p className="text-[11px] text-(--muted) tracking-[0.04em]">
            {project.stat.label[lang]}
          </p>
        </>
      )}
    </div>
  );
}

export function WorkPage({ lang }: { lang: Lang }) {
  const t = C[lang];

  return (
    <div className="bg-(--bg) text-(--fg) font-sans min-h-screen">
      <Navbar lang={lang} />

      <main className="max-w-230 mx-auto px-8 pt-20 pb-16">
        <FadeUp delay={0.05}>
          <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-(--accent) mb-[0.6rem]">
            {t.eyebrow}
          </p>
          <h1 className="font-serif text-[clamp(32px,5vw,52px)] tracking-[-0.03em] text-(--fg) leading-[1.05] mb-5">
            {t.title}
          </h1>
          <p className="text-[16px] text-(--muted) leading-[1.85] max-w-140 mb-14">
            {t.intro}
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-(--border) border border-(--border)">
          {PROJECTS.map((project, i) => {
            // Client names are already in the titles — only flag our own initiatives
            const byline = !project.client && project.url ? t.own_initiative : null;
            return (
              <FadeUp
                key={project.slug}
                delay={0.1 + i * 0.06}
                className="group relative bg-(--bg) hover:bg-(--surface-hover) transition-colors p-6 flex flex-col"
              >
                {/* First row is above the fold — the LCP element */}
                <CardVisual project={project} lang={lang} aboveFold={i < 2} />

                <div className="flex items-center gap-2.5 mt-6 mb-3">
                  <span className="text-[10px] font-bold tracking-[0.08em] uppercase bg-(--accent-subtle) text-(--accent) px-2.25 py-0.75 rounded-[3px]">
                    {project.tag[lang]}
                  </span>
                  <span className="text-[10px] text-(--muted) font-serif">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="font-serif text-[22px] tracking-[-0.02em] text-(--fg) leading-[1.2] mb-2">
                  {/* Stretched link: the whole card opens the case study */}
                  <Link
                    href={localizedHref(lang, `/work/${project.slug}`)}
                    className="no-underline text-inherit after:absolute after:inset-0"
                  >
                    {project.title[lang]}
                  </Link>
                </h2>

                {byline && (
                  <p className="text-[11px] text-(--muted-2) tracking-[0.04em] mb-3">
                    {byline}
                  </p>
                )}

                <p className="text-[13px] text-(--muted) leading-[1.7] mb-6">
                  {project.oneliner[lang]}
                </p>

                <div className="mt-auto flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <span className="text-[12px] font-bold tracking-[0.04em] text-(--accent) border-b border-(--accent-subtle) pb-0.5">
                    {t.case_study}
                  </span>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener"
                      className="relative z-10 text-[12px] font-bold tracking-[0.04em] text-(--muted) hover:text-(--accent) transition-colors no-underline border-b border-(--border) pb-0.5"
                    >
                      {t.live}
                    </a>
                  )}
                </div>
              </FadeUp>
            );
          })}
        </div>

        <FadeUp delay={0.2}>
          <div className="mt-16 flex flex-wrap items-baseline justify-between gap-4 border-t border-(--border) pt-8">
            <p className="font-serif text-[24px] tracking-[-0.02em] text-(--fg)">
              {t.cta_title}
            </p>
            <Link
              href={localizedHref(lang, "/contact")}
              className="text-[14px] font-semibold text-(--accent) no-underline border-b border-(--accent-subtle) pb-0.5"
            >
              {t.cta}
            </Link>
          </div>
        </FadeUp>
      </main>

      <FooterSection lang={lang} />
    </div>
  );
}

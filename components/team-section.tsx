"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

type Lang = "en" | "fr";

const MANIFESTO = {
  en: [
    {
      num: "01",
      bold: "We don't hire generalists.",
      sub: "Everyone on this team owns one domain end to end.",
    },
    {
      num: "02",
      bold: "We ship code, not slide decks.",
      sub: "Our deliverable is always something you can open in a browser.",
    },
    {
      num: "03",
      bold: "We own the whole stack.",
      sub: "Design, backend, data — small team, zero handoff delays.",
    },
    {
      num: "04",
      bold: "We know this market.",
      sub: "We live in Djibouti. We understand the systems we're digitising.",
    },
  ],
  fr: [
    {
      num: "01",
      bold: "On ne recrute pas des généralistes.",
      sub: "Chaque membre de l'équipe maîtrise un domaine de bout en bout.",
    },
    {
      num: "02",
      bold: "On livre du code, pas des présentations.",
      sub: "Notre livrable, c'est toujours quelque chose que vous pouvez ouvrir dans un navigateur.",
    },
    {
      num: "03",
      bold: "On maîtrise toute la stack.",
      sub: "Design, backend, data — petite équipe, zéro délai de transmission.",
    },
    {
      num: "04",
      bold: "On connaît ce marché.",
      sub: "On vit à Djibouti. On comprend les systèmes qu'on digitalise.",
    },
  ],
};

const ROLES = {
  en: [
    {
      title: "Engineering",
      tags: ["Next.js", "TypeScript", "Drizzle", "Better Auth"],
      icon: "⬡",
    },
    {
      title: "Design",
      tags: ["Figma", "shadcn/ui", "motion/react", "Tailwind"],
      icon: "⬡",
    },
    {
      title: "Data & delivery",
      tags: [
        "Python",
        "Pandas",
        "Plotly",
        "ETL / scraping",
        "Gov sector",
        "Healthcare",
        "Strategy",
      ],
      icon: "⬡",
    },
  ],
  fr: [
    {
      title: "Ingénierie",
      tags: ["Next.js", "TypeScript", "Drizzle", "Better Auth"],
      icon: "⬡",
    },
    {
      title: "Design",
      tags: ["Figma", "shadcn/ui", "motion/react", "Tailwind"],
      icon: "⬡",
    },
    {
      title: "Data & livraison",
      tags: [
        "Python",
        "Pandas",
        "Plotly",
        "ETL / scraping",
        "Secteur gov",
        "Santé",
        "Stratégie",
      ],
      icon: "⬡",
    },
  ],
};

const COPY = {
  en: {
    eyebrow: "The team",
    title: "Small team. Zero fluff.",
    sub: "A tight crew — each person owns their domain.",
    roles_label: "Who's in the room",
  },
  fr: {
    eyebrow: "L'équipe",
    title: "Petite équipe. Zéro superflu.",
    sub: "Une équipe soudée — chacun maîtrise son domaine.",
    roles_label: "Qui est dans l'équipe",
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

export function TeamSection({ lang = "en" }: { lang?: Lang }) {
  const t = COPY[lang];
  const manifesto = MANIFESTO[lang];
  const roles = ROLES[lang];

  return (
    <section id="team" className="max-w-230 mx-auto px-8 py-20">
      {/* Header */}
      <FadeUp>
        <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-(--accent) mb-[0.4rem]">
          {t.eyebrow}
        </p>
        <h2 className="font-serif text-[clamp(26px,4vw,40px)] tracking-[-0.025em] text-(--fg) mb-[0.6rem] leading-[1.1]">
          {t.title}
        </h2>
        <p className="text-[14px] text-(--muted) leading-[1.75] max-w-100 mb-12">
          {t.sub}
        </p>
      </FadeUp>

      {/* Manifesto */}
      <FadeUp delay={0.05}>
        <div className="mb-14">
          {manifesto.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ x: 4 }}
              className="grid gap-4 py-[1.1rem] border-b border-(--border) items-baseline cursor-default"
              style={{ gridTemplateColumns: "32px 1fr" }}
            >
              <span className="text-[10px] font-bold text-(--accent) tracking-[0.06em]">
                {item.num}
              </span>
              <div>
                <span className="text-[15px] font-semibold text-(--fg) tracking-[-0.01em]">
                  {item.bold}
                </span>
                <span className="text-[14px] text-(--muted) ml-2 leading-[1.6]">
                  {item.sub}
                </span>
              </div>
            </motion.div>
          ))}
          <div className="border-b border-(--border)" />
        </div>
      </FadeUp>

      {/* Role cards */}
      <FadeUp delay={0.1}>
        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-(--muted) mb-5">
          {t.roles_label}
        </p>
        <div
          className="grid gap-2.5"
          style={{ gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))" }}
        >
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -2, borderColor: "var(--accent)" }}
              className="bg-(--surface) border border-(--border) rounded-md p-5 cursor-default transition-colors duration-200"
            >
              <div className="w-9 h-9 rounded-full border border-(--border) flex items-center justify-center mb-[0.85rem]">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="var(--muted)"
                  strokeWidth="1.2"
                >
                  <circle cx="7" cy="5" r="2.5" />
                  <path d="M2 13c0-2.76 2.24-5 5-5s5 2.24 5 5" />
                </svg>
              </div>

              <p className="text-[13px] font-semibold text-(--fg) mb-[0.65rem] tracking-[-0.01em]">
                {role.title}
              </p>

              <div className="flex flex-wrap gap-1">
                {role.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-(--muted) bg-(--surface-hover) border border-(--border) px-1.75 py-0.5 rounded-[3px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}

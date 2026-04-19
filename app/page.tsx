"use client";

import { useState, useRef } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";

type Lang = "en" | "fr";

const copy = {
  en: {
    nav_cta: "Let's work",
    lang_toggle: "FR",
    hero_eyebrow: "Djibouti-based builder",
    hero_line1: "I don't sell",
    hero_line2: "deliverables.",
    hero_line3: "I solve",
    hero_line4: "problems.",
    hero_sub:
      "Full-stack engineer specialising in government digitisation, data platforms, and healthcare tech in East Africa.",
    cta_primary: "Start a conversation",
    cta_secondary: "See what I've built",
    skills_eyebrow: "The craft",
    skills_title: "What I actually know",
    skills_sub:
      "Not a list of buzzwords. These are the tools I reach for every week on real projects.",
    stacks_eyebrow: "The stack",
    stacks_title: "Battle-tested, production-grade",
    stacks_sub:
      "Every choice is deliberate. Picked because it works, not because it trends.",
    work_eyebrow: "The work",
    work_title: "Projects I've shipped",
    work_sub: "Two live platforms. More in the pipeline.",
    proj1_tag: "Healthcare",
    proj1_title: "Doctor booking platform",
    proj1_desc:
      "Multi-role appointment system for doctors and patients. Magic-link onboarding, admin approval flows, file uploads, stepped form wizard.",
    proj1_stack: [
      "Next.js",
      "TypeScript",
      "Drizzle",
      "Better Auth",
      "shadcn/ui",
      "UploadThing",
    ],
    proj2_tag: "Government",
    proj2_title: "National agency dashboard",
    proj2_desc:
      "Analytics dashboard with KPI cards, week-over-week comparisons, demographic distributions, and a filterable multi-thousand-row registry.",
    proj2_stack: ["Python", "Dash", "Plotly", "Pandas"],
    contact_title: "Got a problem worth solving?",
    contact_sub:
      "Tell me what you're building. I'll tell you if I can help — no pitch, no deck.",
    contact_btn: "hello@bly.dj",
    footer: "Built in Djibouti.",
  },
  fr: {
    nav_cta: "Travaillons",
    lang_toggle: "EN",
    hero_eyebrow: "Développeur basé à Djibouti",
    hero_line1: "Je ne vends pas",
    hero_line2: "des livrables.",
    hero_line3: "Je règle",
    hero_line4: "des problèmes.",
    hero_sub:
      "Ingénieur full-stack spécialisé dans la digitalisation gouvernementale, les plateformes de données et la tech santé en Afrique de l'Est.",
    cta_primary: "Démarrer une conversation",
    cta_secondary: "Voir ce que j'ai construit",
    skills_eyebrow: "Le métier",
    skills_title: "Ce que je maîtrise vraiment",
    skills_sub:
      "Pas une liste de buzzwords. Ce sont les outils que j'utilise chaque semaine sur de vrais projets.",
    stacks_eyebrow: "La stack",
    stacks_title: "Éprouvée, prête pour la production",
    stacks_sub:
      "Chaque choix est délibéré. Retenu parce qu'il fonctionne, pas parce qu'il est tendance.",
    work_eyebrow: "Le travail",
    work_title: "Les projets livrés",
    work_sub: "Deux plateformes en production. D'autres en cours.",
    proj1_tag: "Santé",
    proj1_title: "Plateforme de prise de rendez-vous",
    proj1_desc:
      "Système multi-rôles pour médecins et patients. Onboarding par lien magique, flux d'approbation admin, téléversement de fichiers, formulaire pas-à-pas.",
    proj1_stack: [
      "Next.js",
      "TypeScript",
      "Drizzle",
      "Better Auth",
      "shadcn/ui",
      "UploadThing",
    ],
    proj2_tag: "Gouvernement",
    proj2_title: "Tableau de bord d'agence nationale",
    proj2_desc:
      "Dashboard analytique avec KPIs, comparaisons semaine par semaine, distributions démographiques et registre filtrable de plusieurs milliers d'entrées.",
    proj2_stack: ["Python", "Dash", "Plotly", "Pandas"],
    contact_title: "Un problème qui vaut la peine d'être résolu ?",
    contact_sub:
      "Dites-moi ce que vous construisez. Je vous dirai si je peux aider — pas de pitch, pas de deck.",
    contact_btn: "hello@bly.dj",
    footer: "Construit à Djibouti.",
  },
};

const SKILLS = [
  "Next.js App Router",
  "TypeScript",
  "Drizzle ORM",
  "Better Auth",
  "shadcn/ui",
  "Zod + React Hook Form",
  "Python / Dash",
  "Plotly",
  "Pandas",
  "Web scraping & ETL",
  "PostgreSQL",
  "Tailwind CSS",
  "DOCX / PDF / PPTX generation",
  "Server actions",
  "Multi-role auth",
  "UploadThing",
  "Resend / email flows",
  "motion/react",
];

const STACK_GROUPS = [
  {
    group: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    group: "Backend & database",
    items: ["Drizzle ORM", "PostgreSQL", "Better Auth", "Server actions"],
  },
  {
    group: "Data & documents",
    items: ["Python", "Pandas", "Plotly / Dash", "DOCX / PDF / PPTX"],
  },
];

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
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Flip({ value, id }: { value: string; id: string }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={id + value}
        initial={{ rotateX: -70, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        exit={{ rotateX: 70, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "inline-block" }}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

function MagBtn({
  href,
  children,
  style,
}: {
  href?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 22 });
  const sy = useSpring(y, { stiffness: 350, damping: 22 });
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const move = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = href ? motion.a : motion.button;
  return (
    <Tag
      ref={ref as any}
      href={href}
      style={{ x: sx, y: sy, ...style }}
      onMouseMove={move}
      onMouseLeave={leave}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </Tag>
  );
}

export default function BlyPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];

  return (
    <div
      style={{
        background: "#0b0b0b",
        color: "#ddd8ce",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* ── NAVBAR ── */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2.5rem",
          height: "54px",
          borderBottom: "1px solid #1a1a1a",
          background: "rgba(11,11,11,0.9)",
          backdropFilter: "blur(14px)",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "21px",
            letterSpacing: "-0.025em",
            color: "#ddd8ce",
          }}
        >
          bly
        </span>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            onClick={() => setLang((l) => (l === "en" ? "fr" : "en"))}
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "#555",
              background: "none",
              border: "1px solid #222",
              borderRadius: "3px",
              padding: "4px 10px",
              cursor: "pointer",
            }}
          >
            <Flip value={t.lang_toggle} id="langtoggle" />
          </button>
          <MagBtn
            href="mailto:hello@bly.dj"
            style={{
              fontSize: "12px",
              fontWeight: 600,
              background: "#ddd8ce",
              color: "#0b0b0b",
              border: "none",
              borderRadius: "4px",
              padding: "7px 16px",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            <Flip value={t.nav_cta} id="navcta" />
          </MagBtn>
        </div>
      </motion.header>

      {/* ── HERO ── */}
      <section
        style={{
          maxWidth: "920px",
          margin: "0 auto",
          padding: "6.5rem 2.5rem 5rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "2.5rem",
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#4f72ff",
              display: "block",
            }}
          />
          <span
            style={{ fontSize: "12px", color: "#555", letterSpacing: "0.05em" }}
          >
            <Flip value={t.hero_eyebrow} id="eyebrow" />
          </span>
        </motion.div>

        <h1
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "clamp(44px, 7.5vw, 84px)",
            lineHeight: 1.03,
            letterSpacing: "-0.035em",
            marginBottom: "2rem",
          }}
        >
          {(
            [
              { key: "hero_line1", accent: false, indent: false },
              { key: "hero_line2", accent: true, indent: false },
              { key: "hero_line3", accent: false, indent: true },
              { key: "hero_line4", accent: true, indent: true },
            ] as const
          ).map(({ key, accent, indent }, i) => (
            <motion.span
              key={key}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.18 + i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                display: "block",
                color: accent ? "#4f72ff" : "#ddd8ce",
                paddingLeft: indent ? "3.5rem" : 0,
              }}
            >
              <Flip value={t[key]} id={key + lang} />
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.6 }}
          style={{
            fontSize: "15px",
            lineHeight: 1.8,
            color: "#777",
            maxWidth: "500px",
            marginBottom: "2.5rem",
          }}
        >
          <Flip value={t.hero_sub} id={"sub" + lang} />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
        >
          <MagBtn
            href="mailto:hello@bly.dj"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              background: "#4f72ff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "11px 22px",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            <Flip value={t.cta_primary} id={"cta1" + lang} />
          </MagBtn>
          <MagBtn
            href="#work"
            style={{
              fontSize: "13px",
              color: "#666",
              border: "1px solid #222",
              borderRadius: "4px",
              padding: "11px 22px",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-block",
              background: "none",
            }}
          >
            <Flip value={t.cta_secondary} id={"cta2" + lang} />
          </MagBtn>
        </motion.div>
      </section>

      <div
        style={{
          borderTop: "1px solid #161616",
          maxWidth: "920px",
          margin: "0 auto",
        }}
      />

      {/* ── SKILLS ── */}
      <section
        style={{ maxWidth: "920px", margin: "0 auto", padding: "5rem 2.5rem" }}
      >
        <FadeUp>
          <p
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#4f72ff",
              marginBottom: "0.4rem",
            }}
          >
            <Flip value={t.skills_eyebrow} id={"se" + lang} />
          </p>
          <h2
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: "clamp(26px, 4vw, 40px)",
              letterSpacing: "-0.025em",
              color: "#ddd8ce",
              marginBottom: "0.6rem",
              lineHeight: 1.1,
            }}
          >
            <Flip value={t.skills_title} id={"st" + lang} />
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#666",
              lineHeight: 1.75,
              maxWidth: "420px",
              marginBottom: "2.5rem",
            }}
          >
            <Flip value={t.skills_sub} id={"ss" + lang} />
          </p>
        </FadeUp>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -2, borderColor: "#4f72ff", color: "#ddd8ce" }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: i * 0.03,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                padding: "6px 13px",
                borderRadius: "3px",
                border: "1px solid #1e1e1e",
                fontSize: "12px",
                fontWeight: 500,
                color: "#999",
                background: "#111",
                cursor: "default",
                letterSpacing: "0.01em",
              }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </section>

      <div
        style={{
          borderTop: "1px solid #161616",
          maxWidth: "920px",
          margin: "0 auto",
        }}
      />

      {/* ── STACK ── */}
      <section
        style={{ maxWidth: "920px", margin: "0 auto", padding: "5rem 2.5rem" }}
      >
        <FadeUp>
          <p
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#4f72ff",
              marginBottom: "0.4rem",
            }}
          >
            <Flip value={t.stacks_eyebrow} id={"ste" + lang} />
          </p>
          <h2
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: "clamp(26px, 4vw, 40px)",
              letterSpacing: "-0.025em",
              color: "#ddd8ce",
              marginBottom: "0.6rem",
              lineHeight: 1.1,
            }}
          >
            <Flip value={t.stacks_title} id={"stt" + lang} />
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#666",
              lineHeight: 1.75,
              maxWidth: "420px",
              marginBottom: "3rem",
            }}
          >
            <Flip value={t.stacks_sub} id={"sts" + lang} />
          </p>
        </FadeUp>

        {STACK_GROUPS.map((g, gi) => (
          <FadeUp key={g.group} delay={gi * 0.08}>
            <div style={{ marginBottom: "2.5rem" }}>
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#333",
                  marginBottom: "0.75rem",
                }}
              >
                {g.group}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {g.items.map((item, ii) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ borderColor: "#4f72ff", color: "#ddd8ce" }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: gi * 0.06 + ii * 0.04,
                    }}
                    style={{
                      padding: "8px 16px",
                      border: "1px solid #1e1e1e",
                      borderRadius: "4px",
                      background: "#0f0f0f",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#888",
                      cursor: "default",
                    }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeUp>
        ))}
      </section>

      <div
        style={{
          borderTop: "1px solid #161616",
          maxWidth: "920px",
          margin: "0 auto",
        }}
      />

      {/* ── WORK ── */}
      <section
        id="work"
        style={{ maxWidth: "920px", margin: "0 auto", padding: "5rem 2.5rem" }}
      >
        <FadeUp>
          <p
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#4f72ff",
              marginBottom: "0.4rem",
            }}
          >
            <Flip value={t.work_eyebrow} id={"we" + lang} />
          </p>
          <h2
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: "clamp(26px, 4vw, 40px)",
              letterSpacing: "-0.025em",
              color: "#ddd8ce",
              marginBottom: "0.6rem",
              lineHeight: 1.1,
            }}
          >
            <Flip value={t.work_title} id={"wt" + lang} />
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#666",
              lineHeight: 1.75,
              maxWidth: "420px",
              marginBottom: "3rem",
            }}
          >
            <Flip value={t.work_sub} id={"ws" + lang} />
          </p>
        </FadeUp>

        {(["1", "2"] as const).map((n, i) => {
          const tag = t[`proj${n}_tag` as keyof typeof t] as string;
          const title = t[`proj${n}_title` as keyof typeof t] as string;
          const desc = t[`proj${n}_desc` as keyof typeof t] as string;
          const stack = t[`proj${n}_stack` as keyof typeof t] as string[];
          return (
            <FadeUp key={n} delay={i * 0.1}>
              <motion.div
                whileHover={{ backgroundColor: "#0f0f0f" }}
                transition={{ duration: 0.2 }}
                style={{
                  borderTop: "1px solid #1a1a1a",
                  padding: "2.25rem 0",
                  display: "grid",
                  gridTemplateColumns: "1fr 48px",
                  gap: "1.5rem",
                  alignItems: "start",
                  borderRadius: "2px",
                }}
              >
                <div>
                  <div style={{ marginBottom: "0.65rem" }}>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        background: "#131825",
                        color: "#4f72ff",
                        padding: "3px 9px",
                        borderRadius: "2px",
                      }}
                    >
                      <Flip value={tag} id={`tag${n}${lang}`} />
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontSize: "22px",
                      letterSpacing: "-0.02em",
                      color: "#ddd8ce",
                      marginBottom: "0.6rem",
                      lineHeight: 1.2,
                    }}
                  >
                    <Flip value={title} id={`title${n}${lang}`} />
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      lineHeight: 1.8,
                      maxWidth: "540px",
                      marginBottom: "1rem",
                    }}
                  >
                    <Flip value={desc} id={`desc${n}${lang}`} />
                  </p>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}
                  >
                    {stack.map((tech: string) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: "10px",
                          color: "#444",
                          background: "#141414",
                          border: "1px solid #1e1e1e",
                          padding: "3px 8px",
                          borderRadius: "2px",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "32px",
                    color: "#1e1e1e",
                    fontFamily: "'DM Serif Display', serif",
                    lineHeight: 1,
                    textAlign: "right",
                  }}
                >
                  0{i + 1}
                </span>
              </motion.div>
            </FadeUp>
          );
        })}
        <div style={{ borderTop: "1px solid #1a1a1a" }} />
      </section>

      {/* ── CONTACT ── */}
      <section
        style={{
          maxWidth: "920px",
          margin: "0 auto",
          padding: "2rem 2.5rem 7rem",
        }}
      >
        <FadeUp>
          <div
            style={{
              border: "1px solid #1a1a1a",
              borderRadius: "6px",
              padding: "4.5rem 3rem",
              textAlign: "center",
              background: "#0d0d0d",
            }}
          >
            <h2
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "clamp(28px, 4.5vw, 52px)",
                letterSpacing: "-0.03em",
                color: "#ddd8ce",
                marginBottom: "1rem",
                lineHeight: 1.05,
              }}
            >
              <Flip value={t.contact_title} id={"ct" + lang} />
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#666",
                maxWidth: "360px",
                margin: "0 auto 2.5rem",
                lineHeight: 1.8,
              }}
            >
              <Flip value={t.contact_sub} id={"cs" + lang} />
            </p>
            <motion.a
              href="mailto:hello@bly.dj"
              whileHover={{ letterSpacing: "0.14em" }}
              transition={{ duration: 0.35 }}
              style={{
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#4f72ff",
                textDecoration: "none",
                borderBottom: "1px solid #4f72ff",
                paddingBottom: "2px",
                display: "inline-block",
              }}
            >
              {t.contact_btn}
            </motion.a>
          </div>
        </FadeUp>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid #161616",
          padding: "1.5rem 2.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "920px",
          margin: "0 auto",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "18px",
            color: "#2a2a2a",
          }}
        >
          bly
        </span>
        <span style={{ fontSize: "12px", color: "#333" }}>
          <Flip value={t.footer} id={"footer" + lang} />
        </span>
      </footer>
    </div>
  );
}

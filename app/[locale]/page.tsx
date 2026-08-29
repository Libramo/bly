"use client";

import { use, useRef } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { TeamSection } from "@/components/team-section";
import { WorkSection } from "@/components/work-section";
import { ContactSection } from "@/components/contact-section";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import FooterSection from "@/components/footer-section";
import type { Lang } from "@/lib/i18n";

/* ─── Copy ─────────────────────────────────────────────── */
const C = {
  en: {
    hero_eyebrow: "A small team. A sharp focus.",
    h1a: "We don't ship",
    h1b: "features.",
    h1c: "We ship",
    h1d: "outcomes.",
    hero_sub:
      "Bly Analytics is a Djibouti-based digital consultancy building platforms for governments, clinics, and businesses across East Africa — with the precision of a product team and the speed of a startup.",
    cta1: "Start a project",
    cta2: "See our portofolio",

    svc_eyebrow: "What we build",
    svc_title: "Services",
    svc_sub: "We take full ownership — from architecture to deployment.",
    svc1_t: "Web platforms",
    svc1_d:
      "Full-stack apps with Next.js, Drizzle, and Postgres. Multi-role auth, dashboards, booking systems.",
    svc2_t: "Analytics dashboards",
    svc2_d:
      "Interactive KPI dashboards with data pipelines. Python/Dash or Next.js with Recharts.",
    svc3_t: "Government digitisation",
    svc3_d:
      "Licensing, registry, and permit systems built for Djiboutian institutions.",
    svc4_t: "Healthcare tech",
    svc4_d:
      "Appointment flows, doctor onboarding, patient portals — proven patterns in production.",
    svc5_t: "Data pipelines",
    svc5_d:
      "Scraping, ETL, deduplication, and enrichment. Checkpoint/resume for large datasets.",
    svc6_t: "Document automation",
    svc6_d:
      "DOCX, PDF, PPTX generation from structured data. Reports and forms at scale.",

    work_eyebrow: "Selected work",
    work_title: "What we've shipped",
    work_sub: "Two live platforms. More in the pipeline.",
    p1_tag: "Healthcare",
    p1_t: "Doctor booking platform",
    p1_d: "Multi-role appointment system with magic-link onboarding, admin approval flows, file uploads, and a stepped form wizard.",
    p1_stack: [
      "Next.js",
      "TypeScript",
      "Drizzle",
      "Better Auth",
      "shadcn/ui",
      "UploadThing",
    ],
    p2_tag: "Government",
    p2_t: "National agency dashboard",
    p2_d: "Analytics dashboard with KPI cards, week-over-week comparisons, demographic distributions, and a filterable multi-thousand-row registry.",
    p2_stack: ["Python", "Dash", "Plotly", "Pandas"],

    contact_eyebrow: "Get in touch",
    contact_title: "Got a problem worth solving?",
    contact_sub:
      "No pitch, no deck. Tell us what you're building and we'll tell you if we can help.",
    contact_name: "Your name",
    contact_email: "Your email",
    contact_msg: "What are you building?",
    contact_hint:
      "Tell us about the project, your timeline, and what kind of help you need.",
    contact_send: "Send message",
    contact_sending: "Sending…",
    contact_ok_t: "Message sent.",
    contact_ok_s: "We'll get back to you within 24 hours.",
    contact_alt: "Or email us directly",
    footer: "Built in Djibouti.",
  },
  fr: {
    hero_eyebrow: "Une petite équipe. Un focus précis.",
    h1a: "On ne livre pas",
    h1b: "des fonctionnalités.",
    h1c: "On livre",
    h1d: "des résultats.",
    hero_sub:
      "Bly Analytics est une agence de conseil numérique basée à Djibouti, spécialisée dans la conception de plateformes pour les gouvernements, les cliniques et les entreprises en Afrique de l'Est.",
    cta1: "Démarrer un projet",
    cta2: "Voir notre portofolio",

    svc_eyebrow: "Ce qu'on construit",
    svc_title: "Services",
    svc_sub: "On prend tout en charge — de l'architecture au déploiement.",
    svc1_t: "Plateformes web",
    svc1_d:
      "Apps full-stack avec Next.js, Drizzle et Postgres. Auth multi-rôles, dashboards, systèmes de réservation.",
    svc2_t: "Tableaux de bord analytiques",
    svc2_d:
      "Dashboards KPI interactifs avec pipelines de données. Python/Dash ou Next.js avec Recharts.",
    svc3_t: "Digitalisation gouvernementale",
    svc3_d:
      "Systèmes de licences, registres et permis conçus pour les institutions djiboutiennes.",
    svc4_t: "Tech santé",
    svc4_d:
      "Flux de rendez-vous, onboarding médecins, portails patients — des patterns éprouvés en production.",
    svc5_t: "Pipelines de données",
    svc5_d:
      "Scraping, ETL, déduplication et enrichissement. Checkpoint/reprise pour les grands volumes.",
    svc6_t: "Automatisation documentaire",
    svc6_d:
      "Génération DOCX, PDF, PPTX depuis des données structurées. Rapports et formulaires à l'échelle.",

    work_eyebrow: "Projets sélectionnés",
    work_title: "Ce qu'on a livré",
    work_sub: "Deux plateformes en production. D'autres en cours.",
    p1_tag: "Santé",
    p1_t: "Plateforme de prise de rendez-vous",
    p1_d: "Système multi-rôles avec onboarding par lien magique, flux d'approbation admin, téléversement de fichiers et formulaire pas-à-pas.",
    p1_stack: [
      "Next.js",
      "TypeScript",
      "Drizzle",
      "Better Auth",
      "shadcn/ui",
      "UploadThing",
    ],
    p2_tag: "Gouvernement",
    p2_t: "Tableau de bord d'agence nationale",
    p2_d: "Dashboard analytique avec KPIs, comparaisons semaine par semaine, distributions démographiques et registre filtrable.",
    p2_stack: ["Python", "Dash", "Plotly", "Pandas"],

    contact_eyebrow: "Contactez-nous",
    contact_title: "Un problème qui vaut la peine d'être résolu ?",
    contact_sub:
      "Pas de pitch, pas de deck. Dites-nous ce que vous construisez et on vous dira si on peut aider.",
    contact_name: "Votre nom",
    contact_email: "Votre e-mail",
    contact_msg: "Que construisez-vous ?",
    contact_hint:
      "Parlez-nous du projet, de votre calendrier et du type d'aide dont vous avez besoin.",
    contact_send: "Envoyer",
    contact_sending: "Envoi…",
    contact_ok_t: "Message envoyé.",
    contact_ok_s: "Nous vous répondrons dans les 24 heures.",
    contact_alt: "Ou écrivez-nous directement",
    footer: "Construit à Djibouti.",
  },
};

function MagLink({
  href,
  children,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 400, damping: 22 });
  const sy = useSpring(y, { stiffness: 400, damping: 22 });
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  return (
    <motion.a
      ref={ref}
      href={href}
      style={{
        x: sx,
        y: sy,
        display: "inline-block",
        textDecoration: "none",
        fontSize: "13px",
        fontWeight: 600,
        background: primary ? "var(--accent)" : "none",
        color: primary ? "#fff" : "var(--muted)",
        border: primary ? "none" : "1px solid var(--border)",
        borderRadius: "4px",
        padding: "11px 22px",
        cursor: "pointer",
        transition: "border-color 0.2s, color 0.2s",
      }}
      onMouseMove={move}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}

/* ─── Page ──────────────────────────────────────────────── */
function BlyInner({ lang }: { lang: Lang }) {
  const t = C[lang];

  return (
    <div className="bg-(--bg) text-(--fg) font-sans min-h-screen overflow-x-hidden transition-colors duration-350">
      <Navbar lang={lang} />

      <HeroSection lang={lang} />
      <ServicesSection lang={lang} />
      <WorkSection lang={lang} />

      <div className="border-t border-(--border) max-w-230 mx-auto" />

      <TeamSection lang={lang} />

      <div className="border-t border-(--border) max-w-230 mx-auto" />

      <ContactSection lang={lang} />

      <FooterSection lang={lang} />
    </div>
  );
}

export default function BlyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params) as { locale: Lang };
  return (
    <ThemeProvider>
      <BlyInner lang={locale} />
    </ThemeProvider>
  );
}

import React, { useRef } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";

type Lang = "en" | "fr";

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
const SERVICES = (t: typeof C.en) => [
  { title: t.svc1_t, desc: t.svc1_d, icon: "◻" },
  { title: t.svc2_t, desc: t.svc2_d, icon: "◈" },
  { title: t.svc3_t, desc: t.svc3_d, icon: "◎" },
  { title: t.svc4_t, desc: t.svc4_d, icon: "◐" },
  { title: t.svc5_t, desc: t.svc5_d, icon: "◫" },
  { title: t.svc6_t, desc: t.svc6_d, icon: "◧" },
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
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
function Flip({ v, id }: { v: string; id: string }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={id + v}
        initial={{ rotateX: -70, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        exit={{ rotateX: 70, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "inline-block" }}
      >
        {v}
      </motion.span>
    </AnimatePresence>
  );
}

const ServicesSection = ({ lang = "en" }: { lang?: Lang }) => {
  const t = C[lang];
  return (
    <>
      <section id="services" className="max-w-[920px] mx-auto px-8 py-20">
        <FadeUp>
          <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--accent)] mb-[0.4rem]">
            <Flip v={t.svc_eyebrow} id={"se" + lang} />
          </p>
          <h2 className="font-serif text-[clamp(26px,4vw,40px)] tracking-[-0.025em] text-[var(--fg)] mb-[0.6rem] leading-[1.1]">
            <Flip v={t.svc_title} id={"st" + lang} />
          </h2>
          <p className="text-[14px] text-[var(--muted)] leading-[1.75] max-w-[400px] mb-10">
            <Flip v={t.svc_sub} id={"ss" + lang} />
          </p>
        </FadeUp>

        <div
          className="grid gap-px bg-[var(--border)] border border-[var(--border)] rounded-[6px] overflow-hidden"
          style={{ gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))" }}
        >
          {SERVICES(t).map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              // whileHover={{ background: "var(--surface-hover)" }}
              className="bg-[var(--surface)] hover:bg-[var(--surface-hover)]  duration-200  p-6 transition-colors"
            >
              <span className="text-[18px] block mb-3 text-[var(--accent)] leading-none">
                {svc.icon}
              </span>
              <p className="text-[13px] font-semibold text-[var(--fg)] mb-[6px]">
                {svc.title}
              </p>
              <p className="text-[12px] text-[var(--muted)] leading-[1.65]">
                {svc.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="border-t border-[var(--border)] max-w-[920px] mx-auto" />
    </>
  );
};

export default ServicesSection;

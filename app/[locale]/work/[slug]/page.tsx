import { CaseStudyPage } from "@/components/case-study-component";
import { PROJECTS } from "@/lib/projects";
import { SITE_URL } from "@/lib/seo";
import type { Lang } from "@/lib/i18n";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = (await params) as { locale: Lang; slug: string };
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  const path = `/work/${slug}`;
  const url = locale === "en" ? `${SITE_URL}/en${path}` : `${SITE_URL}${path}`;
  return {
    title: `${project.title[locale]} — Bly Analytics`,
    description: project.oneliner[locale],
    alternates: {
      canonical: url,
      languages: {
        fr: `${SITE_URL}${path}`,
        en: `${SITE_URL}/en${path}`,
        "x-default": `${SITE_URL}${path}`,
      },
    },
    openGraph: {
      title: `${project.title[locale]} — Bly Analytics`,
      description: project.oneliner[locale],
      url,
      siteName: "Bly Analytics",
      type: "article",
    },
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = (await params) as { locale: Lang; slug: string };
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  return <CaseStudyPage lang={locale} project={project} nextProject={next} />;
}

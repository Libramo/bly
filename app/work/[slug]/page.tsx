import { CaseStudyPage } from "@/components/case-study-component";
import { PROJECTS } from "@/lib/projects";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title.en} — Bly Analytics`,
    description: project.oneliner.en,
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  return (
    <Suspense fallback={null}>
      <CaseStudyPage project={project} nextProject={next} />
    </Suspense>
  );
}

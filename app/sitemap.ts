import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = PROJECTS.map((p) => ({
    url: `https://blyanalytics.com/work/${p.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: "https://blyanalytics.com", lastModified: new Date() },
    { url: "https://blyanalytics.com/contact", lastModified: new Date() },
    ...projects,
  ];
}

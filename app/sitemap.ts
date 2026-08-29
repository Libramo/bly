import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { SITE_URL } from "@/lib/seo";

function entry(path: string): MetadataRoute.Sitemap[number] {
  const fr = path === "" ? SITE_URL : `${SITE_URL}${path}`;
  const en = `${SITE_URL}/en${path}`;
  return {
    url: fr,
    lastModified: new Date(),
    alternates: { languages: { fr, en } },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = PROJECTS.map((p) => entry(`/work/${p.slug}`));

  return [entry(""), entry("/services"), entry("/contact"), ...projects];
}

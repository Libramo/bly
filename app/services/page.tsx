import { Suspense } from "react";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { ServicesPage } from "@/components/services-page";

export const metadata: Metadata = {
  title: "Services — Bly Analytics",
  description:
    "Web platforms, analytics dashboards, government digitisation, healthcare tech, data pipelines, and document automation — built for East African businesses and institutions.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: "Services — Bly Analytics",
    description:
      "Web platforms, analytics dashboards, government digitisation, healthcare tech, data pipelines, and document automation — built for East African businesses and institutions.",
    url: `${SITE_URL}/services`,
    siteName: "Bly Analytics",
    type: "website",
  },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ServicesPage />
    </Suspense>
  );
}

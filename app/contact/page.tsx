import { Suspense } from "react";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { ContactPage } from "@/components/contact-page";

export const metadata: Metadata = {
  title: "Contact — Bly Analytics",
  description:
    "Get in touch with Bly Analytics, a Djibouti-based digital consultancy building web platforms, dashboards, and digitisation systems for East Africa.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact — Bly Analytics",
    description:
      "Get in touch with Bly Analytics, a Djibouti-based digital consultancy building web platforms, dashboards, and digitisation systems for East Africa.",
    url: `${SITE_URL}/contact`,
    siteName: "Bly Analytics",
    type: "website",
  },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ContactPage />
    </Suspense>
  );
}

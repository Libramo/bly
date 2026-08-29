import { redirect } from "next/navigation";
import type { Lang } from "@/lib/i18n";

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Lang };
  redirect(locale === "en" ? "/en#work" : "/#work");
}

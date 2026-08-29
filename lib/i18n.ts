export type Lang = "fr" | "en";

export const LOCALES: Lang[] = ["fr", "en"];
export const DEFAULT_LOCALE: Lang = "fr";

// path is locale-free, e.g. "/services", "/work/ejo", "/"
export function localizedHref(locale: Lang, path: string) {
  return locale === "en" ? `/en${path === "/" ? "" : path}` : path;
}

export function otherLocale(locale: Lang): Lang {
  return locale === "en" ? "fr" : "en";
}

// Inverse of localizedHref: "/en/services" -> "/services", "/en" -> "/",
// "/services" -> "/services" (already locale-free).
export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}

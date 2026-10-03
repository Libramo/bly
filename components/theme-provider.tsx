"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// next-themes renders an inline <script> that applies the theme before first
// paint. It must execute in the server HTML, but when React re-renders it on
// the client (the [locale] layout remounts on a language switch) it can never
// execute, and React warns about the executable script tag. Marking the
// client copy as inert data silences that; next-themes already sets
// suppressHydrationWarning on the element, so the type mismatch is ignored.
const scriptProps =
  typeof window === "undefined" ? undefined : { type: "application/json" };

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider scriptProps={scriptProps} {...props}>
      {children}
    </NextThemesProvider>
  );
}

import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Bly — Digital products for East Africa",
  description:
    "Full-stack engineer specialising in government digitisation, data platforms, and healthcare tech in East Africa. Based in Djibouti.",
  openGraph: {
    title: "Bly — Digital products for East Africa",
    description:
      "I don't sell deliverables. I solve problems. Based in Djibouti.",
    url: "https://bly.dj",
    siteName: "Bly",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={`${geist.variable} ${dmSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

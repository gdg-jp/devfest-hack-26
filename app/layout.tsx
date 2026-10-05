import type { Metadata } from "next";
import { dictionaries } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: dictionaries.ja.meta.title,
  description: dictionaries.ja.meta.description,
  alternates: { languages: { ja: "/", en: "/en" } },
  openGraph: { title: dictionaries.ja.meta.title, description: dictionaries.ja.meta.description, locale: "ja_JP" },
  icons: {
    icon: "/brand/gdg-lockup.svg",
    shortcut: "/brand/gdg-lockup.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}

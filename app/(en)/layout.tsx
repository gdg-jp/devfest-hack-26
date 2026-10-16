import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  alternates: { languages: { ja: "/", en: "/en" } },
  icons: {
    icon: "/brand/gdg-lockup.svg",
    shortcut: "/brand/gdg-lockup.svg",
  },
};

export default function EnLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevFest Hackathon 2026 | GDG Japan",
  description: "全国の開発者と5日間で未来をつくる、DevFest Hackathon 2026。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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

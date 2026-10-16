import type { Metadata } from "next";
import { Site } from "@/components/site";
import { dictionaries } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dictionaries.en.meta.title,
  description: dictionaries.en.meta.description,
  alternates: { languages: { ja: "/", en: "/en" } },
  openGraph: { title: dictionaries.en.meta.title, description: dictionaries.en.meta.description, locale: "en_US" },
};

export default function HomeEn() {
  return <Site locale="en" />;
}

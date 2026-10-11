"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { useI18n } from "@/components/i18n-provider";
import { locales, type Locale } from "@/lib/i18n";

const labels: Record<Locale, { short: string; name: string }> = {
  ja: { short: "JA", name: "日本語" },
  en: { short: "EN", name: "English" },
};

export function LanguageToggle({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const { locale, t, switchLocale } = useI18n();
  const pillId = useId();

  return (
    <div className={`lang-toggle lang-toggle-${tone} ${className}`} role="group" aria-label={t.common.language}>
      {locales.map((option) => {
        const active = option === locale;
        return (
          <button
            key={option}
            type="button"
            lang={option}
            aria-pressed={active}
            aria-label={labels[option].name}
            className={active ? "is-active" : undefined}
            onClick={() => switchLocale(option)}
          >
            {active ? (
              <motion.span
                layoutId={`lang-pill-${pillId}`}
                className="lang-pill"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            ) : null}
            <span className="lang-label">{labels[option].short}</span>
          </button>
        );
      })}
    </div>
  );
}
